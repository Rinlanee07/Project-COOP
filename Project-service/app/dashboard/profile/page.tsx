"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [user, setUser] = useState<any>(null);

    // Form fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await apiClient.getProfile(token);
            if (res.data) {
                setUser(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
            }
            setLoading(false);
        };
        load();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
            return;
        }

        setSaving(true);
        const token = localStorage.getItem("token");
        if (token) {
            const res = await apiClient.updateProfile(token, {
                username,
                email, // Assuming email is editable
                password: password || undefined
            });

            if (!res.error) {
                toast({ title: "Success", description: "Profile updated successfully." });
                setPassword("");
                setConfirmPassword("");
            } else {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            }
        }
        setSaving(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input value={user?.user_role} disabled className="bg-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <Label>Username</Label>
                            <Input value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
                        </div>
                        <div className="pt-4 border-t">
                            <h3 className="font-medium mb-4">Change Password (Optional)</h3>
                            <div className="space-y-2 mb-4">
                                <Label>New Password</Label>
                                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current" />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm Password</Label>
                                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                            </div>
                        </div>

                        <Button type="submit" disabled={saving} className="w-full">
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
