// @ts-nocheck
'use client';
/**
 * Section 6: Mental Status Exam (MSE)
 * Structured clinician observations with selectable options
 */
import { useAppStore, MentalStatusExam } from '@/lib/store';
import { Eye } from 'lucide-react';

interface Props { evalId: string; }

const MSE_OPTIONS: Record<keyof MentalStatusExam, { label: string; desc: string; options: string[] }> = {
  appearance: {
    label: 'Appearance', desc: 'Grooming, dress, apparent age vs. stated age',
    options: ['Well-groomed', 'Casually dressed', 'Professionally dressed', 'Disheveled', 'Appropriate for culture', 'Appears stated age', 'Appears older than stated age'],
  },
  eyeContact: {
    label: 'Eye Contact', desc: 'Quality and consistency of gaze',
    options: ['Good', 'Minimal', 'Intermittent', 'Avoided', 'Culturally appropriate', 'Intense', 'Normal'],
  },
  speech: {
    label: 'Speech', desc: 'Rate, volume, clarity, fluency',
    options: ['Clear and fluent', 'Pressured', 'Slow', 'Soft', 'Normal rate and tone', 'Coherent', 'Slightly halting'],
  },
  mood: {
    label: 'Mood', desc: 'Client\'s subjective emotional state (in their words)',
    options: ['Depressed', 'Anxious', 'Fearful', 'Sad', 'Hopeless', 'Overwhelmed', 'Stable', 'Worried', 'Tense'],
  },
  affect: {
    label: 'Affect', desc: 'Clinician\'s observation of emotional expression',
    options: ['Constricted', 'Flat', 'Full range', 'Tearful', 'Labile', 'Dysphoric', 'Appropriate', 'Anxious'],
  },
  thoughtProcess: {
    label: 'Thought Process', desc: 'Organization, coherence, associations',
    options: ['Logical and coherent', 'Goal-directed', 'Linear', 'Slightly disorganized when recounting trauma', 'No evidence of impaired process', 'Circumstantial'],
  },
  insight: {
    label: 'Insight', desc: 'Awareness of condition and situation',
    options: ['Good', 'Fair', 'Limited', 'Full', 'Intact'],
  },
  orientation: {
    label: 'Orientation', desc: 'Oriented to person, place, time, situation',
    options: ['Oriented x4', 'Oriented x3', 'Oriented to person and place', 'Fully oriented'],
  },
  psychomotorActivity: {
    label: 'Psychomotor Activity', desc: 'Movement, agitation, retardation',
    options: ['Normal', 'Mildly agitated', 'Restless', 'Psychomotor retardation', 'Tense posture', 'Hypervigilant posture', 'Sat on edge of seat'],
  },
  cognition: {
    label: 'Cognition', desc: 'Memory, concentration, abstract thinking',
    options: ['Grossly intact', 'Memory intact', 'Concentration intact', 'Some difficulty concentrating when discussing trauma'],
  },
  suicidalHomicidalIdeation: {
    label: 'Suicidal / Homicidal Ideation', desc: 'Safety assessment',
    options: ['Denied SI/HI', 'Passive SI only', 'No current SI/HI', 'SI without plan or intent', 'SI addressed and safety plan in place'],
  },
  additionalObservations: {
    label: 'Additional Observations', desc: 'Any other relevant clinical observations',
    options: [],
  },
};

function MSEField({ field, info, value, onChange }: {
  field: keyof MentalStatusExam;
  info: { label: string; desc: string; options: string[] };
  value: string;
  onChange: (v: string) => void;
}) {
  const toggleOption = (opt: string) => {
    const current = value ? value.split('; ').map(s => s.trim()) : [];
    const idx = current.indexOf(opt);
    if (idx > -1) onChange(current.filter((_, i) => i !== idx).join('; '));
    else onChange([...current, opt].join('; '));
  };
  const selected = value ? value.split(';').map(s => s.trim()) : [];

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{info.label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{info.desc}</div>
      </div>
      {info.options.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {info.options.map(opt => {
            const isSelected = selected.includes(opt);
            return (
              <button key={opt} onClick={() => toggleOption(opt)}
                style={{
                  padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                  borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-medium)',
                  background: isSelected ? 'var(--accent-blue-light)' : 'transparent',
                  color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontSize: 12, fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms ease',
                }}
              >{opt}</button>
            );
          })}
        </div>
      )}
      <input
        className="form-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={info.options.length > 0 ? 'Click options above or type custom...' : 'Type observation...'}
        style={{ fontSize: 13 }}
      />
    </div>
  );
}

export default function Section6MSE({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const mse = eval_.mentalStatusExam;

  const update = (field: keyof MentalStatusExam, value: string) => {
    updateEvaluation(evalId, { mentalStatusExam: { ...eval_.mentalStatusExam, [field]: value } });
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(90,200,250,0.10)' }}>
          <Eye size={20} color="#5ac8fa" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Mental Status Exam</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Structured clinical observations — click options to build your narrative</p>
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(90,200,250,0.08)', border: '1px solid rgba(90,200,250,0.15)', fontSize: 12, color: '#5ac8fa', marginBottom: 24 }}>
        💡 Click multiple options for each domain. They will combine into a narrative automatically. You can also type directly in the field.
      </div>

      {(Object.keys(MSE_OPTIONS) as Array<keyof MentalStatusExam>).map(field => (
        <MSEField key={field} field={field} info={MSE_OPTIONS[field]} value={mse[field]} onChange={v => update(field, v)} />
      ))}
    </div>
  );
}
