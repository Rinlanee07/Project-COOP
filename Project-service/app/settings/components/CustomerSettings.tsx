// app/settings/components/CustomerSettings.tsx
'use client';

import { useState, useEffect, useMemo, useCallback, useId } from 'react';
import Select from 'react-select';
import { THAI_PROVINCES, PROVINCE_MAP } from '../../../../backend/src/lib/thaiAddresses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

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
  shop_address: AddressFields;
  company_name: string | null;
  company_address: AddressFields;
  phone_number: string;
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

export default function CustomerSettings() {
  const [customer, setCustomer] = useState<CustomerData>({
    customer_id: '',
    customer_name: '',
    shop_name: '',
    shop_address: { ...emptyAddress },
    company_name: '',
    company_address: { ...emptyAddress },
    phone_number: '',
    contact_email: '',
    contact_line_name: '',
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const shopProvinceSelectId = useId();
  const shopDistrictSelectId = useId();
  const companyProvinceSelectId = useId();
  const companyDistrictSelectId = useId();

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

  useEffect(() => {
    if (sameAddress) {
      setCustomer((prev) => ({ ...prev, shop_address: { ...prev.company_address } }));
    }
  }, [sameAddress, customer.company_address]);

  const handleCustomerChange = (field: keyof CustomerData, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (
    type: 'shop_address' | 'company_address',
    field: keyof AddressFields,
    value: string | boolean
  ) => {
    setCustomer((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSave = () => {
    toast({ 
      title: 'Saved Successfully', 
      description: 'Customer information has been saved',
    });
    console.log('Customer:', customer);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-[#333333] font-medium mb-2 block">Phone Number</Label>
                <Input
                  placeholder="0812345678"
                  value={customer.phone_number}
                  onChange={(e) => handleCustomerChange('phone_number', e.target.value)}
                  className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
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

