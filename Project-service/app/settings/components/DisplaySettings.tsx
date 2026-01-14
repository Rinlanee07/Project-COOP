// app/settings/components/DisplaySettings.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

export default function DisplaySettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-[#666666]">
            จอแสดงผลและการตั้งค่าการแสดงผลจะปรากฏที่นี่
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
