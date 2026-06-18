'use client';
/**
 * SettingsPage — Practice information, report customization, plan, and data management
 * Uses the V2 store with PracticeSettings
 */
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import type { PracticeSettings } from '@/lib/types';
import {
  Settings, Save, Download, Trash2, Upload, Building2,
  FileText, Users, Database, AlertTriangle,
} from 'lucide-react';
import PlanBilling from './PlanBilling';

export default function SettingsPage() {
  const { practiceSettings, updatePracticeSettings, evaluations } = useAppStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (field: keyof PracticeSettings, value: string) => {
    updatePracticeSettings({ [field]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportAll = () => {
    try {
      const raw = localStorage.getItem('tjil-platform-v2');
      const data = raw || JSON.stringify({ evaluations, practiceSettings });
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tjil-platform-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[Settings] Export failed:', e);
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem('tjil-platform-v2');
    window.location.reload();
  };

  return (
    <div className="animate-fade-in" style={{ padding: 32, maxWidth: 840, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 className="heading-xl" style={{ marginBottom: 8 }}>
          Settings
        </h1>
        <p className="text-secondary" style={{ fontSize: 15 }}>
          Configure your practice information, report preferences, and manage your data
        </p>
      </div>

      {/* Practice Information */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <Building2 size={18} color="var(--forest)" />
          <h2 className="heading-lg" style={{ fontSize: 20 }}>Practice Information</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label className="form-label">Practice Name</label>
            <input
              className="form-input"
              value={practiceSettings.practiceName}
              onChange={e => update('practiceName', e.target.value)}
              placeholder="e.g., Mindful Assessments LLC"
              aria-label="Practice name"
            />
          </div>
          <div>
            <label className="form-label">Evaluator Name</label>
            <input
              className="form-input"
              value={practiceSettings.evaluatorName}
              onChange={e => update('evaluatorName', e.target.value)}
              placeholder="e.g., Dr. Jane Smith"
              aria-label="Evaluator name"
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label className="form-label">Credentials</label>
            <input
              className="form-input"
              value={practiceSettings.credentials}
              onChange={e => update('credentials', e.target.value)}
              placeholder="e.g., PhD, LCSW"
              aria-label="Credentials"
            />
          </div>
          <div>
            <label className="form-label">License Number</label>
            <input
              className="form-input"
              value={practiceSettings.licenseNumber}
              onChange={e => update('licenseNumber', e.target.value)}
              placeholder="e.g., #LC-12345"
              aria-label="License number"
            />
          </div>
          <div>
            <label className="form-label">License Type</label>
            <select
              className="form-select"
              value={practiceSettings.licenseType}
              onChange={e => update('licenseType', e.target.value)}
              aria-label="License type"
            >
              <option value="">Select...</option>
              {['LCSW', 'LCSW-C', 'LMFT', 'LPC', 'LCPC', 'LMHC', 'PhD', 'PsyD', 'MD', 'Other'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Office Address</label>
          <input
            className="form-input"
            value={practiceSettings.address}
            onChange={e => update('address', e.target.value)}
            placeholder="Full office address"
            aria-label="Office address"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              type="tel"
              value={practiceSettings.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="(555) 000-0000"
              aria-label="Phone number"
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={practiceSettings.email}
              onChange={e => update('email', e.target.value)}
              placeholder="you@practice.com"
              aria-label="Email address"
            />
          </div>
        </div>
      </div>

      {/* Report Customization */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <FileText size={18} color="var(--forest)" />
          <h2 className="heading-lg" style={{ fontSize: 20 }}>Report Customization</h2>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Report Header Text</label>
          <input
            className="form-input"
            value={practiceSettings.reportHeaderText}
            onChange={e => update('reportHeaderText', e.target.value)}
            placeholder="Text to appear at the top of generated reports"
            aria-label="Report header text"
          />
          <p className="form-hint">This text appears in the header of all generated reports.</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Signature Block</label>
          <textarea
            className="form-textarea"
            value={practiceSettings.signatureBlock}
            onChange={e => update('signatureBlock', e.target.value)}
            placeholder={"Respectfully submitted,\n\nDr. Jane Smith, PhD, LCSW\nLicense #LC-12345\nMindful Assessments LLC"}
            rows={5}
            aria-label="Signature block"
          />
          <p className="form-hint">Appears at the end of each generated report.</p>
        </div>
        <div>
          <label className="form-label">Practice Logo</label>
          <div
            style={{
              border: '2px dashed var(--border-medium)',
              borderRadius: 12,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    update('logoUrl', reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload practice logo"
          >
            {practiceSettings.logoUrl ? (
              <img
                src={practiceSettings.logoUrl}
                alt="Practice logo"
                style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8 }}
              />
            ) : (
              <Upload size={20} color="var(--charcoal-muted)" />
            )}
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)' }}>
                {practiceSettings.logoUrl ? 'Replace logo' : 'Upload logo image'}
              </p>
              <p className="text-muted">PNG, JPG, or SVG recommended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan */}
      <PlanBilling />

      {/* Team */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Users size={18} color="var(--charcoal-muted)" />
          <h2 className="heading-lg" style={{ fontSize: 20 }}>Team</h2>
        </div>
        <div style={{
          padding: '24px 20px',
          borderRadius: 12,
          background: 'var(--ivory-warm)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 4 }}>
            Multi-User Support Coming Soon
          </p>
          <p className="text-secondary" style={{ fontSize: 13 }}>
            Invite team members, assign roles, and collaborate on evaluations.
            Available with the Practice plan.
          </p>
        </div>
      </div>

      {/* Data Management */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Database size={18} color="var(--charcoal-muted)" />
          <h2 className="heading-lg" style={{ fontSize: 20 }}>Data Management</h2>
        </div>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
          All data is stored locally in your browser. No data is sent to any server.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleExportAll} aria-label="Export all data">
            <Download size={15} /> Export All Data (JSON)
          </button>
          <button
            className="btn-danger"
            onClick={() => setShowClearConfirm(true)}
            aria-label="Clear all data"
          >
            <Trash2 size={15} /> Clear All Data
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <button
          className="btn-primary"
          onClick={handleSave}
          aria-label="Save settings"
          style={{ padding: '12px 40px', fontSize: 15 }}
        >
          <Save size={16} />
          {saved ? 'Settings Saved ✓' : 'Save Settings'}
        </button>
        <p className="text-muted" style={{ marginTop: 8 }}>
          Changes are saved automatically as you type. This button confirms your updates.
        </p>
      </div>

      {/* Confirm Clear Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(199,92,92,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <AlertTriangle size={28} color="var(--rose)" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--charcoal)',
                marginBottom: 8,
              }}>
                Clear All Data?
              </h3>
              <p className="text-secondary" style={{ fontSize: 13, lineHeight: 1.6 }}>
                This will permanently delete all evaluations, snippets, and settings.
                This action cannot be undone. We recommend exporting your data first.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleClearAll}>
                <Trash2 size={14} /> Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
