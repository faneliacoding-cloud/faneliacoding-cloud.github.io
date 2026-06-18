'use client';
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, CASE_STATUS_CONFIG, EVAL_STEPS, DOCUMENT_CATEGORIES } from '@/lib/types';
import { useState } from 'react';
import {
  ArrowLeft, User, MapPin, Mail, Phone, Scale, FileText,
  Calendar, Clock, CheckCircle2, Upload, BarChart2, ChevronRight,
} from 'lucide-react';

type Tab = 'overview' | 'timeline' | 'documents' | 'reports';

export default function ClientProfile() {
  const { activeEvalId, evaluations, setView, setActiveEval, updateEvaluation } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const evaluation = evaluations.find(e => e.id === activeEvalId);

  if (!evaluation) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 16, padding: 32 }}>
        <p className="text-secondary">Client not found.</p>
        <button className="btn-primary" onClick={() => setView('clients')}>View All Clients</button>
      </div>
    );
  }

  const client = evaluation.client;
  const statusCfg = CASE_STATUS_CONFIG[evaluation.status];
  const caseTypeCfg = CASE_TYPE_CONFIG[evaluation.caseType];
  const completedCount = evaluation.completedSteps.length;
  const totalSteps = EVAL_STEPS.length;
  const completionPct = Math.round((completedCount / totalSteps) * 100);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const formatTime = (d: string) => d ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  const handleContinue = () => {
    setActiveEval(evaluation.id);
    setView('new-eval');
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 size={14} /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={14} /> },
    { id: 'documents', label: 'Documents', icon: <Upload size={14} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={14} /> },
  ];

  const timelineIcons: Record<string, string> = {
    created: '🆕', intake: '📝', documents_requested: '📋', interview_scheduled: '📅',
    interview_completed: '✅', evidence_uploaded: '📎', clinical_review: '🔍',
    draft_generated: '📄', report_finalized: '✨', delivered: '📬', note: '💬',
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }} className="animate-fade-in">
      {/* Back button */}
      <button className="btn-ghost" onClick={() => setView('clients')} style={{ marginBottom: 20, gap: 6 }}>
        <ArrowLeft size={14} /> Back to Clients
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        {/* Left column — Client Info */}
        <div>
          <div className="card" style={{ padding: 28, marginBottom: 16 }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20, margin: '0 auto 14px',
                background: 'linear-gradient(135deg, var(--forest), var(--forest-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-sans)',
              }}>
                {getInitials(client.fullName || 'U')}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>
                {client.fullName || 'Unnamed Client'}
              </h2>
              <span className="status-pill" style={{ color: statusCfg.color, background: statusCfg.bg }}>
                {statusCfg.label}
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Scale size={14} color="var(--charcoal-muted)" />
                <span className="text-secondary">{caseTypeCfg?.label || 'Unknown'}</span>
              </div>
              {client.countryOfOrigin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={14} color="var(--charcoal-muted)" />
                  <span className="text-secondary">{client.countryOfOrigin}</span>
                </div>
              )}
              {client.contactEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mail size={14} color="var(--charcoal-muted)" />
                  <span className="text-secondary">{client.contactEmail}</span>
                </div>
              )}
              {client.contactPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Phone size={14} color="var(--charcoal-muted)" />
                  <span className="text-secondary">{client.contactPhone}</span>
                </div>
              )}
              {client.referringAttorney && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <User size={14} color="var(--charcoal-muted)" />
                  <span className="text-secondary">Atty: {client.referringAttorney}</span>
                </div>
              )}
            </div>
          </div>

          {/* Completion */}
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="form-label" style={{ marginBottom: 0 }}>Completion</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', fontFamily: 'var(--font-serif)' }}>{completionPct}%</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: `${completionPct}%` }} />
            </div>
            <p className="text-muted">{completedCount} of {totalSteps} sections completed</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-primary" onClick={handleContinue} style={{ width: '100%', justifyContent: 'center' }}>
              Continue Evaluation <ChevronRight size={16} />
            </button>
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              <FileText size={16} /> Generate Report
            </button>
          </div>
        </div>

        {/* Right column — Tabs */}
        <div>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border-light)', paddingBottom: 4 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                  border: 'none', cursor: 'pointer',
                  background: activeTab === tab.id ? 'var(--forest)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--charcoal-light)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-sans)',
                  transition: 'all 150ms ease',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="animate-fade-in" key={activeTab}>
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {EVAL_STEPS.slice(0, 10).map(step => {
                  const done = evaluation.completedSteps.includes(step.id);
                  return (
                    <div key={step.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                      background: done ? 'rgba(74,155,142,0.04)' : 'var(--white)',
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)',
                    }}>
                      <CheckCircle2 size={18} color={done ? 'var(--teal)' : 'var(--border-medium)'} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: done ? 'var(--charcoal)' : 'var(--charcoal-muted)' }}>{step.icon} {step.title}</p>
                        <p className="text-muted">{step.subtitle}</p>
                      </div>
                      <span className="text-muted" style={{ fontSize: 11 }}>{done ? 'Complete' : 'Pending'}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                {evaluation.timeline.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📅</div>
                    <p className="text-secondary">No timeline events yet.</p>
                  </div>
                ) : (
                  <div style={{ position: 'relative', paddingLeft: 28 }}>
                    <div style={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, background: 'var(--border-light)' }} />
                    {evaluation.timeline.map((event, idx) => (
                      <div key={event.id} style={{ position: 'relative', marginBottom: 20 }}>
                        <div style={{
                          position: 'absolute', left: -24, top: 4, width: 20, height: 20,
                          borderRadius: '50%', background: 'var(--white)', border: '2px solid var(--sage-light)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, zIndex: 1,
                        }}>
                          {timelineIcons[event.type] || '📌'}
                        </div>
                        <div className="card" style={{ padding: '14px 18px', marginLeft: 8 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 2 }}>{event.title}</p>
                          <p className="text-muted" style={{ marginBottom: 4 }}>{event.description}</p>
                          <p style={{ fontSize: 11, color: 'var(--charcoal-muted)' }}>{formatTime(event.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                {evaluation.documents.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📁</div>
                    <p className="text-secondary">No documents uploaded yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {evaluation.documents.map(doc => {
                      const cat = DOCUMENT_CATEGORIES[doc.category] || DOCUMENT_CATEGORIES.other;
                      return (
                        <div key={doc.id} style={{
                          display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                          background: 'var(--white)', borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                        }}>
                          <span style={{ fontSize: 20 }}>{cat.icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.filename}</p>
                            <p className="text-muted">{cat.label} · {(doc.size / 1024).toFixed(0)} KB</p>
                          </div>
                          <span className="text-muted">{formatDate(doc.uploadedAt)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                {evaluation.reports.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <p className="text-secondary">No reports generated yet.</p>
                    <button className="btn-gold" style={{ marginTop: 16 }}>
                      <FileText size={16} /> Generate Report
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {evaluation.reports.map(report => (
                      <div key={report.id} style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                        background: 'var(--white)', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                      }}>
                        <FileText size={18} color="var(--forest)" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)' }}>
                            Report v{report.version} ({report.format.toUpperCase()})
                          </p>
                          <p className="text-muted">Generated {formatDate(report.generatedAt)} · {report.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
