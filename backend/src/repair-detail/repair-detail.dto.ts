// src/repair-detail/dto/repair-detail.dto.ts
export class CustomerDto {
  customer_id: string;
  customer_name: string;
  company_name?: string;
  phone_number: string;
  contact_email?: string;
  address?: string;
  company_address?: string;
}

export class DeviceTypeDto {
  id: string;
  device_type: string;
  brand: string;
  model: string;
}

export class DeviceDto {
  device_id: string;
  serial_number?: string;
  installation_location?: string;
  warranty_end_date?: Date;
  DeviceType?: DeviceTypeDto;
}

export class TechnicianDto {
  user_id: string;
  username: string;
  email: string;
}

export class TicketUpdateDto {
  update_id: bigint;
  update_type: string;
  update_detail?: string;
  new_status?: string;
  updated_at: Date;
  User: {
    user_id: string;
    username: string;
    email: string;
  };
}

export class TicketDetailDto {
  ticket_id: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  customer: CustomerDto;
  device?: DeviceDto;
  technician?: TechnicianDto;
  updates: TicketUpdateDto[];
  created_at: Date;
  updated_at: Date;
}