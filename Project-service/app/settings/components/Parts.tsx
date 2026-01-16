'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { ApiClient } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002');

interface Part {
  id: number;
  part_no: string;
  description: string;
  created_at: string;
  updated_at: string;
  User: {
    username: string;
  };
}

export default function Parts() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [formData, setFormData] = useState({ part_no: '', description: '' });
  const { toast } = useToast();

  const getToken = () => {
    try {
      return localStorage.getItem('token');
    } catch (e) {
      console.error('Failed to access localStorage:', e);
      return null;
    }
  };

  const fetchParts = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await apiClient.getParts(token);
      if (response.data) {
        setParts(response.data);
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch parts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    try {
      let response;
      if (editingPart) {
        response = await apiClient.updatePart(token, editingPart.id.toString(), formData);
      } else {
        response = await apiClient.createPart(token, formData);
      }

      if (response.data) {
        toast({
          title: 'Success',
          description: editingPart ? 'Part updated successfully' : 'Part created successfully',
        });
        setIsDialogOpen(false);
        setFormData({ part_no: '', description: '' });
        setEditingPart(null);
        fetchParts();
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving part:', error);
      toast({
        title: 'Error',
        description: 'Failed to save part',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (part: Part) => {
    setEditingPart(part);
    setFormData({ part_no: part.part_no, description: part.description });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await apiClient.deletePart(token, id.toString());
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Part deleted successfully',
        });
        fetchParts();
      } else if (response.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting part:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete part',
        variant: 'destructive',
      });
    }
  };

  const openAddDialog = () => {
    setEditingPart(null);
    setFormData({ part_no: '', description: '' });
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
              <Settings className="w-5 h-5" />
              Parts Management
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="bg-white text-[#092A6D] hover:bg-gray-100">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Part
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingPart ? 'Edit Part' : 'Add New Part'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="part_no">Part No.</Label>
                    <Input
                      id="part_no"
                      value={formData.part_no}
                      onChange={(e) => setFormData({ ...formData, part_no: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingPart ? 'Update' : 'Create'}
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
                <TableHead>Part No.</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell>{part.part_no}</TableCell>
                  <TableCell>{part.description}</TableCell>
                  <TableCell>{part.User.username}</TableCell>
                  <TableCell>{new Date(part.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(part)}
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
                            <AlertDialogTitle>Delete Part</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete part {part.part_no}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(part.id)}>
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
          {parts.length === 0 && (
            <p className="text-center text-[#666666] mt-4">
              No parts found. Add your first part.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}