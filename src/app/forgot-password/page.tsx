'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Zap, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Reset email sent!');
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.3rem' }}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#fff" />
            </div>
            LeadGen AI
          </Link>
          <h3 style={{ marginTop: '16px' }}>Reset your password</h3>
          <p className="text-sm" style={{ marginTop: '4px' }}>We&apos;ll send you a link to reset it</p>
        </div>
        <div className="card" style={{ padding: '28px' }}>
          {sent ? (
            <div className="text-center" style={{ padding: '20px 0' }}>
              <Mail size={40} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
              <h4>Check your email</h4>
              <p className="text-sm" style={{ margin: '8px 0 24px' }}>We sent a reset link to {email}</p>
              <Link href="/login" className="btn btn-primary">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label>Email address</label>
                <input type="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', padding: '12px' }} disabled={loading}>
                {loading ? <div className="spinner" /> : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
        <Link href="/login" className="text-sm flex items-center justify-center gap-sm" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={14} /> Back to login
        </Link>
      </div>
    </div>
  );
}
