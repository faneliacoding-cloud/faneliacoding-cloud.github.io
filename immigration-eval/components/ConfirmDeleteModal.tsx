'use client';
import { X } from 'lucide-react';

interface Props {
  clientName: string;
  isCompleted?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({ clientName, isCompleted, onConfirm, onCancel }: Props) {
  return (
    <div
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm deletion"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-secondary)', borderRadius: 16,
        border: '1px solid var(--border-medium)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: 24, maxWidth: 400, width: '100%',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          Delete Evaluation?
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.5 }}>
          This will permanently delete the evaluation for <strong>{clientName || 'Untitled'}</strong>.
          This action cannot be undone.
        </div>
        {isCompleted && (
          <div style={{ fontSize: 12, color: 'var(--accent-orange)', marginBottom: 12 }}>
            Make sure you've exported the report before deleting.
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button onClick={onCancel} className="btn-secondary" style={{ fontSize: 13 }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: '8px 16px', borderRadius: 10, border: 'none',
            background: '#ff453a', color: 'white', fontSize: 13,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
