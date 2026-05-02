'use client';

import { useState } from 'react';
import { Play, Search, MapPin, Building, Loader, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface AgentResult {
  success: boolean;
  leads_processed: number;
  timestamp: string;
}

export default function AgentPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const runAgent = async () => {
    if (!query.trim()) { toast.error('Please enter a search query'); return; }
    setRunning(true);
    setResult(null);
    setLogs([]);

    addLog('Initializing LeadFlow AI Agent...');
    await delay(800);
    addLog(`Search query: "${query}" | Location: "${location || 'Global'}" | Industry: "${industry || 'Any'}"`);
    await delay(600);
    addLog('Triggering n8n webhook...');

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl || webhookUrl.includes('your-n8n-instance')) {
        // Demo mode
        addLog('⚠ Running in demo mode (n8n webhook not configured)');
        await delay(1000);
        addLog('Scraping web via ScrapingBee...');
        await delay(1500);
        addLog('Querying Apollo for enrichment...');
        await delay(1200);
        addLog('AI Agent extracting & scoring leads (Groq)...');
        await delay(2000);
        addLog('Found 24 raw leads, parsing JSON...');
        await delay(800);
        addLog('Filtering high-score leads (score ≥ 60)...');
        await delay(600);
        addLog('18 leads passed qualification filter');
        addLog('Verifying emails via Hunter.io...');
        await delay(1500);
        addLog('15 emails verified successfully');
        addLog('AI composing personalized emails (OpenAI)...');
        await delay(2000);
        addLog('Sending emails via Gmail...');
        await delay(1000);
        addLog('Exporting results to Google Sheets...');
        await delay(800);
        addLog('✓ Pipeline complete!');
        setResult({ success: true, leads_processed: 15, timestamp: new Date().toISOString() });
      } else {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, location, industry }),
        });
        const data = await res.json();
        addLog('✓ Pipeline complete!');
        setResult(data);
      }
      toast.success('Agent run completed!');
    } catch (err) {
      addLog(`✗ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      toast.error('Agent run failed');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2>AI Agent</h2>
        <p className="text-sm">Configure and trigger your LeadFlow AI pipeline</p>
      </div>

      {/* Workflow Visualization */}
      <div className="card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>n8n Workflow Pipeline</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['Webhook', 'Scrape Web', 'AI Extract', 'Score', 'Verify Email', 'AI Email', 'Send Gmail', 'Export Sheets'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500,
                background: running && i <= Math.floor(logs.length / 2) ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                color: running && i <= Math.floor(logs.length / 2) ? 'var(--accent)' : 'var(--text-tertiary)',
                border: '1px solid var(--border)', transition: 'all var(--transition-base)',
              }}>{step}</span>
              {i < 7 && <ArrowRight size={12} style={{ color: 'var(--text-tertiary)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Config */}
        <div className="card">
          <h4 style={{ marginBottom: '20px' }}>Search Configuration</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label>Search Query *</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input className="input" placeholder='e.g. "SaaS Founders" or "Marketing Agencies"' value={query} onChange={(e) => setQuery(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>
            <div className="input-group">
              <label>Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input className="input" placeholder="e.g. New York, London, Remote" value={location} onChange={(e) => setLocation(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>
            <div className="input-group">
              <label>Industry</label>
              <div style={{ position: 'relative' }}>
                <Building size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input className="input" placeholder="e.g. Fintech, Healthcare, E-commerce" value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'center', padding: '12px', marginTop: '8px' }} onClick={runAgent} disabled={running}>
              {running ? <><Loader size={18} className="spinning" /> Running Agent...</> : <><Play size={18} /> Run AI Agent</>}
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ marginBottom: '16px' }}>Agent Logs</h4>
          <div style={{
            flex: 1, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '16px',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', overflowY: 'auto', maxHeight: '360px',
            minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '6px',
          }}>
            {logs.length === 0 ? (
              <span style={{ color: 'var(--text-tertiary)' }}>Agent logs will appear here...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ color: log.includes('✓') ? 'var(--success)' : log.includes('✗') ? 'var(--danger)' : log.includes('⚠') ? 'var(--warning)' : 'var(--text-secondary)' }}>
                  {log}
                </div>
              ))
            )}
            {running && <div className="spinner" style={{ marginTop: '8px' }} />}
          </div>

          {result && (
            <div style={{ marginTop: '16px', padding: '14px', borderRadius: 'var(--radius-md)', background: result.success ? 'var(--success-soft)' : 'var(--danger-soft)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {result.success ? <CheckCircle size={18} style={{ color: 'var(--success)' }} /> : <AlertCircle size={18} style={{ color: 'var(--danger)' }} />}
              <div>
                <div className="text-sm font-medium">{result.success ? 'Agent Run Successful' : 'Agent Run Failed'}</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{result.leads_processed} leads processed</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
