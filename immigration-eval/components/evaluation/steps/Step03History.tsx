// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { BookOpen } from 'lucide-react';

const fields = [
  { key: 'personalHistory', label: 'Personal History', placeholder: 'Describe the client\'s upbringing, early life, and significant personal experiences. Include formative events, cultural context, and any relevant developmental history.' },
  { key: 'familyBackground', label: 'Family Background', placeholder: 'Detail family structure, relationships, dynamics, and any history of conflict, abuse, or significant events within the family system.' },
  { key: 'educationHistory', label: 'Education History', placeholder: 'Document educational background including schools attended, highest level of education, disruptions to education, and any academic achievements or challenges.' },
  { key: 'employmentHistory', label: 'Employment History', placeholder: 'Describe work history, including types of employment, duration, any work-related trauma, forced labor, or inability to work due to circumstances.' },
  { key: 'relationshipHistory', label: 'Relationship History', placeholder: 'Detail significant romantic and interpersonal relationships, including any history of domestic violence, abuse, or relationship-related trauma.' },
  { key: 'childrenInfo', label: 'Children Information', placeholder: 'Information about children including ages, custody status, whereabouts, any separation concerns, and the impact of the immigration situation on children.' },
] as const;

export default function Step03History({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s03 = evaluation.sections.step03;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Personal &amp; Family History</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Background information and family dynamics relevant to the evaluation</p>
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
              value={(s03 as unknown as Record<string, string>)[f.key] || ''}
              onChange={e => updateEvalSection(evalId, 'step03', { [f.key]: e.target.value })}
              placeholder={f.placeholder}
              style={{ minHeight: 140 }}
              aria-label={f.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
