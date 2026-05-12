'use client';
/**
 * SettingsView — Clinician profile, preferences, and data management
 */
import { useAppStore, ClinicianInfo, LicenseType } from '@/lib/store';
import { Settings, Moon, Sun, Save, Trash2, Download } from 'lucide-react';

const LICENSE_TYPES: LicenseType[] = ['LCSW','LCSW-C','LMFT','LPC','LCPC','LMHC','PhD','PsyD','MD','Other'];

export default function SettingsView() {
  const { savedClinicianInfo, saveClinicianInfo, darkMode, toggleDarkMode, evaluations } = useAppStore();
  const info = savedClinicianInfo;

  const update = (field: keyof ClinicianInfo, value: string) => {
    saveClinicianInfo({ ...info, [field]: value });
  };

  const handleExportAll = () => {
    const data = JSON.stringify(evaluations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'immigeval-backup.json';
    a.click(); URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (window.confirm('Delete ALL evaluations? This cannot be undone.')) {
      localStorage.removeItem('immigeval-storage');
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(110,110,115,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={20} color="var(--text-secondary)" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Settings</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Manage your clinician profile and preferences</p>
        </div>
      </div>

      {/* Clinician Profile */}
      <div className="glass-card" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Default Clinician Profile</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20 }}>
          This information pre-fills on every new evaluation. Changes save instantly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="form-label">Full Name</label>
            <input className="form-input" value={info.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="form-label">License Type</label>
            <select className="form-select" value={info.licenseType} onChange={e => update('licenseType', e.target.value as LicenseType)}>
              <option value="">Select</option>
              {LICENSE_TYPES.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">License Number</label>
            <input className="form-input" value={info.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} placeholder="#000000" />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="form-label">Office Address</label>
          <input className="form-input" value={info.officeAddress} onChange={e => update('officeAddress', e.target.value)} placeholder="Full office address" />
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
          <label className="form-label">Professional Bio</label>
          <textarea className="form-textarea" rows={5} value={info.bio} onChange={e => update('bio', e.target.value)} placeholder="Professional bio for report header..." />
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={() => saveClinicianInfo(info)} style={{ fontSize: 13 }}>
            <Save size={14} /> Save Profile
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Appearance</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {darkMode ? <Moon size={18} color="#5e5ce6" /> : <Sun size={18} color="#ff9f0a" />}
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>Dark Mode</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Currently: {darkMode ? 'Dark' : 'Light'}</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card" style={{ borderRadius: 16, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Data Management</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={handleExportAll} style={{ fontSize: 13 }}>
            <Download size={14} /> Export All Data (JSON)
          </button>
          <button onClick={handleClearAll} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(255,69,58,0.08)', color: '#ff453a', border: '1.5px solid rgba(255,69,58,0.20)', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            <Trash2 size={14} /> Clear All Data
          </button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 12 }}>
          All data is stored locally in your browser. No data is sent to any server.
        </p>
      </div>
    </div>
  );
}
