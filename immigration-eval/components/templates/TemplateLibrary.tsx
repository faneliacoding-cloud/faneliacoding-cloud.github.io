'use client';
/**
 * TemplateLibrary — Premium template selection for new evaluations
 * Displays all 15 case types from CASE_TYPE_CONFIG with interactive cards
 */
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, CaseType } from '@/lib/types';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

// Group templates by category for better organization
const TEMPLATE_GROUPS: { label: string; types: CaseType[] }[] = [
  {
    label: 'Protection-Based',
    types: ['asylum', 'cat_convention', 'withholding_of_removal', 'u_visa', 't_visa', 'vawa'],
  },
  {
    label: 'Removal Defense',
    types: ['cancellation_of_removal', 'extreme_hardship', 'bond_hearing'],
  },
  {
    label: 'Family & Status',
    types: ['good_faith_marriage', 'sijs'],
  },
  {
    label: 'Specialized Assessments',
    types: ['n648_disability', 'competency_evaluation', 'psychological_impact', 'custom'],
  },
];

export default function TemplateLibrary() {
  const { createEvaluation, setView } = useAppStore();
  const [search, setSearch] = useState('');

  const handleStartEvaluation = (caseType: CaseType) => {
    createEvaluation(caseType);
    setView('new-eval');
  };

  const filteredGroups = TEMPLATE_GROUPS.map(group => ({
    ...group,
    types: group.types.filter(type => {
      const config = CASE_TYPE_CONFIG[type];
      const q = search.toLowerCase();
      return (
        config.label.toLowerCase().includes(q) ||
        config.description.toLowerCase().includes(q)
      );
    }),
  })).filter(group => group.types.length > 0);

  return (
    <div
      className="animate-fade-in"
      style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1
          className="heading-xl"
          style={{ marginBottom: 8 }}
        >
          Template Library
        </h1>
        <p className="text-secondary" style={{ fontSize: 15, maxWidth: 560, margin: '0 auto', marginBottom: 24 }}>
          Choose a template to start a new evaluation. Each template is tailored
          to the specific requirements of the immigration case type.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 400, margin: '0 auto', position: 'relative' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--charcoal-muted)',
            }}
          />
          <input
            className="form-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates..."
            style={{ paddingLeft: 42 }}
            aria-label="Search templates"
          />
        </div>
      </div>

      {/* Template count */}
      <div style={{ fontSize: 12, color: 'var(--charcoal-muted)', marginBottom: 20, textAlign: 'center' }}>
        {filteredGroups.reduce((sum, g) => sum + g.types.length, 0)} templates available
      </div>

      {/* Grouped Template Cards */}
      {filteredGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 36 }}>
          <h2
            className="heading-sm"
            style={{
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: '1px solid var(--border-light)',
              color: 'var(--sage)',
            }}
          >
            {group.label}
          </h2>

          <div
            className="stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            {group.types.map(key => {
              const config = CASE_TYPE_CONFIG[key];
              return (
                <div
                  key={key}
                  className="card card-interactive"
                  style={{
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  aria-label={`${config.label} template`}
                >
                  {/* Top row — icon + time */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: 'var(--ivory-warm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {config.icon}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 11,
                        color: 'var(--charcoal-muted)',
                        background: 'var(--ivory)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      <Clock size={11} />
                      {config.estimatedTime}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 17,
                        fontWeight: 600,
                        color: 'var(--charcoal)',
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {config.label}
                    </h3>
                    <p
                      className="text-secondary"
                      style={{
                        fontSize: 12.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {config.description}
                    </p>
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
                      marginTop: 4,
                    }}
                  >
                    Start Evaluation
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* No results */}
      {filteredGroups.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            No templates match &ldquo;{search}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
