// Repair service - uses real API calls
import { apiClient } from '@/lib/api-client';

export interface RepairDetail {
  repairRequest: {
    id: number;
    ticketId: string;
    printerModel: string;
    serialNumber: string;
    status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    description?: string;
    accessories?: string;
    remark?: string;
    sentBy?: string;
    receivedBy?: string;
    engineerComment?: string;
    purchaseDate?: string | Date | null;
    isChargeable?: boolean;
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
      taxId?: string;
      contactPerson?: string;
    };
    images?: Array<{ url: string }>;
  };
  parts: Array<{
    partName: string;
    partNumber?: string;
    quantity: number;
    price: number;
  }>;
  technician?: {
    name: string;
  };
  repairLogs?: Array<{
    repairDate: string | Date;
    comment?: string;
  }>;
}

export interface RepairListItem {
  id: number;
  printerModel: string;
  serialNumber: string;
  status: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  customerName?: string;
  assignedTo?: string;
  assignedGroup?: string;
  createdAt?: string;
  createdAgo?: string;
  dueDate?: string;
  dueIn?: string;
  firstResponseDue?: string;
  resolvedAt?: string;
  inProgressFor?: string;
}

// Mock data
const mockRepairs: RepairListItem[] = [
  {
    id: 6544,
    printerModel: 'Epson TM-T88VI',
    serialNumber: 'SN123456789',
    status: 'New',
    priority: 'Low',
    customerName: 'KruaThai-Saknarin',
    assignedTo: 'customer service (Orm Thong)',
    assignedGroup: 'Customer Service',
    createdAt: '2024-01-15',
    createdAgo: '10 minutes ago',
    firstResponseDue: 'an hour',
    dueDate: '2024-02-15',
    dueIn: '5 days',
  },
  {
    id: 6543,
    printerModel: 'HP LaserJet Pro',
    serialNumber: 'HP-ABC123',
    status: 'Pending',
    priority: 'Low',
    customerName: 'LismCafe',
    assignedTo: 'customer service (Orm Thong)',
    assignedGroup: 'Customer Service',
    createdAt: '2024-01-14',
    createdAgo: '3 hours ago',
    dueDate: '2024-02-14',
    dueIn: '5 days',
  },
  {
    id: 6542,
    printerModel: 'Canon PIXMA TS3300',
    serialNumber: 'CN-X9Y8Z7',
    status: 'Closed',
    priority: 'Medium',
    customerName: 'ประยุทธ์ ทำงาน',
    assignedTo: 'Phoenix',
    assignedGroup: 'Development',
    createdAt: '2024-01-10',
    createdAgo: '2 days ago',
    resolvedAt: '2024-01-12',
    dueDate: '2024-01-15',
  },
  {
    id: 6541,
    printerModel: 'Brother HL-L2300D',
    serialNumber: 'BR-778899',
    status: 'In Progress',
    priority: 'High',
    customerName: 'TechShop Co.',
    assignedTo: 'Development Team',
    assignedGroup: 'Development',
    createdAt: '2024-01-13',
    createdAgo: '1 day ago',
    inProgressFor: '20 hours',
    dueDate: '2024-01-20',
    dueIn: '7 days',
  },
  {
    id: 6540,
    printerModel: 'Samsung Galaxy Tab A',
    serialNumber: 'SM-TAB123',
    status: 'New',
    priority: 'Medium',
    customerName: 'ABC Electronics',
    assignedTo: 'customer service (Orm Thong)',
    assignedGroup: 'Customer Service',
    createdAt: '2024-01-12',
    createdAgo: '2 days ago',
    firstResponseDue: '2 hours',
    dueDate: '2024-02-12',
    dueIn: '30 days',
  },
  {
    id: 6539,
    printerModel: 'Epson L3210',
    serialNumber: 'EP987654321',
    status: 'Closed',
    priority: 'Low',
    customerName: 'QuickFix Shop',
    assignedTo: 'Phoenix',
    assignedGroup: 'Development',
    createdAt: '2024-01-08',
    createdAgo: '5 days ago',
    resolvedAt: '2024-01-10',
    dueDate: '2024-01-15',
  },
];

