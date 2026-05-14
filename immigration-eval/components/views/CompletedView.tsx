'use client';
/**
 * CompletedView — Completed evaluations with export options and delete
 */
import { useAppStore } from '@/lib/store';
import { generateDOCX, generatePDF } from '@/lib/docGenerator';
import { CheckSquare, FileDown, Printer, Eye, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CompletedView() {
  const { evaluations, setView, setActiveEval, duplicateEvaluation, deleteEvaluation } = useAppStore();
  const [exporting, setExporting] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const completed = [...evaluations.filter(e => e.status === 'completed')]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleDocx = async (ev: typeof completed[0]) => {
    setExporting(ev.id + '-docx');
    try { await generateDOCX(ev); } catch (e) { console.error(e); }
    setExporting(null);
  };

  const confirmDelete = () => {
    if (deleteId) { deleteEvaluation(deleteId); setDeleteId(null); }
  };

  const deleteName = deleteId ? evaluations.find(e => e.id === deleteId)?.clientInfo.fullName || 'Unnamed Client' : '';

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(48,209,88,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckSquare size={20} color="#30d158" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Completed Reports</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{completed.length} completed evaluations</p>
        </div>
      </div>

      {completed.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <CheckSquare size={48} color="var(--text-tertiary)" style={{ marginBottom: 16 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No completed evaluations yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {completed.map(ev => {
            const diagNames = ev.findings.diagnoses.map(d => d.code).join(', ') || 'No diagnoses recorded';
            return (
              <div key={ev.id} className="glass-card" style={{ borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(48,209,88,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {ev.clientInfo.profilePhoto ? (
                      <img src={ev.clientInfo.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <CheckSquare size={20} color="#30d158" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {ev.clientInfo.fullName || 'Unnamed Client'}
                      </span>
                      <span className="badge badge-complete">Complete</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      {ev.clientInfo.countryOfOrigin} · Completed {new Date(ev.updatedAt).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>{diagNames}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                        <span>PHQ-9: <strong>{ev.phq9.total}</strong> ({ev.phq9.severity})</span>
                        <span>GAD-7: <strong>{ev.gad7.total}</strong> ({ev.gad7.severity})</span>
                        <span>PCL-5: <strong>{ev.pcl5.total}</strong> ({ev.pcl5.severity})</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button className="btn-ghost" onClick={() => { setActiveEval(ev.id); setView('new-eval'); }} style={{ fontSize: 12 }}>
                      <Eye size={13} /> View
                    </button>
                    <button className="btn-ghost" onClick={() => { const id = duplicateEvaluation(ev.id); setActiveEval(id); setView('new-eval'); }} style={{ fontSize: 12 }}>
                      <Copy size={13} /> Duplicate
                    </button>
                    <button className="btn-ghost" onClick={() => setDeleteId(ev.id)} style={{ fontSize: 12, color: '#ff453a' }}>
                      <Trash2 size={13} /> Delete
                    </button>
                    <button className="btn-secondary" onClick={() => generatePDF(ev)} style={{ fontSize: 12 }}>
                      <Printer size={13} /> PDF
                    </button>
                    <button className="btn-primary" onClick={() => handleDocx(ev)} disabled={exporting === ev.id + '-docx'} style={{ fontSize: 12 }}>
                      <FileDown size={13} />
                      {exporting === ev.id + '-docx' ? 'Exporting...' : 'DOCX'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={() => setDeleteId(null)}>
          <div style={{
            background: 'var(--bg-secondary)', borderRadius: 16,
            border: '1px solid var(--border-medium)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            width: '100%', maxWidth: 380, padding: 24,
          }} onClick={e => e.stopPropagation()} className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,69,58,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={18} color="#ff453a" />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Delete Completed Report?</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>{deleteName}</strong>? This action cannot be undone. Make sure you've exported the report first.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-primary" onClick={confirmDelete} style={{ background: '#ff453a' }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
