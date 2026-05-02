'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Zap, Target, Mail, BarChart3, Shield, ArrowRight, CheckCircle, Star, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: <Target size={22} />, title: 'AI Lead Discovery', desc: 'Scrape and discover leads from the web using AI-powered search across Google, Apollo, and more.' },
    { icon: <Zap size={22} />, title: 'Smart Scoring', desc: 'AI agent scores each lead 0-100 based on email presence, LinkedIn profile, role clarity, and industry fit.' },
    { icon: <Shield size={22} />, title: 'Email Verification', desc: 'Verify email addresses via Hunter.io to ensure deliverability before sending outreach.' },
    { icon: <Mail size={22} />, title: 'Personalized Outreach', desc: 'AI composes unique, personalized emails with hooks tailored to each lead\'s pain points.' },
    { icon: <BarChart3 size={22} />, title: 'Analytics Dashboard', desc: 'Track leads generated, emails sent, open rates, and conversion metrics in real-time.' },
    { icon: <CheckCircle size={22} />, title: 'Auto Export', desc: 'Automatically export verified leads and campaign data to Google Sheets for your records.' },
  ];

  const steps = [
    { num: '01', title: 'Configure Search', desc: 'Enter your target industry, location, and ideal customer profile.' },
    { num: '02', title: 'AI Discovers Leads', desc: 'Our agent scrapes the web and extracts structured lead data.' },
    { num: '03', title: 'Score & Verify', desc: 'Leads are scored by quality and emails are verified for deliverability.' },
    { num: '04', title: 'Personalized Outreach', desc: 'AI composes and sends tailored emails to qualified leads.' },
  ];

  const plans = [
    { name: 'Starter', price: '$0', period: '/month', credits: '50', features: ['50 leads/month', 'AI lead scoring', 'Basic email verification', 'Google Sheets export', 'Email support'], popular: false },
    { name: 'Growth', price: '$49', period: '/month', credits: '500', features: ['500 leads/month', 'AI lead scoring + enrichment', 'Full email verification', 'Personalized email outreach', 'Priority support', 'Analytics dashboard'], popular: true },
    { name: 'Scale', price: '$149', period: '/month', credits: '2500', features: ['2,500 leads/month', 'Everything in Growth', 'Advanced AI personalization', 'Multi-campaign support', 'API access', 'Dedicated account manager'], popular: false },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--bg-card)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all var(--transition-base)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-height)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.2rem' }}>
            <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#fff" />
            </div>
            LeadGen AI
          </Link>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#features" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Features</a>
            <a href="#how-it-works" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>How It Works</a>
            <a href="#pricing" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Pricing</a>
            <Link href="/login" className="btn btn-secondary btn-sm">Log In</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Get Started Free</Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} style={{ display: 'none' }}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container text-center" style={{ maxWidth: '720px' }}>
          <div className="fade-in" style={{ marginBottom: '20px' }}>
            <span className="badge badge-accent" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
              <Zap size={14} /> AI-Powered Lead Generation
            </span>
          </div>
          <h1 className="slide-up" style={{ marginBottom: '20px' }}>
            Find, qualify, and engage your ideal leads with AI
          </h1>
          <p className="slide-up" style={{ fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto 36px', animationDelay: '0.1s' }}>
            Automate your entire lead generation pipeline — from discovery to personalized outreach — powered by intelligent AI agents.
          </p>
          <div className="slide-up flex items-center justify-center gap-md" style={{ animationDelay: '0.2s' }}>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn btn-secondary btn-lg">
              See How It Works
            </a>
          </div>
          <p className="slide-up text-sm" style={{ marginTop: '16px', color: 'var(--text-tertiary)', animationDelay: '0.3s' }}>
            No credit card required · 50 free leads included
          </p>
        </div>
      </section>

      {/* Workflow Visual */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div className="card card-elevated" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Webhook Trigger', 'Web Scraping', 'AI Extraction', 'Lead Scoring', 'Email Verify', 'AI Email', 'Send', 'Export'].map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    padding: '8px 16px', background: i === 2 || i === 5 ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 500,
                    color: i === 2 || i === 5 ? 'var(--accent)' : 'var(--text-secondary)',
                    border: `1px solid ${i === 2 || i === 5 ? 'var(--accent-muted)' : 'var(--border)'}`,
                    whiteSpace: 'nowrap',
                  }}>
                    {step}
                  </div>
                  {i < 7 && <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px', maxWidth: '520px', margin: '0 auto 48px' }}>
            <h2>Everything you need to generate leads at scale</h2>
            <p style={{ marginTop: '12px' }}>An end-to-end AI pipeline that handles the entire lead lifecycle.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '16px' }}>
                  {f.icon}
                </div>
                <h4 style={{ marginBottom: '8px' }}>{f.title}</h4>
                <p className="text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2>How LeadGen AI works</h2>
            <p style={{ marginTop: '12px' }}>Four simple steps to automated lead generation</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
            {steps.map((s, i) => (
              <div key={i} className="card card-elevated" style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', opacity: 0.3, marginBottom: '12px' }}>{s.num}</div>
                <h4 style={{ marginBottom: '8px' }}>{s.title}</h4>
                <p className="text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2>Simple, transparent pricing</h2>
            <p style={{ marginTop: '12px' }}>Start free and scale as you grow</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '920px', margin: '0 auto' }}>
            {plans.map((p, i) => (
              <div key={i} className="card" style={{
                padding: '32px 28px', position: 'relative',
                border: p.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
              }}>
                {p.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="badge badge-accent" style={{ padding: '4px 14px' }}>
                      <Star size={12} /> Most Popular
                    </span>
                  </div>
                )}
                <h4>{p.name}</h4>
                <div style={{ margin: '16px 0 8px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>{p.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{p.period}</span>
                </div>
                <p className="text-sm" style={{ marginBottom: '24px' }}>{p.credits} credits/month</p>
                <div className="divider" style={{ marginBottom: '20px' }} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={15} style={{ color: 'var(--success)', flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'} w-full`} style={{ justifyContent: 'center' }}>
                  {p.name === 'Starter' ? 'Get Started Free' : 'Start Trial'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container text-center" style={{ maxWidth: '600px' }}>
          <h2>Ready to automate your lead generation?</h2>
          <p style={{ margin: '12px 0 32px' }}>Join hundreds of teams using LeadGen AI to find and engage their ideal customers.</p>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
            <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} color="#fff" />
            </div>
            LeadGen AI
          </div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>© 2026 LeadGen AI. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
