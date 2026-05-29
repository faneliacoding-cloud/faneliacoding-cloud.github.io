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
import React, { useState, useEffect } from 'react';
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

// Official brand SVG icons (inline for zero external dependencies)
const ICONS: Record<string, React.ReactNode> = {
  local: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  share: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18.5 8.5C19.8807 8.5 21 7.38071 21 6C21 4.61929 19.8807 3.5 18.5 3.5C17.1193 3.5 16 4.61929 16 6C16 6.27894 16.0425 6.5482 16.1216 6.80108L8.87835 10.4186C8.34778 9.86579 7.6044 9.5 6.77778 9.5C5.24365 9.5 4 10.7437 4 12.2778C4 13.8119 5.24365 15.0556 6.77778 15.0556C7.57987 15.0556 8.30384 14.7105 8.83098 14.1837L16.1474 17.7355C16.0517 18.0068 16 18.2978 16 18.6C16 19.9255 17.0745 21 18.4 21C19.7255 21 20.8 19.9255 20.8 18.6C20.8 17.2745 19.7255 16.2 18.4 16.2C17.6471 16.2 16.9772 16.5516 16.5412 17.0962L9.18897 13.5281C9.37158 13.1432 9.47368 12.713 9.47368 12.2591C9.47368 11.8509 9.38904 11.4622 9.23601 11.1085L16.4946 7.48363C16.9311 7.96915 17.5772 8.27778 18.2963 8.27778" fill="#007AFF"/>
    </svg>
  ),
  filesystem: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e5ce6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  dropbox: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0061FF">
      <path d="M6 2L0 6.5L6 11L12 6.5L6 2Z"/>
      <path d="M18 2L12 6.5L18 11L24 6.5L18 2Z"/>
      <path d="M0 15.5L6 20L12 15.5L6 11L0 15.5Z"/>
      <path d="M18 11L12 15.5L18 20L24 15.5L18 11Z"/>
      <path d="M6 21.5L12 17L18 21.5L12 26" transform="translate(0,-4) scale(1,0.85)"/>
    </svg>
  ),
  googledrive: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M7.71 3.5L1.15 15L4.58 21H11L7.71 15L14.27 3.5H7.71Z" fill="#0F9D58"/>
      <path d="M14.27 3.5L7.71 15L11 21H17.56L14.27 15L20.83 3.5H14.27Z" fill="#FBBC04"/>
      <path d="M1.15 15L4.58 21H17.56L14.27 15H1.15Z" fill="#4285F4"/>
    </svg>
  ),
  onedrive: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M10.5 7.5C11.5 5.5 13.5 4 16 4C19.3 4 22 6.7 22 10C22 10.3 22 10.7 21.9 11C22.6 11.4 23 12.2 23 13C23 14.7 21.7 16 20 16H6C3.8 16 2 14.2 2 12C2 10.1 3.4 8.5 5.2 8.1C5.9 7.5 7 7 8 7C8.9 7 9.8 7.2 10.5 7.5Z" fill="#0078D4"/>
      <path d="M10.5 7.5C9.8 7.2 8.9 7 8 7C7 7 5.9 7.5 5.2 8.1C3.4 8.5 2 10.1 2 12C2 14.2 3.8 16 6 16H14L10.5 7.5Z" fill="#0364B8"/>
    </svg>
  ),
  box: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#0061D5"/>
      <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#2486FC"/>
      <path d="M12 12L3 7V17L12 22V12Z" fill="#0061D5"/>
      <path d="M12 12L21 7V17L12 22V12Z" fill="#004DB3"/>
    </svg>
  ),
};

