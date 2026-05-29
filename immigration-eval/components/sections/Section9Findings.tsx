'use client';
/**
 * Section 9: Findings & Recommendations
 * Diagnoses, clinical impression, credibility, recommendations
 */
import { useAppStore, FindingsRecommendations, Diagnoses } from '@/lib/store';
import { CheckSquare, Plus, Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Props { evalId: string; }

const DSM_DIAGNOSES: { code: string; name: string; specifiers?: string[] }[] = [
  { code: 'F32.0', name: 'Major Depressive Disorder, single episode, mild', specifiers: [] },
  { code: 'F32.1', name: 'Major Depressive Disorder, single episode, moderate', specifiers: [] },
  { code: 'F32.2', name: 'Major Depressive Disorder, single episode, severe', specifiers: [] },
  { code: 'F32.3', name: 'Major Depressive Disorder, single episode, with psychotic features', specifiers: [] },
  { code: 'F33.0', name: 'Major Depressive Disorder, recurrent, mild', specifiers: [] },
  { code: 'F33.1', name: 'Major Depressive Disorder, recurrent, moderate', specifiers: [] },
  { code: 'F33.2', name: 'Major Depressive Disorder, recurrent, severe', specifiers: [] },
  { code: 'F41.1', name: 'Generalized Anxiety Disorder', specifiers: [] },
  { code: 'F41.0', name: 'Panic Disorder', specifiers: [] },
  { code: 'F43.10', name: 'Post-Traumatic Stress Disorder', specifiers: [] },
  { code: 'F43.11', name: 'Post-Traumatic Stress Disorder, with dissociative symptoms', specifiers: [] },
  { code: 'F43.12', name: 'Post-Traumatic Stress Disorder, with delayed expression', specifiers: [] },
  { code: 'F60.3', name: 'Borderline Personality Disorder', specifiers: [] },
  { code: 'F44.0', name: 'Dissociative Amnesia', specifiers: [] },
  { code: 'Other', name: 'Other DSM-5 Diagnosis', specifiers: [] },
];

const CREDIBILITY_OPTIONS = [
  'highly credible', 'credible', 'generally credible with minor inconsistencies',
  'credible, noting cultural factors affecting presentation',
];

const RISK_OPTIONS = ['No current risk', 'Low risk', 'Moderate risk', 'High risk — safety plan in place'];

export default function Section9Findings({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedDiag, setSelectedDiag] = useState('');
  if (!eval_) return null;
  const { findings: f, clientInfo: c, phq9, gad7, pcl5, psychSymptoms: ps } = eval_;

  const update = (field: keyof FindingsRecommendations, value: string | Diagnoses[]) => {
    updateEvaluation(evalId, { findings: { ...eval_.findings, [field]: value } });
  };

  const addDiagnosis = (code: string, name: string) => {
    if (f.diagnoses.find(d => d.code === code)) return;
    update('diagnoses', [...f.diagnoses, { code: code as Diagnoses['code'], name, specifier: '' }]);
  };

  const removeDiagnosis = (code: string) => {
    update('diagnoses', f.diagnoses.filter(d => d.code !== code));
  };

  const handleAIFindings = () => {
    setAiLoading(true);
    setTimeout(() => {
      const title = c.pronouns === 'He/Him' ? 'Mr.' : c.pronouns === 'She/Her' ? 'Ms.' : 'Mx.';
      const lastName = c.fullName?.split(' ').slice(-1)[0] || 'XXX';
      const ref = c.pronouns === 'He/Him' ? 'He' : c.pronouns === 'They/Them' ? 'They' : 'She';
      const poss = c.pronouns === 'He/Him' ? 'his' : c.pronouns === 'They/Them' ? 'their' : 'her';
      const diagList = f.diagnoses.map(d => `${d.code} ${d.name}`).join('; ') || '[Diagnoses]';
      const impression = `Based on my clinical assessment of ${title} ${lastName}, including two clinical interviews totaling approximately three hours and administration of three standardized self-assessment scales, I have reached the following conclusions:

${title} ${lastName}'s account of persecution is ${f.credibilityAssessment || 'highly credible'}. ${poss.charAt(0).toUpperCase() + poss.slice(1)} presentation was consistent across both interviews, and ${poss} emotional responses were appropriate to the material disclosed.

${ref} is currently experiencing significant psychological distress. On the PHQ-9, ${ref.toLowerCase()} scored ${phq9.total}/27, indicating ${phq9.severity.toLowerCase()} depression. On the GAD-7, ${ref.toLowerCase()} scored ${gad7.total}/21, indicating ${gad7.severity.toLowerCase()} anxiety. On the PCL-5, ${ref.toLowerCase()} scored ${pcl5.total}/80, which ${pcl5.likelyPTSD ? 'meets' : 'falls below'} the clinical threshold for PTSD.

${ref} meets diagnostic criteria for: ${diagList}.

These symptoms are consistent with those of individuals who have experienced the type of trauma ${ref.toLowerCase()} described, and it is my clinical opinion that ${poss} account is credible.`;
      update('clinicalImpression', impression);

      const recs = `To prevent further psychological decompensation and functional impairment, I strongly recommend that ${title} ${lastName}:

1. Continue or initiate individual psychotherapy with a trauma-informed clinician, focusing on PTSD, depression, and anxiety treatment.
2. Be evaluated by a psychiatrist or primary care provider regarding medication management for ${poss} psychiatric symptoms.
3. Maintain a stable living situation with access to supportive relationships and ongoing mental health care.
4. Avoid unnecessary re-exposure to trauma-related stressors, as this may cause significant psychological harm.
5. Be granted asylum or other form of immigration relief, as forced return to ${c.countryOfOrigin || 'the country of origin'} would pose a severe risk to ${poss} psychological and physical safety.`;
      update('recommendations', recs);
      setAiLoading(false);
    }, 1200);
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(48,209,88,0.10)' }}>
          <CheckSquare size={20} color="#30d158" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Findings & Recommendations</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Clinical diagnoses, credibility assessment, and professional recommendations</p>
        </div>
      </div>

      {/* Score summary banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'PHQ-9 Depression', score: phq9.total, max: 27, severity: phq9.severity },
          { label: 'GAD-7 Anxiety', score: gad7.total, max: 21, severity: gad7.severity },
          { label: 'PCL-5 PTSD', score: pcl5.total, max: 80, severity: pcl5.severity },
        ].map(s => (
          <div key={s.label} style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '1.5px solid var(--border-light)', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{s.score}<span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>/{s.max}</span></div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{s.severity}</div>
          </div>
        ))}
      </div>

      {/* AI Findings Button */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button className="btn-secondary" onClick={handleAIFindings} disabled={aiLoading} style={{ fontSize: 13 }}>
          <Sparkles size={14} color="#30d158" />
          {aiLoading ? 'Generating...' : 'Generate AI Clinical Impression & Recommendations'}
        </button>
      </div>

      {/* Diagnoses */}
      <div style={{ marginBottom: 20 }}>
        <label className="form-label">DSM-5 Diagnoses *</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {f.diagnoses.map(d => (
            <span key={d.code} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 100,
              background: 'rgba(0,113,227,0.10)', color: 'var(--accent-blue)',
              fontSize: 12, fontWeight: 600, border: '1px solid rgba(0,113,227,0.2)',
            }}>
              {d.code} — {d.name}
              <button onClick={() => removeDiagnosis(d.code)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff453a', display: 'flex' }}>
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
        <select className="form-select" value={selectedDiag} onChange={e => {
          const selected = DSM_DIAGNOSES.find(d => d.code === e.target.value);
          if (selected) addDiagnosis(selected.code, selected.name);
          setSelectedDiag('');
        }}>
          <option value="">+ Add diagnosis...</option>
          {DSM_DIAGNOSES.map(d => <option key={d.code} value={d.code}>{d.code} — {d.name}</option>)}
        </select>
      </div>

      {/* Credibility */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Credibility Assessment</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {CREDIBILITY_OPTIONS.map(opt => (
            <button key={opt} onClick={() => update('credibilityAssessment', opt)}
              style={{
                padding: '6px 14px', borderRadius: 100, border: '1.5px solid',
                borderColor: f.credibilityAssessment === opt ? '#30d158' : 'var(--border-medium)',
                background: f.credibilityAssessment === opt ? 'rgba(48,209,88,0.10)' : 'transparent',
                color: f.credibilityAssessment === opt ? '#30d158' : 'var(--text-secondary)',
                fontSize: 12, fontWeight: f.credibilityAssessment === opt ? 600 : 400,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{opt}</button>
          ))}
        </div>
        <input className="form-input" value={f.credibilityAssessment} onChange={e => update('credibilityAssessment', e.target.value)} placeholder="Or type custom credibility statement..." />
      </div>

      {/* Clinical Impression */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Clinical Impression & Findings</label>
        <textarea className="form-textarea" rows={10} value={f.clinicalImpression} onChange={e => update('clinicalImpression', e.target.value)} style={{ minHeight: 200 }}
          placeholder="Comprehensive clinical impression including all findings, symptom summary, score interpretation, consistency analysis, and diagnostic conclusions..." />
      </div>

      {/* Functional Impairment */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Functional Impairment</label>
        <textarea className="form-textarea" rows={4} value={f.functionalImpairment} onChange={e => update('functionalImpairment', e.target.value)}
          placeholder="How do current symptoms impair the client's ability to work, maintain relationships, care for themselves, and function in daily life?" />
      </div>

      {/* Risk */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Risk Assessment</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {RISK_OPTIONS.map(opt => (
            <button key={opt} onClick={() => update('riskAssessment', opt)}
              style={{
                padding: '6px 14px', borderRadius: 100, border: '1.5px solid',
                borderColor: f.riskAssessment === opt ? '#ff9f0a' : 'var(--border-medium)',
                background: f.riskAssessment === opt ? 'rgba(255,159,10,0.10)' : 'transparent',
                color: f.riskAssessment === opt ? '#ff9f0a' : 'var(--text-secondary)',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}>{opt}</button>
          ))}
        </div>
        <input className="form-input" value={f.riskAssessment} onChange={e => update('riskAssessment', e.target.value)} placeholder="Custom risk statement..." />
      </div>

      {/* Recommendations */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Professional Recommendations</label>
        <textarea className="form-textarea" rows={8} value={f.recommendations} onChange={e => update('recommendations', e.target.value)} style={{ minHeight: 180 }}
          placeholder="Clinical recommendations for treatment, housing, legal relief, safety, and follow-up care..." />
      </div>

      {/* Prognosis */}
      <div>
        <label className="form-label">Prognosis</label>
        <textarea className="form-textarea" rows={3} value={f.prognosis} onChange={e => update('prognosis', e.target.value)}
          placeholder="Prognosis with appropriate treatment and stable environment vs. prognosis if returned to country of origin..." />
      </div>
    </div>
  );
}
