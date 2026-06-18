// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { Brain } from 'lucide-react';

const PHQ9_ITEMS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling/staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure',
  'Trouble concentrating on things',
  'Moving or speaking slowly, or being fidgety/restless',
  'Thoughts that you would be better off dead or of hurting yourself',
];

const GAD7_ITEMS = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it\'s hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid, as if something awful might happen',
];

const PCL5_ITEMS = [
  'Repeated, disturbing, and unwanted memories',
  'Repeated, disturbing dreams of the stressful experience',
  'Suddenly feeling or acting as if the experience were happening again',
  'Feeling very upset when reminded of the experience',
  'Having strong physical reactions when reminded',
  'Avoiding memories, thoughts, or feelings related to the experience',
  'Avoiding external reminders (people, places, activities)',
  'Trouble remembering important parts of the experience',
  'Having strong negative beliefs about yourself, others, or the world',
  'Blaming yourself or someone else for the experience',
  'Having strong negative feelings such as fear, horror, anger, guilt, or shame',
  'Loss of interest in activities you used to enjoy',
  'Feeling distant or cut off from other people',
  'Trouble experiencing positive feelings',
  'Irritable behavior, angry outbursts, or acting aggressively',
  'Taking too many risks or doing things that could cause you harm',
  'Being "superalert" or watchful or on guard',
  'Feeling jumpy or easily startled',
  'Having difficulty concentrating',
  'Trouble falling or staying asleep',
];

const SCORE_LABELS = ['0', '1', '2', '3', '4'];

function getSeverityPHQ9(total: number): { label: string; cls: string } {
  if (total <= 4) return { label: 'Minimal', cls: 'score-minimal' };
  if (total <= 9) return { label: 'Mild', cls: 'score-mild' };
  if (total <= 14) return { label: 'Moderate', cls: 'score-moderate' };
  if (total <= 19) return { label: 'Moderately Severe', cls: 'score-moderate' };
  return { label: 'Severe', cls: 'score-severe' };
}

function getSeverityGAD7(total: number): { label: string; cls: string } {
  if (total <= 4) return { label: 'Minimal', cls: 'score-minimal' };
  if (total <= 9) return { label: 'Mild', cls: 'score-mild' };
  if (total <= 14) return { label: 'Moderate', cls: 'score-moderate' };
  return { label: 'Severe', cls: 'score-severe' };
}

function getSeverityPCL5(total: number): { label: string; cls: string } {
  if (total < 31) return { label: 'Below Threshold', cls: 'score-minimal' };
  if (total < 45) return { label: 'Probable PTSD', cls: 'score-moderate' };
  return { label: 'Severe PTSD', cls: 'score-severe' };
}

function ScoreTotal({ scores, getSeverity }: { scores: number[]; getSeverity: (n: number) => { label: string; cls: string } }) {
  const answered = scores.filter(s => s >= 0);
  const total = answered.reduce((a, b) => a + b, 0);
  const sev = getSeverity(total);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'var(--ivory)', borderRadius: 'var(--radius-lg)', marginTop: 8 }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--charcoal)', fontFamily: 'var(--font-serif)' }}>{total}</span>
      <span className="text-secondary" style={{ marginRight: 8 }}>/ {scores.length * (scores.length === 20 ? 4 : 3)}</span>
      <span className={`status-pill ${sev.cls}`}>{sev.label}</span>
      <span className="text-muted" style={{ marginLeft: 'auto' }}>{answered.length} of {scores.length} answered</span>
    </div>
  );
}

