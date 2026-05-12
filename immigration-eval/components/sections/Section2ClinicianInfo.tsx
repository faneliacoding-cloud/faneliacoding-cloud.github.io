'use client';
/**
 * Section 2: Clinician Information
 * Clinician credentials, license, contact details
 */
import { useAppStore, ClinicianInfo, LicenseType } from '@/lib/store';
import { Stethoscope, Save } from 'lucide-react';

interface Props { evalId: string; }

const LICENSE_TYPES: LicenseType[] = ['LCSW','LCSW-C','LMFT','LPC','LCPC','LMHC','PhD','PsyD','MD','Other'];

export default function Section2ClinicianInfo({ evalId }: Props) {
  const { evaluations, updateEvaluation, saveClinicianInfo } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const info = eval_.clinicianInfo;

  const update = (field: keyof ClinicianInfo, value: string) => {
    updateEvaluation(evalId, { clinicianInfo: { ...eval_.clinicianInfo, [field]: value } });
  };

  const handleSaveProfile = () => {
    saveClinicianInfo(eval_.clinicianInfo);
  };

  const F = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
    <div>
      <label className="form-label" htmlFor={id}>{label}</label>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(94,92,230,0.10)' }}>
          <Stethoscope size={20} color="#5e5ce6" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Clinician Information</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Your professional credentials and contact information</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        <F label="Clinician Full Name *" id="clinName">
          <input id="clinName" className="form-input" value={info.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Dr. Sarah Chen" />
        </F>
        <F label="License Type *" id="licType">
          <select id="licType" className="form-select" value={info.licenseType} onChange={e => update('licenseType', e.target.value as LicenseType)}>
            <option value="">Select type</option>
            {LICENSE_TYPES.map(l => <option key={l}>{l}</option>)}
          </select>
        </F>
        <F label="License Number *" id="licNum">
          <input id="licNum" className="form-input" value={info.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} placeholder="e.g. 74346" />
        </F>
      </div>

      <div style={{ marginBottom: 16 }}>
        <F label="Office Address" id="officeAddr">
          <input id="officeAddr" className="form-input" value={info.officeAddress} onChange={e => update('officeAddress', e.target.value)} placeholder="Full office address" />
        </F>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <F label="Office Phone" id="clinPhone">
          <input id="clinPhone" type="tel" className="form-input" value={info.phone} onChange={e => update('phone', e.target.value)} placeholder="(555) 000-0000" />
        </F>
        <F label="Email Address" id="clinEmail">
          <input id="clinEmail" type="email" className="form-input" value={info.email} onChange={e => update('email', e.target.value)} placeholder="clinician@practice.com" />
        </F>
      </div>

      <div style={{ paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
        <div style={{ marginBottom: 16 }}>
          <F label="Credentials / Certifications" id="creds">
            <input id="creds" className="form-input" value={info.credentials} onChange={e => update('credentials', e.target.value)} placeholder="e.g. LCSW, Certified Asylum Evaluator, PHR-trained" />
          </F>
        </div>
        <F label="Professional Bio (for report header)" id="bio">
          <textarea id="bio" className="form-textarea" value={info.bio} onChange={e => update('bio', e.target.value)} rows={5} placeholder="My name is [Name], and I am a [title], independently licensed in [states]..." style={{ minHeight: 140 }} />
        </F>
        <div style={{ marginTop: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(94,92,230,0.08)', border: '1px solid rgba(94,92,230,0.15)', fontSize: 12, color: '#5e5ce6' }}>
          💡 This bio will appear in every report you generate. Keep it professional and concise.
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-secondary" onClick={handleSaveProfile} style={{ gap: 8 }}>
          <Save size={14} /> Save as Default Profile
        </button>
      </div>
    </div>
  );
}
