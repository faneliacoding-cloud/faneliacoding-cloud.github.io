// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

const TRAUMA_CATEGORIES = [
  '', 'Physical violence', 'Sexual violence', 'Domestic violence', 'Political persecution',
  'Gang violence', 'Human trafficking', 'Torture', 'War/Armed conflict',
  'Kidnapping', 'Threats/Intimidation', 'Discrimination', 'Other',
];

export default function Step05Trauma({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s05 = evaluation.sections.step05;

  const update = (field: string, value: string | boolean) => {
    updateEvalSection(evalId, 'step05', { [field]: value });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--amber), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Trauma / Stressor History</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Persecution events, traumatic experiences, and ongoing threats</p>
          </div>
        </div>
      </div>

      {/* Safety Disclaimer */}
      <div style={{
        display: 'flex', gap: 14, padding: 20, marginBottom: 24,
        background: 'var(--rose-light)', borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(199,92,92,0.2)',
      }}>
        <ShieldAlert size={22} color="var(--rose)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--rose)', marginBottom: 4 }}>Sensitive Content — Clinical Discretion Required</p>
          <p style={{ fontSize: 12, color: 'var(--charcoal-light)', lineHeight: 1.5 }}>
            This section contains descriptions of trauma and violence. Ensure the client is in a safe and supportive environment before proceeding. Monitor for signs of distress and offer breaks as needed.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Trauma Classification</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="traumaCat">Primary Trauma Category</label>
            <select id="traumaCat" className="form-select" value={s05.traumaCategory} onChange={e => update('traumaCategory', e.target.value)} aria-label="Trauma category">
              <option value="">— Select category —</option>
              {TRAUMA_CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="freqDur">Frequency &amp; Duration</label>
            <input id="freqDur" className="form-input" value={s05.frequencyDuration} onChange={e => update('frequencyDuration', e.target.value)} placeholder="e.g., Multiple incidents over 3 years" aria-label="Frequency and duration" />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="traumaNarrative">Trauma Narrative</label>
        <textarea
          id="traumaNarrative"
          className="form-textarea"
          value={s05.traumaNarrative}
          onChange={e => update('traumaNarrative', e.target.value)}
          placeholder="Provide a detailed account of the traumatic events experienced by the client. Include specific incidents, their chronological sequence, the client's emotional response at the time, and the lasting impact of these experiences."
          style={{ minHeight: 220 }}
          aria-label="Trauma narrative"
        />
        <p className="form-hint">Document the client&apos;s account using their own words where possible, noting affective responses during the retelling.</p>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="perpetrator">Perpetrator Information</label>
        <textarea
          id="perpetrator"
          className="form-textarea"
          value={s05.perpetratorInfo}
          onChange={e => update('perpetratorInfo', e.target.value)}
          placeholder="Describe the perpetrator(s) including their relationship to the client, any affiliation (government, gang, family member), and the nature of their power or control over the client."
          style={{ minHeight: 120 }}
          aria-label="Perpetrator information"
        />
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Reporting &amp; Authorities</h3>
        <div style={{ marginBottom: 20 }}>
          <label className="form-label">Reported to Authorities</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <label className="toggle-switch">
              <input type="checkbox" checked={s05.reportedToAuthorities} onChange={e => update('reportedToAuthorities', e.target.checked)} aria-label="Reported to authorities" />
              <span className="toggle-slider" />
            </label>
            <span className="text-body">{s05.reportedToAuthorities ? 'Yes' : 'No'}</span>
          </div>
        </div>
        {s05.reportedToAuthorities && (
          <div>
            <label className="form-label" htmlFor="authResponse">Authorities Response</label>
            <textarea
              id="authResponse"
              className="form-textarea"
              value={s05.authoritiesResponse}
              onChange={e => update('authoritiesResponse', e.target.value)}
              placeholder="Describe the response received from authorities, including whether any action was taken, whether protection was provided, and the client's experience with the reporting process."
              style={{ minHeight: 120 }}
              aria-label="Authorities response"
            />
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="whyCantReturn">Why the Client Cannot Return</label>
        <textarea
          id="whyCantReturn"
          className="form-textarea"
          value={s05.whyCantReturn}
          onChange={e => update('whyCantReturn', e.target.value)}
          placeholder="Explain the specific risks and fears the client faces if returned to their country of origin. Include the psychological impact of potential return and any evidence of continued danger."
          style={{ minHeight: 140 }}
          aria-label="Why the client cannot return"
        />
      </div>

      <div className="card" style={{ padding: 28 }}>
        <label className="form-label" htmlFor="ongoingThreats">Ongoing Threats</label>
        <textarea
          id="ongoingThreats"
          className="form-textarea"
          value={s05.ongoingThreats}
          onChange={e => update('ongoingThreats', e.target.value)}
          placeholder="Document any continuing threats to the client or their family members, including recent communications, incidents, or credible intelligence about potential harm."
          style={{ minHeight: 120 }}
          aria-label="Ongoing threats"
        />
      </div>
    </div>
  );
}
