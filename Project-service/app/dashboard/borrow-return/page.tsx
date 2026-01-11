"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Package,
  CreditCard,
  Save,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BorrowReturn = () => {
  // Mock data for all fields
  const mockShops = ["TechRepair Co.", "ABC Electronics", "QuickFix Shop", "Siam Service"];
  const mockCompanies = ["ABC Corp", "TechGlobal Ltd", "Siam Solutions", "Digital Hub Co."];
  const mockContacts = ["Somchai", "Suda", "John Smith", "Preeya", "David"];
  const mockTels = ["02-123-4567", "081-234-5678", "098-765-4321", "02-987-6543"];
  const mockEmails = ["shop1@example.com", "contact@abccorp.com", "info@techrepair.co.th", "support@siamservice.com"];
  const mockBrands = ["Epson", "HP", "Canon", "Brother", "Samsung", "Dell"];
  const mockModels = ["L3210", "DeskJet 2700", "PIXMA TS3300", "HL-L2300D", "Galaxy Tab A"];
  const mockSerials = ["SN123456789", "EP987654321", "HP-ABC123", "CN-X9Y8Z7", "BR-778899"];

  // Fields
  const [shopName, setShopName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [dateLoaned, setDateLoaned] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [deposit, setDeposit] = useState("");
  const [dateToBeReturned, setDateToBeReturned] = useState("");
  const [deliveryBy, setDeliveryBy] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Dropdown visibility
  const [showShop, setShowShop] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTel, setShowTel] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showSerial, setShowSerial] = useState(false);

  const wrapperRef = useRef<HTMLFormElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowShop(false);
        setShowCompany(false);
        setShowContact(false);
        setShowTel(false);
        setShowEmail(false);
        setShowBrand(false);
        setShowModel(false);
        setShowSerial(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering helpers
  const filter = (list: string[], input: string) =>
    input ? list.filter(item => item.toLowerCase().includes(input.toLowerCase())) : [];

  const filteredShops = filter(mockShops, shopName);
  const filteredCompanies = filter(mockCompanies, companyName);
  const filteredContacts = filter(mockContacts, contact);
  const filteredTels = filter(mockTels, tel);
  const filteredEmails = filter(mockEmails, email);
  const filteredBrands = filter(mockBrands, brand);
  const filteredModels = filter(mockModels, model);
  const filteredSerials = filter(mockSerials, serialNumber);

  const handleSelect = (value: string, setter: (v: string) => void, close: () => void) => {
    setter(value);
    close();
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!shopName || !brand || !model || !serialNumber || !dateLoaned || !dateToBeReturned) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const formData = {
        lender: { shopName, companyName, contact, tel, email },
        borrow: { brand, model, serialNumber },
        loan: { dateLoaned, loanDuration, deposit, dateToBeReturned, deliveryBy },
      };
      
      // Mock API call - log to console
      console.log("Borrow Return Data (Mock API):", formData);
      
      toast({
        title: "Success",
        description: "Borrow/Return record saved successfully",
      });
      
      // Reset form
      setShopName("");
      setCompanyName("");
      setContact("");
      setTel("");
      setEmail("");
      setBrand("");
      setModel("");
      setSerialNumber("");
      setDateLoaned("");
      setLoanDuration("");
      setDeposit("");
      setDateToBeReturned("");
      setDeliveryBy("");
      
    } catch (err) {
      console.error('Submit error:', err);
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Form Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
          <CardContent className="p-6 space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit} ref={wrapperRef}>
              {/* Lender Information */}
              <section className="space-y-4 pt-4 border-t border-[#E8EBF5]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Shop Name */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Shop Name *</Label>
                    <Input
                      value={shopName}
                      onChange={(e) => { setShopName(e.target.value); setShowShop(true); }}
                      onFocus={() => setShowShop(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                    {showShop && filteredShops.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredShops.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setShopName, () => setShowShop(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Company Name</Label>
                    <Input
                      value={companyName}
                      onChange={(e) => { setCompanyName(e.target.value); setShowCompany(true); }}
                      onFocus={() => setShowCompany(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                    {showCompany && filteredCompanies.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredCompanies.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setCompanyName, () => setShowCompany(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Contact</Label>
                    <Input
                      value={contact}
                      onChange={(e) => { setContact(e.target.value); setShowContact(true); }}
                      onFocus={() => setShowContact(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                    {showContact && filteredContacts.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredContacts.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setContact, () => setShowContact(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tel */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Tel</Label>
                    <Input
                      value={tel}
                      onChange={(e) => { setTel(e.target.value); setShowTel(true); }}
                      onFocus={() => setShowTel(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                    {showTel && filteredTels.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredTels.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setTel, () => setShowTel(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Email (full width) */}
                  <div className="space-y-2 relative md:col-span-2">
                    <Label className="text-[#333333] font-medium">Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setShowEmail(true); }}
                      onFocus={() => setShowEmail(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                    {showEmail && filteredEmails.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredEmails.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setEmail, () => setShowEmail(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Borrow Information */}
              <section className="space-y-4 pt-4 border-t border-[#E8EBF5]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Brand */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Brand *</Label>
                    <Input
                      value={brand}
                      onChange={(e) => { setBrand(e.target.value); setShowBrand(true); }}
                      onFocus={() => setShowBrand(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                    {showBrand && filteredBrands.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredBrands.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setBrand, () => setShowBrand(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Model */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">Model *</Label>
                    <Input
                      value={model}
                      onChange={(e) => { setModel(e.target.value); setShowModel(true); }}
                      onFocus={() => setShowModel(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                    {showModel && filteredModels.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredModels.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setModel, () => setShowModel(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* S/N */}
                  <div className="space-y-2 relative">
                    <Label className="text-[#333333] font-medium">S/N *</Label>
                    <Input
                      value={serialNumber}
                      onChange={(e) => { setSerialNumber(e.target.value); setShowSerial(true); }}
                      onFocus={() => setShowSerial(true)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                    {showSerial && filteredSerials.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-[#E8EBF5] rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                        {filteredSerials.map((item, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-[#F5F7FA] cursor-pointer text-[#333333]"
                            onClick={() => handleSelect(item, setSerialNumber, () => setShowSerial(false))}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Loan Details */}
              <section className="space-y-4 pt-4 border-t border-[#E8EBF5]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#333333] font-medium">Date Loaned *</Label>
                    <Input
                      type="date"
                      value={dateLoaned}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        setDateLoaned(formatDate(selectedDate));
                      }}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333333] font-medium">Loan Duration (days)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={loanDuration}
                      onChange={(e) => setLoanDuration(e.target.value)}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333333] font-medium">Deposit (THB)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="100"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      placeholder="0"
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#333333] font-medium">Date to be Returned *</Label>
                    <Input
                      type="date"
                      value={dateToBeReturned}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        setDateToBeReturned(formatDate(selectedDate));
                      }}
                      className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[#333333] font-medium">Delivery by</Label>
                    <Select value={deliveryBy} onValueChange={setDeliveryBy}>
                      <SelectTrigger className="border-[#E8EBF5] focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inperson">In Person</SelectItem>
                        <SelectItem value="kerry">Kerry Express</SelectItem>
                        <SelectItem value="flash">Flash Express</SelectItem>
                        <SelectItem value="ems">Thailand Post EMS</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="flex justify-end gap-4 pt-6 border-t border-[#E8EBF5]">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 py-2 border-[#E8EBF5] hover:bg-[#F5F7FA] text-[#333333]"
                  onClick={() => {
                    setShopName("");
                    setCompanyName("");
                    setContact("");
                    setTel("");
                    setEmail("");
                    setBrand("");
                    setModel("");
                    setSerialNumber("");
                    setDateLoaned("");
                    setLoanDuration("");
                    setDeposit("");
                    setDateToBeReturned("");
                    setDeliveryBy("");
                  }}
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#D7B55A] hover:bg-[#C4A04A] text-white font-medium rounded-lg transition-all shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Record"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowReturn;