const mockRepairDetails: Record<number, RepairDetail> = {
  6544: {
    repairRequest: {
      id: 6544,
      ticketId: 'T6544',
      printerModel: 'Epson TM-T88VI',
      serialNumber: 'SN123456789',
      status: 'New',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      customer: {
        name: 'KruaThai-Saknarin',
        phone: '081-234-5678',
        email: 'kruathai@example.com',
        address: '123 ถนนสุขุมวิท, แขวงคลองเตย, เขตคลองเตย, กรุงเทพมหานคร',
      },
      images: [
        { url: 'https://placehold.co/300x200?text=Image+1' },
        { url: 'https://placehold.co/300x200?text=Image+2' },
      ],
    },
    parts: [
      { partName: 'หัวพิมพ์', quantity: 1, price: 1200 },
      { partName: 'มอเตอร์ป้อนกระดาษ', quantity: 2, price: 450 },
    ],
    technician: { name: 'customer service (Orm Thong)' },
  },
  6543: {
    repairRequest: {
      id: 6543,
      ticketId: 'T6543',
      printerModel: 'HP LaserJet Pro',
      serialNumber: 'HP-ABC123',
      status: 'Pending',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      customer: {
        name: 'LismCafe',
        phone: '082-345-6789',
        email: 'lismcafe@example.com',
        address: '456 ถนนพหลโยธิน, แขวงจตุจักร, เขตจตุจักร, กรุงเทพมหานคร',
      },
    },
    parts: [],
    technician: { name: 'customer service (Orm Thong)' },
  },
  6542: {
    repairRequest: {
      id: 6542,
      ticketId: 'T6542',
      printerModel: 'Canon PIXMA TS3300',
      serialNumber: 'CN-X9Y8Z7',
      status: 'Closed',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      customer: {
        name: 'ประยุทธ์ ทำงาน',
        phone: '083-456-7890',
        email: 'prayut@example.com',
        address: '789 ถนนรัชดาภิเษก, แขวงห้วยขวาง, เขตห้วยขวาง, กรุงเทพมหานคร',
      },
    },
    parts: [],
    technician: { name: 'Phoenix' },
  },
  6541: {
    repairRequest: {
      id: 6541,
      ticketId: 'T6541',
      printerModel: 'Brother HL-L2300D',
      serialNumber: 'BR-778899',
      status: 'In Progress',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
      customer: {
        name: 'TechShop Co.',
        phone: '084-567-8901',
        email: 'techshop@example.com',
        address: '321 ถนนสีลม, แขวงสีลม, เขตบางรัก, กรุงเทพมหานคร',
      },
    },
    parts: [],
    technician: { name: 'Development Team' },
  },
};

// ============================================
// REPAIR SERVICE - Ready for Backend API
// ============================================
// This service can be easily switched to real API by:
// 1. Replace mock data with actual API calls
// 2. Update baseURL in apiClient
// 3. Keep the same interface/return types

// Using real API - no mock data
const USE_MOCK_DATA = false;

// Helper function to safely format date to ISO string
function safeToISOString(dateValue: string | Date | null | undefined): string | undefined {
  if (!dateValue) return undefined;
  try {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) return undefined;
    return date.toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

// Helper function to calculate time ago
function getTimeAgo(dateString: string | Date | null | undefined): string {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  } catch {
    return '';
  }
}

