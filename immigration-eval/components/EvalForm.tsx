'use client';
/**
 * EvalForm — Multi-step evaluation form shell
 * Manages step navigation, progress tracking, and export
 */
import { useAppStore } from '@/lib/store';
import { generateDOCX, generatePDF } from '@/lib/docGenerator';
import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, FileDown, Printer, Save,
  User, Stethoscope, FileText, AlertTriangle, Brain,
  Eye, BarChart2, ToggleRight, CheckSquare, ArrowLeft,
} from 'lucide-react';

import Section1ClientInfo from './sections/Section1ClientInfo';
import Section2ClinicianInfo from './sections/Section2ClinicianInfo';
import Section3CaseSummary from './sections/Section3CaseSummary';
import Section4TraumaHistory from './sections/Section4TraumaHistory';
import Section5PsychSymptoms from './sections/Section5PsychSymptoms';
import Section6MSE from './sections/Section6MSE';
import Section7Scales from './sections/Section7Scales';
import Section8Optional from './sections/Section8Optional';
import Section9Findings from './sections/Section9Findings';

const STEPS = [
  { id: 0, title: 'Client Info', icon: User, color: '#0071e3' },
  { id: 1, title: 'Clinician', icon: Stethoscope, color: '#5e5ce6' },
  { id: 2, title: 'Case Summary', icon: FileText, color: '#bf5af2' },
  { id: 3, title: 'Trauma History', icon: AlertTriangle, color: '#ff9f0a' },
  { id: 4, title: 'Symptoms', icon: Brain, color: '#ff453a' },
  { id: 5, title: 'Mental Status', icon: Eye, color: '#5ac8fa' },
  { id: 6, title: 'Scales', icon: BarChart2, color: '#5e5ce6' },
  { id: 7, title: 'Optional', icon: ToggleRight, color: '#30d158' },
  { id: 8, title: 'Findings', icon: CheckSquare, color: '#30d158' },
];

export default function EvalForm() {
  const { activeEvalId, evaluations, updateEvaluation, completeEvaluation, setView } = useAppStore();
  const [exporting, setExporting] = useState(false);
  const [saved, setSaved] = useState(false);

  const eval_ = evaluations.find(e => e.id === activeEvalId);
  if (!activeEvalId || !eval_) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 16 }}>
        <FileText size={48} color="var(--text-tertiary)" />
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No evaluation selected.</p>
        <button className="btn-primary" onClick={() => setView('dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  const currentStep = eval_.currentStep;
  const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const goTo = (step: number) => {
    updateEvaluation(activeEvalId, { currentStep: step, status: 'in-progress' });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportDocx = async () => {
    setExporting(true);
    try { await generateDOCX(eval_); } catch (e) { console.error(e); }
    setExporting(false);
  };

  const handleExportPdf = () => generatePDF(eval_);

  const handleComplete = () => {
    completeEvaluation(activeEvalId);
    setView('completed');
  };

  const clientName = eval_.clientInfo.fullName || 'Unnamed Client';
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top bar */}
      <div style={{
        height: 56, flexShrink: 0,
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 16,
      }}>
        <button className="btn-ghost" onClick={() => setView('dashboard')} style={{ gap: 6, fontSize: 13 }}>
          <ArrowLeft size={14} /> Dashboard
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--border-medium)' }} />
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {clientName}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" onClick={handleSave} style={{ fontSize: 12 }}>
            <Save size={13} />{saved ? '✓ Saved' : 'Save'}
          </button>
          <button className="btn-secondary" onClick={handleExportPdf} style={{ fontSize: 12 }}>
            <Printer size={13} /> PDF
          </button>
          <button className="btn-primary" onClick={handleExportDocx} disabled={exporting} style={{ fontSize: 12 }}>
            <FileDown size={13} />{exporting ? 'Exporting...' : 'Export DOCX'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Step sidebar */}
        <div style={{
          width: 200, flexShrink: 0,
          background: 'var(--bg-tertiary)',
          borderRight: '1px solid var(--border-light)',
          padding: '20px 12px',
          overflowY: 'auto',
        }}>
          {/* Progress */}
          <div style={{ marginBottom: 20, padding: '0 4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <span>Progress</span><span>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          {STEPS.map(step => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <button key={step.id} onClick={() => goTo(step.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 10px', borderRadius: 10, border: 'none',
                  background: isActive ? 'var(--bg-secondary)' : 'transparent',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  color: isActive ? 'var(--text-primary)' : isComplete ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  marginBottom: 4, transition: 'all 150ms ease',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isActive ? step.color + '18' : isComplete ? 'rgba(48,209,88,0.10)' : 'transparent',
                  border: `1.5px solid ${isActive ? step.color : isComplete ? '#30d158' : 'var(--border-medium)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isComplete ? (
                    <span style={{ fontSize: 12, color: '#30d158', fontWeight: 700 }}>✓</span>
                  ) : (
                    <Icon size={13} color={isActive ? step.color : 'var(--text-tertiary)'} />
                  )}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: isActive ? 600 : 400 }}>{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Form content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>
          {currentStep === 0 && <Section1ClientInfo evalId={activeEvalId} />}
          {currentStep === 1 && <Section2ClinicianInfo evalId={activeEvalId} />}
          {currentStep === 2 && <Section3CaseSummary evalId={activeEvalId} />}
          {currentStep === 3 && <Section4TraumaHistory evalId={activeEvalId} />}
          {currentStep === 4 && <Section5PsychSymptoms evalId={activeEvalId} />}
          {currentStep === 5 && <Section6MSE evalId={activeEvalId} />}
          {currentStep === 6 && <Section7Scales evalId={activeEvalId} />}
          {currentStep === 7 && <Section8Optional evalId={activeEvalId} />}
          {currentStep === 8 && <Section9Findings evalId={activeEvalId} />}

          {/* Nav buttons */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-light)',
          }}>
            <button className="btn-secondary" onClick={() => goTo(currentStep - 1)} disabled={currentStep === 0}>
              <ChevronLeft size={16} /> Previous
            </button>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              Step {currentStep + 1} of {STEPS.length}
            </div>
            {isLastStep ? (
              <button className="btn-primary" onClick={handleComplete} style={{ background: '#30d158' }}>
                <CheckSquare size={16} /> Complete Evaluation
              </button>
            ) : (
              <button className="btn-primary" onClick={() => goTo(currentStep + 1)}>
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
