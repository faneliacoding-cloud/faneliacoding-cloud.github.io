// @ts-nocheck
'use client';
/**
 * Section 4: Trauma History
 * Documents persecution, trauma events, and evidence
 */
import { useAppStore, TraumaHistory, TraumaCategory, AbuseType } from '@/lib/store';
import { AlertTriangle, Shield, FileSearch } from 'lucide-react';

interface Props { evalId: string; }

const TRAUMA_CATEGORIES: TraumaCategory[] = [
  'Sexual Orientation/Gender Identity', 'Political Opinion', 'Religious Persecution',
  'Domestic Violence', 'Gang Violence', 'Ethnic/Racial Persecution',
  'Human Trafficking', 'Female Genital Mutilation', 'Child Abuse', 'Other',
];

const ABUSE_TYPES: AbuseType[] = [
  'Physical', 'Sexual', 'Emotional/Psychological', 'Economic', 'Spiritual/Religious', 'Multiple Types',
];

const POLICE_OPTIONS = ['Not reported', 'Reported — no action taken', 'Reported — retaliated against', 'Police were perpetrators', 'Ongoing investigation', 'Charges filed'];

export default function Section4TraumaHistory({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const t = eval_.traumaHistory;

  const update = (field: keyof TraumaHistory, value: string | boolean) => {
    updateEvaluation(evalId, { traumaHistory: { ...eval_.traumaHistory, [field]: value } });
  };

  const ToggleRow = ({ field, label, desc }: { field: keyof TraumaHistory; label: string; desc?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border-light)', background: 'var(--bg-secondary)', marginBottom: 8 }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{desc}</div>}
      </div>
      <label className="toggle-switch">
        <input type="checkbox" checked={t[field] as boolean} onChange={e => update(field, e.target.checked)} />
        <span className="toggle-slider" />
      </label>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(255,159,10,0.10)' }}>
          <AlertTriangle size={20} color="#ff9f0a" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Trauma History</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Document persecution events, abuse, and circumstances of flight</p>
        </div>
      </div>

      {/* Category & Type */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label" htmlFor="traumaCat">Trauma Category *</label>
          <select id="traumaCat" className="form-select" value={t.traumaCategory} onChange={e => update('traumaCategory', e.target.value as TraumaCategory)}>
            <option value="">Select category</option>
            {TRAUMA_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="abuseType">Type of Abuse/Persecution</label>
          <select id="abuseType" className="form-select" value={t.abuseType} onChange={e => update('abuseType', e.target.value as AbuseType)}>
            <option value="">Select type</option>
            {ABUSE_TYPES.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="traumaDesc">Description of Traumatic Events *</label>
        <textarea id="traumaDesc" className="form-textarea" value={t.descriptionOfEvents} onChange={e => update('descriptionOfEvents', e.target.value)} rows={6} style={{ minHeight: 140 }}
          placeholder="Describe the specific events in chronological order. Include one particularly vivid description of the worst incident. Ask the client to describe in sensory detail (appearance, voice, smell of perpetrator)." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label" htmlFor="perpetrator">Perpetrator Information</label>
          <input id="perpetrator" className="form-input" value={t.perpetratorInfo} onChange={e => update('perpetratorInfo', e.target.value)} placeholder="Relationship, description, affiliation" />
        </div>
        <div>
          <label className="form-label" htmlFor="traumaDates">Date(s) of Trauma</label>
          <input id="traumaDates" className="form-input" value={t.datesOfTrauma} onChange={e => update('datesOfTrauma', e.target.value)} placeholder="e.g. 2019–2022, ongoing" />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="threats">Threats Experienced</label>
        <textarea id="threats" className="form-textarea" value={t.threatsExperienced} onChange={e => update('threatsExperienced', e.target.value)} rows={3} placeholder="Describe specific threats made — verbal, written, implied, or via others" />
      </div>

      {/* Violence toggles */}
      <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-light)', marginBottom: 16 }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          <Shield size={12} style={{ display: 'inline', marginRight: 6 }} />
          Violence & Evidence
        </h3>
        <ToggleRow field="physicalViolence" label="Physical Violence" desc="Client experienced physical assault or bodily harm" />
        <ToggleRow field="sexualViolence" label="Sexual Violence" desc="Client experienced sexual assault or abuse" />
        <ToggleRow field="evidenceAvailable" label="Evidence Available" desc="Documentation, photos, medical records, or other evidence exists" />
        {t.evidenceAvailable && (
          <div style={{ marginBottom: 8 }}>
            <label className="form-label">Evidence Description</label>
            <textarea className="form-textarea" value={t.evidenceDescription} onChange={e => update('evidenceDescription', e.target.value)} rows={3} placeholder="Describe available evidence: police reports, medical records, photos, witness statements, news articles..." />
          </div>
        )}
      </div>

      {/* Police */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="police">Police Involvement</label>
        <select id="police" className="form-select" value={t.policeInvolvement} onChange={e => update('policeInvolvement', e.target.value)}>
          <option value="">Select status</option>
          {POLICE_OPTIONS.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Decision to Leave */}
      <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Decision to Leave — Precipitating Event</label>
          <textarea className="form-textarea" value={t.decisionToLeave} onChange={e => update('decisionToLeave', e.target.value)} rows={4}
            placeholder="What was the final event that made them leave? How much time passed between this event and departure? Why couldn't they leave sooner? Why couldn't family or police protect them?" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Why Client Cannot Return</label>
          <textarea className="form-textarea" value={t.whyCantReturn} onChange={e => update('whyCantReturn', e.target.value)} rows={4}
            placeholder="What would happen if forced to return? How do they know the danger persists? Why can't they live safely in another region of the country?" />
        </div>
        <div>
          <label className="form-label">Key Quote (Direct Client Statement)</label>
          <input className="form-input" value={t.keyQuote} onChange={e => update('keyQuote', e.target.value)} placeholder='e.g. "They told me they would find me no matter where I went."' />
        </div>
      </div>
    </div>
  );
}
