'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CustomerSettings from './components/CustomerSettings';
import CustomerInformation from './components/CustomerInformation';
import TechnicalReport from './components/TechnicalReport';
import Parts from './components/Parts';
import { Users, Wrench, List, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SettingsTab = 'customer' | 'customer-info' | 'technical' | 'parts';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('customer');

  const tabs = [
    {
      id: 'customer' as SettingsTab,
      icon: Users,
      tooltip: 'หน้านี้ใช้สำหรับเพิ่มข้อมูลลูกค้าใหม่ ตั้งค่าและบันทึกข้อมูลส่วนตัว ร้านค้า และที่อยู่',
    },
    {
      id: 'customer-info' as SettingsTab,
      icon: List,
      tooltip: 'หน้านี้ใช้สำหรับดูรายการลูกค้าทั้งหมด คลิกเพื่อดูรายละเอียด และจัดการข้อมูลลูกค้า',
    },
    {
      id: 'technical' as SettingsTab,
      icon: Wrench,
      tooltip: 'หน้านี้ใช้สำหรับจัดการข้อมูลช่างเทคนิค เพิ่ม แก้ไข และลบข้อมูลช่างเทคนิค',
    },
    {
      id: 'parts' as SettingsTab,
      icon: Settings,
      tooltip: 'หน้านี้ใช้สำหรับจัดการข้อมูลอุปกรณ์อะไหล่ เพิ่ม แก้ไข และลบข้อมูล PART NO. และ Description',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">
        {/* Small Sidebar */}
        <aside className="w-16 bg-white rounded-lg border border-[#E8EBF5] shadow-sm h-fit flex flex-col p-2 space-y-2">
          <TooltipProvider delayDuration={200}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-[#092A6D] text-white shadow-md'
                          : 'text-[#666666] hover:bg-[#E8EBF5] hover:text-[#092A6D]'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs p-3">
                    <p className="text-sm leading-relaxed">{tab.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'customer' && <CustomerSettings />}
          {activeTab === 'customer-info' && <CustomerInformation />}
          {activeTab === 'technical' && <TechnicalReport />}
          {activeTab === 'parts' && <Parts />}
        </div>
      </div>
    </DashboardLayout>
  );
}