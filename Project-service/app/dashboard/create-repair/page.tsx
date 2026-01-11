"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Select from "react-select";
import { toast } from "@/components/ui/use-toast";
import {
  FileText,
  User,
  Building,
  Calendar,
  Package,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, parse } from "date-fns";

// Mock data (เหมือนเดิม)
const MOCK_CUSTOMERS = [
  {
    customer_id: "cust_001",
    customer_name: "Aroi Coffee",
    shop_name: "Sukhumvit Branch",
    phone_number: "0812345678",
    contact_line_name: "@aroi_coffee",
  },
  {
    customer_id: "cust_002",
    customer_name: "Sweet Bakery",
    shop_name: "Rama 9 Branch",
    phone_number: "0923456789",
    contact_line_name: "@sweet_bakery",
  },
];

const MOCK_DEVICES = [
  { id: "dev_001", type: "printer", serial_number: "SN123456", brand: "Epson" },
  { id: "dev_002", type: "printer", serial_number: "SN789012", brand: "HP" },
  { id: "dev_003", type: "cash_drawer", serial_number: "SN345678", brand: "Samsung" },
  { id: "dev_004", type: "buzzer", serial_number: "SN901234", brand: "BuzzerPro" },
];

const MOCK_ASSIGNEES = [
  { id: "emp_001", name: "John Doe" },
  { id: "emp_002", name: "Jane Smith" },
  { id: "emp_003", name: "Mike Lee" },
];

const DEVICE_LABELS: Record<string, string> = {
  printer: "Printer",
  cash_drawer: "Cash Drawer",
  buzzer: "Buzzer",
};

