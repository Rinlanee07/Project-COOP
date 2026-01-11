// components/Header.tsx
"use client";

import { Settings, Search, Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ProfileData } from 'types/profile';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Header = () => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Get page title based on current route
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/dashboard/create-repair') return 'Create Repair';
    if (pathname.startsWith('/dashboard/repair-details')) return 'Repair Details';
    if (pathname === '/dashboard/status-tracking') return 'Status Tracking';
    if (pathname === '/settings') return 'Settings';
    return 'Dashboard';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // ดึง user จาก localStorage (ที่เก็บตอน login/register)
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!token) {
          // ไม่มี token → ไปหน้า home
          router.push('/');
          return;
        }

        if (storedUser) {
          // มี user ใน localStorage → ใช้ทันที
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setLoading(false);
        }
      } catch (err) {
        console.error('Profile load error:', err);
        toast({
          title: 'Error',
          description: 'Network error.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router, toast]);

  const handleLogout = () => {
    // ลบ token และ user ออกจาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLogoutDialogOpen(false);
    router.push('/');
  };

  const initials = user
    ? user.name
        .split(' ')
        .filter(part => part.length > 0)
        .map(part => part[0].toUpperCase())
        .join('')
    : 'JD';

  return (
    <>
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-[#E8EBF5] text-[#333333] rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              ⚠️ Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-[#666666] mt-2">
              Are you sure you want to logout?  
              You will need to login again to use the repair system
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              className="flex-1 border-[#E8EBF5] text-[#333333] hover:bg-[#F5F7FA]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="bg-white border-b border-[#E8EBF5] sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 ml-0 md:ml-[240px] transition-all">
          {/* Left: Page Title & Breadcrumb */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#092A6D]">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[#666666] mt-1">
              <span>{getPageTitle()}</span>
              <span className="text-[#D7B55A]">›</span>
              <span>View All</span>
            </div>
          </div>

          {/* Right: Search, Actions, User Menu */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#697293]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-[#E8EBF5] rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#D7B55A] focus:border-transparent transition-all"
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard/create-repair">
                <Button className="flex items-center gap-2 bg-[#D7B55A] hover:bg-[#C4A04A] text-white font-medium transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  <span>Create New</span>
                </Button>
              </Link>
              
              {/* Help Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="text-[#092A6D] hover:bg-[#E8EBF5] rounded-full"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-[#092A6D] hover:bg-[#E8EBF5] rounded-lg"
                  >
                    <Avatar className="h-9 w-9 border-2 border-[#D7B55A]">
                      <AvatarImage src={user?.avatar || undefined} alt="Profile" />
                      <AvatarFallback className="bg-[#092A6D] text-white font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-[#333333]">
                        {loading ? 'Loading...' : user?.name || 'User'}
                      </p>
                      <p className="text-xs text-[#666666]">
                        {loading ? '...' : user?.role || 'User'}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-[#E8EBF5] text-[#333333] shadow-lg min-w-[200px] rounded-lg"
                >
                  {/* Display user info */}
                  <div className="px-3 py-3 border-b border-[#E8EBF5]">
                    <p className="text-sm font-semibold text-[#333333]">{user?.name || 'User'}</p>
                    <p className="text-xs text-[#666666]">{user?.role || 'User'}</p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 hover:bg-[#F5F7FA] cursor-pointer py-2">
                      <Settings className="h-4 w-4 text-[#092A6D]" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-[#E8EBF5]" />

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setLogoutDialogOpen(true);
                    }}
                    className="text-red-600 focus:text-red-600 hover:bg-red-50 cursor-pointer py-2"
                  >
                    ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;