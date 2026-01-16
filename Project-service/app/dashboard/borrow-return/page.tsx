"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ApiClient } from "@/lib/api-client";
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function BorrowReturnPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Search state
  const [serial, setSerial] = useState("");
  const [device, setDevice] = useState<any>(null); // Found device
  const [searching, setSearching] = useState(false);

  // Form state
  const [borrowerName, setBorrowerName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [deposit, setDeposit] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // List state
  const [borrows, setBorrows] = useState<any[]>([]);

  const fetchBorrows = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await apiClient.getBorrows(token);
    if (!res.error) {
      setBorrows(res.data || []);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleSearchDevice = async () => {
    if (!serial) return;
    setSearching(true);
    const token = localStorage.getItem("token");
    if (token) {
      const res = await apiClient.getDeviceBySerial(token, serial);
      if (res.data) {
        setDevice(res.data);
        const brand = res.data.DeviceType?.brand || res.data.brand || 'Device';
        const model = res.data.DeviceType?.model || res.data.model || '';
        toast({ title: "Device Found", description: `${brand} ${model}` });
      } else {
        setDevice(null);
        toast({ title: "Device Not Found", variant: "destructive", description: "Serial number not found in system." });
      }
    }
    setSearching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device) {
      toast({ title: "No Device Selected", variant: "destructive" });
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const res = await apiClient.createBorrow(token, {
        device_id: device.device_id,
        borrower_name: borrowerName,
        contact_info: contactInfo,
        due_date: new Date(dueDate).toISOString(),
        deposit_amount: deposit ? parseFloat(deposit) : undefined,
        notes
      });

      if (res.error) {
        toast({ title: "Error", description: res.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Borrow record created" });
        fetchBorrows();
        setDevice(null);
        setSerial("");
        setBorrowerName("");
        setContactInfo("");
        setDeposit("");
        setDueDate("");
        setNotes("");
      }
    }
    setLoading(false);
  };

  const handleReturn = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await apiClient.returnBorrow(token, id, {
      status: 'RETURNED'
    });

    if (!res.error) {
      toast({ title: "Returned", description: "Item marked as returned." });
      fetchBorrows();
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Borrow / Return Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>New Borrow</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter Device Serial Number"
                value={serial}
                onChange={e => setSerial(e.target.value)}
              />
              <Button onClick={handleSearchDevice} disabled={searching}>
                {searching ? <Loader2 className="animate-spin" /> : "Search"}
              </Button>
            </div>

            {device && (
              <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
                <p className="font-semibold text-green-700">Device Found:</p>
                <p>{device.brand} {device.model} (S/N: {device.serial_number})</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Borrower Name</Label>
                <Input value={borrowerName} onChange={e => setBorrowerName(e.target.value)} required />
              </div>
              <div>
                <Label>Contact Info (Tel/Email)</Label>
                <Input value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
              </div>
              <div>
                <Label>Deposit Amount (THB)</Label>
                <Input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
              </div>
              <div>
                <Label>Notes</Label>
                <Input value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading || !device} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Borrow
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active Borrows</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {borrows.length === 0 ? (
                <p className="text-gray-500">No active borrows.</p>
              ) : (
                borrows.map((b) => (
                  <div key={b.transaction_id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm">
                    <div>
                      <p className="font-bold">{b.Device?.DeviceType?.brand || b.Device?.brand} {b.Device?.DeviceType?.model || b.Device?.model}</p>
                      <p className="text-sm text-gray-600">Borrower: {b.borrower_name}</p>
                      <p className="text-sm text-gray-600">Due: {format(new Date(b.due_date), 'dd/MM/yyyy')}</p>
                      <div className="mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${b.status === 'BORROWED' ? 'bg-yellow-100 text-yellow-800' :
                          b.status === 'RETURNED' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                    {b.status === 'BORROWED' && (
                      <Button size="sm" variant="outline" onClick={() => handleReturn(b.transaction_id)}>
                        Return
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
