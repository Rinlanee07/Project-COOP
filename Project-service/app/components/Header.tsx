// components/Header.tsx
"use client";

import { Settings, Plus, HelpCircle } from 'lucide-react';
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
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguageEnhanced } from '@/hooks/use-language-enhanced';
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
  const { toast } = useToast();
  const { t } = useLanguageEnhanced();
  const router = useRouter();
  const pathname = usePathname();

  // Get page title based on current route
  const getPageTitle = () => {
    if (pathname === '/dashboard') return t('dashboard');
    if (pathname === '/dashboard/create-repair') return t('create_repair');
    if (pathname.startsWith('/dashboard/repair-details')) return t('repair_details');
    if (pathname === '/dashboard/status-tracking') return t('status_tracking');
    if (pathname === '/settings') return t('settings');
    return t('dashboard');
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
        <DialogContent className="sm:max-w-[425px] bg-background border border-border text-foreground rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-destructive flex items-center gap-2">
              ⚠️ {t('confirm_logout')}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {t('logout_confirmation_message')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1"
            >
              {t('logout')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 ml-0 md:ml-[240px] transition-all">
          {/* Left: Page Title & Breadcrumb */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{getPageTitle()}</span>
              <span className="text-accent">›</span>
              <span>{t('view_all')}</span>
            </div>
          </div>

          {/* Right: Actions, User Menu */}
          <div className="flex items-center gap-4">

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard/create-repair">
                <Button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  <span>{t('create_new')}</span>
                </Button>
              </Link>

              {/* Help Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-accent rounded-full"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle
                  variant="icon"
                  size="md"
                  className="text-primary hover:bg-accent"
                />
              </div>

              {/* Language Selector */}
              <div className="hidden sm:block">
                <LanguageSelector
                  variant="dropdown"
                  size="md"
                  showFlag={true}
                  showLabel={false}
                  className="text-primary hover:bg-accent"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-primary hover:bg-accent rounded-lg"
                  >
                    <Avatar className="h-9 w-9 border-2 border-accent">
                      <AvatarImage src={user?.avatar || undefined} alt="Profile" />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-foreground">
                        {loading ? 'Loading...' : user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {loading ? '...' : user?.role || 'User'}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-background border border-border text-foreground shadow-lg min-w-[200px] rounded-lg"
                >
                  {/* Display user info */}
                  <div className="px-3 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.role || 'User'}</p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 hover:bg-accent cursor-pointer py-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>{t('settings')}</span>
                    </Link>
                  </DropdownMenuItem>

                  {/* Mobile Theme and Language Controls */}
                  <div className="sm:hidden">
                    <DropdownMenuSeparator />

                    <div className="px-3 py-2">
                      <p className="text-xs font-medium text-muted-foreground mb-2">{t('preferences')}</p>

                      {/* Theme Toggle for Mobile */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm text-foreground">{t('theme')}</span>
                        <ThemeToggle
                          variant="dropdown"
                          size="sm"
                          showLabel={false}
                          className="text-primary"
                        />
                      </div>

                      {/* Language Selector for Mobile */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm text-foreground">{t('language')}</span>
                        <LanguageSelector
                          variant="dropdown"
                          size="sm"
                          showFlag={true}
                          showLabel={false}
                          className="text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setLogoutDialogOpen(true);
                    }}
                    className="text-destructive focus:text-destructive hover:bg-destructive/10 cursor-pointer py-2"
                  >
                    {t('logout')}
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