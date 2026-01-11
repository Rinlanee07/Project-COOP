// components/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Wrench, FileText, Clock, Settings, LucideIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  key: string; 
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Home, key: 'dashboard' },
  { name: 'Create Repair', path: '/dashboard/create-repair', icon: Wrench, key: 'create-repair' },
  { name: 'Borrow/Return', path: '/dashboard/borrow-return', icon: Clock, key: 'status-tracking' },
  { name: 'Repair Details', path: '/dashboard/repair-details', icon: FileText, key: 'repair-list' },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return pathname === '/dashboard' || pathname.startsWith('/dashboard/repair-details/');
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="fixed left-0 top-0 w-[240px] h-screen flex flex-col border-r border-[#697293]/30 bg-[#092A6D] z-50 shadow-lg hidden md:flex">
      {/* Logo/Brand Section */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#697293]/30">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <Wrench className="h-6 w-6 text-white" />
        </div>
        <span className="text-lg font-bold text-white">Repair System</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.key}
                href={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group',
                  active
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <IconComponent className={cn(
                  'w-5 h-5 flex-shrink-0',
                  active ? 'text-white' : 'text-white/60 group-hover:text-white'
                )} />
                <span className="text-sm font-medium">
                  {item.name}
                </span>
                {active && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/70" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-[#697293]/30 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings className="w-5 h-5 text-white/60" />
          <span className="text-sm">Settings</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <HelpCircle className="w-5 h-5 text-white/60" />
          <span className="text-sm">Profile</span>
        </Link>
        
        <div className="px-4 py-2 text-xs text-white/50">
          <p></p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
