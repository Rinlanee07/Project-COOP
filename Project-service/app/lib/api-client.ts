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

export interface DeviceType {
  id: string;
  device_type: string;
  brand: string;
  model: string;
}

export interface Device {
  device_id: string;
  serial_number?: string | null;
  installation_location?: string | null;
  warranty_end_date?: string | null;
  created_at: string;
  updated_at: string;
  device_type_id?: string | null;
  DeviceType?: DeviceType;
  brand?: string; // Optional fallback/flattened
  model?: string; // Optional fallback/flattened
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
    // Log configuration on initialization (only in development)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[ApiClient] Initialized with baseURL:', this.baseURL);
      if (this.baseURL === '/api') {
        console.log('[ApiClient] Using Next.js proxy - requests will be forwarded to http://localhost:3001');
      } else {
        console.log('[ApiClient] Using direct backend URL');
      }
    }
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
      // Log request details (hide token for security)
      const logHeaders = { ...headers };
      if (logHeaders['Authorization']) {
        logHeaders['Authorization'] = 'Bearer ***';
      }
      console.log('[ApiClient] Making request:', { 
        method: options.method || 'GET', 
        url, 
        endpoint,
        baseURL: this.baseURL,
        hasAuth: !!headers['Authorization']
      });
      
      const response = await fetch(url, config);
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : null;

      if (!response.ok) {
        const errorMessage = data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('[ApiClient] Request failed:', { 
          url, 
          status: response.status, 
          statusText: response.statusText,
          error: errorMessage,
          hasAuth: !!headers['Authorization'],
          responseData: data
        });
        
        // If 401 Unauthorized, clear token and suggest re-login
        if (response.status === 401 && typeof window !== 'undefined') {
          console.warn('[ApiClient] 401 Unauthorized - Token may be expired or invalid');
          console.warn('[ApiClient] Clearing token and user data from localStorage');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        
        return {
          error: errorMessage,
        };
      }

      return { data };
    } catch (error) {
      // Provide more detailed error messages
      let errorMessage = 'Network error';
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Determine if we're using proxy or direct connection
        const isUsingProxy = this.baseURL === '/api' || this.baseURL.startsWith('/api');
        if (isUsingProxy) {
          errorMessage = `Failed to connect to API via proxy. Please ensure:
1. The backend server is running on port 3001
2. Next.js rewrite is configured correctly in next.config.mjs
3. The backend is accessible at http://localhost:3001`;
        } else {
          errorMessage = `Failed to connect to API at ${this.baseURL}. Please ensure the backend server is running.`;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      console.error('[ApiClient] Request exception:', { 
        baseURL: this.baseURL,
        url, 
        endpoint,
        error: errorMessage,
        originalError: error instanceof Error ? error.message : String(error)
      });
      
      return {
        error: errorMessage,
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

  async updateProfile(token: string, data: Partial<User> & { password?: string }): Promise<ApiResponse<any>> {
    return this.request('/auth/profile', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
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

  async getTicket(token: string, id: string): Promise<ApiResponse<Ticket>> {
    return this.request(`/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Updated to support files (FormData)
  async createRepairTicket(token: string, data: any): Promise<ApiResponse<Ticket>> {
    const isFormData = data instanceof FormData;
    return this.request('/tickets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' })
      },
      body: isFormData ? data : JSON.stringify(data)
    });
  }

  // === Borrows ===
  async createBorrow(
    token: string,
    payload: {
      device_id: string;
      borrower_name: string;
      contact_info?: string;
      due_date: string;
      deposit_amount?: number;
      notes?: string;
    }
  ): Promise<ApiResponse<any>> {
    return this.request('/borrows', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
  }

  async getBorrows(token: string, status?: string): Promise<ApiResponse<any[]>> {
    const q = status ? `?status=${status}` : '';
    return this.request(`/borrows${q}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async returnBorrow(token: string, id: string, payload: {
    status: 'RETURNED' | 'LOST' | 'DAMAGED'; // Fixed type
    notes?: string;
  }): Promise<ApiResponse<any>> {
    return this.request(`/borrows/${id}/return`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
  }

  // === Customers ===
  async getCustomers(token: string): Promise<ApiResponse<Customer[]>> {
    return this.request('/customers', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createCustomer(token: string, data: Partial<Customer> & { devices?: any[] }): Promise<ApiResponse<Customer>> {
    return this.request('/customers', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  }

  async updateCustomer(token: string, id: string, data: Partial<Customer> & { devices?: any[] }): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  }

  async getCustomer(token: string, id: string): Promise<ApiResponse<Customer & { Cust_Devices: { Device: Device }[] }>> {
    return this.request(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // === Devices ===
  async getDeviceBySerial(token: string, serial: string): Promise<ApiResponse<Device | null>> {
    return this.request(`/devices/serial/${encodeURIComponent(serial)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getDevices(token: string): Promise<ApiResponse<Device[]>> {
    return this.request('/devices', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getDeviceTypes(token: string): Promise<ApiResponse<DeviceType[]>> {
    return this.request('/devices/types', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getAssignees(token: string): Promise<ApiResponse<User[]>> {
    // Assuming endpoint exists or filter users
    return this.request('/users?role=TECHNICIAN', {
      headers: { Authorization: `Bearer ${token}` }
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
  async getSettings(token: string): Promise<ApiResponse<SettingData>> {
    return this.request('/settings', {
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

  // === Repair Logs ===
  async getRepairLogs(token: string, ticketId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/repair-logs/ticket/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async createRepairLog(token: string, payload: {
    ticket_id: string;
    action_taken: string;
    parts_used?: string;
    cost?: number;
  }): Promise<ApiResponse<any>> {
    return this.request('/repair-logs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
  }
  async get<T>(path: string): Promise<T> {
    // Note: The existing request method returns ApiResponse<T>, but the usage expects just T or something else.
    // The usage is: const data = await apiClient.get<any[]>("/customers");
    // If we look at other methods, they return ApiResponse<T>.
    // But the component expects `data`.
    // In `page.tsx`: const data = await apiClient.get<any[]>("/customers");
    // setCustomers(data);
    // If `get` returns `ApiResponse`, then `data` would be `{ data: [...] }`.
    // But `setCustomers(data)` implies `data` is the array.
    // So `get` should probably just return the data directly OR the component usage is wrong.
    // Let's check `fetchCustomers` in `page.tsx`.
    // `const data = await apiClient.get<any[]>("/customers"); setCustomers(data);`
    // This implies `get` returns the data array directly.
    // However, existing methods like `getCustomers` return `ApiResponse`.

    // Let's follow the pattern of `request`.
    // Wait, the usage in `page.tsx` might be assuming a different `apiClient` or just wrote it quickly.
    // I will implement `get` to return `T` (the data) to match the usage.

    const res = await this.request<T>(path);
    if (res.error) throw new Error(res.error);
    return res.data as T;
  }
}

export const apiClient = new ApiClient();
export default apiClient;