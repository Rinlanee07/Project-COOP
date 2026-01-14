// components/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Wrench, FileText, Clock, Settings, LucideIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguageEnhanced } from '@/hooks/use-language-enhanced';

interface MenuItem {
  nameKey: string; // Translation key instead of hardcoded name
  path: string;
  icon: LucideIcon;
  key: string; 
}

const menuItems: MenuItem[] = [
  { nameKey: 'dashboard', path: '/dashboard', icon: Home, key: 'dashboard' },
  { nameKey: 'create_repair', path: '/dashboard/create-repair', icon: Wrench, key: 'create-repair' },
  { nameKey: 'borrow_return', path: '/dashboard/borrow-return', icon: Clock, key: 'status-tracking' },
  { nameKey: 'repair_details', path: '/dashboard/repair-details', icon: FileText, key: 'repair-list' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useLanguageEnhanced();

  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="fixed left-0 top-0 w-[240px] h-screen flex flex-col border-r border-sidebar-border bg-sidebar z-50 shadow-lg hidden md:flex">
      {/* Logo/Brand Section */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <Wrench className="h-6 w-6 text-sidebar-foreground" />
        </div>
        <span className="text-lg font-bold text-sidebar-foreground">{t('repair')} {t('system')}</span>
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
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <IconComponent className={cn(
                  'w-5 h-5 flex-shrink-0',
                  active ? 'text-white' : 'text-white/70 group-hover:text-white'
                )} />
                <span className="text-sm font-medium">
                  {t(item.nameKey)}
                </span>
                {active && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-border space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings className="w-5 h-5 text-white/70" />
          <span className="text-sm">{t('settings')}</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <HelpCircle className="w-5 h-5 text-white/70" />
          <span className="text-sm">{t('help')}</span>
        </Link>
        
        <div className="px-4 py-2 text-xs text-white/50">
          <p></p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
