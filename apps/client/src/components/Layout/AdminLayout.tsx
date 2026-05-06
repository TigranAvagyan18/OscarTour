import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Map, Settings, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Tours',     href: '/admin/tours', icon: Map },
  { label: 'Settings',  href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside
        className={`hidden md:flex h-screen bg-white border-r border-slate-200 transition-all duration-300 flex-col flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
          {!collapsed && <span className="font-semibold text-lg">Tours Admin</span>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={collapsed ? label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <button
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 w-full transition-colors`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex z-50">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                active ? 'text-brand-700' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
