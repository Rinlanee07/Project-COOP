'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Wrench, Plus, Edit, Trash2 } from 'lucide-react';
import { ApiClient } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');

interface TechnicalReport {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  User: {
    username: string;
  };
}

export default function TechnicalReport() {
  const [reports, setReports] = useState<TechnicalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<TechnicalReport | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const { toast } = useToast();

  const getToken = () => {
    try {
      return localStorage.getItem('token');
    } catch (e) {
      console.error('Failed to access localStorage:', e);
      return null;
    }
  };

  const fetchReports = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await apiClient.getTechnicalReports(token);
      if (response.data) {
        setReports(response.data);
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch technical reports',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    try {
      let response;
      if (editingReport) {
        response = await apiClient.updateTechnicalReport(token, editingReport.id.toString(), formData);
      } else {
        response = await apiClient.createTechnicalReport(token, formData);
      }

      if (response.data) {
        toast({
          title: 'Success',
          description: editingReport ? 'Technical report updated successfully' : 'Technical report created successfully',
        });
        setIsDialogOpen(false);
        setFormData({ name: '', phone: '' });
        setEditingReport(null);
        fetchReports();
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving report:', error);
      toast({
        title: 'Error',
        description: 'Failed to save technical report',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (report: TechnicalReport) => {
    setEditingReport(report);
    setFormData({ name: report.name, phone: report.phone });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await apiClient.deleteTechnicalReport(token, id.toString());
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Technical report deleted successfully',
        });
        fetchReports();
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete technical report',
        variant: 'destructive',
      });
    }
  };

  const openAddDialog = () => {
    setEditingReport(null);
    setFormData({ name: '', phone: '' });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-[#E8EBF5]">
        <CardHeader className="bg-gradient-to-r from-[#092A6D] to-[#697293] text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Technical Reports
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="bg-white text-[#092A6D] hover:bg-gray-100">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technician
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingReport ? 'Edit Technician' : 'Add New Technician'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingReport ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.phone}</TableCell>
                  <TableCell>{report.User.username}</TableCell>
                  <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(report)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Technician</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {report.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(report.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {reports.length === 0 && (
            <p className="text-center text-[#666666] mt-4">
              No technical reports found. Add your first technician.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}