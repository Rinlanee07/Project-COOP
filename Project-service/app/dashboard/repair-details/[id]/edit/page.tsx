"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Select from 'react-select';
import { Loader2, Save, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { repairService } from '@/services/repairService';
import { ApiClient } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');

const EditRepairPage = () => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dropdown options
    const [customers, setCustomers] = useState<any[]>([]);
    const [customerDevices, setCustomerDevices] = useState<any[]>([]);
    const [technicalReports, setTechnicalReports] = useState<any[]>([]);
    const [partsList, setPartsList] = useState<any[]>([]);

    // Form State - same as Create Repair
    const [notificationDate, setNotificationDate] = useState<string>('');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);

    // Contact Information
    const [companyStoreName, setCompanyStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [contactPersonName, setContactPersonName] = useState('');
    const [contactPersonPhone, setContactPersonPhone] = useState('');

    // Product Information
    const [productName, setProductName] = useState('');
    const [productNumber, setProductNumber] = useState('');
    const [defectSymptoms, setDefectSymptoms] = useState('');
    const [accessories, setAccessories] = useState('');
    const [notes, setNotes] = useState('');

    // Delivery Information
    const [sentBy, setSentBy] = useState('');
    const [receivedBy, setReceivedBy] = useState('');
    const [dueDate, setDueDate] = useState<string>('');

    // Parts
    const [parts, setParts] = useState<Array<{ part_number: string; description: string; quantity: number }>>([]);

    // Engineer Report
    const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
    const [repairDate, setRepairDate] = useState<string>('');
    const [purchaseDate, setPurchaseDate] = useState<string>('');
    const [contractDate, setContractDate] = useState<string>('');
    const [engineerComment, setEngineerComment] = useState('');

    // Priority
    const [priority, setPriority] = useState<any>('Medium');

    // Image/File states
    const [existingImages, setExistingImages] = useState<Array<{ id: string; url: string; fileName: string }>>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    // Fetch customers for dropdown
    useEffect(() => {
        const fetchDropdownData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const [custRes, techRes, partsRes] = await Promise.all([
                    apiClient.getCustomers(token),
                    apiClient.getTechnicalReports(token),
                    apiClient.getParts(token)
                ]);

                if (custRes.data) {
                    setCustomers(custRes.data.map((c: any) => ({
                        value: c.customer_id,
                        label: c.customer_name,
                        original: c
                    })));
                }

                if (techRes.data) {
                    setTechnicalReports(techRes.data.map((t: any) => ({
                        value: t.id,
                        label: t.name,
                        original: t
                    })));
                }

                if (partsRes.data) {
                    setPartsList(partsRes.data.map((p: any) => ({
                        value: p.id,
                        label: `${p.part_no} - ${p.description}`,
                        original: p
                    })));
                }
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };
        fetchDropdownData();
    }, []);

    // Fetch repair detail and populate form
    useEffect(() => {
        const fetchRepairDetail = async () => {
            if (!id) {
                setError('ไม่พบ ID ของงานซ่อม');
                setLoading(false);
                return;
            }

            try {
                const result = await repairService.getById(Number(id));

                if (result.success && result.data) {
                    const { repairRequest, parts: ticketParts } = result.data;

                    // Pre-fill all form fields
                    setDefectSymptoms(repairRequest.description || '');
                    setAccessories(repairRequest.accessories || '');
                    setNotes(repairRequest.remark || '');
                    setSentBy(repairRequest.sentBy || '');
                    setReceivedBy(repairRequest.receivedBy || '');
                    setEngineerComment(repairRequest.engineerComment || '');

                    // Set technician if available
                    if (repairRequest.technicianName) {
                        setSelectedTechnician({
                            value: repairRequest.technicianName,
                            label: repairRequest.technicianName
                        });
                    }
                    // setPriority(repairRequest.priority || 'Medium'); // Priority not available in repairRequest type

                    // Format dates
                    if (repairRequest.createdAt) {
                        const date = new Date(repairRequest.createdAt);
                        if (!isNaN(date.getTime())) {
                            setNotificationDate(date.toISOString().split('T')[0]);
                        }
                    }

                    // if (repairRequest.dueDate) { // dueDate not available in repairRequest type
                    //     const date = new Date(repairRequest.dueDate);
                    //     if (!isNaN(date.getTime())) {
                    //         setDueDate(date.toISOString().split('T')[0]);
                    //     }
                    // }

                    if (repairRequest.purchaseDate) {
                        const date = new Date(repairRequest.purchaseDate);
                        if (!isNaN(date.getTime())) {
                            setPurchaseDate(date.toISOString().split('T')[0]);
                        }
                    }

                    // Load customer and device
                    if (repairRequest.customer) {
                        // Use customer data directly from repairRequest instead of making API call
                        const customer = repairRequest.customer;
                        setSelectedCustomer({
                            value: customer.name, // Use name as value since customer object doesn't have customer_id
                            label: customer.name,
                            original: customer
                        });

                        // Set contact info
                        setCompanyStoreName(customer.name || '');
                        setContactPersonName(''); // No contact person in customer object
                        setContactPersonPhone(customer.phone || '');
                        setAddress(customer.address || '');
                    }

                    // Load parts
                    if (ticketParts && ticketParts.length > 0) {
                        setParts(ticketParts.map((p: any) => ({
                            part_number: p.partNumber || '',
                            description: p.partName,
                            quantity: p.quantity
                        })));
                    }

                    // Load existing images
                    if (repairRequest.images && Array.isArray(repairRequest.images)) {
                        setExistingImages(repairRequest.images.map((img: any, index: number) => ({
                            id: `existing-${index}`,
                            url: img.url,
                            fileName: img.url.split('/').pop() || 'image.jpg'
                        })));
                    }
                } else {
                    setError(result.error || 'ไม่สามารถโหลดข้อมูลได้');
                }
            } catch (err) {
                console.error('[EditRepair] Error:', err);
                setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
            } finally {
                setLoading(false);
            }
        };

        fetchRepairDetail();
    }, [id]);

    // Helper function to format address
    const formatAddress = (addr: any): string => {
        if (!addr || typeof addr !== 'object') return '';
        const parts = [];
        if (addr.houseNumber) parts.push(`House No. ${addr.houseNumber}`);
        if (addr.soi) parts.push(`Soi ${addr.soi}`);
        if (addr.road) parts.push(`Road ${addr.road}`);
        if (addr.subdistrict) parts.push(`Subdistrict ${addr.subdistrict}`);
        if (addr.district) parts.push(`District ${addr.district}`);
        if (addr.provinceId) {
            const provinceName = typeof addr.provinceId === 'string' ? addr.provinceId : '';
            parts.push(provinceName);
        }
        return parts.join(', ');
    };

    // Update devices when customer changes
    useEffect(() => {
        if (selectedCustomer?.original) {
            const customer = selectedCustomer.original;
            setCompanyStoreName(customer.company_name || customer.shop_name || customer.customer_name || '');
            setContactPersonName(customer.contact_person || '');
            setContactPersonPhone(customer.phone_number || customer.contact_tel || '');

            // Parse address
            let addressText = '';
            if (customer.company_address) {
                try {
                    const addr = typeof customer.company_address === 'string'
                        ? JSON.parse(customer.company_address)
                        : customer.company_address;
                    addressText = formatAddress(addr);
                } catch (e) {
                    addressText = customer.company_address;
                }
            } else if (customer.shop_address) {
                try {
                    const addr = typeof customer.shop_address === 'string'
                        ? JSON.parse(customer.shop_address)
                        : customer.shop_address;
                    addressText = formatAddress(addr);
                } catch (e) {
                    addressText = customer.shop_address;
                }
            }
            setAddress(addressText);

            // Load customer devices
            if (customer.Cust_Devices && Array.isArray(customer.Cust_Devices)) {
                const devicesList = customer.Cust_Devices
                    .filter((cd: any) => cd.Device)
                    .map((cd: any) => {
                        const device = cd.Device;
                        const deviceType = device.DeviceType;
                        const deviceLabel = deviceType
                            ? `${deviceType.brand} ${deviceType.model}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`
                            : `Device ${device.device_id}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`;

                        return {
                            value: device.device_id,
                            label: deviceLabel,
                            original: device
                        };
                    });
                setCustomerDevices(devicesList);
            }
        }
    }, [selectedCustomer]);

    // Update product info when device changes
    useEffect(() => {
        if (selectedDevice?.original) {
            const device = selectedDevice.original;
            const deviceType = device.DeviceType;
            setProductName(deviceType ? `${deviceType.brand || ''} ${deviceType.model || ''}`.trim() : '');
            setProductNumber(device.serial_number || '');
        } else {
            setProductName('');
            setProductNumber('');
        }
    }, [selectedDevice]);

    const handleAddPart = () => {
        setParts([...parts, { part_number: '', description: '', quantity: 1 }]);
    };

    const addPartFromDropdown = (selectedPart: any) => {
        if (!selectedPart) return;
        const newPart = {
            part_number: selectedPart.original.part_no,
            description: selectedPart.original.description,
            quantity: 1
        };
        setParts([...parts, newPart]);
    };

    const handleRemovePart = (index: number) => {
        setParts(parts.filter((_, i) => i !== index));
    };

    const handlePartChange = (index: number, field: string, value: any) => {
        const newParts = [...parts];
        newParts[index] = { ...newParts[index], [field]: value };
        setParts(newParts);
    };

    // Image handling functions
    const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            // Filter only image files (.jpeg, .jpg, .png)
            const imageFiles = selectedFiles.filter(file => {
                const fileName = file.name.toLowerCase();
                return fileName.endsWith('.jpeg') || fileName.endsWith('.jpg') || fileName.endsWith('.png');
            });

            setNewFiles([...newFiles, ...imageFiles]);

            // Create preview URLs for images
            const previews = imageFiles.map(file => URL.createObjectURL(file));
            setNewImagePreviews([...newImagePreviews, ...previews]);
        }
    };

    const removeNewImage = (index: number) => {
        // Revoke the object URL to free memory
        URL.revokeObjectURL(newImagePreviews[index]);

        const updatedFiles = newFiles.filter((_, i) => i !== index);
        const updatedPreviews = newImagePreviews.filter((_, i) => i !== index);

        setNewFiles(updatedFiles);
        setNewImagePreviews(updatedPreviews);
    };

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            newImagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [newImagePreviews]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);

        try {
            const updateData = {
                customer_id: selectedCustomer?.value,
                device_id: selectedDevice?.value,
                description: defectSymptoms,
                accessories,
                remark: notes,
                sentBy,
                receivedBy,
                engineerComment,
                technicianName: selectedTechnician?.label || null,
                purchaseDate: purchaseDate || null,
                dueDate: dueDate || null,
                priority,
                parts: parts.filter(p => p.description.trim() !== '')
            };

            // Pass new files to the service
            const result = await repairService.update(Number(id), updateData, newFiles.length > 0 ? newFiles : undefined);

            if (result.success) {
                toast({ title: 'Success', description: 'บันทึกข้อมูลเรียบร้อยแล้ว' });
                router.push(`/dashboard/repair-details/${id}`);
            } else {
                setError(result.error || 'ไม่สามารถบันทึกข้อมูลได้');
            }
        } catch (err) {
            console.error('[EditRepair] Save error:', err);
            setError('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push(`/dashboard/repair-details/${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#092A6D] mx-auto mb-4" />
                    <p className="text-[#666666]">กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        );
    }

    if (error && !saving) {
        return (
            <div className="p-6 bg-[#F5F7FA] min-h-screen">
                <div className="bg-red-50 border-red-200 rounded-xl shadow-sm p-4 text-center text-red-700">
                    {error}
                </div>
                <div className="mt-4 text-center">
                    <Button onClick={handleCancel} variant="outline">
                        กลับ
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA] p-6">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-[#092A6D]">แก้ไขรายละเอียดงานซ่อม</h1>
                            <p className="text-sm text-[#666666] mt-1">ID: {id}</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Receiving Date */}
                            <div className="space-y-2">
                                <Label>RECEIVING DATE</Label>
                                <Input
                                    type="date"
                                    value={notificationDate}
                                    onChange={(e) => setNotificationDate(e.target.value)}
                                />
                            </div>

                            {/* Select Customer */}
                            <div className="space-y-2">
                                <Label>Select Customer</Label>
                                <Select
                                    instanceId="customer-select-edit"
                                    options={customers}
                                    value={selectedCustomer}
                                    onChange={setSelectedCustomer}
                                    placeholder="Select customer..."
                                    className="text-sm"
                                    isSearchable
                                    isClearable
                                />
                            </div>

                            {/* Customer Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>CUSTOMER NAME</Label>
                                    <Input
                                        value={companyStoreName}
                                        onChange={(e) => setCompanyStoreName(e.target.value)}
                                        placeholder=""
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>ADDRESS</Label>
                                    <Textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder=""
                                        className="min-h-[80px]"
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>CONTACT PERSON</Label>
                                    <Input
                                        value={contactPersonName}
                                        onChange={(e) => setContactPersonName(e.target.value)}
                                        placeholder=""
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>TEL</Label>
                                    <Input
                                        value={contactPersonPhone}
                                        onChange={(e) => setContactPersonPhone(e.target.value)}
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Select Device */}
                            <div className="space-y-2">
                                <Label>Select Device</Label>
                                <Select
                                    instanceId="device-select-edit"
                                    options={customerDevices}
                                    value={selectedDevice}
                                    onChange={setSelectedDevice}
                                    placeholder={selectedCustomer ? 'Select Device' : 'Please select customer first'}
                                    className="text-sm"
                                    isDisabled={!selectedCustomer}
                                    isClearable
                                    isSearchable
                                />
                            </div>

                            {/* Product Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Product Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>PRODUCT</Label>
                                            <Input
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>SERIAL NO.</Label>
                                            <Input
                                                value={productNumber}
                                                onChange={(e) => setProductNumber(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>DESC OF FAULT</Label>
                                        <Textarea
                                            value={defectSymptoms}
                                            onChange={(e) => setDefectSymptoms(e.target.value)}
                                            placeholder=""
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>ACCESSORIES</Label>
                                        <Textarea
                                            value={accessories}
                                            onChange={(e) => setAccessories(e.target.value)}
                                            placeholder=""
                                            className="min-h-[80px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>REMARK</Label>
                                        <Textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder=""
                                            className="min-h-[80px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Delivery Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">DELIVERY INFORMATION</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>CUSTOMER</Label>
                                            <Input
                                                value={sentBy}
                                                onChange={(e) => setSentBy(e.target.value)}
                                                placeholder="Name of person bringing item"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>RECEIVE BY</Label>
                                            <Input
                                                value={receivedBy}
                                                onChange={(e) => setReceivedBy(e.target.value)}
                                                placeholder="Name of person receiving item"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>DUE DATE</Label>
                                        <Input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Parts */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Parts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>อุปกรณ์</Label>
                                        <Select
                                            options={partsList}
                                            onChange={addPartFromDropdown}
                                            placeholder="เลือกอุปกรณ์"
                                            isSearchable
                                            isClearable
                                        />
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">PART NO., DESCRIPTION, QUANTITY</p>
                                        <Button type="button" variant="outline" size="sm" onClick={handleAddPart}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Part
                                        </Button>
                                    </div>

                                    {parts.length === 0 && (
                                        <p className="text-sm text-gray-400 italic">No parts added.</p>
                                    )}

                                    {parts.map((part, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <Input
                                                placeholder="Part No."
                                                value={part.part_number}
                                                onChange={(e) => handlePartChange(index, 'part_number', e.target.value)}
                                                className="w-1/4"
                                            />
                                            <Input
                                                placeholder="Description"
                                                value={part.description}
                                                onChange={(e) => handlePartChange(index, 'description', e.target.value)}
                                                className="flex-1"
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Quantity"
                                                value={part.quantity}
                                                onChange={(e) => handlePartChange(index, 'quantity', parseInt(e.target.value) || 1)}
                                                className="w-24"
                                                min="1"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemovePart(index)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Engineer Report */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">TECHNICAL REPORT</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>TECHNICAL</Label>
                                            <Select
                                                value={selectedTechnician}
                                                onChange={setSelectedTechnician}
                                                options={technicalReports}
                                                placeholder="Select Technician"
                                                isSearchable={true}
                                                isClearable={true}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>REPAIR DATE</Label>
                                            <Input
                                                type="date"
                                                value={repairDate}
                                                onChange={(e) => setRepairDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>PURCHASE DATE</Label>
                                            <Input
                                                type="date"
                                                value={purchaseDate}
                                                onChange={(e) => setPurchaseDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>CONTRACT DATE</Label>
                                            <Input
                                                type="date"
                                                value={contractDate}
                                                onChange={(e) => setContractDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>COMMENT</Label>
                                        <Textarea
                                            value={engineerComment}
                                            onChange={(e) => setEngineerComment(e.target.value)}
                                            placeholder="Engineer comments..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Priority */}
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    instanceId="priority-select-edit"
                                    options={[
                                        { value: 'Low', label: 'Low' },
                                        { value: 'Medium', label: 'Medium' },
                                        { value: 'High', label: 'High' },
                                        { value: 'Critical', label: 'Critical' },
                                    ]}
                                    value={{ value: priority, label: priority }}
                                    onChange={(opt) => setPriority(opt?.value || 'Medium')}
                                    className="text-sm"
                                />
                            </div>

                            {/* Images / Attachments Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">รูปภาพ / Attachments</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Existing Images */}
                                    {existingImages.length > 0 && (
                                        <div className="space-y-2">
                                            <Label>รูปภาพที่มีอยู่แล้ว</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {existingImages.map((image, index) => (
                                                    <div key={image.id} className="relative group">
                                                        <img
                                                            src={image.url}
                                                            alt={`Existing ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-md border border-gray-300"
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md truncate">
                                                            <ImageIcon className="inline h-3 w-3 mr-1" />
                                                            Existing
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Upload New Images */}
                                    <div className="space-y-2">
                                        <Label>เพิ่มรูปภาพใหม่</Label>
                                        <div className="space-y-2">
                                            <Input
                                                type="file"
                                                multiple
                                                onChange={handleNewFileChange}
                                                className="cursor-pointer"
                                                accept=".jpeg,.jpg,.png,image/jpeg,image/jpg,image/png"
                                            />
                                            <span className="text-sm text-gray-500">
                                                {newFiles.length} ไฟล์ใหม่ที่เลือก (รองรับเฉพาะ .jpeg, .jpg, .png)
                                            </span>

                                            {/* New Image Previews */}
                                            {newImagePreviews.length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                    {newImagePreviews.map((preview, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={preview}
                                                                alt={`New Preview ${index + 1}`}
                                                                className="w-full h-32 object-cover rounded-md border border-gray-300"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeNewImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
                                                                aria-label="Remove new image"
                                                            >
                                                                ×
                                                            </button>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-75 text-white text-xs p-1 rounded-b-md">
                                                                <Upload className="inline h-3 w-3 mr-1" />
                                                                ใหม่
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 pt-6 border-t border-[#E8EBF5] flex items-center justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                disabled={saving}
                                className="flex items-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                ยกเลิก
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 bg-[#092A6D] hover:bg-[#092A6D]/90 text-white"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        กำลังบันทึก...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        บันทึก
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditRepairPage;
