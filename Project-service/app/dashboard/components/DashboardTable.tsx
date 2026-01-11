// app/dashboard/components/DashboardTable.tsx
"use client";

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DashboardTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DashboardTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'ไม่พบข้อมูล',
  onRowClick,
  className = '',
}: DashboardTableProps<T>) {
  if (loading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5] overflow-hidden">
        <CardContent className="p-0">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#092A6D] mx-auto mb-4"></div>
            <p className="text-[#666666]">กำลังโหลดข้อมูล...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5] overflow-hidden">
        <CardContent className="p-0">
          <div className="text-center py-12 text-[#666666]">
            {emptyMessage}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white rounded-xl shadow-sm border border-[#E8EBF5] overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#092A6D] text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`py-4 px-6 font-semibold text-sm ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'border-b border-[#E8EBF5] transition-colors',
                    onRowClick ? 'cursor-pointer hover:bg-[#F5F7FA]' : '',
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`py-4 px-6 text-[#333333] text-sm ${column.className || ''}`}
                    >
                      {column.render
                        ? column.render(item)
                        : (item[column.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function for status badges
export function StatusBadge({ 
  status, 
  label 
}: { 
  status: string; 
  label: string;
}) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'pending':
        return 'bg-[#F5E8C4] text-[#D7B55A] border-[#D7B55A]';
      case 'in progress':
      case 'in_progress':
        return 'bg-[#E8EBF5] text-[#092A6D] border-[#092A6D]';
      case 'resolved':
      case 'completed':
        return 'bg-[#D4EDDA] text-[#155724] border-[#155724]';
      case 'closed':
        return 'bg-[#E2E3E5] text-[#666666] border-[#666666]';
      default:
        return 'bg-[#F5F7FA] text-[#666666] border-[#E8EBF5]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}
    >
      {label}
    </span>
  );
}

// Helper function for action buttons
export function ActionButton({
  onClick,
  children,
  variant = 'default',
}: {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'default' | 'gold' | 'outline';
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'gold':
        return 'bg-[#D7B55A] hover:bg-[#C4A04A] text-white';
      case 'outline':
        return 'border border-[#E8EBF5] text-[#092A6D] hover:bg-[#F5F7FA]';
      default:
        return 'bg-[#092A6D] hover:bg-[#697293] text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${getVariantStyle()}`}
    >
      {children}
    </button>
  );
}

export default DashboardTable;

