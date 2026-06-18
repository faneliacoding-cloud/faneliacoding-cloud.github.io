// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { EVAL_STEPS, CASE_TYPE_CONFIG } from '@/lib/types';
import { FileCheck, CheckCircle2, AlertCircle, FileDown } from 'lucide-react';

function getStepCompletion(evaluation: ReturnType<typeof useAppStore.getState>['evaluations'][0], stepId: number): { filled: number; total: number; missing: string[] } {
  const missing: string[] = [];
  const check = (val: unknown, label: string) => {
    if (val === '' || val === undefined || val === null || (Array.isArray(val) && val.length === 0)) {
      missing.push(label);
      return false;
    }
    if (Array.isArray(val) && val.every((v: number) => v < 0)) {
      missing.push(label);
      return false;
    }
    return true;
  };

  switch (stepId) {
    case 0: {
      const c = evaluation.client;
      const total = 6;
      let filled = 0;
      if (check(c.fullName, 'Full Name')) filled++;
      if (check(c.dateOfBirth, 'Date of Birth')) filled++;
      if (check(c.nationality, 'Nationality')) filled++;
      if (check(c.countryOfOrigin, 'Country of Origin')) filled++;
      if (check(c.spokenLanguages, 'Languages')) filled++;
      if (check(c.referringAttorney, 'Referring Attorney')) filled++;
      return { filled, total, missing };
    }
    case 1: {
      const s = evaluation.sections.step02;
      const total = 2;
      let filled = 0;
      if (check(s.caseType, 'Case Type')) filled++;
      if (check(s.caseNotes, 'Case Notes')) filled++;
      return { filled, total, missing };
    }
    case 2: {
      const s = evaluation.sections.step03;
      const total = 4;
      let filled = 0;
      if (check(s.personalHistory, 'Personal History')) filled++;
      if (check(s.familyBackground, 'Family Background')) filled++;
      if (check(s.educationHistory, 'Education History')) filled++;
      if (check(s.employmentHistory, 'Employment History')) filled++;
      return { filled, total, missing };
    }
    case 3: {
      const s = evaluation.sections.step04;
      const total = 4;
      let filled = 0;
      if (check(s.immigrationHistory, 'Immigration History')) filled++;
      if (check(s.dateOfArrival, 'Date of Arrival')) filled++;
      if (check(s.currentStatus, 'Current Status')) filled++;
      if (check(s.reasonForFleeing, 'Reason for Fleeing')) filled++;
      return { filled, total, missing };
    }
    case 4: {
      const s = evaluation.sections.step05;
      const total = 4;
      let filled = 0;
      if (check(s.traumaCategory, 'Trauma Category')) filled++;
      if (check(s.traumaNarrative, 'Trauma Narrative')) filled++;
      if (check(s.perpetratorInfo, 'Perpetrator Info')) filled++;
      if (check(s.whyCantReturn, 'Why Can\'t Return')) filled++;
      return { filled, total, missing };
    }
    case 5: {
      const s = evaluation.sections.step06;
      const total = 4;
      let filled = 0;
      if (check(s.currentSymptoms, 'Current Symptoms')) filled++;
      if (check(s.functionalImpairment, 'Functional Impairment')) filled++;
      if (s.phq9Scores.some((v: number) => v >= 0)) filled++;
      else missing.push('PHQ-9 Scores');
      if (s.pcl5Scores.some((v: number) => v >= 0)) filled++;
      else missing.push('PCL-5 Scores');
      return { filled, total, missing };
    }
    case 6: {
      const s = evaluation.sections.step07;
      const total = 5;
      let filled = 0;
      if (check(s.appearance, 'Appearance')) filled++;
      if (check(s.mood, 'Mood')) filled++;
      if (check(s.affect, 'Affect')) filled++;
      if (check(s.thoughtProcess, 'Thought Process')) filled++;
      if (check(s.credibilityAssessment, 'Credibility Assessment')) filled++;
      return { filled, total, missing };
    }
    case 7: {
      const s = evaluation.sections.step08;
      const total = 3;
      let filled = 0;
      if (check(s.diagnoses, 'Diagnoses')) filled++;
      if (check(s.diagnosticRationale, 'Diagnostic Rationale')) filled++;
      if (check(s.differentialDiagnosis, 'Differential Diagnosis')) filled++;
      return { filled, total, missing };
    }
    case 8: {
      const total = 1;
      let filled = 0;
      if (evaluation.documents.length > 0) filled++;
      else missing.push('Supporting Documents');
      return { filled, total, missing };
    }
    case 9: {
      const s = evaluation.sections.step10;
      const total = 4;
      let filled = 0;
      if (check(s.clinicalImpression, 'Clinical Impression')) filled++;
      if (check(s.recommendations, 'Recommendations')) filled++;
      if (check(s.riskAssessment, 'Risk Assessment')) filled++;
      if (check(s.finalStatement, 'Final Statement')) filled++;
      return { filled, total, missing };
    }
    default:
      return { filled: 0, total: 0, missing: [] };
  }
}

