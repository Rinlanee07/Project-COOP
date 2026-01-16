"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Select from "react-select";
import { useToast } from "@/components/ui/use-toast";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateRepair() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerDevices, setCustomerDevices] = useState<any[]>([]); // Devices for selected customer
  const [technicalReports, setTechnicalReports] = useState<any[]>([]); // Technical reports for dropdown
  const [partsList, setPartsList] = useState<any[]>([]); // Parts from database for dropdown

  // Form State - Basic Info
  const [notificationDate, setNotificationDate] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  // Contact Information (will be populated from selected customer)
  const [companyStoreName, setCompanyStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");

  // Product Information
  const [productName, setProductName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [defectSymptoms, setDefectSymptoms] = useState("");
  const [accessories, setAccessories] = useState("");
  const [notes, setNotes] = useState("");

  // Delivery Information
  const [sentBy, setSentBy] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [dueDate, setDueDate] = useState<string>("");

  // Parts
  const [parts, setParts] = useState<Array<{ part_number: string; description: string; quantity: number }>>([]);

  // Engineer Report
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
  const [repairDate, setRepairDate] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [contractDate, setContractDate] = useState<string>("");
  const [engineerComment, setEngineerComment] = useState("");

  // Other fields
  const [priority, setPriority] = useState<any>("Medium");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Fetch Data
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const custRes = await apiClient.getCustomers(token);
        const techRes = await apiClient.getTechnicalReports(token);
        const partsRes = await apiClient.getParts(token);

        if (custRes.data) {
          setCustomers(custRes.data.map(c => ({
            value: c.customer_id,
            label: c.customer_name,
            original: c
          })));
        }

        if (techRes.data) {
          setTechnicalReports(techRes.data.map((t: any) => ({
            value: t.id,
            label: t.name,
            original: t
          })));
        }

        if (partsRes.data) {
          setPartsList(partsRes.data.map((p: any) => ({
            value: p.id,
            label: `${p.part_no} - ${p.description}`,
            original: p
          })));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    init();

    // Set default notification date to today
    const today = new Date().toISOString().split('T')[0];
    setNotificationDate(today);
  }, []);

  // Update customer info and devices when customer is selected
  useEffect(() => {
    if (selectedCustomer?.original) {
      const customer = selectedCustomer.original;
      setCompanyStoreName(customer.company_name || customer.shop_name || customer.customer_name || "");

      // Parse address from JSON string if it exists
      let addressText = "";
      if (customer.company_address) {
        try {
          const addr = typeof customer.company_address === 'string'
            ? JSON.parse(customer.company_address)
            : customer.company_address;
          addressText = formatAddress(addr);
        } catch (e) {
          addressText = typeof customer.company_address === 'string'
            ? customer.company_address
            : "";
        }
      } else if (customer.shop_address) {
        try {
          const addr = typeof customer.shop_address === 'string'
            ? JSON.parse(customer.shop_address)
            : customer.shop_address;
          addressText = formatAddress(addr);
        } catch (e) {
          addressText = typeof customer.shop_address === 'string'
            ? customer.shop_address
            : "";
        }
      } else if (customer.address) {
        addressText = customer.address;
      }

      setAddress(addressText);
      setContactPersonName(customer.contact_person || "");
      setContactPersonPhone(customer.phone_number || customer.contact_tel || "");

      // Load customer devices from Cust_Devices
      if (customer.Cust_Devices && Array.isArray(customer.Cust_Devices)) {
        const devicesList = customer.Cust_Devices
          .filter((cd: any) => cd.Device) // Only include active devices (where end_date is null or in future)
          .map((cd: any) => {
            const device = cd.Device;
            const deviceType = device.DeviceType;
            const deviceLabel = deviceType
              ? `${deviceType.brand} ${deviceType.model}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`
              : `Device ${device.device_id}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`;

            return {
              value: device.device_id,
              label: deviceLabel,
              original: device
            };
          });
        setCustomerDevices(devicesList);
      } else {
        // If Cust_Devices not loaded, fetch customer details
        const fetchCustomerDevices = async () => {
          const token = localStorage.getItem("token");
          if (!token) return;

          try {
            const customerRes = await apiClient.getCustomer(token, customer.customer_id);
            if (customerRes.data?.Cust_Devices) {
              const devicesList = customerRes.data.Cust_Devices
                .filter((cd: any) => cd.Device)
                .map((cd: any) => {
                  const device = cd.Device;
                  const deviceType = device.DeviceType;
                  const deviceLabel = deviceType
                    ? `${deviceType.brand} ${deviceType.model}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`
                    : `Device ${device.device_id}${device.serial_number ? ` (S/N: ${device.serial_number})` : ''}`;

                  return {
                    value: device.device_id,
                    label: deviceLabel,
                    original: device
                  };
                });
              setCustomerDevices(devicesList);
            }
          } catch (error) {
            console.error("Error fetching customer devices:", error);
            setCustomerDevices([]);
          }
        };
        fetchCustomerDevices();
      }
    } else {
      setCompanyStoreName("");
      setAddress("");
      setContactPersonName("");
      setContactPersonPhone("");
      setCustomerDevices([]);
      setSelectedDevice(null);
      setProductName("");
      setProductNumber("");
    }
  }, [selectedCustomer]);

  // Helper function to format address
  const formatAddress = (addr: any): string => {
    if (!addr || typeof addr !== 'object') return "";
    const parts = [];
    if (addr.houseNumber) parts.push(`House No. ${addr.houseNumber}`);
    if (addr.soi) parts.push(`Soi ${addr.soi}`);
    if (addr.road) parts.push(`Road ${addr.road}`);
    if (addr.subdistrict) parts.push(`Subdistrict ${addr.subdistrict}`);
    if (addr.district) parts.push(`District ${addr.district}`);
    if (addr.provinceId) {
      const provinceName = typeof addr.provinceId === 'string' ? addr.provinceId : '';
      parts.push(provinceName);
    }
    return parts.join(", ");
  };

  // Update device info when device is selected
  useEffect(() => {
    if (selectedDevice?.original) {
      const device = selectedDevice.original;
      const deviceType = device.DeviceType;

      // Set Product Name from DeviceType (brand + model)
      const productName = deviceType
        ? `${deviceType.brand || ''} ${deviceType.model || ''}`.trim()
        : "";
      setProductName(productName);

      // Set Serial Number
      setProductNumber(device.serial_number || "");
    } else {
      setProductName("");
      setProductNumber("");
    }
  }, [selectedDevice]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // Filter only image files (.jpeg, .jpg, .png)
      const imageFiles = selectedFiles.filter(file => {
        const fileName = file.name.toLowerCase();
        return fileName.endsWith('.jpeg') || fileName.endsWith('.jpg') || fileName.endsWith('.png');
      });

      setFiles(imageFiles);

      // Create preview URLs for images
      const previews = imageFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const addPart = () => {
    setParts([...parts, { part_number: "", description: "", quantity: 1 }]);
  };

  const addPartFromDropdown = (selectedPart: any) => {
    const newPart = {
      part_number: selectedPart.part_no,
      description: selectedPart.description,
      quantity: 1
    };
    setParts([...parts, newPart]);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const updatePart = (index: number, field: keyof typeof parts[0], value: string | number) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], [field]: value };
    setParts(newParts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) {
      toast({ title: "Error", description: "Please select a customer", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // Basic ticket info
      formData.append("subject", defectSymptoms || "Repair Request");
      formData.append("description", defectSymptoms);
      formData.append("customer_id", selectedCustomer.value);
      formData.append("priority", priority);

      if (selectedDevice) {
        formData.append("device_id", selectedDevice.value);
      }

      // Additional fields
      formData.append("accessories", accessories);
      formData.append("remark", notes);
      formData.append("sent_by", sentBy);
      formData.append("received_by", receivedBy);
      formData.append("engineer_comment", engineerComment);

      // Technician field
      if (selectedTechnician) {
        formData.append("technician_name", selectedTechnician.label);
      }

      // Delivery fields
      if (dueDate) {
        formData.append("due_date", dueDate);
      }

      // Engineer report fields (store in comment or add to DTO)
      if (purchaseDate) {
        formData.append("purchase_date", purchaseDate);
      }
      if (contractDate) {
        formData.append("contract_date", contractDate);
      }

      // Parts
      formData.append("parts", JSON.stringify(parts));

      // Files
      files.forEach((file) => {
        formData.append("files", file);
      });

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const result = await apiClient.createRepairTicket(token, formData);

      if (result.error) {
        throw new Error(result.error);
      }

      toast({ title: "Success", description: "Repair ticket created successfully" });
      // Navigate to repair-details page, or specific repair detail if we have the ID
      if (result.data?.ticket_id) {
        // Extract numeric ID from ticket_id (e.g., "T1768298627252" -> 1768298627252)
        const numericId = result.data.ticket_id.replace('T', '');
        router.push(`/dashboard/repair-details/${numericId}`);
      } else {
        router.push("/dashboard/repair-details");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to create repair ticket",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date of Repair Notification */}
            <div className="space-y-2">
              <Label>RECEIVEING DATE <span className="text-red-500">*</span></Label>
              <Input
                type="date"
                value={notificationDate}
                onChange={(e) => setNotificationDate(e.target.value)}
                required
              />
            </div>

            {/* Customer Selection */}
            <div className="space-y-2">
              <Label>Select Customer</Label>
              <Select
                instanceId="customer-select"
                options={customers}
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                placeholder=""
                className="text-sm"
                isSearchable
                isClearable
                filterOption={(option, inputValue) => {
                  const label = option.label?.toLowerCase() || '';
                  const searchValue = inputValue.toLowerCase();
                  return label.includes(searchValue);
                }}
              />
            </div>

            {/* Company/Store Name and Address */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>CUSTOMER NAME <span className="text-red-500">*</span></Label>
                <Input
                  value={companyStoreName}
                  onChange={(e) => setCompanyStoreName(e.target.value)}
                  placeholder=""
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ADDRESS <span className="text-red-500">*</span></Label>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                  className="min-h-[80px]"
                  required
                />
              </div>
            </div>

            {/* Contact Person Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>CONTACT PERSON <span className="text-red-500">*</span></Label>
                <Input
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                  placeholder=""
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>TEL <span className="text-red-500">*</span></Label>
                <Input
                  value={contactPersonPhone}
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                  placeholder=""
                  required
                />
              </div>
            </div>

            {/* Device Selection */}
            <div className="space-y-2">
              <Label>Select Device <span className="text-red-500">*</span></Label>
              <Select
                instanceId="device-select"
                options={customerDevices}
                value={selectedDevice}
                onChange={setSelectedDevice}
                placeholder={selectedCustomer ? "Select Device" : "Please select customer first"}
                className="text-sm"
                isDisabled={!selectedCustomer}
                isClearable
                isSearchable
                required
              />
              {selectedCustomer && customerDevices.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No devices found for this customer
                </p>
              )}
            </div>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>PRODUCT <span className="text-red-500">*</span></Label>
                    <Input
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SERIAL NO. <span className="text-red-500">*</span></Label>
                    <Input
                      value={productNumber}
                      onChange={(e) => setProductNumber(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>DESC OF FAULT <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={defectSymptoms}
                    onChange={(e) => setDefectSymptoms(e.target.value)}
                    placeholder=""
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>ACCBSSORIBS <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={accessories}
                    onChange={(e) => setAccessories(e.target.value)}
                    placeholder=""
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>REMARK</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder=""
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">DELIVERY INFORMATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>CUSTOMER</Label>
                    <Input
                      value={sentBy}
                      onChange={(e) => setSentBy(e.target.value)}
                      placeholder="Name of person bringing item"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>RBCBIVE BY</Label>
                    <Input
                      value={receivedBy}
                      onChange={(e) => setReceivedBy(e.target.value)}
                      placeholder="Name of person receiving item"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>DUE DATE</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parts Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Parts <span className="text-red-500">*</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>อุปกรณ์</Label>
                  <Select
                    options={partsList}
                    onChange={addPartFromDropdown}
                    placeholder="เลือกอุปกรณ์"
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">PART NO., DESCRIPTION, QUANTITY</p>
                  <Button type="button" variant="outline" size="sm" onClick={addPart}>
                    + Add Part
                  </Button>
                </div>

                {parts.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No parts added.</p>
                )}

                {parts.map((part, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      placeholder="Part No."
                      value={part.part_number}
                      onChange={(e) => updatePart(index, "part_number", e.target.value)}
                      className="w-1/4"
                    />
                    <Input
                      placeholder="Description"
                      value={part.description}
                      onChange={(e) => updatePart(index, "description", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={part.quantity}
                      onChange={(e) => updatePart(index, "quantity", parseInt(e.target.value) || 0)}
                      className="w-24"
                      min="1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePart(index)}
                      className="text-red-500"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Engineer Report Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">TECHNICAL REPORT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>TECHNICAL</Label>
                    <Select
                      value={selectedTechnician}
                      onChange={setSelectedTechnician}
                      options={technicalReports}
                      placeholder="Select Technician"
                      isSearchable={true}
                      isClearable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>REPAIR DATE</Label>
                    <Input
                      type="date"
                      value={repairDate}
                      onChange={(e) => setRepairDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>PURCHASE DATE</Label>
                    <Input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CONTRACT DATE</Label>
                    <Input
                      type="date"
                      value={contractDate}
                      onChange={(e) => setContractDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>COMMENT</Label>
                  <Textarea
                    value={engineerComment}
                    onChange={(e) => setEngineerComment(e.target.value)}
                    placeholder="Engineer comments..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Priority and Attachments */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Priority <span className="text-red-500">*</span></Label>
                <Select
                  instanceId="priority-select"
                  options={[
                    { value: "Low", label: "Low" },
                    { value: "Medium", label: "Medium" },
                    { value: "High", label: "High" },
                    { value: "Critical", label: "Critical" },
                  ]}
                  value={{ value: priority, label: priority }}
                  onChange={(opt) => setPriority(opt?.value || "Medium")}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments / ไฟล์แนบ (Images) <span className="text-red-500">*</span></Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    accept=".jpeg,.jpg,.png,image/jpeg,image/jpg,image/png"
                    required
                  />
                  <span className="text-sm text-gray-500">
                    {files.length} file(s) selected (Only .jpeg, .jpg, .png allowed)
                  </span>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 flex justify-end gap-4 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel / ยกเลิก
              </Button>
              <Button type="submit" disabled={loading} className="bg-[#D7B55A] hover:bg-[#C4A04A] text-white">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Repair Ticket / สร้างรายการซ่อม"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
