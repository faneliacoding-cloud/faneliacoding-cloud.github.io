// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { Search } from 'lucide-react';

const MSE_FIELDS = [
  { key: 'appearance', label: 'Appearance', placeholder: 'Describe the client\'s physical appearance including grooming, hygiene, dress, age appropriateness, and general presentation.' },
  { key: 'behavior', label: 'Behavior &amp; Psychomotor Activity', placeholder: 'Document motor activity, eye contact, cooperativeness, agitation, psychomotor retardation, gestures, and mannerisms.' },
  { key: 'speech', label: 'Speech', placeholder: 'Describe rate, rhythm, volume, tone, latency, spontaneity, and any abnormalities in speech production.' },
  { key: 'mood', label: 'Mood (Self-Reported)', placeholder: 'Record the client\'s self-reported emotional state in their own words (e.g., "I feel sad all the time" or "anxious").' },
  { key: 'affect', label: 'Affect (Observed)', placeholder: 'Describe observed emotional expression including range, intensity, appropriateness, congruence with mood, and reactivity.' },
  { key: 'thoughtProcess', label: 'Thought Process', placeholder: 'Document the organization and flow of thought (e.g., linear, goal-directed, tangential, circumstantial, loose associations, flight of ideas).' },
  { key: 'thoughtContent', label: 'Thought Content', placeholder: 'Note the presence or absence of delusions, obsessions, preoccupations, suicidal/homicidal ideation, phobias, and overvalued ideas.' },
  { key: 'perceptions', label: 'Perceptions', placeholder: 'Document any hallucinations (auditory, visual, etc.), illusions, depersonalization, derealization, or other perceptual disturbances.' },
  { key: 'cognition', label: 'Cognition', placeholder: 'Assess orientation (person, place, time, situation), attention, concentration, memory (immediate, recent, remote), and intellectual functioning.' },
  { key: 'insight', label: 'Insight', placeholder: 'Evaluate the client\'s understanding of their condition, the need for treatment, and awareness of how their symptoms affect functioning.' },
  { key: 'judgment', label: 'Judgment', placeholder: 'Assess the client\'s decision-making ability, understanding of consequences, and capacity for appropriate social behavior.' },
  { key: 'rapport', label: 'Rapport', placeholder: 'Describe the quality of the therapeutic relationship, the client\'s engagement level, trust, and any barriers to establishing rapport.' },
  { key: 'credibilityAssessment', label: 'Credibility Assessment', placeholder: 'Provide clinical observations regarding the consistency, plausibility, and internal coherence of the client\'s account. Note any indicators of genuine distress during retelling.' },
] as const;

export default function Step07Clinical({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s07 = evaluation.sections.step07;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--teal), #3DBAA8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Clinical Observations</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Mental Status Examination (MSE) — systematic clinical assessment</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {MSE_FIELDS.map(f => (
          <div key={f.key} className="card" style={{ padding: 24 }}>
            <label className="form-label" htmlFor={f.key}>{f.label}</label>
            <textarea
              id={f.key}
              className="form-textarea"
              value={(s07 as unknown as Record<string, string>)[f.key] || ''}
              onChange={e => updateEvalSection(evalId, 'step07', { [f.key]: e.target.value })}
              placeholder={f.placeholder}
              style={{ minHeight: 100 }}
              aria-label={f.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
