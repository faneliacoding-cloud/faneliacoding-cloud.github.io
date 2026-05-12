'use client';
/**
 * Dashboard View — Overview of all evaluations, quick actions, recent activity
 */
import { useAppStore } from '@/lib/store';
import { FileText, Users, CheckSquare, Clock, Plus, ArrowRight, TrendingUp, Shield } from 'lucide-react';

export default function Dashboard() {
  const { evaluations, setView, createEvaluation, setActiveEval } = useAppStore();

  const drafts = evaluations.filter(e => e.status !== 'completed');
  const completed = evaluations.filter(e => e.status === 'completed');
  const recent = [...evaluations].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  const handleNewEval = () => {
    const id = createEvaluation();
    setActiveEval(id);
    setView('new-eval');
  };

  const stats = [
    { label: 'Total Evaluations', value: evaluations.length, icon: FileText, color: '#0071e3', bg: 'rgba(0,113,227,0.10)' },
    { label: 'In Progress', value: drafts.length, icon: Clock, color: '#ff9f0a', bg: 'rgba(255,159,10,0.10)' },
    { label: 'Completed', value: completed.length, icon: CheckSquare, color: '#30d158', bg: 'rgba(48,209,88,0.10)' },
    { label: 'Clients', value: new Set(evaluations.map(e => e.clientInfo.fullName).filter(Boolean)).size, icon: Users, color: '#bf5af2', bg: 'rgba(191,90,242,0.10)' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #0071e3, #5e5ce6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,113,227,0.3)' }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Dashboard</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Immigration Psychological Evaluation Platform</p>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div style={{
        background: 'linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%)',
        borderRadius: 20,
        padding: '28px 32px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0,113,227,0.25)',
      }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Start a New Evaluation</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
            Complete a guided psychological evaluation with AI-assisted writing tools.
          </p>
        </div>
        <button className="btn-primary" onClick={handleNewEval} style={{ background: 'white', color: '#0071e3', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
          <Plus size={16} />
          New Evaluation
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card card-hover" style={{ borderRadius: 16, padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Evaluations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Recent list */}
        <div className="glass-card" style={{ borderRadius: 16, padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Recent Evaluations</h3>
            <button className="btn-ghost" onClick={() => setView('draft-evals')} style={{ fontSize: 12 }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          {recent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <FileText size={36} color="var(--text-tertiary)" style={{ marginBottom: 12 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>No evaluations yet</p>
              <button className="btn-primary" onClick={handleNewEval} style={{ fontSize: 13 }}>
                <Plus size={14} /> Start First Evaluation
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recent.map((ev) => {
                const pct = Math.round(((ev.currentStep + 1) / 10) * 100);
                return (
                  <div
                    key={ev.id}
                    className="card-hover"
                    onClick={() => { setActiveEval(ev.id); setView('new-eval'); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1.5px solid var(--border-light)',
                      background: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={16} color="var(--accent-blue)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ev.clientInfo.fullName || 'Unnamed Client'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {ev.clientInfo.countryOfOrigin || 'Country unknown'} · {new Date(ev.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span className={`badge badge-${ev.status === 'completed' ? 'complete' : ev.currentStep > 0 ? 'progress' : 'draft'}`}>
                        {ev.status === 'completed' ? 'Done' : `${pct}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Guide */}
        <div className="glass-card" style={{ borderRadius: 16, padding: '22px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 18 }}>Evaluation Workflow</h3>
          {[
            { step: 1, title: 'Client Information', desc: 'Demographics and contact details', color: '#0071e3' },
            { step: 2, title: 'Clinician Info', desc: 'Your credentials and license', color: '#5e5ce6' },
            { step: 3, title: 'Case Summary', desc: 'Overview of the case', color: '#bf5af2' },
            { step: 4, title: 'Trauma History', desc: 'Document persecution events', color: '#ff9f0a' },
            { step: 5, title: 'Psychological Symptoms', desc: 'Symptom assessment', color: '#ff453a' },
            { step: 6, title: 'Mental Status Exam', desc: 'Clinical observations', color: '#30d158' },
            { step: 7, title: 'Assessment Scales', desc: 'PHQ-9, GAD-7, PCL-5 scoring', color: '#5ac8fa' },
            { step: 8, title: 'Findings', desc: 'Diagnoses & recommendations', color: '#ff375f' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.step}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
          <button className="btn-primary" onClick={handleNewEval} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
            <Plus size={15} /> Begin Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}
