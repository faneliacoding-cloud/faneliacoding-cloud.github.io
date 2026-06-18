// @ts-nocheck
'use client';
/**
 * Section 10: Client Photos / Supporting Images
 * Drag & drop, click to upload, thumbnail previews, IndexedDB storage
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Upload, Trash2, X, AlertCircle, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';
import { saveImage, getImagesForEval, deleteImage, validateFile, type StoredImage } from '@/lib/imageStore';

interface Props { evalId: string; }

export default function SectionPhotos({ evalId }: Props) {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing images
  useEffect(() => {
    let mounted = true;
    getImagesForEval(evalId).then(imgs => {
      if (mounted) setImages(imgs);
    }).catch(() => {});
    return () => { mounted = false; };
  }, [evalId]);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

  const clearMessages = useCallback(() => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => { setError(''); setSuccess(''); }, 4000);
  }, []);

  const handleFiles = async (files: FileList | File[]) => {
    setError('');
    setSuccess('');
    setUploading(true);
    setProgress(0);

    const fileArray = Array.from(files);
    let successCount = 0;
    let errorMessages: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setProgress(Math.round(((i) / fileArray.length) * 100));

      // Validate
      const validation = validateFile(file);
      if (!validation.valid) {
        errorMessages.push(`${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const saved = await saveImage(evalId, file);
        setImages(prev => [...prev, saved]);
        successCount++;
      } catch (e: any) {
        errorMessages.push(`${file.name}: ${e.message}`);
      }
    }

    setProgress(100);
    setUploading(false);

    if (successCount > 0) {
      setSuccess(`${successCount} image${successCount > 1 ? 's' : ''} uploaded successfully`);
    }
    if (errorMessages.length > 0) {
      setError(errorMessages.join('\n'));
    }
    clearMessages();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImage(id);
      setImages(prev => prev.filter(img => img.id !== id));
      setSuccess('Image removed');
      clearMessages();
    } catch {
      setError('Failed to delete image');
      clearMessages();
    }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(0,113,227,0.10)' }}>
          <Camera size={20} color="var(--accent-blue)" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Client Photos / Supporting Images</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Upload photos, scars documentation, evidence images, or PDF scans</p>
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px',
          borderRadius: 10, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.2)',
          marginBottom: 14, fontSize: 12, color: '#ff453a', lineHeight: 1.5,
        }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ whiteSpace: 'pre-line' }}>{error}</div>
        </div>
      )}
      {success && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
          borderRadius: 10, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.2)',
          marginBottom: 14, fontSize: 12, color: '#30d158',
        }}>
          <CheckCircle2 size={14} />
          {success}
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--accent-blue)' : 'var(--border-medium)'}`,
          borderRadius: 16,
          padding: '32px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'rgba(0,113,227,0.04)' : 'var(--bg-secondary)',
          transition: 'all 200ms ease',
          marginBottom: 20,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,.heic,application/pdf"
          multiple
          capture="environment"
          style={{ display: 'none' }}
          onChange={e => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
        />
        <Upload size={28} color={dragOver ? 'var(--accent-blue)' : 'var(--text-tertiary)'} style={{ marginBottom: 10 }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          {dragOver ? 'Drop files here' : 'Click or drag files to upload'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          JPG, PNG, WEBP, HEIC, or PDF · Max 15MB per file
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
          On iPhone/iPad: tap to use camera or choose from library
        </div>
      </div>

      {/* Progress bar */}
      {uploading && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
            <span>Uploading & compressing...</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 300ms ease' }} />
          </div>
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            Uploaded Images ({images.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {images.map(img => (
              <div key={img.id} style={{
                position: 'relative', borderRadius: 12, overflow: 'hidden',
                border: '1.5px solid var(--border-light)', background: 'var(--bg-secondary)',
                transition: 'all 150ms ease',
              }}>
                {/* Thumbnail */}
                <div
                  style={{
                    width: '100%', aspectRatio: '1', overflow: 'hidden',
                    cursor: 'pointer', background: 'var(--bg-tertiary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onClick={() => {}}
                >
                  {img.mimeType === 'application/pdf' ? (
                    <FileText size={32} color="var(--accent-red)" />
                  ) : (
                    <img
                      src={img.thumbnailDataUrl}
                      alt={img.filename}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Info + delete */}
                <div style={{ padding: '8px 10px' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 500, color: 'var(--text-primary)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {img.filename}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
                      {(img.size / 1024).toFixed(0)}KB
                      {img.width > 0 && ` · ${img.width}×${img.height}`}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                      style={{
                        border: 'none', background: 'rgba(255,69,58,0.08)',
                        borderRadius: 6, padding: '3px 6px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 3,
                        fontSize: 10, color: '#ff453a', fontWeight: 500,
                      }}
                    >
                      <Trash2 size={10} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div style={{
          textAlign: 'center', padding: '24px 16px', borderRadius: 12,
          border: '1px solid var(--border-light)', background: 'var(--bg-tertiary)',
        }}>
          <ImageIcon size={28} color="var(--text-tertiary)" style={{ marginBottom: 6 }} />
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>No images uploaded yet</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Upload photos of scars, evidence, or supporting documents</div>
        </div>
      )}
    </div>
  );
}
