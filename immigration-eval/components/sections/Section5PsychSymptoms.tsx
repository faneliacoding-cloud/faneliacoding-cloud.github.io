// @ts-nocheck
'use client';
/**
 * Section 5: Psychological Symptoms
 * Severity ratings for all major symptom domains
 */
import { useAppStore, PsychSymptoms, Severity } from '@/lib/store';
import { Brain } from 'lucide-react';

interface Props { evalId: string; }

const SEVERITY_OPTIONS: Severity[] = ['None', 'Minimal', 'Mild', 'Moderate', 'Moderately Severe', 'Severe'];
const SUICIDAL_OPTIONS = ['None', 'Passive', 'Active without plan', 'Active with plan'] as const;

const severityColor = (s: string) => {
  if (s === 'None' || s === 'Minimal') return '#30d158';
  if (s === 'Mild') return '#ff9f0a';
  if (s === 'Moderate') return '#ff6930';
  if (s === 'Moderately Severe') return '#ff453a';
  if (s === 'Severe') return '#bf5af2';
  return 'var(--text-secondary)';
};

interface SymptomRowProps {
  label: string;
  desc: string;
  field: keyof PsychSymptoms;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
}

function SymptomRow({ label, desc, value, onChange, options = SEVERITY_OPTIONS }: SymptomRowProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 180px', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)}
            style={{
              padding: '5px 12px', borderRadius: 100, border: '1.5px solid',
              borderColor: value === opt ? severityColor(opt) : 'var(--border-medium)',
              background: value === opt ? `${severityColor(opt)}18` : 'transparent',
              color: value === opt ? severityColor(opt) : 'var(--text-secondary)',
              fontSize: 12, fontWeight: value === opt ? 600 : 400,
              cursor: 'pointer', transition: 'all 150ms ease', fontFamily: 'inherit',
            }}>
            {opt}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'right' }}>
        {value !== 'None' && (
          <span style={{ fontSize: 12, fontWeight: 600, color: severityColor(value) }}>{value}</span>
        )}
      </div>
    </div>
  );
}

export default function Section5PsychSymptoms({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const ps = eval_.psychSymptoms;

  const update = (field: keyof PsychSymptoms, value: string) => {
    updateEvaluation(evalId, { psychSymptoms: { ...eval_.psychSymptoms, [field]: value } });
  };

  const symptoms: Array<{ label: string; desc: string; field: keyof PsychSymptoms; opts?: string[] }> = [
    { label: 'Depression', desc: 'Depressed mood, anhedonia, crying spells', field: 'depressionSeverity' },
    { label: 'Anxiety / Worry', desc: 'Excessive worry, nervousness, tension', field: 'anxietySeverity' },
    { label: 'PTSD Symptoms', desc: 'Flashbacks, avoidance, re-experiencing', field: 'ptsdSymptoms' },
    { label: 'Sleep Disturbance', desc: 'Insomnia, hypersomnia, non-restorative sleep', field: 'sleepProblems' },
    { label: 'Appetite Changes', desc: 'Decreased/increased appetite, weight change', field: 'appetiteChanges' },
    { label: 'Panic Attacks', desc: 'Sudden surges of intense fear or discomfort', field: 'panicAttacks' },
    { label: 'Dissociation', desc: 'Feeling detached, derealization, depersonalization', field: 'dissociation' },
    { label: 'Nightmares', desc: 'Recurrent disturbing dreams related to trauma', field: 'nightmares' },
    { label: 'Hypervigilance', desc: 'Exaggerated startle, constant alertness', field: 'hypervigilance' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(255,69,58,0.10)' }}>
          <Brain size={20} color="#ff453a" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Psychological Symptoms</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Rate the severity of each symptom domain based on clinical interview</p>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        {symptoms.map(s => (
          <SymptomRow key={s.field} label={s.label} desc={s.desc} field={s.field}
            value={ps[s.field] as string} onChange={(v) => update(s.field, v)} />
        ))}
      </div>

      {/* Suicidal Ideation — special treatment */}
      <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,69,58,0.06)', border: '1.5px solid rgba(255,69,58,0.15)', marginTop: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#ff453a' }}>⚠️ Suicidal / Homicidal Ideation</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Safety assessment — document carefully</div>
          </div>
          <select
            className="form-select"
            value={ps.suicidalIdeation}
            onChange={e => update('suicidalIdeation', e.target.value as typeof ps.suicidalIdeation)}
            style={{ width: 220 }}
          >
            {SUICIDAL_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        {ps.suicidalIdeation !== 'None' && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: '#ff453a', fontWeight: 600, marginBottom: 6 }}>⚠️ Document details below — include plan, intent, history, and current safety</div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="physSymp">Physical Symptoms of Stress</label>
        <textarea id="physSymp" className="form-textarea" value={ps.physicalSymptoms} onChange={e => update('physicalSymptoms', e.target.value)} rows={3}
          placeholder="Headaches, stomach aches, nausea, changes in blood pressure, physical conditions that started/worsened since trauma..." />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="funcImpair">Functional Impairment</label>
        <textarea id="funcImpair" className="form-textarea" value={ps.functionalImpairment} onChange={e => update('functionalImpairment', e.target.value)} rows={3}
          placeholder="How do symptoms impair work, relationships, self-care, daily functioning, ability to file for asylum?" />
      </div>
      <div>
        <label className="form-label" htmlFor="addlNotes">Additional Clinical Notes</label>
        <textarea id="addlNotes" className="form-textarea" value={ps.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} rows={3}
          placeholder="Any other clinically relevant symptom observations..." />
      </div>
    </div>
  );
}
