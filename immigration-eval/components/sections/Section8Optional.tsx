'use client';
/**
 * Section 8: Optional Conditional Sections
 * Toggle sections on/off: LGBTQ, Child Interview, Delayed Filing, Scars, Medical, Humanitarian
 */
import { useAppStore, OptionalSections } from '@/lib/store';
import { ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props { evalId: string; }

function SectionToggle({
  title, description, color, enabled, onToggle, children,
}: {
  title: string; description: string; color: string;
  enabled: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(enabled);
  return (
    <div style={{
      borderRadius: 14, border: `1.5px solid ${enabled ? color + '40' : 'var(--border-light)'}`,
      background: enabled ? color + '06' : 'var(--bg-secondary)',
      marginBottom: 12, overflow: 'hidden', transition: 'all 250ms ease',
    }}>
      <div
        style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        onClick={() => { if (enabled) setExpanded(!expanded); }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: enabled ? color : 'var(--text-primary)', marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{description}</div>
        </div>
        <label className="toggle-switch" onClick={e => e.stopPropagation()}>
          <input type="checkbox" checked={enabled} onChange={() => { onToggle(); setExpanded(!enabled); }} />
          <span className="toggle-slider" />
        </label>
        {enabled && (
          <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
      {enabled && expanded && (
        <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${color}20` }}>
          <div style={{ height: 16 }} />
          {children}
        </div>
      )}
    </div>
  );
}

export default function Section8Optional({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const os = eval_.optionalSections;

  const updateSection = (section: keyof OptionalSections, field: string, value: string | boolean) => {
    updateEvaluation(evalId, {
      optionalSections: {
        ...os,
        [section]: { ...os[section], [field]: value },
      },
    });
  };

  const toggle = (section: keyof OptionalSections) => {
    updateEvaluation(evalId, {
      optionalSections: { ...os, [section]: { ...os[section], enabled: !os[section].enabled } },
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(48,209,88,0.10)' }}>
          <ToggleRight size={20} color="#30d158" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Optional Sections</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Enable sections relevant to this case — they will be included in the generated report</p>
        </div>
      </div>

      {/* LGBTQ Asylum */}
      <SectionToggle title="LGBTQ+ Asylum Claims" description="Sexual orientation or gender identity persecution" color="#bf5af2" enabled={os.lgbtqAsylum.enabled} onToggle={() => toggle('lgbtqAsylum')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="form-label">When did the client first notice same-sex attraction / gender expression?</label>
            <textarea className="form-textarea" rows={3} value={os.lgbtqAsylum.sexualOrientationHistory} onChange={e => updateSection('lgbtqAsylum', 'sexualOrientationHistory', e.target.value)} placeholder="Age, experience, reactions from family/community..." />
          </div>
          <div>
            <label className="form-label">Gender Expression History</label>
            <textarea className="form-textarea" rows={3} value={os.lgbtqAsylum.genderExpressionHistory} onChange={e => updateSection('lgbtqAsylum', 'genderExpressionHistory', e.target.value)} placeholder="History of gender expression, societal reactions..." />
          </div>
          <div>
            <label className="form-label">Why is it dangerous to be LGBTQ+ in their home country?</label>
            <textarea className="form-textarea" rows={3} value={os.lgbtqAsylum.countryDangers} onChange={e => updateSection('lgbtqAsylum', 'countryDangers', e.target.value)} placeholder="Laws, cultural attitudes, known incidents..." />
          </div>
          <div>
            <label className="form-label">Client's Personal Experiences</label>
            <textarea className="form-textarea" rows={3} value={os.lgbtqAsylum.personalExperiences} onChange={e => updateSection('lgbtqAsylum', 'personalExperiences', e.target.value)} placeholder="What has the client personally experienced because of their identity?" />
          </div>
          <div>
            <label className="form-label">Community / Witnessed Experiences</label>
            <textarea className="form-textarea" rows={3} value={os.lgbtqAsylum.communityExperiences} onChange={e => updateSection('lgbtqAsylum', 'communityExperiences', e.target.value)} placeholder="What has the client heard or witnessed happen to others like them?" />
          </div>
        </div>
      </SectionToggle>

      {/* Child Interview */}
      <SectionToggle title="Child Interview" description="Brief interview with client's child or minor family member" color="#5ac8fa" enabled={os.childInterview.enabled} onToggle={() => toggle('childInterview')}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="form-label">Child's Name</label>
            <input className="form-input" value={os.childInterview.childName} onChange={e => updateSection('childInterview', 'childName', e.target.value)} placeholder="First name only" />
          </div>
          <div>
            <label className="form-label">Age</label>
            <input className="form-input" type="number" value={os.childInterview.childAge} onChange={e => updateSection('childInterview', 'childAge', e.target.value)} placeholder="Age" min={0} max={17} />
          </div>
          <div>
            <label className="form-label">Relationship to Client</label>
            <select className="form-select" value={os.childInterview.childRelationship} onChange={e => updateSection('childInterview', 'childRelationship', e.target.value)}>
              <option value="">Select</option>
              <option>Son</option><option>Daughter</option><option>Sibling</option><option>Other relative</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="form-label">Interview Notes</label>
          <textarea className="form-textarea" rows={4} value={os.childInterview.interviewNotes} onChange={e => updateSection('childInterview', 'interviewNotes', e.target.value)} placeholder="Key observations, statements, emotional presentation..." />
        </div>
        <div>
          <label className="form-label">Consistency with Parent's Account</label>
          <textarea className="form-textarea" rows={3} value={os.childInterview.consistencyWithParent} onChange={e => updateSection('childInterview', 'consistencyWithParent', e.target.value)} placeholder="How does the child's account align with or corroborate the parent's?" />
        </div>
      </SectionToggle>

      {/* Delayed Filing */}
      <SectionToggle title="Delayed Filing Explanation" description="Psychological barriers that prevented timely asylum filing" color="#ff9f0a" enabled={os.delayedFiling.enabled} onToggle={() => toggle('delayedFiling')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="form-label">Explanation for Delayed Filing</label>
            <textarea className="form-textarea" rows={4} value={os.delayedFiling.explanation} onChange={e => updateSection('delayedFiling', 'explanation', e.target.value)} placeholder="Timeline of events, reasons for delay, lack of knowledge, fear, practical barriers..." />
          </div>
          <div>
            <label className="form-label">Psychological Barriers to Filing</label>
            <textarea className="form-textarea" rows={4} value={os.delayedFiling.psychologicalBarriers} onChange={e => updateSection('delayedFiling', 'psychologicalBarriers', e.target.value)} placeholder="How did PTSD, depression, anxiety, or trauma symptoms contribute to delay? How did symptoms impair capacity to file?" />
          </div>
        </div>
      </SectionToggle>

      {/* Physical Scars */}
      <SectionToggle title="Physical Scars / Evidence" description="Documentation of physical evidence consistent with claimed trauma" color="#ff453a" enabled={os.physicalScars.enabled} onToggle={() => toggle('physicalScars')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="form-label">Description of Physical Scars or Injuries</label>
            <textarea className="form-textarea" rows={4} value={os.physicalScars.scarDescription} onChange={e => updateSection('physicalScars', 'scarDescription', e.target.value)} placeholder="Describe visible scars, marks, injuries — appearance, size, location..." />
          </div>
          <div>
            <label className="form-label">Location on Body</label>
            <input className="form-input" value={os.physicalScars.location} onChange={e => updateSection('physicalScars', 'location', e.target.value)} placeholder="e.g. Left forearm, upper back, face" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Consistent with Reported Account</div>
            <label className="toggle-switch">
              <input type="checkbox" checked={os.physicalScars.consistentWithAccount} onChange={e => updateSection('physicalScars', 'consistentWithAccount', e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <div>
            <label className="form-label">Medical Examiner (if applicable)</label>
            <input className="form-input" value={os.physicalScars.medicalExaminer} onChange={e => updateSection('physicalScars', 'medicalExaminer', e.target.value)} placeholder="Name and title of medical examiner, if exam was conducted" />
          </div>
        </div>
      </SectionToggle>

      {/* Medical Conditions */}
      <SectionToggle title="Medical Conditions" description="Physical health conditions relevant to the evaluation" color="#5ac8fa" enabled={os.medicalConditions.enabled} onToggle={() => toggle('medicalConditions')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="form-label">Current Medical Conditions</label>
            <textarea className="form-textarea" rows={3} value={os.medicalConditions.conditions} onChange={e => updateSection('medicalConditions', 'conditions', e.target.value)} placeholder="List all current physical health conditions, onset, treatment..." />
          </div>
          <div>
            <label className="form-label">Current Medications</label>
            <textarea className="form-textarea" rows={2} value={os.medicalConditions.medications} onChange={e => updateSection('medicalConditions', 'medications', e.target.value)} placeholder="Medications, dosages, prescribing providers..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Conditions Are Trauma-Related</div>
            <label className="toggle-switch">
              <input type="checkbox" checked={os.medicalConditions.traumaRelated} onChange={e => updateSection('medicalConditions', 'traumaRelated', e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </SectionToggle>

      {/* Humanitarian */}
      <SectionToggle title="Humanitarian Considerations" description="Other factors relevant to the humanitarian basis for relief" color="#30d158" enabled={os.humanitarianConsiderations.enabled} onToggle={() => toggle('humanitarianConsiderations')}>
        <div>
          <label className="form-label">Humanitarian Details</label>
          <textarea className="form-textarea" rows={5} value={os.humanitarianConsiderations.details} onChange={e => updateSection('humanitarianConsiderations', 'details', e.target.value)} placeholder="Any other humanitarian factors: family separation, children's welfare, community ties, medical dependency on US-based care..." />
        </div>
      </SectionToggle>
    </div>
  );
}
