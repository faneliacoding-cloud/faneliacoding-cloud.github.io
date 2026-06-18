// @ts-nocheck
'use client';
/**
 * DraftsView — In-progress evaluations list with delete confirmation
 */
import { useAppStore } from '@/lib/store';
import { Clock, FileText, Plus, Trash2, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

export default function DraftsView() {
  const { evaluations, setView, setActiveEval, createEvaluation, deleteEvaluation, duplicateEvaluation } = useAppStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const drafts = [...evaluations.filter(e => e.status !== 'report_complete' && e.status !== 'delivered')]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleOpen = (id: string) => { setActiveEval(id); setView('new-eval'); };
  const handleNew = () => { const id = createEvaluation(); setActiveEval(id); setView('new-eval'); };

  const confirmDelete = () => {
    if (deleteId) { deleteEvaluation(deleteId); setDeleteId(null); }
  };

  const deleteName = deleteId ? evaluations.find(e => e.id === deleteId)?.client.fullName || 'Unnamed Client' : '';

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,159,10,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} color="#ff9f0a" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Draft Evaluations</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{drafts.length} in progress</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleNew}><Plus size={15} /> New Evaluation</button>
      </div>

      {drafts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Clock size={48} color="var(--text-tertiary)" style={{ marginBottom: 16 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 16 }}>No drafts yet</p>
          <button className="btn-primary" onClick={handleNew}><Plus size={15} /> Start New Evaluation</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {drafts.map(ev => {
            const pct = Math.round(((ev.currentStep + 1) / 10) * 100);
            return (
              <div key={ev.id} className="glass-card card-hover" style={{ borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }} onClick={() => handleOpen(ev.id)}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(0,113,227,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {ev.client.profilePhoto ? (
                    <img src={ev.client.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                  ) : (
                    <FileText size={20} color="var(--accent-blue)" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {ev.client.fullName || 'Unnamed Client'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    {ev.client.countryOfOrigin || 'Unknown country'} · Updated {new Date(ev.updatedAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="progress-bar" style={{ width: 140 }}>
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
                  <button className="btn-ghost" onClick={() => { const id = duplicateEvaluation(ev.id); if (id) { setActiveEval(id); setView('new-eval'); } }} style={{ fontSize: 12 }}>
                    <Copy size={13} /> Duplicate
                  </button>
                  <button aria-label="Delete evaluation" className="btn-ghost" onClick={() => setDeleteId(ev.id)} style={{ fontSize: 12, color: '#ff453a' }}>
                    <Trash2 size={13} /> Delete
                  </button>
                  <button className="btn-primary" onClick={() => handleOpen(ev.id)} style={{ fontSize: 12 }}>
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <ConfirmDeleteModal
          clientName={evaluations.find(e => e.id === deleteId)?.client.fullName || ''}
          onConfirm={() => { deleteEvaluation(deleteId); setDeleteId(null); }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
