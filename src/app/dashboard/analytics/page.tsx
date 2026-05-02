'use client';

import { BarChart3, TrendingUp, Users, Mail, Target } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', leads: 12, emails: 8 },
  { day: 'Tue', leads: 19, emails: 14 },
  { day: 'Wed', leads: 8, emails: 5 },
  { day: 'Thu', leads: 24, emails: 18 },
  { day: 'Fri', leads: 16, emails: 11 },
  { day: 'Sat', leads: 6, emails: 4 },
  { day: 'Sun', leads: 3, emails: 2 },
];

const topIndustries = [
  { name: 'SaaS', count: 45, pct: 85 },
  { name: 'Fintech', count: 32, pct: 65 },
  { name: 'E-commerce', count: 28, pct: 55 },
  { name: 'Healthcare', count: 18, pct: 35 },
  { name: 'Marketing', count: 12, pct: 24 },
];

export default function AnalyticsPage() {
  const maxLeads = Math.max(...weeklyData.map((d) => d.leads));

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2>Analytics</h2>
        <p className="text-sm">Track your lead generation performance</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Leads', value: '248', change: '+18%', icon: <Users size={18} />, color: 'var(--accent)' },
          { label: 'Emails Sent', value: '186', change: '+12%', icon: <Mail size={18} />, color: 'var(--success)' },
          { label: 'Open Rate', value: '34.2%', change: '+5%', icon: <TrendingUp size={18} />, color: 'var(--info)' },
          { label: 'Avg Score', value: '76', change: '+3', icon: <Target size={18} />, color: 'var(--warning)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value" style={{ fontSize: '1.75rem' }}>{s.value}</div>
                <div className="stat-change" style={{ color: 'var(--success)' }}>{s.change} this week</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Bar Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={18} /> Weekly Activity</h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Leads</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--success)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Emails</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', padding: '0 8px' }}>
            {weeklyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '170px', width: '100%' }}>
                  <div style={{
                    flex: 1, background: 'var(--accent)', borderRadius: '4px 4px 0 0',
                    height: `${(d.leads / maxLeads) * 100}%`, transition: 'height 0.5s ease', minHeight: '4px',
                  }} />
                  <div style={{
                    flex: 1, background: 'var(--success)', borderRadius: '4px 4px 0 0',
                    height: `${(d.emails / maxLeads) * 100}%`, transition: 'height 0.5s ease', minHeight: '4px',
                  }} />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Industries */}
        <div className="card">
          <h4 style={{ marginBottom: '20px' }}>Top Industries</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topIndustries.map((ind, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="text-sm font-medium">{ind.name}</span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{ind.count} leads</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${ind.pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
