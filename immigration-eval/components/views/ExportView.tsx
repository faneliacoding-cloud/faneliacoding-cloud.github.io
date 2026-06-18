// @ts-nocheck
'use client';
/**
 * ExportView — Central export hub for all evaluations
 */
import { useAppStore } from '@/lib/store';
import { generateDOCX, generatePDF } from '@/lib/docGenerator';
import { Download, FileText, Printer, FileDown } from 'lucide-react';
import { useState } from 'react';

export default function ExportView() {
  const { evaluations, setActiveEval, setView } = useAppStore();
  const [exporting, setExporting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sorted = [...evaluations].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleDocx = async (ev: typeof sorted[0]) => {
    setExporting(ev.id);
    setError(null);
    try {
      await generateDOCX(ev);
    } catch (e) {
      console.error(e);
      setError(`DOCX export failed for ${ev.client.fullName || 'this evaluation'}. Please try again.`);
    }
    setExporting(null);
  };

  const handlePDF = (ev: typeof sorted[0]) => {
    setError(null);
    try {
      generatePDF(ev);
    } catch (e) {
      console.error(e);
      setError(`PDF export failed for ${ev.client.fullName || 'this evaluation'}. Please try again.`);
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,113,227,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Download size={20} color="var(--accent-blue)" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Export Center</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Export evaluations as Word documents or PDFs</p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          padding: '12px 16px', marginBottom: 16, borderRadius: 10,
          background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)',
          color: '#ff453a', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ border: 'none', background: 'none', color: '#ff453a', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>×</button>
        </div>
      )}

      {/* Format info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        {[
          { icon: FileDown, title: 'Word Document (.docx)', desc: 'Fully formatted, editable clinical report. Replaces all template placeholders with your evaluation data.', color: '#0071e3' },
          { icon: Printer, title: 'PDF / Print', desc: 'Print-ready document opened in browser. Use your browser\'s print function to save as PDF.', color: '#bf5af2' },
        ].map(f => (
          <div key={f.title} className="glass-card" style={{ borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: f.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <f.icon size={20} color={f.color} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <FileText size={48} color="var(--text-tertiary)" style={{ marginBottom: 16 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No evaluations to export</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sorted.map(ev => (
            <div key={ev.id} className="glass-card" style={{ borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: (ev.status === 'report_complete' || ev.status === 'delivered') ? 'rgba(48,209,88,0.10)' : 'rgba(0,113,227,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={16} color={(ev.status === 'report_complete' || ev.status === 'delivered') ? '#30d158' : 'var(--sage)'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ev.client.fullName || 'Unnamed Client'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {ev.client.countryOfOrigin || 'Country unknown'} · {new Date(ev.updatedAt).toLocaleDateString()}
                  <span className={`badge badge-${(ev.status === 'report_complete' || ev.status === 'delivered') ? 'complete' : 'draft'}`} style={{ marginLeft: 8 }}>
                    {(ev.status === 'report_complete' || ev.status === 'delivered') ? 'Complete' : 'Draft'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-ghost" onClick={() => { setActiveEval(ev.id); setView('new-eval'); }} style={{ fontSize: 12 }}>View</button>
                <button className="btn-secondary" onClick={() => handlePDF(ev)} style={{ fontSize: 12 }}>
                  <Printer size={13} /> PDF
                </button>
                <button className="btn-primary" onClick={() => handleDocx(ev)} disabled={exporting === ev.id} style={{ fontSize: 12 }}>
                  <FileDown size={13} />
                  {exporting === ev.id ? 'Exporting...' : 'DOCX'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
