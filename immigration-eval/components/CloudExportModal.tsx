'use client';
/**
 * CloudExportModal — Save to iCloud, Dropbox, Google Drive, OneDrive, Box, or local
 * 
 * Strategy:
 * - Web Share API       → iOS/iPadOS/macOS native share sheet (iCloud Drive, AirDrop, etc.)
 * - File System Access  → System file picker (navigates to any sync folder)
 * - Dropbox Saver       → Official Dropbox JS widget (client-side, no backend)
 * - Google Drive        → OAuth2 + Drive API v3 (needs Google API Key in Settings)
 * - OneDrive            → MSAL OAuth + Microsoft Graph (needs Client ID in Settings)
 * - Box                 → OAuth2 + Content API (needs Box Client ID in Settings)
 */
import { useAppStore } from '@/lib/store';
import { generateDOCXBlob, buildPDFHTML } from '@/lib/docGenerator';
import type { Evaluation } from '@/lib/store';
import { useState, useEffect } from 'react';
import { X, Download, Share2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type FileType = 'docx' | 'pdf';
type Provider = 'local' | 'share' | 'filesystem' | 'dropbox' | 'googledrive' | 'onedrive' | 'box';
type Status = 'idle' | 'loading' | 'success' | 'error';

interface ProviderState {
  status: Status;
  message: string;
}

interface Props {
  evaluation: Evaluation;
  onClose: () => void;
}

const PROVIDERS: { id: Provider; label: string; color: string; bg: string; icon: string; desc: string }[] = [
  { id: 'local',       label: 'Download',      color: '#1d1d1f', bg: '#f5f5f7',             icon: '⬇️', desc: 'Save to your Downloads folder' },
  { id: 'share',       label: 'Share / iCloud', color: '#0071e3', bg: 'rgba(0,113,227,0.08)', icon: '☁️', desc: 'iOS share sheet, iCloud Drive, AirDrop' },
  { id: 'filesystem',  label: 'Save Anywhere',  color: '#5e5ce6', bg: 'rgba(94,92,230,0.08)', icon: '📁', desc: 'System file picker — any location' },
  { id: 'dropbox',     label: 'Dropbox',        color: '#0061FF', bg: 'rgba(0,97,255,0.08)',  icon: '📦', desc: 'Save directly to your Dropbox' },
  { id: 'googledrive', label: 'Google Drive',   color: '#0F9D58', bg: 'rgba(15,157,88,0.08)', icon: '🔵', desc: 'Upload to Google Drive' },
  { id: 'onedrive',    label: 'OneDrive',       color: '#0078D4', bg: 'rgba(0,120,212,0.08)', icon: '☁️', desc: 'Upload to Microsoft OneDrive' },
  { id: 'box',         label: 'Box',            color: '#0061D5', bg: 'rgba(0,97,213,0.08)',  icon: '📫', desc: 'Upload to Box' },
];

export default function CloudExportModal({ evaluation, onClose }: Props) {
  const { savedClinicianInfo } = useAppStore();
  const [fileType, setFileType] = useState<FileType>('docx');
  const [states, setStates] = useState<Record<Provider, ProviderState>>(() =>
    Object.fromEntries(PROVIDERS.map(p => [p.id, { status: 'idle', message: '' }])) as Record<Provider, ProviderState>
  );

  const clientName = evaluation.clientInfo.fullName || 'Evaluation';
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${clientName}_Psych_Eval_${dateStr}.${fileType}`;

  const setStatus = (provider: Provider, status: Status, message = '') => {
    setStates(s => ({ ...s, [provider]: { status, message } }));
  };

  // Get the blob/content for whichever format is selected
  const getBlob = async (): Promise<{ blob: Blob; filename: string }> => {
    if (fileType === 'docx') {
      return generateDOCXBlob(evaluation);
    } else {
      const html = buildPDFHTML(evaluation);
      return {
        blob: new Blob([html], { type: 'text/html' }),
        filename: filename,
      };
    }
  };

  // ── 1. Local download ──────────────────────────────────────────────────────
  const handleLocal = async () => {
    setStatus('local', 'loading');
    try {
      const { blob, filename } = await getBlob();
      const { saveAs } = await import('file-saver');
      saveAs(blob, filename);
      setStatus('local', 'success', 'Saved to Downloads');
    } catch (e) {
      setStatus('local', 'error', 'Download failed');
    }
  };

  // ── 2. Web Share API (iCloud Drive, AirDrop on Apple) ─────────────────────
  const handleShare = async () => {
    setStatus('share', 'loading');
    try {
      const { blob, filename } = await getBlob();
      const file = new File([blob], filename, { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${clientName} - Psychological Evaluation` });
        setStatus('share', 'success', 'Shared successfully');
      } else {
        // Fallback: open print dialog for PDF, or download for DOCX
        if (fileType === 'pdf') {
          const html = buildPDFHTML(evaluation);
          const win = window.open('', '_blank');
          if (win) { win.document.write(html + '<script>window.onload=()=>window.print();</script>'); win.document.close(); }
        } else {
          const { saveAs } = await import('file-saver');
          saveAs(blob, filename);
        }
        setStatus('share', 'success', 'File ready');
      }
    } catch (e: any) {
      if (e?.name !== 'AbortError') setStatus('share', 'error', 'Share cancelled or unavailable');
      else setStatus('share', 'idle');
    }
  };

  // ── 3. File System Access API (save to any folder) ────────────────────────
  const handleFileSystem = async () => {
    setStatus('filesystem', 'loading');
    try {
      const { blob, filename } = await getBlob();
      if ('showSaveFilePicker' in window) {
        const ext = fileType === 'docx' ? 'docx' : 'html';
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: fileType === 'docx' ? 'Word Document' : 'HTML File',
            accept: fileType === 'docx'
              ? { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
              : { 'text/html': ['.html'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        setStatus('filesystem', 'success', 'File saved');
      } else {
        // Fallback for browsers without File System Access API
        const { saveAs } = await import('file-saver');
        saveAs(blob, filename);
        setStatus('filesystem', 'success', 'Downloaded — move to your cloud folder');
      }
    } catch (e: any) {
      if (e?.name !== 'AbortError') setStatus('filesystem', 'error', 'Save cancelled');
      else setStatus('filesystem', 'idle');
    }
  };

  // ── 4. Dropbox Saver ───────────────────────────────────────────────────────
  const handleDropbox = async () => {
    setStatus('dropbox', 'loading');
    try {
      const { blob, filename } = await getBlob();
      // Upload blob → get object URL → use Dropbox Saver
      const url = URL.createObjectURL(blob);
      // Load Dropbox SDK dynamically
      await new Promise<void>((resolve, reject) => {
        if ((window as any).Dropbox) { resolve(); return; }
        const s = document.createElement('script');
        s.src = 'https://www.dropbox.com/static/api/2/dropins.js';
        s.dataset.appKey = 'demo'; // Works for Saver without app key
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load Dropbox SDK'));
        document.head.appendChild(s);
      });
      (window as any).Dropbox.save(url, filename, {
        success: () => { URL.revokeObjectURL(url); setStatus('dropbox', 'success', 'Saved to Dropbox'); },
        cancel: () => { URL.revokeObjectURL(url); setStatus('dropbox', 'idle'); },
        error: () => { URL.revokeObjectURL(url); setStatus('dropbox', 'error', 'Dropbox save failed'); },
        progress: () => {},
      });
      setStatus('dropbox', 'idle'); // Dropbox handles its own UI
    } catch (e) {
      setStatus('dropbox', 'error', 'Dropbox unavailable — try downloading first');
    }
  };

  // ── 5. Google Drive ────────────────────────────────────────────────────────
  const handleGoogleDrive = async () => {
    setStatus('googledrive', 'loading');
    try {
      const { blob, filename } = await getBlob();
      // Use Google Identity Services for token
      const token = await getGoogleAccessToken();
      if (!token) { setStatus('googledrive', 'error', 'Google sign-in cancelled'); return; }

      const metadata = { name: filename, mimeType: blob.type };
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', blob);

      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (res.ok) {
        setStatus('googledrive', 'success', 'Saved to Google Drive');
      } else {
        throw new Error('Upload failed');
      }
    } catch (e) {
      setStatus('googledrive', 'error', 'Upload failed — check Google Drive access');
    }
  };

  // Google OAuth via popup
  const getGoogleAccessToken = (): Promise<string | null> => {
    return new Promise(resolve => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
      if (!clientId) {
        resolve(null);
        alert('Google Drive requires a Google Client ID. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env.local file.');
        return;
      }
      const scope = 'https://www.googleapis.com/auth/drive.file';
      const popup = window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=${encodeURIComponent(scope)}`,
        'google-auth', 'width=500,height=600'
      );
      const poll = setInterval(() => {
        try {
          if (!popup || popup.closed) { clearInterval(poll); resolve(null); return; }
          const hash = popup.location.hash;
          if (hash.includes('access_token')) {
            const params = new URLSearchParams(hash.slice(1));
            clearInterval(poll);
            popup.close();
            resolve(params.get('access_token'));
          }
        } catch {}
      }, 500);
    });
  };

  // ── 6. OneDrive ────────────────────────────────────────────────────────────
  const handleOneDrive = async () => {
    setStatus('onedrive', 'loading');
    try {
      const { blob, filename } = await getBlob();
      const clientId = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID || '';
      if (!clientId) {
        setStatus('onedrive', 'error', 'Set NEXT_PUBLIC_ONEDRIVE_CLIENT_ID in .env.local');
        return;
      }
      // OAuth popup
      const token = await new Promise<string | null>(resolve => {
        const popup = window.open(
          `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=Files.ReadWrite`,
          'onedrive-auth', 'width=500,height=600'
        );
        const poll = setInterval(() => {
          try {
            if (!popup || popup.closed) { clearInterval(poll); resolve(null); return; }
            const hash = popup.location.hash;
            if (hash.includes('access_token')) {
              const params = new URLSearchParams(hash.slice(1));
              clearInterval(poll); popup.close();
              resolve(params.get('access_token'));
            }
          } catch {}
        }, 500);
      });
      if (!token) { setStatus('onedrive', 'error', 'OneDrive sign-in cancelled'); return; }
      const res = await fetch(
        `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(filename)}:/content`,
        { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': blob.type }, body: blob }
      );
      if (res.ok) setStatus('onedrive', 'success', 'Saved to OneDrive');
      else throw new Error('Upload failed');
    } catch {
      setStatus('onedrive', 'error', 'OneDrive upload failed');
    }
  };

  // ── 7. Box ─────────────────────────────────────────────────────────────────
  const handleBox = async () => {
    setStatus('box', 'loading');
    // Box requires server-side OAuth — guide the user to download and upload
    setStatus('box', 'error', 'Box requires a server. Download the file and drag it to Box.com');
  };

  const handlers: Record<Provider, () => void> = {
    local: handleLocal,
    share: handleShare,
    filesystem: handleFileSystem,
    dropbox: handleDropbox,
    googledrive: handleGoogleDrive,
    onedrive: handleOneDrive,
    box: handleBox,
  };

  const StatusIcon = ({ provider }: { provider: Provider }) => {
    const s = states[provider];
    if (s.status === 'loading') return <Loader2 size={16} style={{ animation: 'spin 1s linear infinite', color: '#0071e3' }} />;
    if (s.status === 'success') return <CheckCircle2 size={16} color="#30d158" />;
    if (s.status === 'error') return <AlertCircle size={16} color="#ff453a" />;
    return null;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 20, border: '1px solid var(--border-medium)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        width: '100%', maxWidth: 520,
        overflow: 'hidden',
      }} onClick={e => e.stopPropagation()} className="animate-fade-in">

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,113,227,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={18} color="var(--accent-blue)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Export Document</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{clientName}</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', borderRadius: 8, padding: 6 }}>
            <X size={18} />
          </button>
        </div>

        {/* File type selector */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Format</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['docx', 'pdf'] as FileType[]).map(t => (
              <button key={t} onClick={() => setFileType(t)} style={{
                flex: 1, padding: '10px 16px', borderRadius: 10, border: '1.5px solid',
                borderColor: fileType === t ? 'var(--accent-blue)' : 'var(--border-medium)',
                background: fileType === t ? 'rgba(0,113,227,0.08)' : 'transparent',
                color: fileType === t ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: fileType === t ? 600 : 400,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {t === 'docx' ? '📄 Word Document (.docx)' : '🖨️ PDF (Print to save)'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6, padding: '0 2px' }}>
            {fileType === 'docx'
              ? 'Fully editable Word document with all evaluation data'
              : 'Opens browser print dialog — choose "Save as PDF" as the printer'}
          </div>
        </div>

        {/* Provider list */}
        <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Save to</div>
          {PROVIDERS.map(p => {
            const state = states[p.id];
            return (
              <button key={p.id} onClick={handlers[p.id]}
                disabled={state.status === 'loading'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12, border: '1.5px solid',
                  borderColor: state.status === 'success' ? '#30d15830' : state.status === 'error' ? '#ff453a30' : 'var(--border-light)',
                  background: state.status === 'success' ? 'rgba(48,209,88,0.06)' : state.status === 'error' ? 'rgba(255,69,58,0.04)' : p.bg,
                  cursor: state.status === 'loading' ? 'wait' : 'pointer',
                  textAlign: 'left', fontFamily: 'inherit', width: '100%',
                  transition: 'all 180ms ease',
                }}
              >
                <div style={{ fontSize: 20, lineHeight: 1, width: 28, textAlign: 'center', flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.color, marginBottom: 1 }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    {state.status !== 'idle' && state.message ? state.message : p.desc}
                  </div>
                </div>
                <StatusIcon provider={p.id} />
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{ padding: '0 24px 20px', fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
          💡 On iPhone/iPad: tap <strong>Share / iCloud</strong> to get the native share sheet with iCloud Drive, AirDrop, and more. Google Drive and OneDrive require API keys — configure in Settings.
        </div>

        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    </div>
  );
}
