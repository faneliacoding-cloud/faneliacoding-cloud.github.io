'use client';
/**
 * TemplateLibrary — All 15 evaluation templates displayed as a clean list
 * Organized by category, all visible on load without search
 */
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, CaseType } from '@/lib/types';
import { Clock, ArrowRight } from 'lucide-react';

const TEMPLATE_GROUPS: { label: string; description: string; types: CaseType[] }[] = [
  {
    label: 'Protection-Based Evaluations',
    description: 'For clients seeking protection from persecution, violence, or trafficking',
    types: ['asylum', 'cat_convention', 'withholding_of_removal', 'u_visa', 't_visa', 'vawa'],
  },
  {
    label: 'Removal Defense',
    description: 'Supporting cases against removal or deportation',
    types: ['cancellation_of_removal', 'extreme_hardship', 'bond_hearing'],
  },
  {
    label: 'Family & Status-Based',
    description: 'Evaluations related to family relationships and immigration status',
    types: ['good_faith_marriage', 'sijs'],
  },
  {
    label: 'Specialized Assessments',
    description: 'Court-ordered evaluations, waivers, and focused assessments',
    types: ['n648_disability', 'competency_evaluation', 'psychological_impact', 'custom'],
  },
];

export default function TemplateLibrary() {
  const { createEvaluation, setView } = useAppStore();

  const handleStart = (caseType: CaseType) => {
    createEvaluation(caseType);
    setView('new-eval');
  };

  return (
    <div
      className="animate-fade-in"
      style={{ padding: '32px 32px 80px', maxWidth: 900, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 className="heading-xl" style={{ marginBottom: 8 }}>
          Template Library
        </h1>
        <p className="text-secondary" style={{ fontSize: 15, maxWidth: 560 }}>
          Select an evaluation type to begin. Each template is tailored to its specific immigration case requirements.
        </p>
      </div>

      {/* Template Groups */}
      {TEMPLATE_GROUPS.map(group => (
        <div key={group.label} style={{ marginBottom: 40 }}>
          {/* Group Header */}
          <div style={{ marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--charcoal)',
                marginBottom: 4,
              }}
            >
              {group.label}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--charcoal-muted)' }}>
              {group.description}
            </p>
          </div>

          {/* Template List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {group.types.map(key => {
              const config = CASE_TYPE_CONFIG[key];
              return (
                <div
                  key={key}
                  className="card"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onClick={() => handleStart(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') handleStart(key); }}
                  aria-label={`Start ${config.label}`}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--ivory-warm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {config.icon}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--charcoal)',
                        marginBottom: 3,
                      }}
                    >
                      {config.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: 'var(--charcoal-light)',
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                      }}
                    >
                      {config.description}
                    </div>
                  </div>

                  {/* Time + Arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 11,
                        color: 'var(--charcoal-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Clock size={12} />
                      {config.estimatedTime}
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'var(--forest)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--white)',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
