// app/dashboard/create-repair/components/CreateRepairSidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Package, Settings, Info, ClipboardList } from 'lucide-react';

interface SubMenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const subMenuItems: SubMenuItem[] = [
  { name: 'ข้อมูลลูกค้า', path: '/dashboard/create-repair', icon: <Package className="w-4 h-4" /> },
  { name: 'อุปกรณ์ที่ซ่อม', path: '/dashboard/create-repair/devices', icon: <Settings className="w-4 h-4" /> },
  { name: 'รายละเอียดงานซ่อม', path: '/dashboard/create-repair/details', icon: <ClipboardList className="w-4 h-4" /> },
  { name: 'สรุปรายการ', path: '/dashboard/create-repair/summary', icon: <Info className="w-4 h-4" /> },
];

export default function CreateRepairSidebar() {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <div className="w-56 flex-shrink-0 border-r border-[#D9DEE8] bg-white h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#102A54] mb-4">สร้างรายการซ่อม</h2>
        <nav className="space-y-1">
          {subMenuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'bg-[#3FA9F5] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}