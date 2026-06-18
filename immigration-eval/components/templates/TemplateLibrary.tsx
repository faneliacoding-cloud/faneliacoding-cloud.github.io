'use client';
/**
 * TemplateLibrary — Premium template selection for new evaluations
 * Displays all case types from CASE_TYPE_CONFIG with interactive cards
 */
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, CaseType } from '@/lib/types';
import { Clock, ArrowRight } from 'lucide-react';

const caseTypes = Object.entries(CASE_TYPE_CONFIG) as [CaseType, typeof CASE_TYPE_CONFIG[CaseType]][];

export default function TemplateLibrary() {
  const { createEvaluation, setView } = useAppStore();

  const handleStartEvaluation = (caseType: CaseType) => {
    createEvaluation(caseType);
    setView('new-eval');
  };

  return (
    <div
      className="animate-fade-in"
      style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1
          className="heading-xl"
          style={{ marginBottom: 8 }}
        >
          Template Library
        </h1>
        <p className="text-secondary" style={{ fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
          Choose a template to start a new evaluation. Each template is tailored
          to the specific requirements of the immigration case type.
        </p>
      </div>

      {/* Template Grid */}
      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {caseTypes.map(([key, config]) => (
          <div
            key={key}
            className="card card-interactive"
            style={{
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'relative',
              overflow: 'hidden',
            }}
            aria-label={`${config.label} template`}
          >
            {/* Icon */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'var(--ivory-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              {config.icon}
            </div>

            {/* Title & Description */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {config.label}
              </h3>
              <p
                className="text-secondary"
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}
              >
                {config.description}
              </p>
            </div>

            {/* Estimated Time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                color: 'var(--charcoal-muted)',
                marginBottom: 4,
              }}
            >
              <Clock size={13} />
              <span>Estimated: {config.estimatedTime}</span>
            </div>

            {/* CTA Button */}
            <button
              className="btn-primary"
              onClick={() => handleStartEvaluation(key)}
              aria-label={`Start ${config.label}`}
              style={{
                width: '100%',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Start Evaluation
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