function ScoringGrid({
  items, scores, maxScore, onChange,
}: {
  items: string[]; scores: number[]; maxScore: number; onChange: (idx: number, val: number) => void;
}) {
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} className="scoring-row">
          <span style={{ flex: 1, fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.4, minWidth: 0 }}>
            <span className="text-muted" style={{ marginRight: 8 }}>{idx + 1}.</span>
            {item}
          </span>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {Array.from({ length: maxScore + 1 }, (_, v) => (
              <button
                key={v}
                className={`score-btn ${scores[idx] === v ? 'selected' : ''}`}
                onClick={() => onChange(idx, v)}
                aria-label={`Score ${v} for item ${idx + 1}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const symptomFields = [
  { key: 'currentSymptoms', label: 'Current Symptoms Overview', placeholder: 'Describe the client\'s presenting symptoms, including onset, duration, frequency, and intensity.' },
  { key: 'sleepDisturbances', label: 'Sleep Disturbances', placeholder: 'Describe sleep patterns including insomnia, nightmares, night terrors, sleep onset difficulties, or excessive sleeping.' },
  { key: 'appetiteChanges', label: 'Appetite Changes', placeholder: 'Document any changes in appetite, weight loss/gain, or eating-related difficulties.' },
  { key: 'concentrationDifficulties', label: 'Concentration Difficulties', placeholder: 'Describe difficulties with focus, memory, decision-making, or cognitive functioning.' },
  { key: 'emotionalRegulation', label: 'Emotional Regulation', placeholder: 'Document emotional dysregulation, mood swings, irritability, or difficulty managing emotions.' },
  { key: 'avoidanceBehaviors', label: 'Avoidance Behaviors', placeholder: 'Describe avoidance of triggers, places, people, conversations, or memories related to trauma.' },
  { key: 'hypervigilance', label: 'Hypervigilance', placeholder: 'Document heightened alertness, startle responses, scanning for danger, or difficulty feeling safe.' },
  { key: 'flashbacksNightmares', label: 'Flashbacks &amp; Nightmares', placeholder: 'Describe any re-experiencing symptoms including flashbacks, intrusive memories, or nightmares.' },
  { key: 'suicidalIdeation', label: 'Suicidal Ideation', placeholder: 'Document any current or past suicidal thoughts, plans, intent, or attempts. Include safety planning if applicable.' },
  { key: 'selfHarm', label: 'Self-Harm', placeholder: 'Document any current or past self-harm behaviors, including type, frequency, and context.' },
  { key: 'substanceUse', label: 'Substance Use', placeholder: 'Describe any substance use including alcohol, drugs, or medications used to cope with symptoms.' },
  { key: 'functionalImpairment', label: 'Functional Impairment', placeholder: 'Document how symptoms affect daily functioning, relationships, work, and overall quality of life.' },
] as const;

export default function Step06Symptoms({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s06 = evaluation.sections.step06;

  const update = (field: string, value: string) => {
    updateEvalSection(evalId, 'step06', { [field]: value });
  };

  const updatePHQ = (idx: number, val: number) => {
    const newScores = [...s06.phq9Scores];
    newScores[idx] = val;
    updateEvalSection(evalId, 'step06', { phq9Scores: newScores });
  };

  const updateGAD = (idx: number, val: number) => {
    const newScores = [...s06.gad7Scores];
    newScores[idx] = val;
    updateEvalSection(evalId, 'step06', { gad7Scores: newScores });
  };

  const updatePCL = (idx: number, val: number) => {
    const newScores = [...s06.pcl5Scores];
    newScores[idx] = val;
    updateEvalSection(evalId, 'step06', { pcl5Scores: newScores });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--purple), #9B8ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Symptoms &amp; Mental Health</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Current psychological symptoms and standardized assessment measures</p>
          </div>
        </div>
      </div>

      {/* Symptom textareas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, marginBottom: 32 }}>
        {symptomFields.map(f => (
          <div key={f.key} className="card" style={{ padding: 24 }}>
            <label className="form-label" htmlFor={f.key}>{f.label}</label>
            <textarea
              id={f.key}
              className="form-textarea"
              value={(s06 as unknown as Record<string, string>)[f.key] || ''}
              onChange={e => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{ minHeight: 100 }}
              aria-label={f.label}
            />
          </div>
        ))}
      </div>

      {/* PHQ-9 */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)' }}>PHQ-9 — Depression Screening</h3>
          <p className="text-secondary" style={{ marginTop: 4 }}>Over the last 2 weeks, how often has the client been bothered by any of the following? (0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)</p>
        </div>
        <ScoringGrid items={PHQ9_ITEMS} scores={s06.phq9Scores} maxScore={3} onChange={updatePHQ} />
        <ScoreTotal scores={s06.phq9Scores} getSeverity={getSeverityPHQ9} />
      </div>

      {/* GAD-7 */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)' }}>GAD-7 — Anxiety Screening</h3>
          <p className="text-secondary" style={{ marginTop: 4 }}>Over the last 2 weeks, how often has the client been bothered by the following? (0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)</p>
        </div>
        <ScoringGrid items={GAD7_ITEMS} scores={s06.gad7Scores} maxScore={3} onChange={updateGAD} />
        <ScoreTotal scores={s06.gad7Scores} getSeverity={getSeverityGAD7} />
      </div>

      {/* PCL-5 */}
      <div className="card" style={{ padding: 28 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)' }}>PCL-5 — PTSD Checklist</h3>
          <p className="text-secondary" style={{ marginTop: 4 }}>In the past month, how much has the client been bothered by each problem? (0 = Not at all, 1 = A little bit, 2 = Moderately, 3 = Quite a bit, 4 = Extremely)</p>
        </div>
        <ScoringGrid items={PCL5_ITEMS} scores={s06.pcl5Scores} maxScore={4} onChange={updatePCL} />
        <ScoreTotal scores={s06.pcl5Scores} getSeverity={getSeverityPCL5} />
      </div>
    </div>
  );
}
