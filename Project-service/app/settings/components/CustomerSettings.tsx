// app/settings/components/CustomerSettings.tsx
'use client';

import { useState, useEffect, useMemo, useCallback, useId } from 'react';
import Select from 'react-select';
import { THAI_PROVINCES, PROVINCE_MAP } from '@/lib/thaiAddresses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Save, Plus, X } from 'lucide-react';
import { ApiClient } from '@/lib/api-client';
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');

type AddressFields = {
  houseNumber: string;
  soi: string;
  road: string;
  subdistrict: string;
  district: string;
  provinceId: string;
  isThailand: boolean;
};

type CustomerData = {
  customer_id: string;
  customer_name: string;
  shop_name: string | null;
  devices: Array<{
    type: string;
    serial: string;
    brand: string;
    quantity: number;
  }>;
  shop_address: AddressFields;
  company_name: string | null;
  company_address: AddressFields;
  phone_number: string;
  contact_person: string;
  contact_email: string | null;
  contact_line_name: string | null;
};

const emptyAddress: AddressFields = {
  houseNumber: '',
  soi: '',
  road: '',
  subdistrict: '',
  district: '',
  provinceId: 'bangkok',
  isThailand: true,
};

const DEVICE_TYPE_OPTIONS = [
  { value: 'printer', label: 'Printer' },
  { value: 'buzzer', label: 'Buzzer' },
  { value: 'cash_drawer', label: 'Cash Drawer' },
];

