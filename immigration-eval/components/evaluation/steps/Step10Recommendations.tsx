// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { CheckCircle2 } from 'lucide-react';

const fields = [
  { key: 'clinicalImpression', label: 'Clinical Impression', placeholder: 'Provide an integrated clinical impression summarizing the evaluation findings, the client\'s presentation, and the relationship between the immigration case and the psychological impact.' },
  { key: 'recommendations', label: 'Clinical Recommendations', placeholder: 'State your clinical recommendations regarding the immigration case, including your professional opinion on the merits of the case from a psychological perspective.' },
  { key: 'treatmentRecommendations', label: 'Treatment Recommendations', placeholder: 'Recommend specific mental health treatments such as individual therapy, group therapy, medication evaluation, or specialized trauma treatment modalities (e.g., EMDR, CPT).' },
  { key: 'riskAssessment', label: 'Risk Assessment', placeholder: 'Assess the client\'s current risk level including suicidal/homicidal ideation, self-harm, and vulnerability factors. Document protective factors and any safety planning.' },
  { key: 'prognosticStatement', label: 'Prognostic Statement', placeholder: 'Provide a prognosis based on the client\'s current condition, considering factors such as treatment access, immigration outcome, social support, and coping resources.' },
  { key: 'returnRisk', label: 'Risk if Returned to Country of Origin', placeholder: 'Assess the psychological impact and risk of harm if the client were returned to their country of origin. Document the expected exacerbation of symptoms and potential for re-traumatization.' },
  { key: 'finalStatement', label: 'Final Statement', placeholder: 'Provide a concise concluding statement summarizing your clinical opinion and the basis for your recommendations. This will appear at the end of the evaluation report.' },
] as const;

export default function Step10Recommendations({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s10 = evaluation.sections.step10;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Recommendations</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Clinical conclusions, treatment recommendations, and risk assessment</p>
          </div>
        </div>
      </div>

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {fields.map(f => (
          <div key={f.key} className="card" style={{ padding: 28 }}>
            <label className="form-label" htmlFor={f.key}>{f.label}</label>
            <textarea
              id={f.key}
              className="form-textarea"
              value={(s10 as unknown as Record<string, string>)[f.key] || ''}
              onChange={e => updateEvalSection(evalId, 'step10', { [f.key]: e.target.value })}
              placeholder={f.placeholder}
              style={{ minHeight: f.key === 'finalStatement' ? 180 : 140 }}
              aria-label={f.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
