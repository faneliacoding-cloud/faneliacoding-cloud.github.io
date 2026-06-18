// @ts-nocheck
'use client';
/**
 * Section 3: Case Summary — AI-enhanced clinical narrative
 */
import { useAppStore, CaseSummary } from '@/lib/store';
import { useState } from 'react';
import { FileText, Sparkles, Quote, ChevronDown, ChevronUp } from 'lucide-react';

interface Props { evalId: string; }

export default function Section3CaseSummary({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  const [showNotes, setShowNotes] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  if (!eval_) return null;
  const { caseSummary: cs, clientInfo: c } = eval_;

  const update = (field: keyof CaseSummary, value: string) => {
    updateEvaluation(evalId, { caseSummary: { ...eval_.caseSummary, [field]: value } });
  };

  // AI starter template based on collected data
  const handleAIStarter = () => {
    setAiLoading(true);
    setTimeout(() => {
      const title = c.pronouns === 'He/Him' ? 'Mr.' : 'Ms.';
      const lastName = c.fullName?.split(' ').slice(-1)[0] || 'XXX';
      const ref = c.pronouns === 'He/Him' ? 'He' : c.pronouns === 'They/Them' ? 'They' : 'She';
      const poss = c.pronouns === 'He/Him' ? 'his' : c.pronouns === 'They/Them' ? 'their' : 'her';
      const draft = `${title} ${lastName} is a ${c.age || '___'}-year-old ${c.nationality || '[Nationality]'} national who arrived in the United States after fleeing ${c.countryOfOrigin || 'their country of origin'}. ${ref} currently resides in ${c.currentAddress?.split(',').slice(-2).join(',').trim() || '[location]'} and is petitioning for asylum based on ${poss} claim that ${ref.toLowerCase()} experienced life-threatening persecution in ${c.countryOfOrigin || '[Country of Origin]'}.

${ref} requested an evaluation by a mental health provider in order to assess ${poss} psychological symptoms and evaluate the credibility of ${poss} account. During the interviews, ${title} ${lastName} shared that while living in ${c.countryOfOrigin || '[Country of Origin]'}, ${ref.toLowerCase()} suffered persecution due to [trauma category]. ${ref} fled ${c.countryOfOrigin || '[Country]'} after [precipitating event].

Due to ${poss} past trauma and ${poss} intense fear that ${ref.toLowerCase()} will be harmed if ${ref.toLowerCase()} returns to ${c.countryOfOrigin || '[Country of Origin]'}, ${title} ${lastName} is experiencing numerous psychological symptoms. After thorough assessment, including clinical interviews and review of self-assessment scales, I have concluded that ${poss} account is highly credible and ${poss} symptoms are consistent with those typical of survivors of trauma.`;
      update('summary', draft);
      setAiLoading(false);
    }, 900);
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(191,90,242,0.10)' }}>
          <FileText size={20} color="#bf5af2" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Case Summary</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Provide a concise narrative of the most compelling case factors (aim for less than one page)</p>
        </div>
      </div>

      {/* AI Draft Button */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <button
          className="btn-secondary"
          onClick={handleAIStarter}
          disabled={aiLoading}
          style={{ fontSize: 13 }}
        >
          <Sparkles size={14} color="#bf5af2" />
          {aiLoading ? 'Generating...' : 'Generate AI Draft'}
        </button>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
          Uses client data from Section 1 to build a starter narrative
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label" htmlFor="caseSummary">Case Summary *</label>
        <textarea
          id="caseSummary"
          className="form-textarea"
          value={cs.summary}
          onChange={e => update('summary', e.target.value)}
          rows={10}
          style={{ minHeight: 220 }}
          placeholder="Write a compelling case overview. Include the client's background, reason for asylum, key trauma events, current symptoms, and clinical conclusions. This section should stand alone — write it as if the reader will not continue further."
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, fontSize: 11, color: 'var(--text-tertiary)' }}>
          {cs.summary.length} characters · {cs.summary.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      {/* Key Quote */}
      <div style={{ marginBottom: 16 }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Quote size={12} /> Vivid Quote from Client
        </label>
        <input
          className="form-input"
          value={cs.keyQuote}
          onChange={e => update('keyQuote', e.target.value)}
          placeholder='e.g. "I knew if I stayed, they would kill me."'
        />
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
          A powerful direct quote adds credibility and emotional context to the report
        </div>
      </div>

      {/* Expandable Notes */}
      <div>
        <button
          className="btn-ghost"
          onClick={() => setShowNotes(!showNotes)}
          style={{ marginBottom: showNotes ? 12 : 0 }}
        >
          {showNotes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showNotes ? 'Hide' : 'Show'} Background Notes (Internal — Not Exported)
        </button>
        {showNotes && (
          <div>
            <label className="form-label">Internal Notes</label>
            <textarea
              className="form-textarea"
              value={cs.backgroundNotes}
              onChange={e => update('backgroundNotes', e.target.value)}
              rows={5}
              placeholder="Internal notes, interview observations, follow-up questions. These notes will NOT appear in the generated report."
            />
          </div>
        )}
      </div>

      {/* Tip box */}
      <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, background: 'rgba(191,90,242,0.08)', border: '1px solid rgba(191,90,242,0.15)', fontSize: 12, color: '#bf5af2', lineHeight: 1.6 }}>
        <strong>Tip:</strong> Write the Case Summary last — after completing all other sections — so it reflects the full clinical picture. Keep it under one page and include the most compelling details.
      </div>
    </div>
  );
}
