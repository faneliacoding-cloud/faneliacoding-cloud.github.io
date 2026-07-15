// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import type { Client, Gender, Pronoun, MaritalStatus } from '@/lib/types';
import { User, Stethoscope, Sparkles } from 'lucide-react';

const GENDERS: Gender[] = ['Male', 'Female', 'Non-binary', 'Transgender Male', 'Transgender Female', 'Other', 'Prefer not to say'];
const PRONOUNS: Pronoun[] = ['He/Him', 'She/Her', 'They/Them', 'Other'];
const MARITAL: MaritalStatus[] = ['', 'Single', 'Married', 'Divorced', 'Separated', 'Widowed', 'Domestic Partnership'];

export default function Step01Client({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalClient = useAppStore(s => s.updateEvalClient);
  const updateEvalSection = useAppStore(s => s.updateEvalSection);
  const practiceSettings = useAppStore(s => s.practiceSettings);

  if (!evaluation) return null;
  const client = evaluation.client;
  const s01 = evaluation.sections.step01;

  const update = (field: keyof Client, value: string | number) => {
    updateEvalClient(evalId, { [field]: value } as Partial<Client>);
  };

  const updateS01 = (field: string, value: string | boolean) => {
    updateEvalSection(evalId, 'step01', { [field]: value });
  };

  const autoFillClinician = () => {
    const updates: Record<string, string> = {};
    if (practiceSettings.evaluatorName && !s01.clinicianName) updates.clinicianName = practiceSettings.evaluatorName;
    if (practiceSettings.credentials && !s01.clinicianCredentials) updates.clinicianCredentials = practiceSettings.credentials;
    if (practiceSettings.licenseNumber) {
      const licenseStr = [practiceSettings.licenseType, practiceSettings.licenseNumber].filter(Boolean).join(' #');
      if (!s01.clinicianLicense) updates.clinicianLicense = licenseStr;
    }
    if (Object.keys(updates).length > 0) {
      updateEvalSection(evalId, 'step01', updates);
    }
  };

  const hasSettingsData = practiceSettings.evaluatorName || practiceSettings.credentials || practiceSettings.licenseNumber;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Client Information</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Demographics, contact details, and evaluator credentials</p>
          </div>
        </div>
      </div>

      {/* ── Clinician Bio & Credentials ──────────────────────────────────────── */}
      <div className="card" style={{ padding: 28, marginBottom: 20, borderLeft: '3px solid var(--gold)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(197,165,90,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope size={18} color="var(--gold)" />
            </div>
            <div>
              <h3 className="heading-md" style={{ marginBottom: 0 }}>Evaluator Credentials</h3>
              <p className="form-hint" style={{ margin: 0 }}>Your professional information for this evaluation report</p>
            </div>
          </div>
          {hasSettingsData && (
            <button
              className="btn-ghost"
              onClick={autoFillClinician}
              style={{ fontSize: 12, gap: 6, color: 'var(--gold)' }}
              aria-label="Auto-fill from practice settings"
            >
              <Sparkles size={13} />
              Auto-fill from Settings
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
          <div>
            <label className="form-label" htmlFor="clinicianName">Evaluator Name</label>
            <input
              id="clinicianName"
              className="form-input"
              value={s01.clinicianName || ''}
              onChange={e => updateS01('clinicianName', e.target.value)}
              placeholder="e.g., Dr. Jane Smith"
              aria-label="Evaluator name"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="clinicianCredentials">Credentials / Degrees</label>
            <input
              id="clinicianCredentials"
              className="form-input"
              value={s01.clinicianCredentials || ''}
              onChange={e => updateS01('clinicianCredentials', e.target.value)}
              placeholder="e.g., PhD, LCSW, Psy.D."
              aria-label="Credentials"
            />
            <p className="form-hint">Professional degrees and certifications</p>
          </div>
          <div>
            <label className="form-label" htmlFor="clinicianLicense">License Information</label>
            <input
              id="clinicianLicense"
              className="form-input"
              value={s01.clinicianLicense || ''}
              onChange={e => updateS01('clinicianLicense', e.target.value)}
              placeholder="e.g., LCSW #087654, NY State"
              aria-label="License information"
            />
            <p className="form-hint">License type, number, and state</p>
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="clinicianBio">Professional Bio & Qualifications</label>
          <textarea
            id="clinicianBio"
            className="form-textarea"
            value={s01.clinicianBio || ''}
            onChange={e => updateS01('clinicianBio', e.target.value)}
            placeholder="Describe your professional background, areas of expertise, years of experience conducting immigration evaluations, relevant training (e.g., trauma-informed care, cultural competency), and any specialized certifications. This information will appear in the evaluator qualifications section of the report.

Example: Dr. Jane Smith is a licensed clinical psychologist (NY #087654) with over 12 years of experience conducting forensic and immigration psychological evaluations. She holds a Doctorate in Clinical Psychology from Columbia University and has completed specialized training in trauma-informed assessment, cross-cultural evaluation, and immigration mental health through the National Latinx Psychological Association. Dr. Smith has conducted over 500 immigration evaluations across asylum, VAWA, U Visa, and extreme hardship cases."
            style={{ minHeight: 180 }}
            aria-label="Professional bio and qualifications"
          />
          <p className="form-hint">
            This bio will be included in the evaluator qualifications section of generated reports. 
            Include your education, training, experience with immigration evaluations, and relevant specializations.
          </p>
        </div>
      </div>

      {/* ── Identity & Demographics ──────────────────────────────────────────── */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Identity &amp; Demographics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="fullName">Full Legal Name</label>
            <input id="fullName" className="form-input" value={client.fullName} onChange={e => update('fullName', e.target.value)} placeholder="e.g., Maria Elena Rodriguez" aria-label="Full legal name" />
            <p className="form-hint">As it appears on official documents</p>
          </div>
          <div>
            <label className="form-label" htmlFor="dob">Date of Birth</label>
            <input id="dob" type="date" className="form-input" value={client.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} aria-label="Date of birth" />
          </div>
          <div>
            <label className="form-label" htmlFor="age">Age</label>
            <input id="age" className="form-input" value={client.age} onChange={e => update('age', e.target.value)} placeholder="e.g., 34" aria-label="Age" />
          </div>
          <div>
            <label className="form-label" htmlFor="gender">Gender</label>
            <select id="gender" className="form-select" value={client.gender} onChange={e => update('gender', e.target.value)} aria-label="Gender">
              {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="pronouns">Pronouns</label>
            <select id="pronouns" className="form-select" value={client.pronouns} onChange={e => update('pronouns', e.target.value)} aria-label="Pronouns">
              {PRONOUNS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="nationality">Nationality</label>
            <input id="nationality" className="form-input" value={client.nationality} onChange={e => update('nationality', e.target.value)} placeholder="e.g., Honduran" aria-label="Nationality" />
          </div>
          <div>
            <label className="form-label" htmlFor="country">Country of Origin</label>
            <input id="country" className="form-input" value={client.countryOfOrigin} onChange={e => update('countryOfOrigin', e.target.value)} placeholder="e.g., Honduras" aria-label="Country of origin" />
          </div>
          <div>
            <label className="form-label" htmlFor="ethnicity">Ethnicity</label>
            <input id="ethnicity" className="form-input" value={client.ethnicity} onChange={e => update('ethnicity', e.target.value)} placeholder="e.g., Mestizo" aria-label="Ethnicity" />
          </div>
          <div>
            <label className="form-label" htmlFor="languages">Languages Spoken</label>
            <input id="languages" className="form-input" value={client.spokenLanguages} onChange={e => update('spokenLanguages', e.target.value)} placeholder="e.g., Spanish (native), English (limited)" aria-label="Languages spoken" />
          </div>
          <div>
            <label className="form-label" htmlFor="marital">Marital Status</label>
            <select id="marital" className="form-select" value={client.maritalStatus} onChange={e => update('maritalStatus', e.target.value)} aria-label="Marital status">
              <option value="">— Select —</option>
              {MARITAL.filter(Boolean).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="children">Number of Children</label>
            <input id="children" className="form-input" value={client.numberOfChildren} onChange={e => update('numberOfChildren', e.target.value)} placeholder="e.g., 2" aria-label="Number of children" />
          </div>
        </div>
      </div>

      {/* ── Contact Information ──────────────────────────────────────────────── */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Contact Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="email">Email Address</label>
            <input id="email" type="email" className="form-input" value={client.contactEmail} onChange={e => update('contactEmail', e.target.value)} placeholder="email@example.com" aria-label="Email address" />
          </div>
          <div>
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input id="phone" className="form-input" value={client.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="(555) 123-4567" aria-label="Phone number" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" htmlFor="address">Address</label>
            <input id="address" className="form-input" value={client.address} onChange={e => update('address', e.target.value)} placeholder="Full mailing address" aria-label="Address" />
          </div>
        </div>
      </div>

      {/* ── Case Identifiers ─────────────────────────────────────────────────── */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Case Identifiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="attorney">Referring Attorney</label>
            <input id="attorney" className="form-input" value={client.referringAttorney} onChange={e => update('referringAttorney', e.target.value)} placeholder="Attorney name or firm" aria-label="Referring attorney" />
          </div>
          <div>
            <label className="form-label" htmlFor="aNumber">A-Number</label>
            <input id="aNumber" className="form-input" value={client.aNumber} onChange={e => update('aNumber', e.target.value)} placeholder="e.g., A-123-456-789" aria-label="A-Number" />
            <p className="form-hint">Alien Registration Number, if applicable</p>
          </div>
        </div>
      </div>

      {/* ── Evaluation Context ───────────────────────────────────────────────── */}
      <div className="card" style={{ padding: 28 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Evaluation Context</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="evalDates">Evaluation Date(s)</label>
            <input id="evalDates" className="form-input" value={s01.evaluationDates} onChange={e => updateS01('evaluationDates', e.target.value)} placeholder="e.g., January 15–16, 2025" aria-label="Evaluation dates" />
          </div>
          <div>
            <label className="form-label" htmlFor="evalLocation">Evaluation Location</label>
            <input id="evalLocation" className="form-input" value={s01.evaluationLocation} onChange={e => updateS01('evaluationLocation', e.target.value)} placeholder="e.g., Office, Telehealth" aria-label="Evaluation location" />
          </div>
          <div>
            <label className="form-label" htmlFor="referralSource">Referral Source</label>
            <input id="referralSource" className="form-input" value={s01.referralSource} onChange={e => updateS01('referralSource', e.target.value)} placeholder="e.g., Immigration attorney" aria-label="Referral source" />
          </div>
          <div>
            <label className="form-label">Interpreter Used</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
              <label className="toggle-switch">
                <input type="checkbox" checked={s01.interpreterUsed} onChange={e => updateS01('interpreterUsed', e.target.checked)} aria-label="Interpreter used" />
                <span className="toggle-slider" />
              </label>
              <span className="text-body">{s01.interpreterUsed ? 'Yes' : 'No'}</span>
            </div>
          </div>
          {s01.interpreterUsed && (
            <div>
              <label className="form-label" htmlFor="interpreterLang">Interpreter Language</label>
              <input id="interpreterLang" className="form-input" value={s01.interpreterLanguage} onChange={e => updateS01('interpreterLanguage', e.target.value)} placeholder="e.g., Spanish" aria-label="Interpreter language" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

