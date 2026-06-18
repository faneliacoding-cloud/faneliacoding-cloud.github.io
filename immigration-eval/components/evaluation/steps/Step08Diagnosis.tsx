// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { DIAGNOSIS_LABELS, type DiagnosisCode, type Severity } from '@/lib/types';
import { BarChart3, Check } from 'lucide-react';

const SEVERITIES: { value: Severity; label: string; color: string }[] = [
  { value: 'none', label: 'None', color: 'var(--charcoal-muted)' },
  { value: 'mild', label: 'Mild', color: 'var(--gold)' },
  { value: 'moderate', label: 'Moderate', color: 'var(--amber)' },
  { value: 'severe', label: 'Severe', color: 'var(--rose)' },
];

const ALL_CODES = Object.keys(DIAGNOSIS_LABELS) as DiagnosisCode[];

export default function Step08Diagnosis({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s08 = evaluation.sections.step08;

  const toggleDiagnosis = (code: DiagnosisCode) => {
    const current = s08.diagnoses;
    const next = current.includes(code)
      ? current.filter(c => c !== code)
      : [...current, code];
    updateEvalSection(evalId, 'step08', { diagnoses: next });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Diagnosis &amp; Clinical Impression</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>DSM-5 diagnostic formulation and clinical rationale</p>
          </div>
        </div>
      </div>

      {/* Diagnosis multi-select */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 8 }}>DSM-5 Diagnoses</h3>
        <p className="form-hint" style={{ marginBottom: 16 }}>Select all applicable diagnoses. Selected items will appear highlighted.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
          {ALL_CODES.map(code => {
            const selected = s08.diagnoses.includes(code);
            return (
              <button
                key={code}
                onClick={() => toggleDiagnosis(code)}
                aria-label={`${selected ? 'Remove' : 'Add'} diagnosis ${code}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  border: selected ? '1.5px solid var(--forest)' : '1.5px solid var(--border-light)',
                  background: selected ? 'rgba(45,90,69,0.06)' : 'var(--white)',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: selected ? 'var(--forest)' : 'var(--ivory)',
                  border: selected ? 'none' : '1.5px solid var(--border-medium)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {selected && <Check size={13} color="white" />}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--forest)', minWidth: 52 }}>{code}</span>
                <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{DIAGNOSIS_LABELS[code]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Severity */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label">Overall Severity Level</label>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          {SEVERITIES.map(sev => (
            <button
              key={sev.value}
              onClick={() => updateEvalSection(evalId, 'step08', { severityLevel: sev.value })}
              aria-label={`Severity: ${sev.label}`}
              style={{
                padding: '10px 20px', borderRadius: 'var(--radius-md)',
                border: s08.severityLevel === sev.value ? `2px solid ${sev.color}` : '1.5px solid var(--border-light)',
                background: s08.severityLevel === sev.value ? `${sev.color}12` : 'var(--white)',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                color: s08.severityLevel === sev.value ? sev.color : 'var(--charcoal-light)',
                fontFamily: 'var(--font-sans)', transition: 'all 150ms ease',
              }}
            >
              {sev.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rationale textareas */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="diagRationale">Diagnostic Rationale</label>
        <textarea
          id="diagRationale"
          className="form-textarea"
          value={s08.diagnosticRationale}
          onChange={e => updateEvalSection(evalId, 'step08', { diagnosticRationale: e.target.value })}
          placeholder="Explain the clinical reasoning supporting each diagnosis, including how the client meets DSM-5 criteria and the relationship between diagnoses and the immigration case."
          style={{ minHeight: 160 }}
          aria-label="Diagnostic rationale"
        />
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="diffDiag">Differential Diagnosis</label>
        <textarea
          id="diffDiag"
          className="form-textarea"
          value={s08.differentialDiagnosis}
          onChange={e => updateEvalSection(evalId, 'step08', { differentialDiagnosis: e.target.value })}
          placeholder="List and discuss alternative diagnoses that were considered and the clinical reasoning for ruling them in or out."
          style={{ minHeight: 120 }}
          aria-label="Differential diagnosis"
        />
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="ruleOut">Rule-Out Conditions</label>
        <textarea
          id="ruleOut"
          className="form-textarea"
          value={s08.ruleOutConditions}
          onChange={e => updateEvalSection(evalId, 'step08', { ruleOutConditions: e.target.value })}
          placeholder="Document conditions that need further assessment or monitoring to confirm or exclude from the diagnostic picture."
          style={{ minHeight: 100 }}
          aria-label="Rule-out conditions"
        />
      </div>

      <div className="card" style={{ padding: 28 }}>
        <label className="form-label" htmlFor="progFactors">Prognostic Factors</label>
        <textarea
          id="progFactors"
          className="form-textarea"
          value={s08.prognosticFactors}
          onChange={e => updateEvalSection(evalId, 'step08', { prognosticFactors: e.target.value })}
          placeholder="Identify factors that may influence the client's prognosis, including protective factors, risk factors, treatment history, and social support."
          style={{ minHeight: 120 }}
          aria-label="Prognostic factors"
        />
      </div>
    </div>
  );
}
