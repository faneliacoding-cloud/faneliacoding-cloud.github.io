// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { EVAL_STEPS } from '@/lib/types';
import { useEffect, useCallback, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react';
import StepProgress from './StepProgress';
import Step01Client from './steps/Step01Client';
import Step02CaseType from './steps/Step02CaseType';
import Step03History from './steps/Step03History';
import Step04Immigration from './steps/Step04Immigration';
import Step05Trauma from './steps/Step05Trauma';
import Step06Symptoms from './steps/Step06Symptoms';
import Step07Clinical from './steps/Step07Clinical';
import Step08Diagnosis from './steps/Step08Diagnosis';
import Step09Evidence from './steps/Step09Evidence';
import Step10Recommendations from './steps/Step10Recommendations';
import Step11Review from './steps/Step11Review';

export default function EvalWorkflow() {
  const { activeEvalId, evaluations, updateEvaluation, completeStep, setView, lastSaved, toggleAIPanel } = useAppStore();
  const [lastSavedText, setLastSavedText] = useState<string | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const evaluation = evaluations.find(e => e.id === activeEvalId);

  // Auto-save display
  useEffect(() => {
    if (lastSaved) {
      setLastSavedText(new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [lastSaved]);

  // Mark step as completed when navigating away
  const markCompleted = useCallback((step: number) => {
    if (activeEvalId && step < 10) {
      completeStep(activeEvalId, step);
    }
  }, [activeEvalId, completeStep]);

  if (!activeEvalId || !evaluation) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 16, padding: 32 }}>
        <p className="text-secondary">No evaluation selected.</p>
        <button className="btn-primary" onClick={() => setView('dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  const currentStep = evaluation.currentStep;
  const totalSteps = EVAL_STEPS.length;
  const progressPct = Math.round(((currentStep + 1) / totalSteps) * 100);

  const goToStep = (step: number) => {
    if (step < 0 || step >= totalSteps) return;
    markCompleted(currentStep);
    updateEvaluation(activeEvalId, { currentStep: step });
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    const id = activeEvalId;
    switch (currentStep) {
      case 0: return <Step01Client evalId={id} />;
      case 1: return <Step02CaseType evalId={id} />;
      case 2: return <Step03History evalId={id} />;
      case 3: return <Step04Immigration evalId={id} />;
      case 4: return <Step05Trauma evalId={id} />;
      case 5: return <Step06Symptoms evalId={id} />;
      case 6: return <Step07Clinical evalId={id} />;
      case 7: return <Step08Diagnosis evalId={id} />;
      case 8: return <Step09Evidence evalId={id} />;
      case 9: return <Step10Recommendations evalId={id} />;
      case 10: return <Step11Review evalId={id} />;
      default: return <Step01Client evalId={id} />;
    }
  };

  const clientName = evaluation.client.fullName || 'New Evaluation';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar */}
      <div style={{
        height: 56, flexShrink: 0,
        borderBottom: '1px solid var(--border-light)',
        background: 'rgba(250,248,245,0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 14,
      }}>
        <button className="btn-ghost" onClick={() => setView('dashboard')} aria-label="Back to dashboard" style={{ gap: 6, fontSize: 13 }}>
          <ArrowLeft size={14} /> Dashboard
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--border-medium)' }} />
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {clientName}
        </div>
        {lastSavedText && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--charcoal-muted)', whiteSpace: 'nowrap' }}>
            <Clock size={11} /> Saved {lastSavedText}
          </div>
        )}
        <button className="btn-ghost" onClick={toggleAIPanel} aria-label="Open AI Assistant" style={{ gap: 6, color: 'var(--purple)' }}>
          <Sparkles size={14} /> AI Assist
        </button>
      </div>

      {/* Mobile progress bar */}
      <div style={{ display: 'none', padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }} className="mobile-progress">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal)' }}>{EVAL_STEPS[currentStep]?.title}</span>
          <span className="text-muted">{currentStep + 1}/{totalSteps}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop sidebar with step progress */}
        <div className="eval-sidebar-steps" style={{
          width: 280, flexShrink: 0,
          background: 'var(--white)',
          borderRight: '1px solid var(--border-light)',
          overflowY: 'auto',
          padding: '8px 10px',
        }}>
          {/* Progress summary */}
          <div style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--charcoal-light)', marginBottom: 6 }}>
              <span>Progress</span><span>{progressPct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <StepProgress
            currentStep={currentStep}
            completedSteps={evaluation.completedSteps}
            onStepClick={goToStep}
          />
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px', paddingBottom: 100 }} key={currentStep}>
          <div className="animate-fade-in">
            {renderStep()}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="step-actions" style={{
        flexShrink: 0,
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        padding: '14px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button className="btn-secondary" onClick={goPrev} disabled={currentStep === 0} aria-label="Previous step">
          <ChevronLeft size={16} /> Back
        </button>
        <span className="text-muted" style={{ fontSize: 12 }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
        {currentStep < totalSteps - 1 ? (
          <button className="btn-primary" onClick={goNext} aria-label="Next step">
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button className="btn-gold" aria-label="Generate report">
            Generate Report
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .eval-sidebar-steps { display: none !important; }
          .mobile-progress { display: block !important; }
        }
      `}</style>
    </div>
  );
}
