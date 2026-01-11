// lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// ✅ ใช้ interface ตาม Prisma model
export interface Customer {
  customer_id: string;
  customer_name: string;
  company_name?: string | null;
  contact_person: string;
  phone_number: string;
  contact_tel?: string | null;
  contact_email?: string | null;
  contact_line_id?: string | null;
  address?: string | null;
  company_address?: string | null;
  shop_name?: string | null;
  shop_address?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Device {
  device_id: string;
  serial_number?: string | null;
  installation_location?: string | null;
  warranty_end_date?: string | null; // ISO date string
  created_at: string;
  updated_at: string;
  device_type_id?: string | null;
}

export interface Ticket {
  ticket_id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: string;
  updated_at: string;
  customer_id: string;
  device_id?: string | null;
  reporter_id?: string | null;
  assigned_to?: string | null;
  Customer?: Customer;
  Device?: Device;
}

// User interface (ตาม Prisma)
export interface User {
  user_id: string;
  username: string;
  email: string;
  user_role: 'MEMBER' | 'SHOP_OWNER' | 'TECHNICIAN' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

// ========= Settings =========
export interface SettingData {
  customer_id: string;
  customer_name: string;
  shop_name: string | null;
  shop_address: string; // JSON string of AddressFields
  company_name: string | null;
  company_address: string; // JSON string of AddressFields
  phone_number: string;
  contact_email: string | null;
  contact_line_name: string | null;
}

export interface SettingResponse {
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const isFormData = options.body instanceof FormData;
    const headers = {
      ...(isFormData ? {} : defaultHeaders),
      ...(options.headers as Record<string, string> | undefined),
    };

    const config: RequestInit = { ...options, headers };

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json()
        : null;

      if (!response.ok) {
        return {
          error: data?.error || data?.message || `HTTP ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // === Auth ===
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile(token: string): Promise<ApiResponse<User>> {
    return this.request('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // === Tickets ===
  async getTickets(
    token: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<ApiResponse<Ticket[]>> {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);

    return this.request(`/tickets?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ✅ สร้าง ticket ใหม่ — ตรงกับ Prisma
  async createRepairRequest(
    token: string,
    payload: {
      subject: string;
      description: string;
      customer_id: string;
      device_id?: string; // optional
      priority?: 'Low' | 'Medium' | 'High';
    }
  ): Promise<ApiResponse<{ ticket_id: string }>> {
    return this.request('/tickets', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
  }

  // === Customers ===
  async getCustomers(token: string): Promise<ApiResponse<Customer[]>> {
    return this.request('/customers', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // === Devices ===
  async getDeviceBySerial(token: string, serial: string): Promise<ApiResponse<Device | null>> {
    return this.request(`/devices/serial/${encodeURIComponent(serial)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // === Upload (keep if needed) ===
  async uploadFile(token: string, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.request('/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  }

  // === Settings ===
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
  //   NEXTAUTH_URL=http://localhost:3001
  //     //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password: password // Changed to match schema
      //   }),
      // });

  async getSettings(token: string): Promise<ApiResponse<SettingData>> {
    return this.request('http://localhost:3001/settings', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async saveSettings(token: string, data: SettingData): Promise<ApiResponse<SettingResponse>> {
    return this.request('/settings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;