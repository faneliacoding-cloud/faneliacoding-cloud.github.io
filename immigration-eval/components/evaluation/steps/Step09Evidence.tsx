// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { DOCUMENT_CATEGORIES, type DocumentCategory } from '@/lib/types';
import { FolderOpen, Upload, X, FileText } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

export default function Step09Evidence({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const addDocument = useAppStore(s => s.addDocument);
  const removeDocument = useAppStore(s => s.removeDocument);
  const updateEvalSection = useAppStore(s => s.updateEvalSection);
  const [dragActive, setDragActive] = useState(false);
  const [newCategory, setNewCategory] = useState<DocumentCategory>('other');
  const fileRef = useRef<HTMLInputElement>(null);

  if (!evaluation) return null;
  const docs = evaluation.documents;
  const s09 = evaluation.sections.step09;

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      addDocument(evalId, {
        evalId,
        category: newCategory,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        notes: '',
        thumbnailUrl: '',
      });
    });
  }, [evalId, addDocument, newCategory]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FolderOpen size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Supporting Evidence</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Upload and organize documents that corroborate the evaluation</p>
          </div>
        </div>
      </div>

      {/* Upload zone */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div>
            <label className="form-label" htmlFor="docCategory">Document Category</label>
            <select id="docCategory" className="form-select" value={newCategory} onChange={e => setNewCategory(e.target.value as DocumentCategory)} aria-label="Document category" style={{ width: 220 }}>
              {Object.entries(DOCUMENT_CATEGORIES).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.icon} {cfg.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          aria-label="Upload documents"
        >
          <Upload size={32} color="var(--sage)" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 4 }}>
            Drag &amp; drop files here, or click to browse
          </p>
          <p className="text-muted">Supports PDF, DOCX, JPG, PNG — Max 25MB per file</p>
          <input
            ref={fileRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={e => handleFiles(e.target.files)}
            aria-label="File input"
          />
        </div>
      </div>

      {/* Document list */}
      {docs.length > 0 && (
        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 className="heading-md" style={{ marginBottom: 16 }}>Uploaded Documents ({docs.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {docs.map(doc => {
              const cat = DOCUMENT_CATEGORIES[doc.category] || DOCUMENT_CATEGORIES.other;
              return (
                <div key={doc.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  background: 'var(--ivory)', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{cat.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.filename}</p>
                    <p className="text-muted">{cat.label} · {(doc.size / 1024).toFixed(0)} KB · {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => removeDocument(evalId, doc.id)}
                    aria-label={`Remove ${doc.filename}`}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rose)', padding: 4 }}
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {docs.length === 0 && (
        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <p style={{ fontSize: 14, color: 'var(--charcoal-light)', marginBottom: 4 }}>No documents uploaded yet</p>
            <p className="text-muted">Upload supporting evidence such as affidavits, medical records, or police reports.</p>
          </div>
        </div>
      )}

      {/* Document Notes */}
      <div className="card" style={{ padding: 28 }}>
        <label className="form-label" htmlFor="docNotes">Document Notes</label>
        <textarea
          id="docNotes"
          className="form-textarea"
          value={s09.documentNotes}
          onChange={e => updateEvalSection(evalId, 'step09', { documentNotes: e.target.value })}
          placeholder="Add notes about the supporting evidence, including observations about the quality, relevance, or authenticity of documents reviewed."
          style={{ minHeight: 120 }}
          aria-label="Document notes"
        />
      </div>
    </div>
  );
}
