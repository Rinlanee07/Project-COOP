// types/ticket.ts

import type { Customer } from './customer';
import type { Device } from './device';

// ========== Enums / Union Types ==========
export type TicketStatus = 'New' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type UpdateType = 'Status' | 'Comment' | 'Assignment';

// ========== Ticket Update ==========
export interface TicketUpdate {
  update_id: number; // BigInt → number (safe for UI)
  update_type: UpdateType;
  update_detail?: string | null;
  new_status?: TicketStatus | null;
  updated_at: string; // ISO string
  updated_by: string; // user_id
  User: {
    user_id: string;
    username: string;
    user_role: string;
  };
}

// ========== Main Ticket ==========
export interface Ticket {
  ticket_id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  customer_id: string;
  device_id?: string | null;
  reporter_id?: string | null;
  assigned_to?: string | null;

  // New fields
  sent_by?: string | null;
  received_by?: string | null;
  engineer_comment?: string | null;
  accessories?: string | null;
  remark?: string | null;

  // Relations (optional, depending on API include)
  Customer?: Customer | null;
  Device?: Device | null;
  Updates?: TicketUpdate[];
}

// ========== API Request Payloads ==========
export interface CreateTicketRequest {
  subject: string;
  description: string;
  priority?: TicketPriority;
  customer_id: string;
  device_id?: string;
  // New fields
  sent_by?: string;
  received_by?: string;
  engineer_comment?: string;
  accessories?: string;
  remark?: string;
  parts?: Array<{
    part_number?: string;
    description: string;
    quantity: number;
  }>;
}

export interface UpdateTicketStatusRequest {
  status: TicketStatus;
  update_detail?: string;
}

// ========== API Responses ==========
export interface TicketResponse {
  ticket_id: string;
  message?: string;
}

// ========== Query Filters ==========
export interface TicketFilters {
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  status?: TicketStatus;
  priority?: TicketPriority;
}

// ========== Dashboard KPI ==========
export type TicketCounts = Record<TicketStatus, number>;