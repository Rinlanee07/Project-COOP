// Mock service for repair details
// This can be easily replaced with real API calls later

export interface RepairDetail {
  repairRequest: {
    id: number;
    printerModel: string;
    serialNumber: string;
    status: string;
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
    };
    images?: Array<{ url: string }>;
  };
  parts: Array<{
    partName: string;
    quantity: number;
    price: number;
  }>;
  technician?: {
    name: string;
  };
}

export interface RepairListItem {
  id: number;
  printerModel: string;
  serialNumber: string;
  status: string;
  priority?: 'Low' | 'Medium' | 'High';
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
      printerModel: 'Epson TM-T88VI',
      serialNumber: 'SN123456789',
      status: 'New',
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
      printerModel: 'HP LaserJet Pro',
      serialNumber: 'HP-ABC123',
      status: 'Pending',
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
      printerModel: 'Canon PIXMA TS3300',
      serialNumber: 'CN-X9Y8Z7',
      status: 'Closed',
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
      printerModel: 'Brother HL-L2300D',
      serialNumber: 'BR-778899',
      status: 'In Progress',
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

const USE_MOCK_DATA = true; // Set to false when backend is ready
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const repairService = {
  // Get all repair requests
  async getAll(): Promise<{ success: boolean; data: RepairListItem[]; message?: string }> {
    if (USE_MOCK_DATA) {
      console.log('[RepairService] Using MOCK data - getAll()');
      console.log('[RepairService] Mock repairs count:', mockRepairs.length);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        success: true,
        data: mockRepairs,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    }

    // ============================================
    // REAL API CALL - Uncomment when backend is ready
    // ============================================
    /*
    try {
      console.log('[RepairService] Calling real API - GET /api/repairs');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[RepairService] No token found');
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/api/repairs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[RepairService] API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('[RepairService] API Error:', error);
        return { success: false, message: error.message || 'Failed to fetch repairs' };
      }

      const data = await response.json();
      console.log('[RepairService] API Response data:', data);
      
      return {
        success: true,
        data: data.repairs || data,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    } catch (error) {
      console.error('[RepairService] Exception:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
      };
    }
    */
    
    // Fallback (should not reach here if USE_MOCK_DATA is true)
    return { success: false, data: [], message: 'Service not configured' };
  },

  // Get repair detail by ID
  async getById(id: number): Promise<{ success: boolean; data?: RepairDetail; error?: string }> {
    if (USE_MOCK_DATA) {
      console.log('[RepairService] Using MOCK data - getById()', id);
      // Simulate API delay
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

    // ============================================
    // REAL API CALL - Uncomment when backend is ready
    // ============================================
    /*
    try {
      console.log('[RepairService] Calling real API - GET /api/repairs/' + id);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[RepairService] No token found');
        return { success: false, error: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/api/repairs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[RepairService] API Response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          return { success: false, error: 'ไม่พบข้อมูลงานซ่อม' };
        }
        const error = await response.json();
        console.error('[RepairService] API Error:', error);
        return { success: false, error: error.message || 'Failed to fetch repair detail' };
      }

      const data = await response.json();
      console.log('[RepairService] API Response data:', data);
      
      return {
        success: true,
        data: data.repair || data,
      };
    } catch (error) {
      console.error('[RepairService] Exception:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
    */
    
    // Fallback
    return { success: false, error: 'Service not configured' };
  },
};

