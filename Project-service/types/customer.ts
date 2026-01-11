// types/customer.ts
export interface Customer {
  customer_id: string;
  customer_name: string;
  contact_email?: string | null;
  phone_number: string;
  contact_tel?: string | null;
  contact_line_id?: string | null;
  address?: string | null;
  company_name?: string | null;
  company_address?: string | null;
  shop_name?: string | null;
  shop_address?: string | null;
  is_active: boolean;
}