// ============================================
// BORROW RETURN SERVICE - Ready for Backend API
// ============================================
// This service can be easily switched to real API by:
// 1. Replace mock data with actual API calls
// 2. Update baseURL in apiClient
// 3. Keep the same interface/return types

export interface BorrowReturnRecord {
  id: string;
  lender: {
    shopName: string;
    companyName?: string;
    contact?: string;
    tel?: string;
    email?: string;
  };
  borrow: {
    brand: string;
    model: string;
    serialNumber: string;
  };
  loan: {
    dateLoaned: string;
    loanDuration?: string;
    deposit?: string;
    dateToBeReturned: string;
    deliveryBy?: string;
  };
  createdAt: string;
}

// Mock data storage (in real app, this would be in a database)
let mockBorrowRecords: BorrowReturnRecord[] = [
  {
    id: '1',
    lender: {
      shopName: 'TechRepair Co.',
      companyName: 'ABC Corp',
      contact: 'Somchai',
      tel: '02-123-4567',
      email: 'shop1@example.com',
    },
    borrow: {
      brand: 'Epson',
      model: 'L3210',
      serialNumber: 'SN123456789',
    },
    loan: {
      dateLoaned: '15/01/2024',
      loanDuration: '30',
      deposit: '5000',
      dateToBeReturned: '15/02/2024',
      deliveryBy: 'inperson',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    lender: {
      shopName: 'ABC Electronics',
      companyName: 'TechGlobal Ltd',
      contact: 'Suda',
      tel: '081-234-5678',
      email: 'contact@abccorp.com',
    },
    borrow: {
      brand: 'HP',
      model: 'DeskJet 2700',
      serialNumber: 'EP987654321',
    },
    loan: {
      dateLoaned: '20/01/2024',
      loanDuration: '15',
      deposit: '3000',
      dateToBeReturned: '05/02/2024',
      deliveryBy: 'kerry',
    },
    createdAt: new Date().toISOString(),
  },
];

const USE_MOCK_DATA = true; // Set to false when backend is ready
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const borrowReturnService = {
  // Add new borrow record
  async add(data: Omit<BorrowReturnRecord, 'id' | 'createdAt'>): Promise<{
    success: boolean;
    message: string;
    data?: BorrowReturnRecord;
  }> {
    if (USE_MOCK_DATA) {
      console.log('[BorrowReturnService] Using MOCK data - add()');
      console.log('[BorrowReturnService] Data:', data);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newRecord: BorrowReturnRecord = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      mockBorrowRecords = [newRecord, ...mockBorrowRecords];
      console.log('[BorrowReturnService] Record added, total:', mockBorrowRecords.length);
      
      return {
        success: true,
        message: 'บันทึกข้อมูลสำเร็จ',
        data: newRecord,
      };
    }

    // ============================================
    // REAL API CALL - Uncomment when backend is ready
    // ============================================
    /*
    try {
      console.log('[BorrowReturnService] Calling real API - POST /api/borrow-return');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[BorrowReturnService] No token found');
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/api/borrow-return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log('[BorrowReturnService] API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('[BorrowReturnService] API Error:', error);
        return { success: false, message: error.message || 'Failed to add record' };
      }

      const result = await response.json();
      console.log('[BorrowReturnService] API Response data:', result);
      
      return {
        success: true,
        message: 'บันทึกข้อมูลสำเร็จ',
        data: result.record || result,
      };
    } catch (error) {
      console.error('[BorrowReturnService] Exception:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
      };
    }
    */
    
    return { success: false, message: 'Service not configured' };
  },

  // Get all borrow records
  async getAll(): Promise<{
    success: boolean;
    data: BorrowReturnRecord[];
    message?: string;
  }> {
    if (USE_MOCK_DATA) {
      console.log('[BorrowReturnService] Using MOCK data - getAll()');
      console.log('[BorrowReturnService] Mock records count:', mockBorrowRecords.length);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      return {
        success: true,
        data: mockBorrowRecords,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    }

    // ============================================
    // REAL API CALL - Uncomment when backend is ready
    // ============================================
    /*
    try {
      console.log('[BorrowReturnService] Calling real API - GET /api/borrow-return');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[BorrowReturnService] No token found');
        return { success: false, data: [], message: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/api/borrow-return`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[BorrowReturnService] API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('[BorrowReturnService] API Error:', error);
        return { success: false, data: [], message: error.message || 'Failed to fetch records' };
      }

      const data = await response.json();
      console.log('[BorrowReturnService] API Response data:', data);
      
      return {
        success: true,
        data: data.records || data,
        message: 'ดึงข้อมูลสำเร็จ',
      };
    } catch (error) {
      console.error('[BorrowReturnService] Exception:', error);
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'Network error',
      };
    }
    */
    
    return { success: false, data: [], message: 'Service not configured' };
  },

  // Delete borrow record
  async delete(id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    if (USE_MOCK_DATA) {
      console.log('[BorrowReturnService] Using MOCK data - delete()', id);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const beforeCount = mockBorrowRecords.length;
      mockBorrowRecords = mockBorrowRecords.filter((record) => record.id !== id);
      console.log('[BorrowReturnService] Record deleted, before:', beforeCount, 'after:', mockBorrowRecords.length);
      
      return {
        success: true,
        message: 'ลบข้อมูลสำเร็จ',
      };
    }

    // ============================================
    // REAL API CALL - Uncomment when backend is ready
    // ============================================
    /*
    try {
      console.log('[BorrowReturnService] Calling real API - DELETE /api/borrow-return/' + id);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        console.error('[BorrowReturnService] No token found');
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/api/borrow-return/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[BorrowReturnService] API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('[BorrowReturnService] API Error:', error);
        return { success: false, message: error.message || 'Failed to delete record' };
      }

      console.log('[BorrowReturnService] Record deleted successfully');
      
      return {
        success: true,
        message: 'ลบข้อมูลสำเร็จ',
      };
    } catch (error) {
      console.error('[BorrowReturnService] Exception:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
      };
    }
    */
    
    return { success: false, message: 'Service not configured' };
  },
};

