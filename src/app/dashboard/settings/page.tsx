'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { User, Key, Bell, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setDisplayName(user.displayName || '');
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        setWebhookUrl(snap.data().webhookUrl || '');
      }
    };
    load();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName });
      await updateDoc(doc(db, 'users', user.uid), { displayName, updatedAt: new Date() });
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const saveIntegrations = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), { webhookUrl, updatedAt: new Date() });
      toast.success('Integrations saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'integrations', label: 'Integrations', icon: <Key size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2>Settings</h2>
        <p className="text-sm">Manage your account and preferences</p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Tabs */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                borderRadius: 'var(--radius-md)', fontSize: '0.9rem', textAlign: 'left',
                fontWeight: activeTab === t.id ? 550 : 400,
                color: activeTab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                background: activeTab === t.id ? 'var(--accent-soft)' : 'transparent',
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="card" style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <div>
              <h4 style={{ marginBottom: '20px' }}>Profile Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
                <div className="input-group">
                  <label>Display Name</label>
                  <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input className="input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Email cannot be changed</span>
                </div>
                <button className="btn btn-primary" onClick={saveProfile} disabled={saving} style={{ alignSelf: 'flex-start' }}>
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div>
              <h4 style={{ marginBottom: '20px' }}>Integrations</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
                <div className="input-group">
                  <label>n8n Webhook URL</label>
                  <input className="input" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://your-n8n.com/webhook/leadflow-trigger" />
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Your n8n webhook endpoint for the LeadFlow workflow</span>
                </div>
                <button className="btn btn-primary" onClick={saveIntegrations} disabled={saving} style={{ alignSelf: 'flex-start' }}>
                  <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h4 style={{ marginBottom: '20px' }}>Notification Preferences</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Agent run completed', 'New leads discovered', 'Email delivery reports', 'Weekly summary'].map((n) => (
                  <label key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <span className="text-sm">{n}</span>
                    <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h4 style={{ marginBottom: '20px' }}>Security</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
                <div className="card" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="font-medium text-sm">Password</div>
                  <p className="text-xs" style={{ margin: '4px 0 12px' }}>Change your account password</p>
                  <button className="btn btn-secondary btn-sm">Change Password</button>
                </div>
                <div className="card" style={{ background: 'var(--danger-soft)', borderColor: 'var(--danger)' }}>
                  <div className="font-medium text-sm" style={{ color: 'var(--danger)' }}>Delete Account</div>
                  <p className="text-xs" style={{ margin: '4px 0 12px' }}>Permanently delete your account and all data</p>
                  <button className="btn btn-danger btn-sm">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
