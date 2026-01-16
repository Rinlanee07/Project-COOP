"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Phone, Building2, Edit, Trash2, Loader2 } from "lucide-react";
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

export default function CustomersPage() {
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
                router.push('/');
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
            if (!token) {
                router.push('/');
                return;
            }

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
                // Refresh customer list
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

    const filteredCustomers = customers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-[#E8EBF5]">
                <div>
                    <h1 className="text-2xl font-bold text-[#092A6D]">จัดการข้อมูลลูกค้า</h1>
                    <p className="text-[#697293]">จัดการข้อมูลลูกค้าและอุปกรณ์</p>
                </div>
                <Button
                    onClick={() => router.push("/dashboard/settings/customers/new")}
                    className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    เพิ่มลูกค้า
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#697293] w-4 h-4" />
                <input
                    type="text"
                    placeholder="ค้นหาลูกค้า..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E8EBF5] focus:outline-none focus:ring-2 focus:ring-[#D7B55A]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#092A6D]" />
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-20">
                    <Building2 className="w-16 h-16 mx-auto text-[#E8EBF5] mb-4" />
                    <h3 className="text-lg font-medium text-[#697293] mb-2">
                        {searchTerm ? "ไม่พบลูกค้าที่ค้นหา" : "ยังไม่มีข้อมูลลูกค้า"}
                    </h3>
                    <p className="text-[#697293] text-sm">
                        {searchTerm ? "ลองค้นหาด้วยคำอื่น" : "เริ่มต้นโดยการเพิ่มลูกค้าใหม่"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCustomers.map((customer) => (
                        <div
                            key={customer.customer_id}
                            onClick={() =>
                                router.push(`/dashboard/settings/customers/${customer.customer_id}`)
                            }
                            className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EBF5] hover:shadow-md cursor-pointer transition-all hover:border-[#D7B55A] group relative"
                        >
                            {/* Action buttons - visible on hover */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-[#E8EBF5]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/dashboard/settings/customers/${customer.customer_id}`);
                                    }}
                                >
                                    <Edit className="h-4 w-4 text-[#092A6D]" />
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

                            <div className="flex justify-between items-start mb-4 pr-20">
                                <div>
                                    <h3 className="font-bold text-lg text-[#092A6D] group-hover:text-[#D7B55A] transition-colors">
                                        {customer.customer_name}
                                    </h3>
                                    {customer.company_name && (
                                        <div className="flex items-center text-[#697293] text-sm mt-1">
                                            <Building2 className="w-3 h-3 mr-1" />
                                            {customer.company_name}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-[#E8EBF5] px-2 py-1 rounded text-xs text-[#697293]">
                                    {customer.Cust_Devices?.length || 0} อุปกรณ์
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-[#333333]">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 text-[#D7B55A] mr-2 flex-shrink-0" />
                                    <span className="truncate">{customer.phone_number}</span>
                                </div>
                                {customer.shop_address && (
                                    <div className="flex items-start">
                                        <MapPin className="w-4 h-4 text-[#D7B55A] mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-2">
                                            {(() => {
                                                try {
                                                    const addr = JSON.parse(customer.shop_address);
                                                    return `${addr.subdistrict || ''}, ${addr.provinceId || ''}`;
                                                } catch { return "มีที่อยู่"; }
                                            })()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการลบข้อมูล</AlertDialogTitle>
                        <AlertDialogDescription>
                            คุณแน่ใจหรือว่าต้องการลบข้อมูลลูกค้า <strong>{customerToDelete?.customer_name}</strong>?
                            <br />
                            <span className="text-red-500 font-medium">การกระทำนี้ไม่สามารถย้อนกลับได้</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600"
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
