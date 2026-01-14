"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Phone, Building2 } from "lucide-react";

export default function CustomersPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await apiClient.get<any[]>("/customers");
            setCustomers(data);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setLoading(false);
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
                    <h1 className="text-2xl font-bold text-[#092A6D]">Customers</h1>
                    <p className="text-[#697293]">Manage customers and their devices</p>
                </div>
                <Button
                    onClick={() => router.push("/dashboard/settings/customers/new")}
                    className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Customer
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#697293] w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E8EBF5] focus:outline-none focus:ring-2 focus:ring-[#D7B55A]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-10 text-[#697293]">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCustomers.map((customer) => (
                        <div
                            key={customer.customer_id}
                            onClick={() =>
                                router.push(`/dashboard/settings/customers/${customer.customer_id}`)
                            }
                            className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EBF5] hover:shadow-md cursor-pointer transition-all hover:border-[#D7B55A] group"
                        >
                            <div className="flex justify-between items-start mb-4">
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
                                    {customer.Cust_Devices?.length || 0} Devices
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-[#333333]">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 text-[#D7B55A] mr-2" />
                                    {customer.phone_number}
                                </div>
                                {customer.shop_address && (
                                    <div className="flex items-start">
                                        <MapPin className="w-4 h-4 text-[#D7B55A] mr-2 mt-0.5" />
                                        <span className="line-clamp-2">
                                            {(() => {
                                                try {
                                                    const addr = JSON.parse(customer.shop_address);
                                                    return `${addr.subdistrict}, ${addr.provinceId}`;
                                                } catch { return "Address available"; }
                                            })()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
