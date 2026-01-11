'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import CustomerSettings from './components/CustomerSettings';
import DeviceTypeSettings from './components/DeviceTypeSettings';
import { User, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="bg-[#E8EBF5] p-1 rounded-lg mb-6 w-full md:w-auto">
            <TabsTrigger
              value="customer"
              className="data-[state=active]:bg-[#D7B55A] data-[state=active]:text-white text-[#092A6D] font-medium px-6 py-2 rounded-md transition-all"
            >
              <User className="w-4 h-4 mr-2" />
              Customer Settings
            </TabsTrigger>
            <TabsTrigger
              value="device"
              className="data-[state=active]:bg-[#D7B55A] data-[state=active]:text-white text-[#092A6D] font-medium px-6 py-2 rounded-md transition-all"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Device Type Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="mt-0">
            <CustomerSettings />
          </TabsContent>

          <TabsContent value="device" className="mt-0">
            <DeviceTypeSettings />
          </TabsContent>
        </Tabs>
    </DashboardLayout>
  );
}