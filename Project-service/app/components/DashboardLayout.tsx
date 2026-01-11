// components/DashboardLayout.tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // แสดง fallback ที่ match สิ่งที่เซิร์ฟเวอร์ render (เช่น ไม่มี sidebar)
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 text-[#333333] overflow-y-auto bg-[#F5F7FA]">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 ml-0 md:ml-[240px] text-[#333333] overflow-y-auto bg-[#F5F7FA] transition-all">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;