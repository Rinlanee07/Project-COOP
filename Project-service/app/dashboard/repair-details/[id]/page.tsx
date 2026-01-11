"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Printer } from 'lucide-react';
import { repairService, type RepairDetail } from '@/services/repairService';

const RepairDetailsPage = () => {
  const params = useParams();
  const { id } = params; // repair request ID

  const [repairDetail, setRepairDetail] = useState<RepairDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) {
        console.error('[RepairDetail] No ID provided');
        setError('ไม่พบ ID ของงานซ่อม');
        setLoading(false);
        return;
      }

      try {
        console.log('[RepairDetail] Fetching repair detail for ID:', id);
        const res = await repairService.getById(Number(id));
        console.log('[RepairDetail] Response:', res);
        
        if (res.success && res.data) {
          setRepairDetail(res.data);
          console.log('[RepairDetail] Repair detail loaded:', res.data);
        } else {
          console.warn('[RepairDetail] Repair not found or error:', res.error);
          setError(res.error || 'ไม่พบข้อมูลงานซ่อม');
        }
      } catch (err) {
        console.error('[RepairDetail] Fetch error:', err);
        setError('เกิดข้อผิดพลาดขณะดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-[#D7B55A] text-white border border-[#D7B55A]';
      case 'In Progress': return 'bg-[#646c91] text-white border border-[#646c91]';
      case 'Completed': return 'bg-[#5f512f] text-white border border-[#5f512f]';
      case 'Closed': return 'bg-[#092A6D] text-white border border-[#092A6D]';
      default: return 'bg-[#697293] text-white border border-[#697293]';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#092A6D] mx-auto mb-4" />
          <p className="text-[#666666]">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <Card className="bg-red-50 border-red-200 rounded-xl shadow-sm">
          <CardContent className="py-4 text-center text-red-700">{error}</CardContent>
        </Card>
      </div>
    );
  }

  if (!repairDetail || !repairDetail.repairRequest) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="py-12 text-center text-[#666666]">
            ไม่พบข้อมูลงานซ่อม
          </CardContent>
        </Card>
      </div>
    );
  }

  const { repairRequest, parts = [], technician } = repairDetail;
  const totalCost = parts.reduce((sum: number, p: any) => sum + p.price * p.quantity, 0);

  return (
    <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-[#092A6D] to-[#697293] rounded-lg">
          <Printer className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#092A6D]">รายละเอียดงานซ่อม #{repairRequest.id}</h1>
        <Badge className={getStatusColor(repairRequest.status)}>{repairRequest.status}</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-[#666666] mb-1">Printer Model</p>
            <p className="font-medium text-[#092A6D]">{repairRequest.printerModel}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-[#666666] mb-1">Serial Number</p>
            <p className="font-medium text-[#092A6D]">{repairRequest.serialNumber}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-[#666666] mb-1">Technician</p>
            <p className="font-medium text-[#092A6D]">{technician?.name || 'Not assigned'}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-[#666666] mb-1">Total Cost</p>
            <p className="font-medium text-[#D7B55A]">฿{totalCost.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Parts Table */}
      <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-white">Parts Used</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {parts.length === 0 ? (
            <p className="text-[#666666]">No parts used</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E8EBF5]">
                  <TableHead className="text-[#092A6D] font-semibold">Part Name</TableHead>
                  <TableHead className="text-center text-[#092A6D] font-semibold">Quantity</TableHead>
                  <TableHead className="text-right text-[#092A6D] font-semibold">Price/Unit</TableHead>
                  <TableHead className="text-right text-[#092A6D] font-semibold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((part: any, i: number) => (
                  <TableRow key={i} className="border-b border-[#E8EBF5] hover:bg-[#F5F7FA]">
                    <TableCell className="text-[#333333]">{part.partName}</TableCell>
                    <TableCell className="text-center text-[#333333]">{part.quantity}</TableCell>
                    <TableCell className="text-right text-[#333333]">฿{part.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-[#333333]">฿{(part.price * part.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-[#F5F7FA]">
                  <TableCell colSpan={3} className="text-[#092A6D]">Grand Total</TableCell>
                  <TableCell className="text-right text-[#D7B55A]">฿{totalCost.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-white">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <p className="text-[#333333]"><strong className="text-[#092A6D]">Name:</strong> {repairRequest.customer.name}</p>
          <p className="text-[#333333]"><strong className="text-[#092A6D]">Phone:</strong> {repairRequest.customer.phone || 'N/A'}</p>
          <p className="text-[#333333]"><strong className="text-[#092A6D]">Email:</strong> {repairRequest.customer.email || 'N/A'}</p>
          <p className="text-[#333333]"><strong className="text-[#092A6D]">Address:</strong> {repairRequest.customer.address || 'N/A'}</p>
        </CardContent>
      </Card>

      {/* Images */}
      {repairRequest.images && repairRequest.images.length > 0 && (
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
            <CardTitle className="text-white">Attached Images</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {repairRequest.images.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`Repair image ${i + 1}`}
                  className="rounded-lg border border-[#E8EBF5] object-cover w-full h-32 hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RepairDetailsPage;