const CreateRepair = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [status, setStatus] = useState<"Open" | "Response" | "In Progress" | "Pending" | "Resolved" | "Closed">("Open");
  const [selectedCustomer, setSelectedCustomer] = useState<{ value: string; label: string } | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<{ value: string; label: string } | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<{ value: string; label: string } | null>(null);
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const selectedCustomerData = MOCK_CUSTOMERS.find(c => c.customer_id === selectedCustomer?.value);

  const formatDateToInput = (date: Date | undefined): string => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  const parseInputToDate = (str: string): Date | undefined => {
    const parsed = parse(str, "dd/MM/yyyy", new Date());
    return isNaN(parsed.getTime()) ? undefined : parsed;
  };

  // ส่วนที่เชื่อม backend 
  // useEffect(() => {
  //   const loadSettingsData = async () => {
  //     try {
  //       // ดึงข้อมูลลูกค้าและอุปกรณ์จาก /settings
  //       const token = localStorage.getItem('token');
  //       if (!token) return;
  //       
  //       const settings = await apiClient.get('/settings', { headers: { Authorization: `Bearer ${token}` } });
  //       // จัดการข้อมูล...
  //     } catch (err) {
  //       console.error('Failed to load settings data', err);
  //     }
  //   };
  //   loadSettingsData();
  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !description || !selectedCustomer || !selectedDevice || !selectedAssignee) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in subject, description, customer, device, and assignee.",
        variant: "destructive",
      });
      return;
    }

    // ส่วนส่งข้อมูลไป backend 
    // try {
    //   const token = localStorage.getItem('token');
    //   if (!token) throw new Error('No authorization token');
    //   
    //   const payload = {
    //     subject,
    //     description,
    //     customer_id: selectedCustomer.value,
    //     device_id: selectedDevice.value,
    //     assignee_id: selectedAssignee.value,
    //     status,
    //     preferred_date: preferredDate ? formatDateToInput(preferredDate) : null,
    //   };
    //   
    //   await apiClient.post('/repair-requests', payload, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   
    //   toast({ title: "Repair request created successfully!" });
    // } catch (err) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create repair request.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    console.log("Repair Request Data (Mock):", {
      subject,
      description,
      priority,
      status,
      customer: selectedCustomerData,
      device: MOCK_DEVICES.find(d => d.id === selectedDevice?.value),
      assignee: MOCK_ASSIGNEES.find(e => e.id === selectedAssignee?.value),
      preferredDate: preferredDate ? formatDateToInput(preferredDate) : "Not specified",
    });

    toast({
      title: "Repair Request Created!",
      description: `Simulation: ${subject}`,
    });

    setSubject("");
    setDescription("");
    setPriority("Medium");
    setStatus("Open");
    setSelectedCustomer(null);
    setSelectedDevice(null);
    setSelectedAssignee(null);
    setPreferredDate(undefined);
    setDatePickerOpen(false);
  };

  const customerOptions = MOCK_CUSTOMERS.map(cust => ({
    value: cust.customer_id,
    label: cust.customer_name,
  }));

  const deviceOptions = MOCK_DEVICES.map(device => ({
    value: device.id,
    label: `${DEVICE_LABELS[device.type] || device.type} — ${device.brand} (S/N: ${device.serial_number})`,
  }));

  const assigneeOptions = MOCK_ASSIGNEES.map(emp => ({
    value: emp.id,
    label: emp.name,
  }));

  const statusOptions = [
    { value: "Open", label: "Open" },
    { value: "Response", label: "Response" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Resolved", label: "Resolved" },
    { value: "Closed", label: "Closed" },
  ];

  // ปิด date picker เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inputClass = "w-full border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent rounded-md px-3 py-2 text-sm";

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              {/* Assignee */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">
                  Assignee <span className="text-red-600">*</span>
                </Label>
                <Select
                  instanceId="assignee-select"
                  value={selectedAssignee}
                  onChange={setSelectedAssignee}
                  options={assigneeOptions}
                  placeholder="Select assignee..."
                  isSearchable
                  className="text-sm"
                  classNames={{
                    control: () => inputClass,
                    menu: () => "rounded-md border border-[#E8EBF5] bg-white shadow-lg mt-1",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                  }}
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">
                  Subject <span className="text-red-600">*</span>
                </Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              {/* Preferred Date */}
              <div className="space-y-2 relative" ref={datePickerRef}>
                <Label className="text-[#333333] font-medium">Preferred Date</Label>
                <div className="flex">
                  <Input
                    value={formatDateToInput(preferredDate)}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setPreferredDate(undefined);
                      } else {
                        const parsed = parseInputToDate(val);
                        if (parsed) setPreferredDate(parsed);
                      }
                    }}
                    onClick={() => setDatePickerOpen(true)}
                    placeholder="DD/MM/YYYY"
                    className={inputClass}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2 border-[#E8EBF5] text-[#333333] hover:bg-[#F5F7FA] w-10 h-10"
                    onClick={() => setDatePickerOpen(!datePickerOpen)}
                  >
                    📅
                  </Button>
                </div>
                {datePickerOpen && (
                  <div className="absolute z-20 mt-1 bg-white border border-[#E8EBF5] rounded-lg shadow-lg p-4 w-full max-w-xs">
                    <DayPicker
                      mode="single"
                      selected={preferredDate}
                      onSelect={(date) => {
                        setPreferredDate(date);
                        setDatePickerOpen(false);
                      }}
                      weekStartsOn={0}
                      className="text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">Status</Label>
                <Select
                  instanceId="status-select"
                  value={statusOptions.find(opt => opt.value === status)}
                  onChange={(opt) => setStatus((opt?.value as any) || "Open")}
                  options={statusOptions}
                  isSearchable={false}
                  className="text-sm"
                  classNames={{
                    control: () => inputClass,
                    menu: () => "rounded-md border border-[#E8EBF5] bg-white shadow-lg mt-1",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                  }}
                />
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">
                  Customer <span className="text-red-600">*</span>
                </Label>
                <Select
                  instanceId="customer-select"
                  value={selectedCustomer}
                  onChange={setSelectedCustomer}
                  options={customerOptions}
                  isSearchable
                  className="text-sm"
                  classNames={{
                    control: () => inputClass,
                    menu: () => "rounded-md border border-[#E8EBF5] bg-white shadow-lg mt-1",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                  }}
                  required
                />
              </div>

              {/* Shop / Branch */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">Shop / Branch</Label>
                <Input
                  value={selectedCustomerData?.shop_name || ""}
                  disabled
                  className={`${inputClass} bg-[#F9FAFB] cursor-not-allowed`}
                />
              </div>

              {selectedCustomerData && (
                <div className="mt-3 p-3 bg-[#F9FAFB] rounded-lg text-sm text-[#333333] border border-[#E8EBF5]">
                  <div className="flex flex-wrap gap-4">
                    <span>📞 {selectedCustomerData.phone_number}</span>
                    {selectedCustomerData.contact_line_name && (
                      <span>💬 {selectedCustomerData.contact_line_name}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Device */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">
                  Device <span className="text-red-600">*</span>
                </Label>
                <Select
                  instanceId="device-select"
                  value={selectedDevice}
                  onChange={setSelectedDevice}
                  options={deviceOptions}
                  placeholder="Select device..."
                  isSearchable
                  className="text-sm"
                  classNames={{
                    control: () => inputClass,
                    menu: () => "rounded-md border border-[#E8EBF5] bg-white shadow-lg mt-1",
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 text-sm ${isSelected ? 'bg-[#092A6D] text-white' : isFocused ? 'bg-[#E8EBF5] text-[#092A6D]' : 'text-[#333333]'}`,
                  }}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-[#333333] font-medium">
                  Description <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue..."
                  className={`${inputClass} min-h-[160px]`}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-[#E8EBF5]">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 py-2 border-[#E8EBF5] hover:bg-[#F5F7FA] text-[#333333]"
                  onClick={() => {
                    setSubject("");
                    setDescription("");
                    setPriority("Medium");
                    setStatus("Open");
                    setSelectedCustomer(null);
                    setSelectedDevice(null);
                    setSelectedAssignee(null);
                    setPreferredDate(undefined);
                  }}
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-[#D7B55A] hover:bg-[#C4A04A] text-white font-medium rounded-lg transition-all shadow-sm"
                >
                  Create Repair Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRepair;