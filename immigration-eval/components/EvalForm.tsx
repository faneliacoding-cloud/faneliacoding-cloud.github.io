'use client';
/**
 * EvalForm — Multi-step evaluation form shell
 * Production-hardened with autosave, validation, beforeunload guard,
 * confirmation modals, and debounced state updates
 */
import { useAppStore } from '@/lib/store';
import { generateDOCX, generatePDF } from '@/lib/docGenerator';
import { validateEvaluation, validateForExport, type ValidationResult } from '@/lib/validation';
import { useState, useEffect, useCallback, useRef } from 'react';
import CloudExportModal from './CloudExportModal';
import {
  ChevronLeft, ChevronRight, FileDown, Printer, Save, Share2,
  User, Stethoscope, FileText, AlertTriangle, Brain,
  Eye, BarChart2, ToggleRight, CheckSquare, ArrowLeft, Camera,
  Clock, AlertCircle, X,
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
import SectionPhotos from './sections/SectionPhotos';

const STEPS = [
  { id: 0, title: 'Client Info', icon: User, color: '#0071e3' },
  { id: 1, title: 'Clinician', icon: Stethoscope, color: '#5e5ce6' },
  { id: 2, title: 'Case Summary', icon: FileText, color: '#bf5af2' },
  { id: 3, title: 'Trauma History', icon: AlertTriangle, color: '#ff9f0a' },
  { id: 4, title: 'Symptoms', icon: Brain, color: '#ff453a' },
  { id: 5, title: 'Mental Status', icon: Eye, color: '#5ac8fa' },
  { id: 6, title: 'Scales', icon: BarChart2, color: '#5e5ce6' },
  { id: 7, title: 'Optional', icon: ToggleRight, color: '#30d158' },
  { id: 8, title: 'Photos', icon: Camera, color: '#0071e3' },
  { id: 9, title: 'Findings', icon: CheckSquare, color: '#30d158' },
];

const AUTOSAVE_INTERVAL = 8000; // 8 seconds

export default function EvalForm() {
  const { activeEvalId, evaluations, updateEvaluation, completeEvaluation, setView, lastSaved } = useAppStore();
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [exportWarnings, setExportWarnings] = useState<string[]>([]);
  const [lastSavedDisplay, setLastSavedDisplay] = useState<string | null>(null);
  const autosaveRef = useRef<NodeJS.Timeout | null>(null);

  const eval_ = evaluations.find(e => e.id === activeEvalId);

  // ── Autosave ticker ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeEvalId) return;
    autosaveRef.current = setInterval(() => {
      // Zustand persist handles actual save via localStorage; we just update display
      setLastSavedDisplay(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, AUTOSAVE_INTERVAL);

    return () => {
      if (autosaveRef.current) clearInterval(autosaveRef.current);
    };
  }, [activeEvalId]);

  // ── Update last-saved display when store changes ────────────────────────────
  useEffect(() => {
    if (lastSaved) {
      setLastSavedDisplay(new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [lastSaved]);

  // ── Beforeunload guard ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (activeEvalId && eval_?.status === 'in-progress') {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [activeEvalId, eval_?.status]);

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
  const validation = validateEvaluation(eval_);

  const goTo = (step: number) => {
    if (step < 0 || step >= STEPS.length) return;
    updateEvaluation(activeEvalId, { currentStep: step, status: 'in-progress' });
  };

  const handleExport = () => {
    const { canExport, issues } = validateForExport(eval_);
    if (!canExport) {
      setExportWarnings(issues);
      setShowValidation(true);
      return;
    }
    setShowExportModal(true);
  };

  const handleComplete = () => {
    const { canExport, issues } = validateForExport(eval_);
    if (!canExport) {
      setExportWarnings(issues);
      setShowValidation(true);
      return;
    }
    setShowCompleteConfirm(true);
  };

  const confirmComplete = () => {
    completeEvaluation(activeEvalId);
    setShowCompleteConfirm(false);
    setView('completed');
  };

  const clientName = eval_.clientInfo.fullName || 'Unnamed Client';
  const isLastStep = currentStep === STEPS.length - 1;

  // Count errors per section for step badges
  const sectionErrors = STEPS.map(step => 
    validation.errors.filter(e => e.section === step.id).length
  );

  return (
    <>
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Autosave indicator */}
          {lastSavedDisplay && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
              <Clock size={11} />
              Saved {lastSavedDisplay}
            </div>
          )}
          <button className="btn-primary" onClick={handleExport} style={{ fontSize: 12 }}>
            <Share2 size={13} /> Export / Save to Cloud
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
            {/* Completeness */}
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
              {validation.completeness}% complete · {validation.errors.length} issue{validation.errors.length !== 1 ? 's' : ''}
            </div>
          </div>
          {STEPS.map(step => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            const errCount = sectionErrors[step.id];
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
                  position: 'relative',
                }}>
                  {isComplete ? (
                    <span style={{ fontSize: 12, color: '#30d158', fontWeight: 700 }}>✓</span>
                  ) : (
                    <Icon size={13} color={isActive ? step.color : 'var(--text-tertiary)'} />
                  )}
                  {errCount > 0 && !isActive && (
                    <div style={{
                      position: 'absolute', top: -4, right: -4, width: 14, height: 14,
                      borderRadius: '50%', background: '#ff453a', color: 'white',
                      fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{errCount}</div>
                  )}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: isActive ? 600 : 400 }}>{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Form content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }} id="form-content">
          {currentStep === 0 && <Section1ClientInfo evalId={activeEvalId} />}
          {currentStep === 1 && <Section2ClinicianInfo evalId={activeEvalId} />}
          {currentStep === 2 && <Section3CaseSummary evalId={activeEvalId} />}
          {currentStep === 3 && <Section4TraumaHistory evalId={activeEvalId} />}
          {currentStep === 4 && <Section5PsychSymptoms evalId={activeEvalId} />}
          {currentStep === 5 && <Section6MSE evalId={activeEvalId} />}
          {currentStep === 6 && <Section7Scales evalId={activeEvalId} />}
          {currentStep === 7 && <Section8Optional evalId={activeEvalId} />}
          {currentStep === 8 && <SectionPhotos evalId={activeEvalId} />}
          {currentStep === 9 && <Section9Findings evalId={activeEvalId} />}

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

    {/* Cloud Export Modal */}
    {showExportModal && eval_ && (
      <CloudExportModal evaluation={eval_} onClose={() => setShowExportModal(false)} />
    )}

    {/* Validation Warning Modal */}
    {showValidation && (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }} onClick={() => setShowValidation(false)}>
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 16,
          border: '1px solid var(--border-medium)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          width: '100%', maxWidth: 420, padding: 24,
        }} onClick={e => e.stopPropagation()} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <AlertCircle size={20} color="#ff9f0a" />
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Missing Required Fields</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            {exportWarnings.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', padding: '6px 0' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff9f0a', flexShrink: 0 }} />
                {w}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={() => setShowValidation(false)}>Go Back & Fix</button>
            <button className="btn-primary" onClick={() => { setShowValidation(false); setShowExportModal(true); }} style={{ background: '#ff9f0a' }}>
              Export Anyway
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Complete Confirmation Modal */}
    {showCompleteConfirm && (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }} onClick={() => setShowCompleteConfirm(false)}>
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 16,
          border: '1px solid var(--border-medium)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          width: '100%', maxWidth: 380, padding: 24,
        }} onClick={e => e.stopPropagation()} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <CheckSquare size={20} color="#30d158" />
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Complete Evaluation?</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
            This will mark the evaluation as complete. You can still view and export it from the Completed Reports section.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={() => setShowCompleteConfirm(false)}>Cancel</button>
            <button className="btn-primary" onClick={confirmComplete} style={{ background: '#30d158' }}>
              <CheckSquare size={14} /> Complete
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
