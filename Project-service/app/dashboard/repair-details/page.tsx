"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Search,
  Filter,
  Printer,
  ChevronRight,
} from "lucide-react";
import { repairService, type RepairListItem } from "@/services/repairService";
import { format, isValid, parseISO } from "date-fns";

// Helper function to safely format dates
const safeFormatDate = (dateValue: string | Date | null | undefined, formatStr: string = 'dd/MM/yyyy'): string => {
    if (!dateValue) return 'N/A';
    try {
        const date = typeof dateValue === 'string' ? parseISO(dateValue) : new Date(dateValue);
        return isValid(date) ? format(date, formatStr) : 'Invalid date';
    } catch {
        return 'Invalid date';
    }
};

const RepairListPage = () => {
  const [repairs, setRepairs] = useState<RepairListItem[]>([]);
  const [filteredRepairs, setFilteredRepairs] = useState<RepairListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("[RepairList] Fetching repairs...");
        const res = await repairService.getAll();
        console.log("[RepairList] Response:", res);
        
        if (res.success) {
          setRepairs(res.data);
          setFilteredRepairs(res.data);
          console.log("[RepairList] Loaded repairs:", res.data.length);
        } else {
          setError(res.message || "Failed to fetch repair list");
          console.error("[RepairList] Error:", res.message);
        }
      } catch (err) {
        const errorMsg = "Failed to fetch repair list";
        setError(errorMsg);
        console.error("[RepairList] Exception:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...repairs];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.printerModel?.toLowerCase().includes(query) ||
          r.serialNumber?.toLowerCase().includes(query) ||
          r.customerName?.toLowerCase().includes(query) ||
          r.id.toString().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    setFilteredRepairs(filtered);
    console.log("[RepairList] Filtered repairs:", filtered.length);
  }, [repairs, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-[#D7B55A] text-white";
      case "In Progress":
        return "bg-[#646c91] text-white";
      case "Pending":
        return "bg-orange-500 text-white";
      case "Completed":
        return "bg-[#5f512f] text-white";
      case "Closed":
        return "bg-[#092A6D] text-white";
      default:
        return "bg-[#697293] text-white";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-yellow-500";
      case "Medium":
        return "bg-blue-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
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
      <div className=" bg-[#F5F7FA] min-h-screen">
        <Card className="bg-red-50 border-red-200 rounded-xl shadow-sm">
          <CardContent className="py-4 text-center text-red-700">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-0">
      <div className="max-w-7xl mx-auto space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666666]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหา... (รุ่นเครื่อง, Serial Number, ลูกค้า, ID)"
                  className="pl-9 border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-[#E8EBF5]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Repair List */}
        {filteredRepairs.length === 0 ? (
          <Card className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm">
            <CardContent className="py-12 text-center">
              <p className="text-[#666666] text-lg mb-2">
                ไม่พบข้อมูลงานซ่อม
              </p>
              <p className="text-[#999999] text-sm">
                ลองเปลี่ยนคำค้นหาหรือตัวกรอง
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredRepairs.map((repair) => {
              // Generate ticket ID format (T + numeric ID)
              const ticketId = `T${repair.id}`;
              // Use printerModel as subject/title, or fallback
              const title = repair.printerModel || `Repair #${repair.id}`;
              // Use description or create a simple one
              const description = `${repair.printerModel || 'Device'} - ${repair.serialNumber || 'N/A'}`;
              
              return (
                <Link
                  key={repair.id}
                  href={`/dashboard/repair-details/${repair.id}`}
                  className="block"
                >
                  <Card className="cursor-pointer hover:shadow-md transition">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gray-500">{ticketId}</span>
                          <h3 className="font-semibold text-lg">{title}</h3>
                          {repair.priority && (
                            <Badge variant={repair.priority === 'High' || repair.priority === 'Critical' ? 'destructive' : 'default'}>
                              {repair.priority}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{description.substring(0, 100)}...</p>
                        <div className="text-xs text-gray-400 mt-2">
                          Customer: {repair.customerName || 'N/A'} | Created: {repair.createdAt ? safeFormatDate(repair.createdAt) : 'N/A'}
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline" className={
                          repair.status === 'New' ? 'bg-blue-50 text-blue-700' :
                          repair.status === 'Resolved' || repair.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                          'bg-gray-50'
                        }>{repair.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairListPage;
