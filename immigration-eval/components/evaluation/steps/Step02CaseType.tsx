// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, type CaseType } from '@/lib/types';
import { ClipboardList, Check } from 'lucide-react';

const CASE_TYPES = Object.entries(CASE_TYPE_CONFIG) as [CaseType, typeof CASE_TYPE_CONFIG[CaseType]][];

export default function Step02CaseType({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);
  const updateEvaluation = useAppStore(s => s.updateEvaluation);

  if (!evaluation) return null;
  const s02 = evaluation.sections.step02;

  const selectType = (ct: CaseType) => {
    updateEvalSection(evalId, 'step02', { caseType: ct });
    updateEvaluation(evalId, { caseType: ct });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardList size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Immigration Case Type</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Select the evaluation type and add relevant case notes</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 28 }}>
        {CASE_TYPES.map(([key, cfg]) => {
          const selected = s02.caseType === key;
          return (
            <button
              key={key}
              onClick={() => selectType(key)}
              className="card card-interactive"
              aria-label={`Select ${cfg.label}`}
              style={{
                padding: 24,
                textAlign: 'left',
                cursor: 'pointer',
                border: selected ? '2px solid var(--gold)' : '1px solid var(--border-light)',
                background: selected ? 'var(--gold-lighter)' : 'var(--white)',
                position: 'relative',
              }}
            >
              {selected && (
                <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={14} color="white" />
                </div>
              )}
              <div style={{ fontSize: 28, marginBottom: 12 }}>{cfg.icon}</div>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>{cfg.label}</h4>
              <p style={{ fontSize: 12, color: 'var(--charcoal-light)', lineHeight: 1.5, marginBottom: 12 }}>{cfg.description}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--charcoal-muted)', background: 'var(--ivory-warm)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                ⏱ {cfg.estimatedTime}
              </div>
            </button>
          );
        })}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h3 className="heading-md" style={{ marginBottom: 16 }}>Case Notes</h3>
        <label className="form-label" htmlFor="caseNotes">Additional Context</label>
        <textarea
          id="caseNotes"
          className="form-textarea"
          value={s02.caseNotes}
          onChange={e => updateEvalSection(evalId, 'step02', { caseNotes: e.target.value })}
          placeholder="Document any preliminary case notes, referral context, or special considerations for this evaluation..."
          style={{ minHeight: 160 }}
          aria-label="Case notes"
        />
        <p className="form-hint">These notes are for internal use and will not appear in the final report.</p>
      </div>
    </div>
  );
}
