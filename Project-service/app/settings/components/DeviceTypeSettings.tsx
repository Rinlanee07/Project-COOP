// app/settings/components/DeviceTypeSettings.tsx
'use client';

import { useState, useId } from 'react';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Plus, Trash2, Save } from 'lucide-react';

type DeviceType = {
  id: string;
  type: string;
  serial_number: string;
  brand: string;
};

const DEVICE_TYPE_OPTIONS = [
  { value: 'printer', label: 'Printer' },
  { value: 'buzzer', label: 'Buzzer' },
  { value: 'cash_drawer', label: 'Cash Drawer' },
];

export default function DeviceTypeSettings() {
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([
    { id: Date.now().toString(), type: '', serial_number: '', brand: '' },
  ]);

  const deviceTypeSelectBaseId = useId();

  const handleDeviceTypeChange = (index: number, field: keyof DeviceType, value: string) => {
    setDeviceTypes(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addNewDeviceType = () => {
    setDeviceTypes(prev => [
      ...prev,
      { id: Date.now().toString(), type: '', serial_number: '', brand: '' }
    ]);
  };

  const removeDeviceType = (index: number) => {
    if (deviceTypes.length > 1) {
      setDeviceTypes(prev => prev.filter((_, i) => i !== index));
    } else {
      toast({
        title: 'Cannot Delete',
        description: 'At least 1 device is required',
        variant: 'destructive',
      });
    }
  };

  const handleSave = () => {
    toast({ 
      title: 'Saved Successfully', 
      description: 'Device type information has been saved',
    });
    console.log('Device Types:', deviceTypes);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold">Device Type Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            {deviceTypes.map((device, index) => (
              <div 
                key={device.id} 
                className="border border-[#E8EBF5] p-5 rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#092A6D] text-lg">Device #{index + 1}</h4>
                  {deviceTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDeviceType(index)}
                      className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">Type</Label>
                    <Select
                      instanceId={`device-type-${index}-${deviceTypeSelectBaseId}`}
                      value={DEVICE_TYPE_OPTIONS.find((opt) => opt.value === device.type)}
                      onChange={(option) =>
                        handleDeviceTypeChange(index, 'type', option?.value || '')
                      }
                      options={DEVICE_TYPE_OPTIONS}
                      placeholder="Select type..."
                      isSearchable
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
                    <Label className="text-[#333333] font-medium mb-2 block">Serial Number</Label>
                    <Input
                      placeholder="S/N"
                      value={device.serial_number}
                      onChange={(e) => handleDeviceTypeChange(index, 'serial_number', e.target.value)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <Label className="text-[#333333] font-medium mb-2 block">Brand</Label>
                    <Input
                      placeholder="Brand"
                      value={device.brand}
                      onChange={(e) => handleDeviceTypeChange(index, 'brand', e.target.value)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-[#E8EBF5]">
            <Button
              type="button"
              variant="outline"
              onClick={addNewDeviceType}
              className="border-[#092A6D] text-[#092A6D] hover:bg-[#E8EBF5] hover:text-[#092A6D]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Device
            </Button>
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

