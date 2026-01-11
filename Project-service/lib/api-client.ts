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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return { data: ticket };
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return { error: 'Failed to fetch ticket' };
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
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');