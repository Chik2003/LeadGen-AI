'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Zap, LayoutDashboard, Users, Cpu, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { href: '/dashboard/leads', icon: <Users size={20} />, label: 'Leads' },
  { href: '/dashboard/agent', icon: <Cpu size={20} />, label: 'AI Agent' },
  { href: '/dashboard/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  { href: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '72px' : 'var(--sidebar-width)',
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--transition-base)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '10px', height: 'var(--header-height)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={18} color="#fff" />
          </div>
          {!collapsed && <span style={{ fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>LeadGen AI</span>}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '10px' : '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: active ? 550 : 400,
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                background: active ? 'var(--accent-soft)' : 'transparent',
                transition: 'all var(--transition-fast)',
                justifyContent: collapsed ? 'center' : 'flex-start',
                whiteSpace: 'nowrap',
              }} title={item.label}>
                {item.icon}
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: collapsed ? '10px' : '10px 14px',
            borderRadius: 'var(--radius-md)', width: '100%', color: 'var(--text-tertiary)', fontSize: '0.85rem',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}>
            {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> Collapse</>}
          </button>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: collapsed ? '10px' : '10px 14px',
            borderRadius: 'var(--radius-md)', width: '100%', color: 'var(--danger)', fontSize: '0.85rem',
            justifyContent: collapsed ? 'center' : 'flex-start', marginTop: '2px',
          }} title="Logout">
            <LogOut size={18} />
            {!collapsed && 'Log Out'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: collapsed ? '72px' : 'var(--sidebar-width)',
        transition: 'margin-left var(--transition-base)',
        minHeight: '100vh',
      }}>
        {/* Top Bar */}
        <header style={{
          height: 'var(--header-height)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 24px',
          background: 'var(--bg-card)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user.displayName || user.email}</span>
            <div style={{
              width: 34, height: 34, borderRadius: 'var(--radius-full)',
              background: 'var(--accent-soft)', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: '0.85rem',
            }}>
              {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '28px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
