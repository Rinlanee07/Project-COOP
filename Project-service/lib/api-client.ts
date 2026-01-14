// types for api client
import type { Ticket, CreateTicketRequest, UpdateTicketStatusRequest, TicketResponse, TicketFilters } from '../types/ticket';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTickets(token: string, filters?: TicketFilters): Promise<ApiResponse<Ticket[]>> {
    try {
      let url = `${this.baseUrl}/tickets`;
      const queryParams = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return { error: 'Failed to fetch tickets' };
    }
  }

  async createTicket(token: string, data: CreateTicketRequest): Promise<ApiResponse<Ticket>> {
    try {
      const response = await fetch(`${this.baseUrl}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return { error: 'Failed to create ticket' };
    }
  }

  async createRepairTicket(token: string, formData: FormData): Promise<ApiResponse<Ticket>> {
    try {
      const response = await fetch(`${this.baseUrl}/tickets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error creating repair ticket:', error);
      return { error: 'Failed to create repair ticket' };
    }
  }

  async updateTicketStatus(token: string, ticketId: string, data: UpdateTicketStatusRequest): Promise<ApiResponse<Ticket>> {
    try {
      const response = await fetch(`${this.baseUrl}/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error updating ticket:', error);
      return { error: 'Failed to update ticket' };
    }
  }

  async getTicketById(token: string, ticketId: string): Promise<ApiResponse<Ticket>> {
    try {
      const response = await fetch(`${this.baseUrl}/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        if (response.status === 401) {
          errorMessage = 'Unauthorized - Please login again';
        } else if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
        }
        
        return { error: errorMessage };
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error fetching ticket:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch ticket';
      return { error: errorMessage };
    }
  }

  async assignTicket(token: string, ticketId: string, assigneeId: string): Promise<ApiResponse<Ticket>> {
    try {
      const response = await fetch(`${this.baseUrl}/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignee_id: assigneeId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error assigning ticket:', error);
      return { error: 'Failed to assign ticket' };
    }
  }
  async getTicket(token: string, ticketId: string): Promise<ApiResponse<Ticket>> {
    return this.getTicketById(token, ticketId);
  }

  async createRepairLog(token: string, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/repair-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const log = await response.json();
      return { data: log };
    } catch (error) {
      console.error('Error creating repair log:', error);
      return { error: 'Failed to create repair log' };
    }
  }

  async getDeviceTypes(token: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/devices/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const types = await response.json();
      return { data: types };
    } catch (error) {
      console.error('Error fetching device types:', error);
      return { error: 'Failed to fetch device types' };
    }
  }

  async getCustomer(token: string, id: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const customer = await response.json();
      return { data: customer };
    } catch (error) {
      console.error('Error fetching customer:', error);
      return { error: 'Failed to fetch customer' };
    }
  }

  async createCustomer(token: string, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const customer = await response.json();
      return { data: customer };
    } catch (error) {
      console.error('Error creating customer:', error);
      return { error: 'Failed to create customer' };
    }
  }
  async fetchGet<T>(path: string): Promise<T> {
    const headers: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
}

// Backend runs on port 3002 by default (see backend/src/main.ts)
// Use environment variable or default to backend port
export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');