'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CustomerSettings from './components/CustomerSettings';
import DisplaySettings from './components/DisplaySettings';
import { Users, Monitor } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SettingsTab = 'customer' | 'display';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('customer');

  const tabs = [
    {
      id: 'customer' as SettingsTab,
      icon: Users,
      tooltip: 'หน้านี้ใช้สำหรับจัดการข้อมูลลูกค้า ตั้งค่าและแก้ไขข้อมูลส่วนตัว ร้านค้า และที่อยู่',
    },
    {
      id: 'display' as SettingsTab,
      icon: Monitor,
      tooltip: 'หน้านี้ใช้สำหรับจัดการการตั้งค่าจอแสดงผลและการแสดงผลต่างๆ',
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
          {activeTab === 'display' && <DisplaySettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}