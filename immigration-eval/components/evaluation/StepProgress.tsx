// @ts-nocheck
'use client';
import { EVAL_STEPS } from '@/lib/types';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export default function StepProgress({ currentStep, completedSteps, onStepClick }: StepProgressProps) {
  return (
    <div style={{ padding: '20px 0' }} aria-label="Evaluation progress">
      <div style={{ position: 'relative' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          left: 29,
          top: 26,
          bottom: 26,
          width: 2,
          background: 'var(--border-light)',
          zIndex: 0,
        }} />

        {EVAL_STEPS.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const isUpcoming = !isCompleted && !isActive;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className="step-item"
              aria-label={`${step.title} — ${isCompleted ? 'completed' : isActive ? 'current step' : 'upcoming'}`}
              aria-current={isActive ? 'step' : undefined}
              style={{
                width: '100%',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                textAlign: 'left',
                position: 'relative',
                zIndex: 1,
                background: isActive ? 'rgba(45,90,69,0.06)' : 'transparent',
              }}
            >
              <div className={`step-dot ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}>
                {isCompleted ? (
                  <Check size={14} />
                ) : (
                  <span>{step.id + 1}</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isUpcoming ? 'var(--charcoal-muted)' : 'var(--charcoal)',
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {step.title}
                </p>
                <p style={{
                  fontSize: 11,
                  color: 'var(--charcoal-muted)',
                  lineHeight: 1.3,
                  marginTop: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
