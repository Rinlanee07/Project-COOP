// types/device.ts
export interface Device {
  device_id: string;
  serial_number?: string | null;
  installation_location?: string | null;
  warranty_end_date?: string | null;
  device_type_id?: string | null;
  DeviceType?: {
    id: string;
    device_type: string;
    brand: string;
    model: string;
  };
}