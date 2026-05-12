'use client';
/**
 * Section 7: Assessment Scales — PHQ-9, GAD-7, PCL-5
 * Clickable auto-scoring with severity interpretation
 */
import { useAppStore, PHQ9Scores, GAD7Scores, PCL5Scores, calculatePHQ9Severity, calculateGAD7Severity, calculatePCL5Severity } from '@/lib/store';
import { BarChart2 } from 'lucide-react';

interface Props { evalId: string; }

const severityClass = (s: string) => {
  if (s.includes('None') || s.includes('Minimal') || s.includes('Below')) return 'score-minimal';
  if (s.includes('Mild')) return 'score-mild';
  if (s.includes('Moderate')) return 'score-moderate';
  return 'score-severe';
};

function ScoreButton({ value, selected, onClick }: { value: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`score-btn${selected ? ' selected' : ''}`}
    >
      {value}
    </button>
  );
}

/* ── PHQ-9 ─────────────────────────────────────── */
const PHQ9_ITEMS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless?',
  'Thoughts that you would be better off dead or of hurting yourself in some way',
];
const PHQ9_LABELS = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

function PHQ9Panel({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId)!;
  const phq9 = eval_.phq9;

  const updateScore = (q: keyof PHQ9Scores, val: number) => {
    const updated = { ...phq9, [q]: val };
    const keys: Array<keyof PHQ9Scores> = ['q1','q2','q3','q4','q5','q6','q7','q8','q9'];
    const total = keys.reduce((sum, k) => sum + (updated[k] as number), 0);
    const severity = calculatePHQ9Severity(total);
    updateEvaluation(evalId, { phq9: { ...updated, total, severity } });
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>PHQ-9 — Patient Health Questionnaire</h3>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Depression severity scale. Score 0–27.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{phq9.total}<span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}>/27</span></div>
          <span className={`score-pill ${severityClass(phq9.severity)}`}>{phq9.severity}</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 40px 40px 40px', gap: 8, marginBottom: 8, padding: '0 0 8px 0', borderBottom: '1.5px solid var(--border-medium)' }}>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Over the last 2 weeks, how often have you been bothered by:</div>
        {PHQ9_LABELS.map((l, i) => (
          <div key={i} style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>{i}<br /><span style={{ fontWeight: 400, fontSize: 9 }}>{l}</span></div>
        ))}
      </div>

      {PHQ9_ITEMS.map((item, i) => {
        const key = `q${i + 1}` as keyof PHQ9Scores;
        const val = phq9[key] as number;
        const isLast = i === 8;
        return (
          <div key={i} className="scoring-row" style={{ background: isLast ? 'rgba(255,69,58,0.04)' : undefined, borderColor: isLast && val > 0 ? 'rgba(255,69,58,0.25)' : undefined }}>
            <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {isLast && <span style={{ color: '#ff453a', fontSize: 11, fontWeight: 700 }}>⚠️ </span>}
              {item}
            </div>
            {[0, 1, 2, 3].map(v => (
              <ScoreButton key={v} value={v} selected={val === v} onClick={() => updateScore(key, v)} />
            ))}
          </div>
        );
      })}

      <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--bg-tertiary)', display: 'flex', gap: 24 }}>
        {[['1–4','None/Minimal'],['5–9','Mild'],['10–14','Moderate'],['15–19','Moderately Severe'],['20–27','Severe']].map(([range, label]) => (
          <div key={range} style={{ fontSize: 11 }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{range}: </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── GAD-7 ─────────────────────────────────────── */
const GAD7_ITEMS = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid, as if something awful might happen',
];

function GAD7Panel({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId)!;
  const gad7 = eval_.gad7;

  const updateScore = (q: keyof GAD7Scores, val: number) => {
    const updated = { ...gad7, [q]: val };
    const keys: Array<keyof GAD7Scores> = ['q1','q2','q3','q4','q5','q6','q7'];
    const total = keys.reduce((sum, k) => sum + (updated[k] as number), 0);
    const severity = calculateGAD7Severity(total);
    updateEvaluation(evalId, { gad7: { ...updated, total, severity } });
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>GAD-7 — Generalized Anxiety Disorder Scale</h3>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Anxiety severity scale. Score 0–21.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{gad7.total}<span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}>/21</span></div>
          <span className={`score-pill ${severityClass(gad7.severity)}`}>{gad7.severity}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 40px 40px 40px', gap: 8, marginBottom: 8, padding: '0 0 8px 0', borderBottom: '1.5px solid var(--border-medium)' }}>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Over the last 2 weeks, how often:</div>
        {PHQ9_LABELS.map((l, i) => (
          <div key={i} style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>{i}<br /><span style={{ fontWeight: 400, fontSize: 9 }}>{l}</span></div>
        ))}
      </div>

      {GAD7_ITEMS.map((item, i) => {
        const key = `q${i + 1}` as keyof GAD7Scores;
        const val = gad7[key] as number;
        return (
          <div key={i} className="scoring-row">
            <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{item}</div>
            {[0, 1, 2, 3].map(v => (
              <ScoreButton key={v} value={v} selected={val === v} onClick={() => updateScore(key, v)} />
            ))}
          </div>
        );
      })}

      <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--bg-tertiary)', display: 'flex', gap: 24 }}>
        {[['0–4','Minimal'],['5–9','Mild'],['10–14','Moderate'],['15–21','Severe']].map(([range, label]) => (
          <div key={range} style={{ fontSize: 11 }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{range}: </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PCL-5 ─────────────────────────────────────── */
const PCL5_ITEMS = [
  'Repeated, disturbing, and unwanted memories of the stressful experience?',
  'Repeated, disturbing dreams of the stressful experience?',
  'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?',
  'Feeling very upset when something reminded you of the stressful experience?',
  'Having strong physical reactions when something reminded you of the stressful experience (heart pounding, trouble breathing, sweating)?',
  'Avoiding memories, thoughts, or feelings related to the stressful experience?',
  'Avoiding external reminders of the stressful experience (people, places, conversations, activities, objects, or situations)?',
  'Trouble remembering important parts of the stressful experience?',
  'Having strong negative beliefs about yourself, other people, or the world?',
  'Blaming yourself or someone else for the stressful experience or what happened after it?',
  'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
  'Loss of interest in activities that you used to enjoy?',
  'Feeling distant or cut off from other people?',
  'Trouble experiencing positive feelings?',
  'Irritable behavior, angry outbursts, or acting aggressively?',
  'Taking too many risks or doing things that could cause you harm?',
  'Being "superalert" or watchful or on guard?',
  'Feeling jumpy or easily startled?',
  'Having difficulty concentrating?',
  'Trouble falling or staying asleep?',
];
const PCL5_LABELS = ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'];

function PCL5Panel({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId)!;
  const pcl5 = eval_.pcl5;

  const updateScore = (q: keyof PCL5Scores, val: number) => {
    const updated = { ...pcl5, [q]: val };
    const keys = Array.from({ length: 20 }, (_, i) => `q${i + 1}` as keyof PCL5Scores);
    const total = keys.reduce((sum, k) => sum + (updated[k] as number), 0);
    const { severity, likelyPTSD } = calculatePCL5Severity(total);
    updateEvaluation(evalId, { pcl5: { ...updated, total, severity, likelyPTSD } });
  };

  const clusters = [
    { name: 'B — Re-experiencing', qs: [1,2,3,4,5] },
    { name: 'C — Avoidance', qs: [6,7] },
    { name: 'D — Negative Cognitions & Mood', qs: [8,9,10,11,12,13,14] },
    { name: 'E — Hyperarousal', qs: [15,16,17,18,19,20] },
  ];

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>PCL-5 — PTSD Checklist for DSM-5</h3>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>PTSD symptom severity. Score 0–80. Threshold ≥ 31.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{pcl5.total}<span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}>/80</span></div>
          <span className={`score-pill ${severityClass(pcl5.severity)}`}>{pcl5.severity}</span>
          {pcl5.likelyPTSD && <div style={{ fontSize: 11, color: '#ff453a', fontWeight: 700, marginTop: 4 }}>⚠️ Meets PTSD threshold</div>}
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Below is a list of problems that people sometimes have in response to a very stressful experience. Please read each problem carefully and then select one of the numbers to the right to indicate how much you have been bothered by that problem in the past month.
      </p>

      {clusters.map(cluster => (
        <div key={cluster.name} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#5e5ce6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, padding: '6px 10px', background: 'rgba(94,92,230,0.06)', borderRadius: 6 }}>
            Cluster {cluster.name}
          </div>
          {cluster.qs.map(qNum => {
            const key = `q${qNum}` as keyof PCL5Scores;
            const val = pcl5[key] as number;
            return (
              <div key={qNum} className="scoring-row" style={{ gridTemplateColumns: '30px 1fr repeat(5, 36px)', display: 'grid', gap: 8 }}>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>{qNum}.</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.4, display: 'flex', alignItems: 'center' }}>{PCL5_ITEMS[qNum - 1]}</div>
                {[0,1,2,3,4].map(v => (
                  <div key={v} className="tooltip" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ScoreButton value={v} selected={val === v} onClick={() => updateScore(key, v)} />
                    <span className="tooltip-content">{PCL5_LABELS[v]}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--bg-tertiary)', display: 'flex', gap: 24 }}>
        {[['<31','Below threshold'],['31–40','Moderate'],['41–60','Moderately Severe'],['61–80','Severe']].map(([range, label]) => (
          <div key={range} style={{ fontSize: 11 }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{range}: </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Export ───────────────────────────────── */
export default function Section7Scales({ evalId }: Props) {
  const { evaluations } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(94,92,230,0.10)' }}>
          <BarChart2 size={20} color="#5e5ce6" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Assessment Scales</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Click scores for each item — totals and severity ratings calculate automatically</p>
        </div>
      </div>

      <PHQ9Panel evalId={evalId} />
      <div style={{ borderTop: '2px solid var(--border-light)', marginBottom: 32 }} />
      <GAD7Panel evalId={evalId} />
      <div style={{ borderTop: '2px solid var(--border-light)', marginBottom: 32 }} />
      <PCL5Panel evalId={evalId} />
    </div>
  );
}
