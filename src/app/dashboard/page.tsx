'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Users, Mail, Target, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface UserData {
  credits: number;
  leadsGenerated: number;
  emailsSent: number;
  plan: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setUserData(snap.data() as UserData);
    };
    fetchData();
  }, [user]);

  const stats = [
    { label: 'Leads Generated', value: userData?.leadsGenerated ?? 0, icon: <Users size={20} />, color: 'var(--accent)' },
    { label: 'Emails Sent', value: userData?.emailsSent ?? 0, icon: <Mail size={20} />, color: 'var(--success)' },
    { label: 'Credits Left', value: userData?.credits ?? 0, icon: <Target size={20} />, color: 'var(--warning)' },
    { label: 'Conversion Rate', value: '12.4%', icon: <TrendingUp size={20} />, color: 'var(--info)' },
  ];

  const recentActivity = [
    { action: 'Lead scraped', detail: 'Found 24 leads for "SaaS Founders in NYC"', time: '2 min ago', status: 'success' },
    { action: 'Emails sent', detail: '18 personalized emails delivered', time: '15 min ago', status: 'success' },
    { action: 'Verification', detail: '3 emails bounced, 21 verified', time: '20 min ago', status: 'warning' },
    { action: 'New campaign', detail: 'Started "Fintech Leaders Q1"', time: '1 hour ago', status: 'info' },
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '28px' }}>
        <h2>Welcome back, {user?.displayName?.split(' ')[0] || 'there'}</h2>
        <p className="text-sm">Here&apos;s an overview of your lead generation activity.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Quick Actions */}
        <div className="card">
          <h4 style={{ marginBottom: '16px' }}>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/dashboard/agent" className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <div className="font-medium text-sm">Run AI Agent</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Start a new lead generation campaign</div>
                </div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-tertiary)' }} />
            </Link>
            <Link href="/dashboard/leads" className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--success-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-medium text-sm">View Leads</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Browse and manage your lead database</div>
                </div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-tertiary)' }} />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h4 style={{ marginBottom: '16px' }}>Recent Activity</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'success' ? 'var(--success)' : a.status === 'warning' ? 'var(--warning)' : 'var(--info)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="text-sm font-medium">{a.action}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{a.detail}</div>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Banner */}
      {userData?.plan === 'free' && (
        <div className="card" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--accent-soft)', border: '1px solid var(--accent-muted)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="font-semibold">Upgrade to Growth</div>
            <p className="text-sm" style={{ marginTop: '4px' }}>Get 500 credits/month and unlock personalized email outreach.</p>
          </div>
          <Link href="/dashboard/settings" className="btn btn-primary btn-sm">Upgrade Plan</Link>
        </div>
      )}
    </div>
  );
}
