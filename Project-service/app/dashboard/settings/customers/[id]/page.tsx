"use client";

import { useState, useEffect, useMemo, useCallback, useId, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash, Save, Cpu, Hammer } from "lucide-react";
import Select from "react-select";
import { THAI_PROVINCES, PROVINCE_MAP } from "@/lib/thaiAddresses";
import { Checkbox } from "@/components/ui/checkbox";

type AddressFields = {
    houseNumber: string;
    soi: string;
    road: string;
    subdistrict: string;
    district: string;
    provinceId: string;
    isThailand: boolean;
};

const emptyAddress: AddressFields = {
    houseNumber: "",
    soi: "",
    road: "",
    subdistrict: "",
    district: "",
    provinceId: "bangkok",
    isThailand: true,
};

type Device = {
    serial_number: string;
    installation_location: string;
    warranty_end_date: string;
    device_type: {
        device_type: string;
        brand: string;
        model: string;
        common_issues: string;
    };
};

export default function CustomerFormPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const isNew = id === "new";
    const [loading, setLoading] = useState(false);
    const [sameAddress, setSameAddress] = useState(false);

    // Customer State
    const [customer, setCustomer] = useState({
        customer_name: "",
        company_name: "",
        contact_person: "",
        phone_number: "",
        contact_email: "",
        contact_line_name: "",
        shop_name: "",
        shop_address: { ...emptyAddress },
        company_address: { ...emptyAddress },
    });

    // Devices State
    const [devices, setDevices] = useState<Device[]>([]);

    const shopProvinceSelectId = useId();
    const shopDistrictSelectId = useId();
    const companyProvinceSelectId = useId();
    const companyDistrictSelectId = useId();

    useEffect(() => {
        if (!isNew) {
            // TODO: Fetch existing customer data
        }
    }, [isNew, id]);

    useEffect(() => {
        if (sameAddress) {
            setCustomer((prev) => ({
                ...prev,
                shop_address: { ...prev.company_address },
            }));
        }
    }, [sameAddress, customer.company_address]);

    const handleCustomerChange = (field: string, value: string) => {
        setCustomer((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (
        type: "shop_address" | "company_address",
        field: keyof AddressFields,
        value: string | boolean
    ) => {
        setCustomer((prev) => ({
            ...prev,
            [type]: { ...prev[type], [field]: value },
        }));
    };

    const { data: session } = useSession();
    // State for existing Device Types
    const [existingDeviceTypes, setExistingDeviceTypes] = useState<any[]>([]);

    useEffect(() => {
        const fetchDeviceTypes = async () => {
            if (session?.accessToken) {
                const res = await apiClient.getDeviceTypes(session.accessToken);
                if (res.data) {
                    setExistingDeviceTypes(res.data.map(dt => ({
                        value: dt.id,
                        label: `${dt.device_type} - ${dt.brand} ${dt.model}`,
                        data: dt
                    })));
                }
            }
        };
        fetchDeviceTypes();
    }, [session?.accessToken]);

    useEffect(() => {
        if (!isNew && session?.accessToken) {
            const fetchCustomer = async () => {
                setLoading(true);
                try {
                    const token = session.accessToken; // Capture token safely
                    if (!token) return;
                    const res = await apiClient.getCustomer(token, id);
                    if (res.data) {
                        const c = res.data;
                        let shopAddr = { ...emptyAddress };
                        let compAddr = { ...emptyAddress };

                        try {
                            if (c.shop_address) shopAddr = JSON.parse(c.shop_address);
                            if (c.company_address) compAddr = JSON.parse(c.company_address);
                        } catch (e) { console.error("Error parsing address", e); }

                        setCustomer({
                            customer_name: c.customer_name,
                            company_name: c.company_name || "",
                            contact_person: c.contact_person,
                            phone_number: c.phone_number,
                            contact_email: c.contact_email || "",
                            contact_line_name: c.contact_line_id || "",
                            shop_name: c.shop_name || "",
                            shop_address: shopAddr,
                            company_address: compAddr,
                        });

                        // Populate Devices
                        if (c.Cust_Devices) {
                            setDevices(c.Cust_Devices.map((cd: any) => ({
                                serial_number: cd.Device.serial_number || "",
                                installation_location: cd.Device.installation_location || "",
                                warranty_end_date: cd.Device.warranty_end_date ? new Date(cd.Device.warranty_end_date).toISOString().split('T')[0] : "",
                                device_type: {
                                    device_type: cd.Device.DeviceType.device_type,
                                    brand: cd.Device.DeviceType.brand,
                                    model: cd.Device.DeviceType.model,
                                    common_issues: cd.Device.DeviceType.common_issues || ""
                                }
                            })));
                        }
                    }
                } catch (error) {
                    toast({ title: "Error", description: "Failed to load customer", variant: "destructive" });
                } finally {
                    setLoading(false);
                }
            };
            fetchCustomer();
        }
    }, [isNew, id, session?.accessToken]);

    const addDevice = () => {
        setDevices([
            ...devices,
            {
                serial_number: "",
                installation_location: "",
                warranty_end_date: "",
                device_type: {
                    device_type: "",
                    brand: "",
                    model: "",
                    common_issues: "",
                },
            },
        ]);
    };

    const removeDevice = (index: number) => {
        setDevices(devices.filter((_, i) => i !== index));
    };

    const updateDevice = (index: number, field: string, value: string) => {
        const newDevices = [...devices];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newDevices[index][parent as keyof Device] = {
                ...(newDevices[index][parent as keyof Device] as any),
                [child]: value
            } as any;
        } else {
            newDevices[index] = { ...newDevices[index], [field]: value };
        }
        setDevices(newDevices);
    };

    const handleDeviceTypeSelect = (index: number, selectedOption: any) => {
        const newDevices = [...devices];
        if (selectedOption) {
            // Pre-fill from existing type
            const dt = selectedOption.data;
            if (dt) {
                newDevices[index].device_type = {
                    device_type: dt.device_type,
                    brand: dt.brand,
                    model: dt.model,
                    common_issues: dt.common_issues || "",
                };
            } else {
                // It's a created option, we might need to parse it or just leave it blank?
                // Current react-select/creatable behavior usually just passes the value as label if created.
                // Ideally we want separate fields, so maybe just don't do anything special if it's "create new"
                // aside from maybe using the label as the device_type name?
                // For now, let's assume they use the inputs below if they want to create a new one,
                // or we can allow the select to just act as a way to find existing ones.
            }
        }
        setDevices(newDevices);
    }




    const handleSubmit = async () => {
        if (!session?.accessToken) return;
        setLoading(true);
        try {
            if (isNew) {
                await apiClient.createCustomer(session.accessToken, {
                    ...customer,
                    shop_address: JSON.stringify(customer.shop_address),
                    company_address: JSON.stringify(customer.company_address),
                    devices
                });
                toast({ title: "Success", description: "Customer created successfully" });
                router.push("/dashboard/settings/customers");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save customer",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const provinceOptions = useMemo(
        () =>
            THAI_PROVINCES.map((p) => ({
                value: p.id,
                label: p.name_th,
            })),
        []
    );

    const getDistrictOptions = useCallback((provinceId: string) => {
        const province = PROVINCE_MAP.get(provinceId);
        return (province?.districts || []).map((d) => ({ value: d, label: d }));
    }, []);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#092A6D]">
                    {isNew ? "New Customer" : "Edit Customer"}
                </h1>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save Customer
                </Button>
            </div>

            {/* Customer Information */}
            <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
                <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
                    <CardTitle className="text-xl font-bold">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Customer Name</Label>
                            <Input value={customer.customer_name} onChange={(e) => handleCustomerChange('customer_name', e.target.value)} />
                        </div>
                        <div>
                            <Label>Company Name</Label>
                            <Input value={customer.company_name} onChange={(e) => handleCustomerChange('company_name', e.target.value)} />
                        </div>
                        <div>
                            <Label>Contact Person</Label>
                            <Input value={customer.contact_person} onChange={(e) => handleCustomerChange('contact_person', e.target.value)} />
                        </div>
                        <div>
                            <Label>Phone Number</Label>
                            <Input value={customer.phone_number} onChange={(e) => handleCustomerChange('phone_number', e.target.value)} />
                        </div>
                        <div>
                            <Label>Shop Name</Label>
                            <Input value={customer.shop_name} onChange={(e) => handleCustomerChange('shop_name', e.target.value)} placeholder="Enter shop name" />
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="flex items-start space-x-3 pt-4 border-t border-[#E8EBF5]">
                        <Checkbox
                            id="same-address"
                            checked={sameAddress}
                            onCheckedChange={(checked) => {
                                if (typeof checked === 'boolean') {
                                    setSameAddress(checked);
                                }
                            }}
                        />
                        <Label htmlFor="same-address">Shop address is the same as company address</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-[#092A6D] mb-3">Shop Address</h3>
                            <Input placeholder="House No, Road..." className="mb-2" value={customer.shop_address.houseNumber} onChange={(e) => !sameAddress && handleAddressChange('shop_address', 'houseNumber', e.target.value)} disabled={sameAddress} />
                            <div className="grid grid-cols-2 gap-2">
                                <Select instanceId="shop-province" isDisabled={sameAddress} options={provinceOptions} value={provinceOptions.find(p => p.value === customer.shop_address.provinceId)} onChange={(opt) => !sameAddress && handleAddressChange('shop_address', 'provinceId', opt?.value || '')} placeholder="Province" />
                                <Select instanceId="shop-district" isDisabled={sameAddress} options={getDistrictOptions(customer.shop_address.provinceId)} value={{ value: customer.shop_address.district, label: customer.shop_address.district }} onChange={(opt) => !sameAddress && handleAddressChange('shop_address', 'district', opt?.value || '')} placeholder="District" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#092A6D] mb-3">Company Address</h3>
                            <Input placeholder="House No, Road..." className="mb-2" value={customer.company_address.houseNumber} onChange={(e) => handleAddressChange('company_address', 'houseNumber', e.target.value)} />
                            <div className="grid grid-cols-2 gap-2">
                                <Select instanceId="company-province" options={provinceOptions} value={provinceOptions.find(p => p.value === customer.company_address.provinceId)} onChange={(opt) => handleAddressChange('company_address', 'provinceId', opt?.value || '')} placeholder="Province" />
                                <Select instanceId="company-district" options={getDistrictOptions(customer.company_address.provinceId)} value={{ value: customer.company_address.district, label: customer.company_address.district }} onChange={(opt) => handleAddressChange('company_address', 'district', opt?.value || '')} placeholder="District" />
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Devices Section */}
            <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
                <CardHeader className="bg-white border-b border-[#E8EBF5] flex flex-row justify-between items-center rounded-t-xl">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-[#D7B55A]" />
                        <CardTitle className="text-xl font-bold text-[#092A6D]">Device Type Settings</CardTitle>
                    </div>
                    <Button onClick={addDevice} variant="outline" className="border-[#D7B55A] text-[#D7B55A] hover:bg-[#D7B55A] hover:text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Device
                    </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {devices.map((device, index) => (
                        <div key={index} className="bg-[#F8F9FC] p-4 rounded-lg border border-[#E8EBF5] relative">
                            <button onClick={() => removeDevice(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                <Trash className="w-4 h-4" />
                            </button>

                            {/* Device Type Topic */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-[#092A6D] font-semibold mb-1 block">Type (Select type...)</Label>
                                        <Select
                                            options={existingDeviceTypes}
                                            onChange={(opt) => handleDeviceTypeSelect(index, opt)}
                                            placeholder="Select or search device type..."
                                            isClearable
                                            className="text-sm"
                                        />
                                        <div className="mt-2">
                                            <Input
                                                value={device.device_type.device_type}
                                                onChange={(e) => updateDevice(index, 'device_type.device_type', e.target.value)}
                                                placeholder="Or type new custom type (e.g. Printer)"
                                                className="bg-white h-8 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-[#092A6D] font-semibold mb-1 block">Serial Number (S/N)</Label>
                                        <Input value={device.serial_number} onChange={(e) => updateDevice(index, 'serial_number', e.target.value)} placeholder="S/N" className="bg-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-[#697293] text-sm">Brand</Label>
                                        <Input value={device.device_type.brand} onChange={(e) => updateDevice(index, 'device_type.brand', e.target.value)} placeholder="Brand" className="bg-white" />
                                    </div>
                                    <div>
                                        <Label className="text-[#697293] text-sm">Model</Label>
                                        <Input value={device.device_type.model} onChange={(e) => updateDevice(index, 'device_type.model', e.target.value)} placeholder="Model" className="bg-white" />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-[#697293] text-sm">Location</Label>
                                    <Input value={device.installation_location} onChange={(e) => updateDevice(index, 'installation_location', e.target.value)} placeholder="e.g. Building A" className="bg-white" />
                                </div>

                                <div>
                                    <Label className="flex items-center gap-2 text-[#092A6D] font-semibold mb-2">
                                        <Hammer className="w-3 h-3" />
                                        Common Issues
                                    </Label>
                                    <Textarea
                                        value={device.device_type.common_issues}
                                        onChange={(e) => updateDevice(index, 'device_type.common_issues', e.target.value)}
                                        placeholder="Common issues for this device type..."
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {devices.length === 0 && (
                        <div className="text-center py-8 text-[#697293] bg-[#F8F9FC] rounded-lg border border-dashed border-[#E8EBF5]">
                            No devices added yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
