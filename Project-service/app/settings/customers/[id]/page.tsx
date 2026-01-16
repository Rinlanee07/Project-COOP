"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Phone, Mail, Building2, MapPin, Package, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

interface CustomerDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [customer, setCustomer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { id } = use(params);

    useEffect(() => {
        fetchCustomerDetail();
    }, [id]);

    const fetchCustomerDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: "กรุณาเข้าสู่ระบบ",
                    description: "ไม่พบข้อมูลการเข้าสู่ระบบ",
                    variant: "destructive"
                });
                router.push('/');
                return;
            }

            const result = await apiClient.getCustomer(token, id);
            if (result.data) {
                setCustomer(result.data);
            } else if (result.error) {
                toast({
                    title: "เกิดข้อผิดพลาด",
                    description: result.error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Failed to fetch customer:", error);
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถโหลดข้อมูลลูกค้าได้",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const parseAddress = (addressStr: string | null) => {
        if (!addressStr) return null;
        try {
            const addr = JSON.parse(addressStr);
            return [
                addr.houseNumber && `บ้านเลขที่ ${addr.houseNumber}`,
                addr.soi && `ซอย ${addr.soi}`,
                addr.road && `ถนน ${addr.road}`,
                addr.subdistrict && `ตำบล ${addr.subdistrict}`,
                addr.district && `อำเภอ ${addr.district}`,
                addr.provinceId && `จังหวัด ${addr.provinceId}`
            ].filter(Boolean).join(' ');
        } catch {
            return addressStr;
        }
    };

    const formatDate = (dateValue: any) => {
        if (!dateValue) return '-';
        try {
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return '-';
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#092A6D] mx-auto mb-3" />
                        <p className="text-[#697293]">กำลังโหลดข้อมูล...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!customer) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <Building2 className="w-16 h-16 mx-auto text-[#E8EBF5] mb-4" />
                    <h3 className="text-lg font-medium text-[#697293] mb-2">ไม่พบข้อมูลลูกค้า</h3>
                    <Button onClick={() => router.back()} className="mt-4">
                        กลับ
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-[#E8EBF5]">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="hover:bg-[#E8EBF5]"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-[#092A6D]">{customer.customer_name}</h1>
                            <p className="text-[#697293] text-sm mt-1">รหัสลูกค้า: {customer.customer_id}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => router.push(`/settings/customers/${id}/edit`)}
                        className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        แก้ไขข้อมูล
                    </Button>
                </div>

                {/* Single Combined Information Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EBF5]">
                    <div className="space-y-6">
                        {/* General Info */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#092A6D] mb-4 pb-2 border-b">ข้อมูลทั่วไป</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#697293] mb-1">รหัสลูกค้า</p>
                                    <p className="text-[#333333] font-medium font-mono">{customer.customer_id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#697293] mb-1">ชื่อลูกค้า</p>
                                    <p className="text-[#333333] font-medium">{customer.customer_name}</p>
                                </div>
                                {customer.shop_name && (
                                    <div>
                                        <p className="text-sm text-[#697293] mb-1">ชื่อร้าน</p>
                                        <p className="text-[#333333] font-medium">{customer.shop_name}</p>
                                    </div>
                                )}
                                {customer.company_name && (
                                    <div>
                                        <p className="text-sm text-[#697293] mb-1">ชื่อบริษัท</p>
                                        <p className="text-[#333333] font-medium flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-[#D7B55A]" />
                                            {customer.company_name}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-[#697293] mb-1">ผู้ติดต่อ</p>
                                    <p className="text-[#333333] font-medium">{customer.contact_person}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="pt-4 border-t border-[#E8EBF5]">
                            <h2 className="text-lg font-semibold text-[#092A6D] mb-4 pb-2 border-b">ข้อมูลการติดต่อ</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#697293] mb-1">เบอร์โทรศัพท์</p>
                                    <p className="text-[#333333] font-medium flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-[#D7B55A]" />
                                        {customer.phone_number}
                                    </p>
                                </div>
                                {customer.contact_email && (
                                    <div>
                                        <p className="text-sm text-[#697293] mb-1">อีเมล</p>
                                        <p className="text-[#333333] font-medium flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#D7B55A]" />
                                            {customer.contact_email}
                                        </p>
                                    </div>
                                )}
                                {customer.contact_line_id && (
                                    <div>
                                        <p className="text-sm text-[#697293] mb-1">Line ID</p>
                                        <p className="text-[#333333] font-medium">{customer.contact_line_id}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="pt-4 border-t border-[#E8EBF5]">
                            <h2 className="text-lg font-semibold text-[#092A6D] mb-4 pb-2 border-b flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#D7B55A]" />
                                ที่อยู่
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#697293] mb-2 font-medium">ที่อยู่ร้าน</p>
                                    <p className="text-[#333333] leading-relaxed bg-[#F5F7FA] p-3 rounded-lg">
                                        {parseAddress(customer.shop_address) || <span className="text-[#697293]">ไม่ระบุ</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#697293] mb-2 font-medium">ที่อยู่บริษัท</p>
                                    <p className="text-[#333333] leading-relaxed bg-[#F5F7FA] p-3 rounded-lg">
                                        {parseAddress(customer.company_address) || <span className="text-[#697293]">ไม่ระบุ</span>}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Devices */}
                        {customer.Cust_Devices && customer.Cust_Devices.length > 0 && (
                            <div className="pt-4 border-t border-[#E8EBF5]">
                                <h2 className="text-lg font-semibold text-[#092A6D] mb-4 pb-2 border-b flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#D7B55A]" />
                                    อุปกรณ์ ({customer.Cust_Devices.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {customer.Cust_Devices.map((custDevice: any, idx: number) => (
                                        <div key={idx} className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E8EBF5]">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-[#697293]">ประเภท</span>
                                                    <span className="font-medium text-[#333333]">
                                                        {custDevice.Device?.DeviceType?.device_type || '-'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-[#697293]">ยี่ห้อ</span>
                                                    <span className="font-medium text-[#333333]">
                                                        {custDevice.Device?.DeviceType?.brand || '-'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-[#697293]">Serial Number</span>
                                                    <span className="font-medium text-[#333333] font-mono text-sm">
                                                        {custDevice.Device?.serial_number || '-'}
                                                    </span>
                                                </div>
                                                {custDevice.Device?.installation_location && (
                                                    <div className="pt-2 border-t border-[#E8EBF5]">
                                                        <span className="text-sm text-[#697293]">สถานที่ติดตั้ง: </span>
                                                        <span className="font-medium text-[#333333]">
                                                            {custDevice.Device.installation_location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="pt-4 border-t border-[#E8EBF5]">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-[#697293]">สร้างเมื่อ</p>
                                    <p className="font-medium text-[#333333]">
                                        {formatDate(customer.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#697293]">อัพเดทล่าสุด</p>
                                    <p className="font-medium text-[#333333]">
                                        {formatDate(customer.updated_at)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#697293]">สถานะ</p>
                                    <p className="font-medium text-green-600">
                                        {customer.is_active !== undefined ? (customer.is_active ? 'ใช้งาน' : 'ไม่ใช้งาน') : 'ใช้งาน'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
