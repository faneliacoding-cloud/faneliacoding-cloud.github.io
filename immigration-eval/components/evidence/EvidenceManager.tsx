'use client';
/**
 * EvidenceManager — Document upload and management center
 * Drag-and-drop upload with category filtering and per-evaluation organization
 */
import { useState, useRef, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { DOCUMENT_CATEGORIES, DocumentCategory } from '@/lib/types';
import { Upload, X, FileText, Filter, FolderOpen, Trash2 } from 'lucide-react';

const ALL_CATEGORIES = Object.entries(DOCUMENT_CATEGORIES) as [DocumentCategory, typeof DOCUMENT_CATEGORIES[DocumentCategory]][];

export default function EvidenceManager() {
  const { evaluations, addDocument, removeDocument } = useAppStore();
  const [selectedEvalId, setSelectedEvalId] = useState<string>(evaluations[0]?.id || '');
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | 'all'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('other');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedEval = evaluations.find(e => e.id === selectedEvalId);
  const documents = selectedEval?.documents || [];
  const filteredDocs = categoryFilter === 'all'
    ? documents
    : documents.filter(d => d.category === categoryFilter);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || !selectedEvalId) return;
    Array.from(files).forEach(file => {
      addDocument(selectedEvalId, {
        evalId: selectedEvalId,
        category: uploadCategory,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        notes: '',
        thumbnailUrl: '',
      });
    });
  }, [selectedEvalId, uploadCategory, addDocument]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="animate-fade-in" style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="heading-xl" style={{ marginBottom: 8 }}>
          Evidence Center
        </h1>
        <p className="text-secondary" style={{ fontSize: 15 }}>
          Upload, organize, and manage supporting documents for your evaluations
        </p>
      </div>

      {/* Evaluation Selector */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label className="form-label">Select Evaluation</label>
            <select
              className="form-select"
              value={selectedEvalId}
              onChange={e => setSelectedEvalId(e.target.value)}
              aria-label="Select evaluation for evidence upload"
            >
              <option value="">Choose an evaluation...</option>
              {evaluations.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {ev.client.fullName || 'Unnamed Client'} — {ev.caseType.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: 180 }}>
            <label className="form-label">Upload As Category</label>
            <select
              className="form-select"
              value={uploadCategory}
              onChange={e => setUploadCategory(e.target.value as DocumentCategory)}
              aria-label="Document category for upload"
            >
              {ALL_CATEGORIES.map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      {selectedEvalId ? (
        <div
          className={`dropzone ${isDragging ? 'active' : ''}`}
          style={{ marginBottom: 24 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload evidence files by dragging or clicking"
          onKeyDown={e => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: isDragging ? 'rgba(45,90,69,0.10)' : 'var(--ivory-warm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Upload size={24} color={isDragging ? 'var(--forest)' : 'var(--charcoal-muted)'} />
          </div>
          <p style={{
            fontSize: 15,
            fontWeight: 500,
            color: isDragging ? 'var(--forest)' : 'var(--charcoal)',
            marginBottom: 6,
          }}>
            {isDragging ? 'Drop files to upload' : 'Drag files here or click to browse'}
          </p>
          <p className="text-muted">
            Accepts images, PDFs, and documents (max 25 MB per file)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.rtf"
            onChange={e => handleFiles(e.target.files)}
            style={{ display: 'none' }}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="card" style={{ padding: 48, textAlign: 'center', marginBottom: 24 }}>
          <div className="empty-state-icon" style={{ margin: '0 auto 16px' }}>
            📁
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 6 }}>
            Select an Evaluation
          </p>
          <p className="text-secondary" style={{ fontSize: 13 }}>
            Choose an evaluation above to view and upload supporting evidence
          </p>
        </div>
      )}

      {/* Category Filter & Document List */}
      {selectedEvalId && (
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Category Sidebar */}
          <div className="card" style={{ padding: 16, width: 220, flexShrink: 0, alignSelf: 'flex-start' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: '1px solid var(--border-light)',
            }}>
              <Filter size={14} color="var(--charcoal-muted)" />
              <span className="heading-sm" style={{ fontSize: 11 }}>Categories</span>
            </div>
            <button
              onClick={() => setCategoryFilter('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: 'none',
                background: categoryFilter === 'all' ? 'rgba(45,90,69,0.08)' : 'transparent',
                color: categoryFilter === 'all' ? 'var(--forest)' : 'var(--charcoal-light)',
                fontSize: 13,
                fontWeight: categoryFilter === 'all' ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                marginBottom: 2,
              }}
              aria-label="Show all categories"
            >
              📋 All ({documents.length})
            </button>
            {ALL_CATEGORIES.map(([key, cat]) => {
              const count = documents.filter(d => d.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: 'none',
                    background: categoryFilter === key ? 'rgba(45,90,69,0.08)' : 'transparent',
                    color: categoryFilter === key ? 'var(--forest)' : 'var(--charcoal-light)',
                    fontSize: 13,
                    fontWeight: categoryFilter === key ? 600 : 400,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    marginBottom: 2,
                  }}
                  aria-label={`Filter by ${cat.label}`}
                >
                  {cat.icon} {cat.label} {count > 0 && <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Documents List */}
          <div style={{ flex: 1 }}>
            {filteredDocs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FolderOpen size={28} color="var(--charcoal-muted)" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 6 }}>
                  No documents yet
                </p>
                <p className="text-secondary" style={{ fontSize: 13, maxWidth: 320 }}>
                  Upload supporting evidence to strengthen the evaluation record
                </p>
              </div>
            ) : (
              <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredDocs.map(doc => {
                  const catConfig = DOCUMENT_CATEGORIES[doc.category];
                  return (
                    <div
                      key={doc.id}
                      className="card"
                      style={{
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      {/* File Icon */}
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: 'var(--ivory-warm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <FileText size={18} color="var(--charcoal-muted)" />
                      </div>

                      {/* File Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: 'var(--charcoal)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {doc.filename}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                          {/* Category Pill */}
                          <span
                            className="status-pill"
                            style={{
                              color: 'var(--forest-light)',
                              background: 'rgba(45,90,69,0.08)',
                              fontSize: 10,
                            }}
                          >
                            {catConfig?.icon} {catConfig?.label}
                          </span>
                          <span className="text-muted">{formatFileSize(doc.size)}</span>
                          <span className="text-muted">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="btn-ghost"
                        onClick={() => removeDocument(selectedEvalId, doc.id)}
                        aria-label={`Remove ${doc.filename}`}
                        style={{ color: 'var(--rose)', padding: 8 }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
