'use client';
/**
 * SettingsView — Clinician profile, preferences, and data management
 * Updated to use the new PracticeSettings store shape
 */
import { useAppStore } from '@/lib/store';
import type { PracticeSettings } from '@/lib/types';
import { Settings, Sun, Save, Trash2, Download } from 'lucide-react';

export default function SettingsView() {
  const { practiceSettings, updatePracticeSettings, evaluations } = useAppStore();
  const info = practiceSettings;

  const update = (field: keyof PracticeSettings, value: string) => {
    updatePracticeSettings({ [field]: value });
  };

  const handleExportAll = () => {
    const data = JSON.stringify(evaluations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'tjil-backup.json';
    a.click(); URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (window.confirm('Delete ALL evaluations? This cannot be undone.')) {
      localStorage.removeItem('tjil-platform-v2');
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--ivory-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={20} color="var(--charcoal-light)" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--charcoal)' }}>Settings</h1>
          <p style={{ fontSize: 13, color: 'var(--charcoal-light)' }}>Manage your practice profile and preferences</p>
        </div>
      </div>

      {/* Practice Profile */}
      <div className="card" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 20 }}>Practice Profile</h2>
        <p style={{ fontSize: 12, color: 'var(--charcoal-light)', marginBottom: 20 }}>
          This information pre-fills on every new evaluation. Changes save instantly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="form-label">Evaluator Name</label>
            <input className="form-input" value={info.evaluatorName} onChange={e => update('evaluatorName', e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="form-label">License Type</label>
            <input className="form-input" value={info.licenseType} onChange={e => update('licenseType', e.target.value)} placeholder="e.g. LCSW" />
          </div>
          <div>
            <label className="form-label">License Number</label>
            <input className="form-input" value={info.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} placeholder="#000000" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="form-label">Practice Name</label>
            <input className="form-input" value={info.practiceName} onChange={e => update('practiceName', e.target.value)} placeholder="Practice name" />
          </div>
          <div>
            <label className="form-label">Credentials</label>
            <input className="form-input" value={info.credentials} onChange={e => update('credentials', e.target.value)} placeholder="PhD, LCSW..." />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="form-label">Office Address</label>
          <input className="form-input" value={info.address} onChange={e => update('address', e.target.value)} placeholder="Full office address" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="form-label">Phone</label>
            <input className="form-input" type="tel" value={info.phone} onChange={e => update('phone', e.target.value)} placeholder="(555) 000-0000" />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={info.email} onChange={e => update('email', e.target.value)} placeholder="you@practice.com" />
          </div>
        </div>
        <div>
          <label className="form-label">Report Header Text</label>
          <textarea className="form-textarea" rows={4} value={info.reportHeaderText} onChange={e => update('reportHeaderText', e.target.value)} placeholder="Professional header text for reports..." />
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" style={{ fontSize: 13 }}>
            <Save size={14} /> Profile Saved
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="card" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 16 }}>Appearance</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sun size={18} color="var(--gold)" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--charcoal)' }}>Theme</div>
              <div style={{ fontSize: 12, color: 'var(--charcoal-light)' }}>Currently: Light</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card" style={{ borderRadius: 16, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 16 }}>Data Management</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={handleExportAll} style={{ fontSize: 13 }}>
            <Download size={14} /> Export All Data (JSON)
          </button>
          <button onClick={handleClearAll} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(199,92,92,0.08)', color: 'var(--rose)', border: '1.5px solid rgba(199,92,92,0.20)', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            <Trash2 size={14} /> Clear All Data
          </button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--charcoal-light)', marginTop: 12 }}>
          All data is stored locally in your browser. No data is sent to any server.
        </p>
      </div>
    </div>
  );
}
