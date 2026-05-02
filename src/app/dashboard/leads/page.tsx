'use client';

import { useState } from 'react';
import { Search, Filter, Download, ChevronDown, ExternalLink, Mail } from 'lucide-react';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  location: string;
  qualification_score: number;
  email_verified: boolean;
  status: string;
  created_at: string;
}

const demoLeads: Lead[] = [
  { id: '1', full_name: 'Sarah Chen', email: 'sarah@techvault.io', company: 'TechVault', role: 'CTO', industry: 'SaaS', location: 'San Francisco', qualification_score: 92, email_verified: true, status: 'contacted', created_at: '2026-04-27' },
  { id: '2', full_name: 'Marcus Johnson', email: 'marcus@dataflow.com', company: 'DataFlow', role: 'VP Engineering', industry: 'Data Analytics', location: 'New York', qualification_score: 85, email_verified: true, status: 'verified', created_at: '2026-04-27' },
  { id: '3', full_name: 'Priya Patel', email: 'priya@cloudnine.dev', company: 'CloudNine', role: 'Head of Growth', industry: 'Cloud Infrastructure', location: 'Austin', qualification_score: 78, email_verified: true, status: 'scraped', created_at: '2026-04-26' },
  { id: '4', full_name: 'David Kim', email: 'david@finstack.co', company: 'FinStack', role: 'CEO', industry: 'Fintech', location: 'Chicago', qualification_score: 88, email_verified: false, status: 'unverified', created_at: '2026-04-26' },
  { id: '5', full_name: 'Emma Wilson', email: 'emma@marketpro.io', company: 'MarketPro', role: 'CMO', industry: 'Marketing', location: 'London', qualification_score: 73, email_verified: true, status: 'sent', created_at: '2026-04-25' },
];

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(demoLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = leads.filter((l) => {
    const matchSearch = l.full_name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getScoreColor = (score: number) => score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--warning)' : 'var(--danger)';
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { scraped: 'badge-info', verified: 'badge-success', contacted: 'badge-accent', sent: 'badge-success', unverified: 'badge-warning' };
    return map[status] || 'badge-info';
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2>Leads</h2>
          <p className="text-sm">{leads.length} total leads in your database</p>
        </div>
        <button className="btn btn-secondary btn-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input className="input" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '38px' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ paddingLeft: '34px', paddingRight: '32px', appearance: 'none', minWidth: '160px' }}>
            <option value="all">All Status</option>
            <option value="scraped">Scraped</option>
            <option value="verified">Verified</option>
            <option value="contacted">Contacted</option>
            <option value="sent">Sent</option>
            <option value="unverified">Unverified</option>
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Role</th>
              <th>Score</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{lead.full_name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{lead.email}</div>
                </td>
                <td>{lead.company}</td>
                <td className="text-sm">{lead.role}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                      <div style={{ width: `${lead.qualification_score}%`, height: '100%', background: getScoreColor(lead.qualification_score), borderRadius: 2 }} />
                    </div>
                    <span className="text-sm font-medium">{lead.qualification_score}</span>
                  </div>
                </td>
                <td><span className={`badge ${getStatusBadge(lead.status)}`}>{lead.status}</span></td>
                <td>
                  <span className={`badge ${lead.email_verified ? 'badge-success' : 'badge-warning'}`}>
                    {lead.email_verified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Send email"><Mail size={15} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="View profile"><ExternalLink size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