export default function Step11Review({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));

  if (!evaluation) return null;

  const stepResults = EVAL_STEPS.slice(0, 10).map(step => ({
    ...step,
    ...getStepCompletion(evaluation, step.id),
  }));

  const totalFilled = stepResults.reduce((a, s) => a + s.filled, 0);
  const totalFields = stepResults.reduce((a, s) => a + s.total, 0);
  const overallPct = totalFields > 0 ? Math.round((totalFilled / totalFields) * 100) : 0;
  const allMissing = stepResults.flatMap(s => s.missing.map(m => `${s.title}: ${m}`));
  const caseConfig = CASE_TYPE_CONFIG[evaluation.caseType];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--gold), #B8953F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileCheck size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Review &amp; Generate Report</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Verify completeness before generating the final evaluation report</p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--ivory-dark)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={overallPct >= 80 ? 'var(--forest)' : overallPct >= 50 ? 'var(--gold)' : 'var(--rose)'}
                strokeWidth="3"
                strokeDasharray={`${overallPct}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--charcoal)' }}>{overallPct}%</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 4 }}>
              {evaluation.client.fullName || 'Unnamed Client'}
            </h3>
            <p className="text-secondary">{caseConfig?.label} · {totalFilled} of {totalFields} key fields completed</p>
          </div>
          <button
            className="btn-gold"
            disabled={overallPct < 50}
            aria-label="Generate report"
            style={{ opacity: overallPct < 50 ? 0.5 : 1 }}
          >
            <FileDown size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* Step Checklist */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Section Completion Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {stepResults.map(step => {
            const complete = step.filled >= step.total;
            const pct = step.total > 0 ? Math.round((step.filled / step.total) * 100) : 0;
            return (
              <div key={step.id} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                background: complete ? 'rgba(74,155,142,0.04)' : 'var(--ivory)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)',
              }}>
                {complete ? (
                  <CheckCircle2 size={20} color="var(--teal)" />
                ) : (
                  <AlertCircle size={20} color="var(--amber)" />
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{step.icon} {step.title}</p>
                  {!complete && step.missing.length > 0 && (
                    <p className="text-muted" style={{ marginTop: 2 }}>Missing: {step.missing.join(', ')}</p>
                  )}
                </div>
                <span className="text-muted" style={{ fontSize: 12, fontWeight: 600 }}>{pct}%</span>
                <div style={{ width: 60, height: 4, borderRadius: 100, background: 'var(--ivory-dark)', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: 100, background: complete ? 'var(--teal)' : 'var(--gold)', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Missing Fields */}
      {allMissing.length > 0 && (
        <div className="card" style={{ padding: 28 }}>
          <h3 className="heading-md" style={{ marginBottom: 16 }}>Missing Fields Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
            {allMissing.map(field => (
              <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--amber-light)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--amber)' }}>
                <AlertCircle size={13} />
                {field}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
