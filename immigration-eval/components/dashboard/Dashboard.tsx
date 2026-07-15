'use client';
/**
 * Dashboard — Main workspace dashboard view
 * Welcome section, quick actions, summary stats, recent evaluations, trust badges
 */
import { useAppStore } from '@/lib/store';
import { CASE_STATUS_CONFIG, CASE_TYPE_CONFIG } from '@/lib/types';
import type { CaseType } from '@/lib/types';
import StatusPill from '@/components/shared/StatusPill';
import {
  Plus, Edit, FileText, Upload,
  Briefcase, FileCheck, Clock, CheckCircle,
  ArrowRight, Shield, Lock, UserCheck,
  ClipboardList,
} from 'lucide-react';

export default function Dashboard({ showAll }: { showAll?: boolean } = {}) {
  const { evaluations, setView, setActiveEval, createEvaluation } = useAppStore();

  // Computed stats
  const activeCases = evaluations.filter(
    (e) => e.status !== 'report_complete' && e.status !== 'delivered'
  ).length;
  const draftReports = evaluations.filter((e) => e.status === 'draft').length;
  const awaitingDocs = evaluations.filter((e) => e.status === 'awaiting_documents').length;
  const completedReports = evaluations.filter(
    (e) => e.status === 'report_complete' || e.status === 'delivered'
  ).length;

  // Recent evaluations (5 most recent)
  const recentEvals = [...evaluations]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Compute completion percentage for an evaluation
  const getCompletion = (completedSteps: number[]): number => {
    return Math.round((completedSteps.length / 11) * 100);
  };

  // Format relative date
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Quick Actions
  const quickActions = [
    {
      title: 'New Evaluation',
      description: 'Start a comprehensive immigration evaluation',
      icon: <Plus size={28} />,
      accent: true,
      onClick: () => setView('templates'),
    },
    {
      title: 'Resume Draft',
      description: 'Continue where you left off',
      icon: <Edit size={28} />,
      accent: false,
      onClick: () => {
        const draft = evaluations.find((e) => e.status === 'draft');
        if (draft) {
          setActiveEval(draft.id);
          setView('new-eval');
        } else {
          setView('evaluations');
        }
      },
    },
    {
      title: 'Generate Report',
      description: 'Create a finalized clinical report',
      icon: <FileText size={28} />,
      accent: false,
      onClick: () => setView('reports'),
    },
    {
      title: 'Upload Evidence',
      description: 'Add supporting documents',
      icon: <Upload size={28} />,
      accent: false,
      onClick: () => setView('evidence'),
    },
  ];

  // Summary stats
  const summaryStats = [
    { label: 'Active Cases', count: activeCases, icon: <Briefcase size={20} />, color: 'var(--forest)' },
    { label: 'Draft Reports', count: draftReports, icon: <FileCheck size={20} />, color: 'var(--gold)' },
    { label: 'Awaiting Documents', count: awaitingDocs, icon: <Clock size={20} />, color: 'var(--amber)' },
    { label: 'Completed Reports', count: completedReports, icon: <CheckCircle size={20} />, color: 'var(--teal)' },
  ];

  return (
    <div
      className="animate-fade-in"
      style={{ padding: '32px 40px 48px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* ── Welcome Section ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <h1
          className="heading-xl"
          style={{ fontFamily: 'var(--font-serif)', marginBottom: 6 }}
        >
          Welcome back
        </h1>
        <p
          className="text-secondary"
          style={{ fontSize: 15, lineHeight: 1.5 }}
        >
          Your immigration evaluation workspace is ready.
          <span style={{ marginLeft: 12, color: 'var(--charcoal-muted)', fontSize: 13 }}>
            {today}
          </span>
        </p>
      </div>

      {/* ── Quick Actions Grid ──────────────────────────────────────────── */}
      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {quickActions.map((action) => (
          <button
            key={action.title}
            className="card card-interactive"
            onClick={action.onClick}
            aria-label={action.title}
            style={{
              padding: '28px 24px',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              border: action.accent
                ? '1.5px solid var(--gold-light)'
                : '1px solid var(--border-light)',
              cursor: 'pointer',
              background: action.accent
                ? 'linear-gradient(135deg, rgba(197,165,90,0.06), rgba(197,165,90,0.02))'
                : 'var(--white)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: action.accent
                  ? 'linear-gradient(135deg, var(--gold), #B8953F)'
                  : 'var(--ivory-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: action.accent ? 'var(--white)' : 'var(--charcoal-light)',
                marginBottom: 16,
              }}
            >
              {action.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                  marginBottom: 4,
                }}
              >
                {action.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--charcoal-light)',
                  lineHeight: 1.4,
                }}
              >
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Summary Cards ───────────────────────────────────────────────── */}
      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="card"
            style={{ padding: '22px 24px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${stat.color}12`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--charcoal)',
                fontFamily: 'var(--font-sans)',
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {stat.count}
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'var(--charcoal-light)',
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Evaluations ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <h2
            className="heading-lg"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Recent Evaluations
          </h2>
          {evaluations.length > 0 && (
            <button
              className="btn-ghost"
              onClick={() => setView('evaluations')}
              aria-label="View all evaluations"
              style={{ gap: 4 }}
            >
              View All <ArrowRight size={14} />
            </button>
          )}
        </div>

        {recentEvals.length === 0 ? (
          /* Empty state */
          <div className="card" style={{ padding: 0 }}>
            <div className="empty-state">
              <div className="empty-state-icon">
                <ClipboardList size={32} color="var(--sage)" />
              </div>
              <h3
                className="heading-md"
                style={{ marginBottom: 8 }}
              >
                No evaluations yet
              </h3>
              <p
                className="text-secondary"
                style={{
                  maxWidth: 360,
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                Begin your first immigration evaluation to see your cases appear here. Each evaluation is guided step-by-step.
              </p>
              <button
                className="btn-gold"
                onClick={() => createEvaluation()}
                aria-label="Begin your first evaluation"
              >
                <Plus size={16} />
                Begin First Evaluation
              </button>
            </div>
          </div>
        ) : (
          /* Evaluations list */
          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            {recentEvals.map((evalItem, index) => {
              const completion = getCompletion(evalItem.completedSteps);
              const caseConfig = CASE_TYPE_CONFIG[evalItem.caseType as CaseType];
              return (
                <div
                  key={evalItem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '18px 24px',
                    borderBottom:
                      index < recentEvals.length - 1
                        ? '1px solid var(--border-light)'
                        : 'none',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                  }}
                  onClick={() => {
                    setActiveEval(evalItem.id);
                    setView('new-eval');
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--ivory)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open evaluation for ${evalItem.client.fullName || 'Unnamed client'}`}
                >
                  {/* Client avatar */}
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'var(--ivory-warm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--charcoal-light)',
                      flexShrink: 0,
                    }}
                  >
                    {evalItem.client.fullName
                      ? evalItem.client.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : '??'}
                  </div>

                  {/* Name + case type */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--charcoal)',
                        marginBottom: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {evalItem.client.fullName || 'Unnamed Client'}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--charcoal-muted)',
                      }}
                    >
                      {caseConfig?.label || 'Custom Evaluation'}
                    </div>
                  </div>

                  {/* Status */}
                  <StatusPill status={evalItem.status} />

                  {/* Completion */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 100,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        background: 'var(--ivory-dark)',
                        borderRadius: 'var(--radius-pill)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${completion}%`,
                          background: 'linear-gradient(90deg, var(--forest), var(--sage))',
                          borderRadius: 'var(--radius-pill)',
                          transition: 'width var(--transition-slow)',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--charcoal-muted)',
                        minWidth: 32,
                        textAlign: 'right',
                      }}
                    >
                      {completion}%
                    </span>
                  </div>

                  {/* Date */}
                  <div
                    className="eval-date-col"
                    style={{
                      fontSize: 12,
                      color: 'var(--charcoal-muted)',
                      minWidth: 80,
                      textAlign: 'right',
                    }}
                  >
                    {formatDate(evalItem.updatedAt)}
                  </div>

                  {/* Arrow */}
                  <ArrowRight size={16} color="var(--charcoal-muted)" style={{ flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Trust Badges ────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <span className="trust-badge">
          <Shield size={13} />
          Secure Workspace
        </span>
        <span className="trust-badge">
          <Lock size={13} />
          Private Client Data
        </span>
        <span className="trust-badge">
          <UserCheck size={13} />
          Clinician-Reviewed
        </span>
      </div>
    </div>
  );
}