const PROVIDERS: { id: Provider; label: string; color: string; bg: string; desc: string }[] = [
  { id: 'local',       label: 'Download',      color: '#1d1d1f', bg: '#f5f5f7',             desc: 'Save to your Downloads folder' },
  { id: 'share',       label: 'Share / iCloud', color: '#007AFF', bg: 'rgba(0,122,255,0.08)', desc: 'iOS share sheet, iCloud Drive, AirDrop' },
  { id: 'filesystem',  label: 'Save Anywhere',  color: '#5e5ce6', bg: 'rgba(94,92,230,0.08)', desc: 'System file picker — any location' },
  { id: 'dropbox',     label: 'Dropbox',        color: '#0061FF', bg: 'rgba(0,97,255,0.08)',  desc: 'Save directly to your Dropbox' },
  { id: 'googledrive', label: 'Google Drive',   color: '#0F9D58', bg: 'rgba(15,157,88,0.08)', desc: 'Upload to Google Drive' },
  { id: 'onedrive',    label: 'OneDrive',       color: '#0078D4', bg: 'rgba(0,120,212,0.08)', desc: 'Upload to Microsoft OneDrive' },
  { id: 'box',         label: 'Box',            color: '#0061D5', bg: 'rgba(0,97,213,0.08)',  desc: 'Upload to Box' },
];

export default function CloudExportModal({ evaluation, onClose }: Props) {
  const { savedClinicianInfo } = useAppStore();
  const [fileType, setFileType] = useState<FileType>('docx');
  const [states, setStates] = useState<Record<Provider, ProviderState>>(() =>
    Object.fromEntries(PROVIDERS.map(p => [p.id, { status: 'idle', message: '' }])) as Record<Provider, ProviderState>
  );

  const clientName = evaluation.clientInfo.fullName || 'Evaluation';
  const safeClientName = clientName.replace(/[^a-zA-Z0-9_\s-]/g, '_');
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${safeClientName}_Psych_Eval_${dateStr}.${fileType}`;

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
    let url: string | undefined;
    try {
      const { blob, filename } = await getBlob();
      // Upload blob → get object URL → use Dropbox Saver
      url = URL.createObjectURL(blob);
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
        success: () => { URL.revokeObjectURL(url!); setStatus('dropbox', 'success', 'Saved to Dropbox'); },
        cancel: () => { URL.revokeObjectURL(url!); setStatus('dropbox', 'idle'); },
        error: () => { URL.revokeObjectURL(url!); setStatus('dropbox', 'error', 'Dropbox save failed'); },
        progress: () => {},
      });
      setStatus('dropbox', 'idle'); // Dropbox handles its own UI
    } catch (e) {
      if (url) URL.revokeObjectURL(url);
      setStatus('dropbox', 'error', 'Dropbox unavailable — try downloading first');
    }
  };

  // ── 5. Google Drive ────────────────────────────────────────────────────────
  const handleGoogleDrive = async () => {
    setStatus('googledrive', 'loading');
    try {
      const { blob, filename } = await getBlob();
      // Use Google Identity Services for token
      let token = await getGoogleAccessToken();
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

      token = null;

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
      const state = crypto.randomUUID();
      const scope = 'https://www.googleapis.com/auth/drive.file';
      const popup = window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=${encodeURIComponent(scope)}&state=${state}`,
        'google-auth', 'width=500,height=600'
      );
      let elapsed = 0;
      const poll = setInterval(() => {
        elapsed++;
        if (elapsed > 600) { clearInterval(poll); if (popup && !popup.closed) popup.close(); resolve(null); return; }
        try {
          if (!popup || popup.closed) { clearInterval(poll); resolve(null); return; }
          const hash = popup.location.hash;
          if (hash.includes('access_token')) {
            const params = new URLSearchParams(hash.slice(1));
            if (params.get('state') !== state) { clearInterval(poll); popup.close(); resolve(null); return; }
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
      const state = crypto.randomUUID();
      // OAuth popup
      let token = await new Promise<string | null>(resolve => {
        const popup = window.open(
          `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=Files.ReadWrite&state=${state}`,
          'onedrive-auth', 'width=500,height=600'
        );
        let elapsed = 0;
        const poll = setInterval(() => {
          elapsed++;
          if (elapsed > 600) { clearInterval(poll); if (popup && !popup.closed) popup.close(); resolve(null); return; }
          try {
            if (!popup || popup.closed) { clearInterval(poll); resolve(null); return; }
            const hash = popup.location.hash;
            if (hash.includes('access_token')) {
              const params = new URLSearchParams(hash.slice(1));
              if (params.get('state') !== state) { clearInterval(poll); popup.close(); resolve(null); return; }
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
      token = null;
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
                <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ICONS[p.id]}</div>
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