export const repairService = {
  // Get all repair requests
  async getAll(): Promise<{ success: boolean; data: RepairListItem[]; message?: string }> {
    if (USE_MOCK_DATA) {
      console.log('[RepairService] Using MOCK data - getAll()');
      console.log('[RepairService] Mock repairs count:', mockRepairs.length);
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        success: true,
        data: mockRepairs,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    }

    try {
      console.log('[RepairService] Calling real API - GET /tickets');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[RepairService] No token found');
        return { success: false, data: [], message: 'No authentication token' };
      }

      const result = await apiClient.getTickets(token);
      
      if (result.error) {
        console.error('[RepairService] API Error:', result.error);
        // Provide more user-friendly error messages
        let userMessage = result.error;
        if (result.error.includes('Failed to connect') || result.error.includes('Failed to fetch')) {
          userMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่หรือไม่';
        } else if (result.error.includes('Unauthorized') || result.error.includes('401')) {
          userMessage = 'กรุณาเข้าสู่ระบบอีกครั้ง';
        }
        return { success: false, data: [], message: userMessage };
      }

      if (!result.data) {
        return { success: false, data: [], message: 'No data returned' };
      }

      // Transform Ticket[] to RepairListItem[]
      const repairs: RepairListItem[] = result.data.map((ticket: any) => ({
        id: parseInt(ticket.ticket_id?.replace('T', '') || '0') || 0,
        printerModel: ticket.Device?.DeviceType 
          ? `${ticket.Device.DeviceType.brand} ${ticket.Device.DeviceType.model}` 
          : ticket.Device?.serial_number || 'Unknown Device',
        serialNumber: ticket.Device?.serial_number || '-',
        status: ticket.status || 'New',
        priority: ticket.priority || 'Medium',
        customerName: ticket.Customer?.customer_name || '-',
        assignedTo: '-', // assigned_to is user_id string, not populated in getTickets
        createdAt: safeToISOString(ticket.created_at),
        createdAgo: getTimeAgo(ticket.created_at),
        dueDate: safeToISOString(ticket.updated_at),
      }));

      console.log('[RepairService] Transformed repairs:', repairs.length);
      
      return {
        success: true,
        data: repairs,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    } catch (error) {
      console.error('[RepairService] Exception:', error);
      let errorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูล';
      if (error instanceof Error) {
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่หรือไม่';
        } else {
          errorMessage = error.message;
        }
      }
      return {
        success: false,
        data: [],
        message: errorMessage,
      };
    }
  },

  // Get repair detail by ID
  async getById(id: number): Promise<{ success: boolean; data?: RepairDetail; error?: string }> {
    if (USE_MOCK_DATA) {
      console.log('[RepairService] Using MOCK data - getById()', id);
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const detail = mockRepairDetails[id];
      console.log('[RepairService] Mock detail found:', !!detail);
      
      if (!detail) {
        console.warn('[RepairService] Repair not found:', id);
        return {
          success: false,
          error: 'ไม่พบข้อมูลงานซ่อม',
        };
      }
      
      return {
        success: true,
        data: detail,
      };
    }

    try {
      console.log('[RepairService] Calling real API - GET /tickets/' + id);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[RepairService] No token found');
        return { success: false, error: 'Unauthorized - กรุณาเข้าสู่ระบบอีกครั้ง' };
      }
      
      console.log('[RepairService] Token found, length:', token.length);
      console.log('[RepairService] Token preview:', token.substring(0, 20) + '...');

      // Try to find ticket by numeric ID
      // First, get all tickets and find the one matching the numeric ID
      console.log('[RepairService] Step 1: Fetching all tickets...');
      const allTicketsResult = await apiClient.getTickets(token);
      
      if (allTicketsResult.error || !allTicketsResult.data) {
        console.error('[RepairService] Failed to fetch tickets list:', allTicketsResult.error);
        // If unauthorized, return specific error
        if (allTicketsResult.error?.includes('Unauthorized') || allTicketsResult.error?.includes('401')) {
          // Clear token and redirect
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          return { success: false, error: 'Unauthorized - กรุณาเข้าสู่ระบบอีกครั้ง' };
        }
        return { success: false, error: allTicketsResult.error || 'Failed to fetch tickets' };
      }

      console.log('[RepairService] Step 1 success: Found', allTicketsResult.data.length, 'tickets');

      // Find ticket where numeric ID matches
      const foundTicket = allTicketsResult.data.find((t: any) => {
        const ticketNumericId = parseInt(t.ticket_id?.replace('T', '') || '0');
        return ticketNumericId === id;
      });

      if (!foundTicket) {
        console.warn('[RepairService] Ticket not found with ID:', id);
        return { success: false, error: 'ไม่พบข้อมูลงานซ่อม' };
      }

      console.log('[RepairService] Step 2: Found ticket:', foundTicket.ticket_id);
      console.log('[RepairService] Step 3: Fetching full ticket details...');

      // Re-fetch token to ensure it's still valid
      const currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : token;
      if (!currentToken) {
        console.error('[RepairService] Token lost during request');
        return { success: false, error: 'Unauthorized - กรุณาเข้าสู่ระบบอีกครั้ง' };
      }

      // Now get full ticket details using ticket_id
      const result = await apiClient.getTicket(currentToken, foundTicket.ticket_id);
      
      if (result.error) {
        console.error('[RepairService] API Error:', result.error);
        // If unauthorized, return specific error
        if (result.error.includes('Unauthorized') || result.error.includes('401')) {
          return { success: false, error: 'Unauthorized - กรุณาเข้าสู่ระบบอีกครั้ง' };
        }
        return { success: false, error: result.error };
      }

      if (!result.data) {
        return { success: false, error: 'ไม่พบข้อมูลงานซ่อม' };
      }

      const ticket = result.data as any; // API returns extended Ticket with relations
      
      // Get latest repair log for repair date
      const latestRepairLog = ticket.RepairLogs && ticket.RepairLogs.length > 0 
        ? ticket.RepairLogs[0] 
        : null;

      // Transform Ticket to RepairDetail
      const repairDetail: RepairDetail = {
        repairRequest: {
          id: parseInt(ticket.ticket_id?.replace('T', '') || String(id)) || id,
          ticketId: ticket.ticket_id || '',
          printerModel: ticket.Device?.DeviceType 
            ? `${ticket.Device.DeviceType.brand} ${ticket.Device.DeviceType.model}` 
            : ticket.Device?.serial_number || 'Unknown Device',
          serialNumber: ticket.Device?.serial_number || '-',
          status: ticket.status || 'New',
          createdAt: ticket.created_at || new Date(),
          updatedAt: ticket.updated_at || new Date(),
          description: ticket.description || '',
          accessories: ticket.accessories || '',
          remark: ticket.remark || '',
          sentBy: ticket.sent_by || '',
          receivedBy: ticket.received_by || '',
          engineerComment: ticket.engineer_comment || '',
          purchaseDate: ticket.purchase_date || null,
          isChargeable: ticket.is_chargeable || false,
          customer: {
            name: ticket.Customer?.customer_name || '-',
            phone: ticket.Customer?.phone_number || '-',
            email: ticket.Customer?.contact_email || '-',
            taxId: ticket.Customer?.tax_id || '',
            contactPerson: ticket.Customer?.contact_person || '',
            address: (() => {
              // Try to parse JSON address or use string directly
              const addr = ticket.Customer?.shop_address || ticket.Customer?.company_address || ticket.Customer?.address;
              if (!addr) return '-';
              try {
                const parsed = typeof addr === 'string' ? JSON.parse(addr) : addr;
                if (typeof parsed === 'object') {
                  // Format address object
                  const parts = [];
                  if (parsed.houseNumber) parts.push(`${parsed.houseNumber}`);
                  if (parsed.soi) parts.push(`ซอย${parsed.soi}`);
                  if (parsed.road) parts.push(`ถนน${parsed.road}`);
                  if (parsed.subdistrict) parts.push(`แขวง${parsed.subdistrict}`);
                  if (parsed.district) parts.push(`เขต${parsed.district}`);
                  if (parsed.provinceId) {
                    // Try to get province name from common provinces
                    const provinceMap: Record<string, string> = {
                      'bangkok': 'กรุงเทพมหานคร',
                      'nonthaburi': 'นนทบุรี',
                    };
                    parts.push(provinceMap[parsed.provinceId] || parsed.provinceId);
                  }
                  return parts.join(' ') || '-';
                }
                return addr;
              } catch {
                return typeof addr === 'string' ? addr : '-';
              }
            })(),
          },
          images: ticket.Attachments?.map((att: any) => ({ url: att.file_url })) || [],
        },
        parts: (ticket.TicketParts || []).map((part: any) => ({
          partName: part.description || '-',
          partNumber: part.part_number || '',
          quantity: part.quantity || 1,
          price: 0, // Price not available in TicketPart model
        })),
        technician: ticket.assignee ? { name: ticket.assignee.username } : undefined,
        repairLogs: ticket.RepairLogs?.map((log: any) => ({
          repairDate: log.repair_date || new Date(),
          comment: log.action_taken || '',
        })) || [],
      };

      console.log('[RepairService] Transformed repair detail:', repairDetail);
      
      return {
        success: true,
        data: repairDetail,
      };
    } catch (error) {
      console.error('[RepairService] Exception:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },
};

