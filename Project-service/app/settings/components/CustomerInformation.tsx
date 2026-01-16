"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Trash2, Loader2, Building2, Phone, MapPin } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function CustomerInformation() {
    const router = useRouter();
    const { toast } = useToast();
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<any>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: "กรุณาเข้าสู่ระบบ",
                    description: "ไม่พบข้อมูลการเข้าสู่ระบบ",
                    variant: "destructive"
                });
                return;
            }

            const result = await apiClient.getCustomers(token);
            if (result.data) {
                setCustomers(result.data);
            } else if (result.error) {
                toast({
                    title: "เกิดข้อผิดพลาด",
                    description: result.error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถโหลดข้อมูลลูกค้าได้",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (customerId: string) => {
        router.push(`/settings/customers/${customerId}`);
    };

    const handleDeleteClick = (customer: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setCustomerToDelete(customer);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!customerToDelete) return;

        setDeleting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const result = await apiClient.deleteCustomer(token, customerToDelete.customer_id);

            if (result.error) {
                toast({
                    title: "ไม่สามารถลบได้",
                    description: result.error,
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "ลบสำเร็จ",
                    description: "ลบข้อมูลลูกค้าเรียบร้อยแล้ว",
                });
                fetchCustomers();
            }
        } catch (error) {
            console.error("Failed to delete customer:", error);
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถลบข้อมูลลูกค้าได้",
                variant: "destructive"
            });
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setCustomerToDelete(null);
        }
    };

    const parseAddress = (addressStr: string | null) => {
        if (!addressStr) return null;
        try {
            const addr = JSON.parse(addressStr);
            return [
                addr.houseNumber,
                addr.soi && `ซอย ${addr.soi}`,
                addr.road && `ถนน ${addr.road}`,
                addr.subdistrict,
                addr.district,
                addr.provinceId
            ].filter(Boolean).join(' ');
        } catch {
            return addressStr;
        }
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDeviceBadgeColor = (count: number) => {
        if (count === 0) return 'bg-gray-100 text-gray-600';
        if (count <= 2) return 'bg-blue-100 text-blue-700';
        if (count <= 5) return 'bg-green-100 text-green-700';
        return 'bg-purple-100 text-purple-700';
    };

    const formatDate = (dateValue: any) => {
        if (!dateValue) return '-';
        try {
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('th-TH');
        } catch {
            return '-';
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EBF5] p-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#697293] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-[#E8EBF5] focus:outline-none focus:ring-2 focus:ring-[#D7B55A] text-[#333333]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 border-[#E8EBF5]">
                        <Filter className="w-4 h-4" />
                        ทั้งหมด
                    </Button>
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-[#092A6D] mx-auto mb-3" />
                            <p className="text-[#697293]">กำลังโหลดข้อมูล...</p>
                        </div>
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="text-center py-20">
                        <Building2 className="w-16 h-16 mx-auto text-[#E8EBF5] mb-4" />
                        <h3 className="text-lg font-medium text-[#697293] mb-2">
                            {searchTerm ? "ไม่พบลูกค้าที่ค้นหา" : "ยังไม่มีข้อมูลลูกค้า"}
                        </h3>
                        <p className="text-[#697293] text-sm">
                            {searchTerm ? "ลองค้นหาด้วยคำอื่น" : "ไปที่แท็บ Customer เพื่อเพิ่มลูกค้าใหม่"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#E8EBF5]">
                        {filteredCustomers.map((customer) => (
                            <div
                                key={customer.customer_id}
                                onClick={() => handleViewDetails(customer.customer_id)}
                                className="p-4 hover:bg-[#F5F7FA] cursor-pointer transition-colors group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        {/* Customer ID and Name */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-[#697293] font-mono">
                                                {customer.customer_id}
                                            </span>
                                            <h3 className="font-semibold text-[#092A6D] group-hover:text-[#D7B55A] transition-colors">
                                                {customer.customer_name}
                                            </h3>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                getDeviceBadgeColor(customer.Cust_Devices?.length || 0)
                                            )}>
                                                {customer.Cust_Devices?.length || 0} อุปกรณ์
                                            </span>
                                        </div>

                                        {/* Company name if exists */}
                                        {customer.company_name && (
                                            <div className="text-sm text-[#333333] mb-1">
                                                {customer.company_name}
                                            </div>
                                        )}

                                        {/* Customer Info */}
                                        <div className="flex items-center gap-4 text-sm text-[#697293]">
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3.5 h-3.5" />
                                                {customer.phone_number}
                                            </span>
                                            {customer.contact_person && (
                                                <span>ผู้ติดต่อ: {customer.contact_person}</span>
                                            )}
                                            <span>สร้าง: {formatDate(customer.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 px-3 hover:bg-[#E8EBF5] text-[#092A6D]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetails(customer.customer_id);
                                            }}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            ดูรายละเอียด
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 hover:bg-red-50"
                                            onClick={(e) => handleDeleteClick(customer, e)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#092A6D]">ยืนยันการลบข้อมูล</AlertDialogTitle>
                        <AlertDialogDescription className="text-[#666666]">
                            คุณแน่ใจหรือว่าต้องการลบข้อมูลลูกค้า <strong className="text-[#092A6D]">{customerToDelete?.customer_name}</strong>?
                            <br />
                            <span className="text-red-500 font-medium mt-2 block">การกระทำนี้ไม่สามารถย้อนกลับได้</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting} className="border-[#E8EBF5]">
                            ยกเลิก
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    กำลังลบ...
                                </>
                            ) : (
                                "ลบข้อมูล"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