export default function CustomerSettings() {
  const [customer, setCustomer] = useState<CustomerData>({
    customer_id: '',
    customer_name: '',
    shop_name: '',
    devices: [
      { type: '', serial: '', brand: '', quantity: 1 },
    ],
    shop_address: { ...emptyAddress },
    company_name: '',
    company_address: { ...emptyAddress },
    phone_number: '',
    contact_person: '',
    contact_email: '',
    contact_line_name: '',
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const shopProvinceSelectId = useId();
  const shopDistrictSelectId = useId();
  const companyProvinceSelectId = useId();
  const companyDistrictSelectId = useId();
  const deviceTypeSelectId = useId();

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

  const selectedShopProvince = useMemo(
    () => provinceOptions.find((p) => p.value === customer.shop_address.provinceId),
    [customer.shop_address.provinceId, provinceOptions]
  );

  const selectedShopDistrict = useMemo(
    () =>
      getDistrictOptions(customer.shop_address.provinceId).find(
        (d) => d.value === customer.shop_address.district
      ),
    [customer.shop_address.provinceId, customer.shop_address.district, getDistrictOptions]
  );

  const selectedCompanyProvince = useMemo(
    () => provinceOptions.find((p) => p.value === customer.company_address.provinceId),
    [customer.company_address.provinceId, provinceOptions]
  );

  const selectedCompanyDistrict = useMemo(
    () =>
      getDistrictOptions(customer.company_address.provinceId).find(
        (d) => d.value === customer.company_address.district
      ),
    [customer.company_address.provinceId, customer.company_address.district, getDistrictOptions]
  );

  const formatAddress = useCallback((addr: AddressFields) => {
    const provinceName = PROVINCE_MAP.get(addr.provinceId)?.name_th || addr.provinceId;
    return [
      addr.houseNumber && `House No. ${addr.houseNumber}`,
      addr.soi && `Soi ${addr.soi}`,
      addr.road && `Road ${addr.road}`,
      addr.subdistrict && `Subdistrict ${addr.subdistrict}`,
      addr.district && `District ${addr.district}`,
      addr.isThailand && provinceName && `Province ${provinceName}`,
      !addr.isThailand && addr.provinceId,
    ]
      .filter(Boolean)
      .join(', ');
  }, []);

  // Helper function to check if address has meaningful data
  const hasAddressData = useCallback((addr: AddressFields) => {
    return !!(
      addr.houseNumber ||
      addr.soi ||
      addr.road ||
      addr.subdistrict ||
      addr.district ||
      (addr.provinceId && addr.provinceId !== 'bangkok')
    );
  }, []);

  // Sync shop address with company address when checkbox is toggled
  useEffect(() => {
    if (sameAddress) {
      setCustomer((prev) => {
        const companyHasData = hasAddressData(prev.company_address);
        const shopHasData = hasAddressData(prev.shop_address);

        // If company address has data, sync shop_address to company_address
        if (companyHasData) {
          return { ...prev, shop_address: { ...prev.company_address } };
        }
        // If company is empty but shop has data, sync company_address to shop_address
        // This preserves the shop address data instead of losing it
        else if (shopHasData) {
          return { ...prev, company_address: { ...prev.shop_address } };
        }
        // If both are empty, just sync shop to company (no data loss)
        else {
          return { ...prev, shop_address: { ...prev.company_address } };
        }
      });
    }
  }, [sameAddress, hasAddressData]);

  const handleCustomerChange = (field: keyof CustomerData, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeviceChange = (
    index: number,
    field: 'type' | 'serial' | 'brand' | 'quantity',
    value: string
  ) => {
    setCustomer((prev) => {
      const devices = [...prev.devices];
      devices[index] = { ...devices[index], [field]: value };
      return { ...prev, devices };
    });
  };

  const addDeviceRow = () => {
    setCustomer((prev) => ({
      ...prev,
      devices: [...prev.devices, { type: '', serial: '', brand: '', quantity: 1 }],
    }));
  };

  const removeDeviceRow = (index: number) => {
    setCustomer((prev) => {
      const devices = prev.devices.length > 1 ? prev.devices.filter((_, i) => i !== index) : prev.devices;
      return { ...prev, devices };
    });
  };

  const handleAddressChange = (
    type: 'shop_address' | 'company_address',
    field: keyof AddressFields,
    value: string | boolean
  ) => {
    setCustomer((prev) => {
      const updated = {
        ...prev,
        [type]: { ...prev[type], [field]: value },
      };

      // If sameAddress is enabled and company_address changed, sync shop_address
      if (sameAddress && type === 'company_address') {
        updated.shop_address = { ...updated.company_address };
      }

      return updated;
    });
  };

  const handleSave = async () => {
    // Validation
    if (!customer.customer_name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter customer name',
        variant: 'destructive',
      });
      return;
    }

    if (!customer.phone_number.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter phone number',
        variant: 'destructive',
      });
      return;
    }

    if (!customer.contact_person.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter contact person name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Authentication token not found',
          variant: 'destructive',
        });
        return;
      }

      // Format address data - backend expects JSON strings
      const hasShopAddress = customer.shop_address.houseNumber ||
        customer.shop_address.soi ||
        customer.shop_address.road ||
        customer.shop_address.subdistrict ||
        customer.shop_address.district ||
        customer.shop_address.provinceId;

      const hasCompanyAddress = customer.company_address.houseNumber ||
        customer.company_address.soi ||
        customer.company_address.road ||
        customer.company_address.subdistrict ||
        customer.company_address.district ||
        customer.company_address.provinceId;

      const customerData: any = {
        customer_name: customer.customer_name,
        contact_person: customer.contact_person,
        phone_number: customer.phone_number,
        company_name: customer.company_name || undefined,
        shop_name: customer.shop_name || undefined,
        contact_email: customer.contact_email || undefined,
        contact_line_name: customer.contact_line_name || undefined,
        shop_address: hasShopAddress ? customer.shop_address : undefined,
        company_address: hasCompanyAddress ? customer.company_address : undefined,
      };

      const deviceEntries = customer.devices
        .filter((d) => d.type || d.serial || d.brand)
        .map((d) => ({
          serial_number: d.serial || undefined,
          device_type: {
            device_type: d.type || 'unknown',
            brand: d.brand || 'Unknown',
            model: d.type || 'unknown',
          },
        }));

      if (deviceEntries.length > 0) {
        customerData.devices = deviceEntries;
      }

      const result = await apiClient.createCustomer(token, customerData);

      console.log('API Response:', result);

      if (result.error) {
        const errorMessage = typeof result.error === 'string'
          ? result.error
          : 'Failed to save customer';
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      if (!result.data) {
        console.warn('No data returned from server');
        throw new Error('No data returned from server');
      }

      toast({
        title: 'Saved Successfully',
        description: 'Customer information has been saved to database',
      });

      // Reset form
      setCustomer({
        customer_id: '',
        customer_name: '',
        shop_name: '',
        devices: [
          { type: '', serial: '', brand: '', quantity: 1 },
        ],
        shop_address: { ...emptyAddress },
        company_name: '',
        company_address: { ...emptyAddress },
        phone_number: '',
        contact_person: '',
        contact_email: '',
        contact_line_name: '',
      });
    } catch (error: any) {
      console.error('Error saving customer:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save customer information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <div>
              <Label className="text-[#333333] font-medium mb-2 block">Customer Name</Label>
              <Input
                value={customer.customer_name}
                onChange={(e) => handleCustomerChange('customer_name', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <Label className="text-[#333333] font-medium mb-2 block">Company Name</Label>
              <Input
                value={customer.company_name || ''}
                onChange={(e) => handleCustomerChange('company_name', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                placeholder="Enter company name (optional)"
              />
            </div>

            <div>
              <Label className="text-[#333333] font-medium mb-2 block">Shop Name</Label>
              <Input
                value={customer.shop_name || ''}
                onChange={(e) => handleCustomerChange('shop_name', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                placeholder="Enter shop name"
              />
            </div>
          </div>

          {/* Shop Address */}
          <div className="space-y-4 pt-4 border-t border-[#E8EBF5]">
            <h3 className="font-semibold text-[#092A6D] text-lg">Shop Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">House Number</Label>
                <Input
                  placeholder="e.g., 123, 45/6, 78 Moo 9"
                  value={customer.shop_address.houseNumber}
                  onChange={(e) =>
                    !sameAddress && handleAddressChange('shop_address', 'houseNumber', e.target.value)
                  }
                  disabled={sameAddress}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent disabled:bg-[#F5F7FA]"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-[#333333] font-medium mb-2 block">Country</Label>
                <div className="flex items-center space-x-6 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={customer.shop_address.isThailand}
                      onChange={() =>
                        !sameAddress && handleAddressChange('shop_address', 'isThailand', true)
                      }
                      disabled={sameAddress}
                      className="text-[#D7B55A] focus:ring-[#D7B55A]"
                    />
                    <span className="text-[#333333]">Thailand</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!customer.shop_address.isThailand}
                      onChange={() =>
                        !sameAddress && handleAddressChange('shop_address', 'isThailand', false)
                      }
                      disabled={sameAddress}
                      className="text-[#D7B55A] focus:ring-[#D7B55A]"
                    />
                    <span className="text-[#333333]">Other</span>
                  </label>
                </div>
              </div>

              {customer.shop_address.isThailand ? (
                <>
                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">Province</Label>
                    <Select
                      instanceId={`shop-province-${shopProvinceSelectId}`}
                      value={selectedShopProvince}
                      onChange={(option) => {
                        if (!sameAddress && option) {
                          handleAddressChange('shop_address', 'provinceId', option.value);
                          handleAddressChange('shop_address', 'district', '');
                        }
                      }}
                      options={provinceOptions}
                      isDisabled={sameAddress}
                      isSearchable
                      placeholder="Select province..."
                      noOptionsMessage={() => 'No province found'}
                      className="text-sm"
                      classNames={{
                        control: ({ isDisabled }) =>
                          `rounded-lg border ${isDisabled ? 'bg-[#F5F7FA] border-[#E8EBF5]' : 'bg-white border-[#E8EBF5]'} shadow-sm hover:border-[#D7B55A]`,
                        menu: () => 'rounded-lg border border-[#E8EBF5] bg-white shadow-lg',
                        option: ({ isFocused, isSelected }) =>
                          `px-3 py-2 ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">District</Label>
                    <Select
                      instanceId={`shop-district-${shopDistrictSelectId}`}
                      value={selectedShopDistrict}
                      onChange={(option) => {
                        if (!sameAddress && option) {
                          handleAddressChange('shop_address', 'district', option.value);
                        }
                      }}
                      options={getDistrictOptions(customer.shop_address.provinceId)}
                      isDisabled={sameAddress || !customer.shop_address.provinceId}
                      isSearchable
                      placeholder="Select district..."
                      noOptionsMessage={() => 'No district found'}
                      className="text-sm"
                      classNames={{
                        control: ({ isDisabled }) =>
                          `rounded-lg border ${isDisabled ? 'bg-[#F5F7FA] border-[#E8EBF5]' : 'bg-white border-[#E8EBF5]'} shadow-sm hover:border-[#D7B55A]`,
                        menu: () => 'rounded-lg border border-[#E8EBF5] bg-white shadow-lg',
                        option: ({ isFocused, isSelected }) =>
                          `px-3 py-2 ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="md:col-span-2">
                  <Label className="text-[#333333] font-medium mb-2 block">Province / State / Country</Label>
                  <Input
                    value={customer.shop_address.provinceId}
                    onChange={(e) =>
                      !sameAddress && handleAddressChange('shop_address', 'provinceId', e.target.value)
                    }
                    disabled={sameAddress}
                    className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent disabled:bg-[#F5F7FA]"
                  />
                </div>
              )}

              <Input
                placeholder="Soi"
                value={customer.shop_address.soi}
                onChange={(e) =>
                  !sameAddress && handleAddressChange('shop_address', 'soi', e.target.value)
                }
                disabled={sameAddress}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent disabled:bg-[#F5F7FA]"
              />
              <Input
                placeholder="Road"
                value={customer.shop_address.road}
                onChange={(e) =>
                  !sameAddress && handleAddressChange('shop_address', 'road', e.target.value)
                }
                disabled={sameAddress}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent disabled:bg-[#F5F7FA]"
              />
              <Input
                placeholder="Subdistrict"
                value={customer.shop_address.subdistrict}
                onChange={(e) =>
                  !sameAddress && handleAddressChange('shop_address', 'subdistrict', e.target.value)
                }
                disabled={sameAddress}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent disabled:bg-[#F5F7FA]"
              />
            </div>

            <div className="mt-2 p-3 bg-[#F5F7FA] rounded-lg text-sm border border-[#E8EBF5]">
              <strong className="text-[#092A6D]">Preview:</strong> <span className="text-[#666666]">{formatAddress(customer.shop_address)}</span>
            </div>
          </div>

          {/* Same Address Checkbox */}
          <div className="flex items-start space-x-3 pt-4 border-t border-[#E8EBF5]">
            <Checkbox
              id="same-address"
              checked={sameAddress}
              onCheckedChange={(checked) => {
                if (typeof checked === 'boolean') {
                  setSameAddress(checked);
                }
              }}
              className="border-[#697293] data-[state=checked]:bg-[#D7B55A] data-[state=checked]:border-[#D7B55A]"
            />
            <div>
              <Label htmlFor="same-address" className="text-[#333333] font-medium cursor-pointer">
                Shop address is the same as company address
              </Label>
              <p className="text-xs text-[#666666] mt-1">
                When enabled, shop address fields will be locked and automatically synced
              </p>
            </div>
          </div>

          {/* Company Address */}
          <div className="space-y-4 pt-4 border-t border-[#E8EBF5]">
            <h3 className="font-semibold text-[#092A6D] text-lg">Company Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">House Number</Label>
                <Input
                  placeholder="e.g., 123, 45/6, 78 Moo 9"
                  value={customer.company_address.houseNumber}
                  onChange={(e) => handleAddressChange('company_address', 'houseNumber', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-[#333333] font-medium mb-2 block">ประเทศ</Label>
                <div className="flex items-center space-x-6 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={customer.company_address.isThailand}
                      onChange={() => handleAddressChange('company_address', 'isThailand', true)}
                      className="text-[#D7B55A] focus:ring-[#D7B55A]"
                    />
                    <span className="text-[#333333]">Thailand</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!customer.company_address.isThailand}
                      onChange={() => handleAddressChange('company_address', 'isThailand', false)}
                      className="text-[#D7B55A] focus:ring-[#D7B55A]"
                    />
                    <span className="text-[#333333]">Other</span>
                  </label>
                </div>
              </div>

              {customer.company_address.isThailand ? (
                <>
                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">จังหวัด</Label>
                    <Select
                      instanceId={`company-province-${companyProvinceSelectId}`}
                      value={selectedCompanyProvince}
                      onChange={(option) => {
                        if (option) {
                          handleAddressChange('company_address', 'provinceId', option.value);
                          handleAddressChange('company_address', 'district', '');
                        }
                      }}
                      options={provinceOptions}
                      isSearchable
                      placeholder="Select province..."
                      noOptionsMessage={() => 'No province found'}
                      className="text-sm"
                      classNames={{
                        control: () =>
                          'rounded-lg border border-[#E8EBF5] bg-white shadow-sm hover:border-[#D7B55A]',
                        menu: () => 'rounded-lg border border-[#E8EBF5] bg-white shadow-lg',
                        option: ({ isFocused, isSelected }) =>
                          `px-3 py-2 ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">อำเภอ</Label>
                    <Select
                      instanceId={`company-district-${companyDistrictSelectId}`}
                      value={selectedCompanyDistrict}
                      onChange={(option) => {
                        if (option) {
                          handleAddressChange('company_address', 'district', option.value);
                        }
                      }}
                      options={getDistrictOptions(customer.company_address.provinceId)}
                      isDisabled={!customer.company_address.provinceId}
                      isSearchable
                      placeholder="Select district..."
                      noOptionsMessage={() => 'No district found'}
                      className="text-sm"
                      classNames={{
                        control: ({ isDisabled }) =>
                          `rounded-lg border ${isDisabled ? 'bg-[#F5F7FA] border-[#E8EBF5]' : 'bg-white border-[#E8EBF5]'} shadow-sm hover:border-[#D7B55A]`,
                        menu: () => 'rounded-lg border border-[#E8EBF5] bg-white shadow-lg',
                        option: ({ isFocused, isSelected }) =>
                          `px-3 py-2 ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="md:col-span-2">
                  <Label className="text-[#333333] font-medium mb-2 block">Province / State / Country</Label>
                  <Input
                    value={customer.company_address.provinceId}
                    onChange={(e) => handleAddressChange('company_address', 'provinceId', e.target.value)}
                    className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                  />
                </div>
              )}

              <Input
                placeholder="Soi"
                value={customer.company_address.soi}
                onChange={(e) => handleAddressChange('company_address', 'soi', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
              />
              <Input
                placeholder="Road"
                value={customer.company_address.road}
                onChange={(e) => handleAddressChange('company_address', 'road', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
              />
              <Input
                placeholder="Subdistrict"
                value={customer.company_address.subdistrict}
                onChange={(e) => handleAddressChange('company_address', 'subdistrict', e.target.value)}
                className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
              />
            </div>

            <div className="mt-2 p-3 bg-[#F5F7FA] rounded-lg text-sm border border-[#E8EBF5]">
              <strong className="text-[#092A6D]">ตัวอย่าง:</strong> <span className="text-[#666666]">{formatAddress(customer.company_address)}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 pt-4 border-t border-[#E8EBF5]">
            <h3 className="font-semibold text-[#092A6D] text-lg">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">Contact Person Name *</Label>
                <Input
                  placeholder="Enter contact person name"
                  value={customer.contact_person}
                  onChange={(e) => handleCustomerChange('contact_person', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">Phone Number *</Label>
                <Input
                  placeholder="0812345678"
                  value={customer.phone_number}
                  onChange={(e) => handleCustomerChange('phone_number', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">Email</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={customer.contact_email || ''}
                  onChange={(e) => handleCustomerChange('contact_email', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">Line Name</Label>
                <Input
                  placeholder="@line_id"
                  value={customer.contact_line_name || ''}
                  onChange={(e) => handleCustomerChange('contact_line_name', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div className="space-y-4 pt-4 border-t border-[#E8EBF5]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#092A6D] text-lg">Device</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDeviceRow}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Device
              </Button>
            </div>
            <div className="space-y-3">
              {customer.devices.map((device, index) => {
                const selectedType = DEVICE_TYPE_OPTIONS.find((opt) => opt.value === device.type) || null;
                return (
                  <div
                    key={index}
                    className="relative p-4 border border-[#E8EBF5] rounded-lg bg-[#F5F7FA]"
                  >
                    {/* Delete Button - Top Right */}
                    {customer.devices.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDeviceRow(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}

                    {/* Device Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                      <div>
                        <Label className="text-[#333333] font-medium mb-2 block">Type</Label>
                        <Select
                          instanceId={`device-type-${deviceTypeSelectId}-${index}`}
                          value={selectedType}
                          onChange={(option) =>
                            handleDeviceChange(index, 'type', option?.value || '')
                          }
                          options={DEVICE_TYPE_OPTIONS}
                          placeholder="Select type..."
                          isSearchable
                          className="text-sm"
                          classNames={{
                            control: () =>
                              'rounded-lg border border-[#E8EBF5] bg-white shadow-sm hover:border-[#D7B55A]',
                            menu: () =>
                              'rounded-lg border border-[#E8EBF5] bg-white shadow-lg',
                            option: ({ isFocused, isSelected }) =>
                              `px-3 py-2 ${isSelected
                                ? 'bg-[#092A6D] text-white'
                                : isFocused
                                  ? 'bg-[#E8EBF5] text-[#092A6D]'
                                  : 'text-[#333333]'
                              }`,
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-[#333333] font-medium mb-2 block">
                          Serial Number
                        </Label>
                        <Input
                          value={device.serial}
                          onChange={(e) =>
                            handleDeviceChange(index, 'serial', e.target.value)
                          }
                          className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                          placeholder="Enter serial number"
                        />
                      </div>
                      <div>
                        <Label className="text-[#333333] font-medium mb-2 block">
                          Brand
                        </Label>
                        <Input
                          value={device.brand}
                          onChange={(e) =>
                            handleDeviceChange(index, 'brand', e.target.value)
                          }
                          className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                          placeholder="Enter brand"
                        />
                      </div>
                      <div>
                        <Label className="text-[#333333] font-medium mb-2 block">
                          จำนวน (Quantity)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) =>
                            handleDeviceChange(index, 'quantity', e.target.value)
                          }
                          className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                          placeholder="1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-[#E8EBF5]">
            <Button
              onClick={handleSave}
              className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white font-medium px-8 py-2 rounded-lg transition-all shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
