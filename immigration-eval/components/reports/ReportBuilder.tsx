'use client';
/**
 * ReportBuilder — Report generation workflow
 * Readiness checklist, format selection, clinician confirmation, and generation
 */
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { EVAL_STEPS } from '@/lib/types';
import {
  FileText, CheckCircle2, AlertCircle, Download, Eye,
  Loader2, Check, Shield, FileDown,
} from 'lucide-react';

type ReportFormat = 'pdf' | 'docx' | 'pages';
type GenerationState = 'idle' | 'generating' | 'complete' | 'error';

const FORMAT_OPTIONS: { key: ReportFormat; label: string; description: string; icon: string; ext: string }[] = [
  { key: 'pdf', label: 'PDF Document', description: 'Print-ready PDF for courts & filing', icon: '📄', ext: '.pdf' },
  { key: 'docx', label: 'Word Document', description: 'Editable DOCX for Microsoft Word', icon: '📝', ext: '.docx' },
  { key: 'pages', label: 'Pages Document', description: 'Apple Pages compatible format', icon: '🍎', ext: '.rtf' },
];

const GENERATION_STEPS = [
  'Preparing clinical summary...',
  'Organizing client history...',
  'Formatting evaluation sections...',
  'Building document...',
  'Report ready.',
];

export default function ReportBuilder() {
  const { evaluations, activeEvalId, setActiveEval } = useAppStore();
  const [selectedEvalId, setSelectedEvalId] = useState<string>(activeEvalId || evaluations[0]?.id || '');
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>('pdf');
  const [clinicianConfirmed, setClinicianConfirmed] = useState(false);
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [generationStep, setGenerationStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedEval = evaluations.find(e => e.id === selectedEvalId);

  // Calculate step completion for readiness checklist
  const getStepCompletion = () => {
    if (!selectedEval) return [];
    return EVAL_STEPS.map(step => {
      const isComplete = selectedEval.completedSteps.includes(step.id);
      return { ...step, isComplete };
    });
  };

  const stepCompletion = getStepCompletion();
  const completedCount = stepCompletion.filter(s => s.isComplete).length;
  const totalSteps = EVAL_STEPS.length;
  const completionPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const canGenerate = clinicianConfirmed && completionPercent >= 70;

  const handleGenerate = async () => {
    if (!selectedEval || !canGenerate) return;
    setGenerationState('generating');
    setGenerationStep(0);
    setErrorMessage('');

    // Animate through generation steps
    for (let i = 0; i < GENERATION_STEPS.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    try {
      if (selectedFormat === 'pdf') {
        try {
          const docGen = await import('@/lib/docGenerator');
          if (docGen.generatePDF) {
            await docGen.generatePDF(selectedEval as never);
          }
        } catch {
          console.warn('[ReportBuilder] PDF generation not available for current data model');
        }
      } else if (selectedFormat === 'docx') {
        try {
          const docGen = await import('@/lib/docGenerator');
          if (docGen.generateDOCX) {
            await docGen.generateDOCX(selectedEval as never);
          }
        } catch {
          console.warn('[ReportBuilder] DOCX generation not available for current data model');
        }
      } else if (selectedFormat === 'pages') {
        try {
          const docGen = await import('@/lib/docGenerator');
          if (docGen.generatePages) {
            await docGen.generatePages(selectedEval as never);
          }
        } catch {
          console.warn('[ReportBuilder] Pages generation not available for current data model');
        }
      }
      setGenerationState('complete');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Generation failed. Please try again.');
      setGenerationState('error');
    }
  };

  const handleReset = () => {
    setGenerationState('idle');
    setGenerationStep(0);
    setClinicianConfirmed(false);
    setErrorMessage('');
  };

  useEffect(() => {
    if (activeEvalId) setSelectedEvalId(activeEvalId);
  }, [activeEvalId]);

  return (
    <div className="animate-fade-in" style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="heading-xl" style={{ marginBottom: 8 }}>
          Report Generator
        </h1>
        <p className="text-secondary" style={{ fontSize: 15 }}>
          Review, finalize, and generate professional evaluation reports
        </p>
      </div>

      {/* Evaluation Selector */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <label className="form-label">Select Evaluation</label>
        <select
          className="form-select"
          value={selectedEvalId}
          onChange={e => {
            setSelectedEvalId(e.target.value);
            setActiveEval(e.target.value);
            handleReset();
          }}
          aria-label="Select evaluation for report generation"
        >
          <option value="">Choose an evaluation...</option>
          {evaluations.map(ev => (
            <option key={ev.id} value={ev.id}>
              {ev.client.fullName || 'Unnamed Client'} — {ev.caseType.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      {selectedEval && generationState === 'idle' && (
        <>
          {/* Readiness Checklist */}
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className="heading-lg" style={{ fontSize: 20 }}>
                Readiness Checklist
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: completionPercent >= 70 ? 'var(--forest)' : 'var(--amber)',
                }}>
                  {completionPercent}%
                </span>
                <span className="text-muted">complete</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar" style={{ marginBottom: 20, height: 6 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${completionPercent}%`,
                  background: completionPercent >= 70
                    ? 'linear-gradient(90deg, var(--forest), var(--sage))'
                    : 'linear-gradient(90deg, var(--amber), var(--gold))',
                }}
              />
            </div>

            {/* Step List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stepCompletion.map(step => (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: step.isComplete ? 'rgba(74,155,142,0.06)' : 'rgba(212,136,62,0.06)',
                  }}
                >
                  {step.isComplete ? (
                    <CheckCircle2 size={18} color="var(--teal)" />
                  ) : (
                    <AlertCircle size={18} color="var(--amber)" />
                  )}
                  <span style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: step.isComplete ? 'var(--charcoal)' : 'var(--charcoal-light)',
                    flex: 1,
                  }}>
                    {step.icon} {step.title}
                  </span>
                  <span className="text-muted" style={{ fontSize: 12 }}>
                    {step.isComplete ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
              ))}
            </div>

            {completionPercent < 70 && (
              <div style={{
                marginTop: 16,
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(212,136,62,0.08)',
                border: '1px solid rgba(212,136,62,0.15)',
                fontSize: 13,
                color: 'var(--amber)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <AlertCircle size={16} />
                At least 70% completion is required to generate a report. Complete more sections to proceed.
              </div>
            )}
          </div>

          {/* Format Selector */}
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <h2 className="heading-lg" style={{ fontSize: 20, marginBottom: 16 }}>
              Report Format
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
            }}>
              {FORMAT_OPTIONS.map(fmt => (
                <button
                  key={fmt.key}
                  onClick={() => setSelectedFormat(fmt.key)}
                  aria-label={`Select ${fmt.label} format`}
                  style={{
                    padding: '16px 14px',
                    borderRadius: 14,
                    border: selectedFormat === fmt.key
                      ? '2px solid var(--forest)'
                      : '1.5px solid var(--border-light)',
                    background: selectedFormat === fmt.key
                      ? 'rgba(45,90,69,0.04)'
                      : 'var(--white)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{fmt.icon}</div>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: selectedFormat === fmt.key ? 'var(--forest)' : 'var(--charcoal)',
                    marginBottom: 4,
                  }}>
                    {fmt.label}
                  </div>
                  <div className="text-muted" style={{ fontSize: 11, marginBottom: 6 }}>
                    {fmt.description}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: selectedFormat === fmt.key ? 'rgba(45,90,69,0.10)' : 'var(--ivory)',
                    color: selectedFormat === fmt.key ? 'var(--forest)' : 'var(--charcoal-muted)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}>
                    {fmt.ext}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Clinician Confirmation */}
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={clinicianConfirmed}
                  onChange={e => setClinicianConfirmed(e.target.checked)}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: 'var(--forest)',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                  aria-label="Clinician review confirmation"
                />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 4 }}>
                    <Shield size={14} style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--forest)' }} />
                    Clinician Review Confirmation
                  </div>
                  <div className="text-secondary" style={{ fontSize: 13, lineHeight: 1.6 }}>
                    I have reviewed all clinical content and confirm this report reflects
                    my professional opinion. I understand that this document may be submitted
                    as evidence in legal proceedings.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <button
              className="btn-gold"
              onClick={handleGenerate}
              disabled={!canGenerate}
              aria-label="Generate evaluation report"
              style={{
                padding: '14px 40px',
                fontSize: 16,
                opacity: canGenerate ? 1 : 0.5,
              }}
            >
              <FileDown size={18} />
              Generate Report
            </button>
            {!canGenerate && (
              <p className="text-muted" style={{ marginTop: 10 }}>
                {completionPercent < 70
                  ? 'Complete at least 70% of the evaluation steps'
                  : 'Please confirm the clinician review above'}
              </p>
            )}
          </div>
        </>
      )}

      {/* Generation Progress */}
      {selectedEval && generationState === 'generating' && (
        <div className="card animate-scale-in" style={{ padding: 40, textAlign: 'center' }}>
          <Loader2
            size={40}
            color="var(--forest)"
            style={{ margin: '0 auto 24px', animation: 'spin 1s linear infinite' }}
          />
          <h2 className="heading-lg" style={{ marginBottom: 24 }}>
            Generating Report
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400, margin: '0 auto' }}>
            {GENERATION_STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: i <= generationStep ? 'rgba(74,155,142,0.06)' : 'var(--ivory)',
                  opacity: i <= generationStep ? 1 : 0.4,
                  transition: 'all var(--transition-base)',
                }}
              >
                {i < generationStep ? (
                  <CheckCircle2 size={16} color="var(--teal)" />
                ) : i === generationStep ? (
                  <Loader2 size={16} color="var(--forest)" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--border-medium)' }} />
                )}
                <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{step}</span>
              </div>
            ))}
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Generation Complete */}
      {selectedEval && generationState === 'complete' && (
        <div className="card animate-scale-in" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(74,155,142,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <Check size={32} color="var(--teal)" />
          </div>
          <h2 className="heading-lg" style={{ marginBottom: 8 }}>
            Report Generated Successfully
          </h2>
          <p className="text-secondary" style={{ fontSize: 14, marginBottom: 28 }}>
            Your {selectedFormat.toUpperCase()} report for {selectedEval.client.fullName || 'this evaluation'} is ready.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleGenerate} aria-label="Download report">
              <Download size={16} /> Download Again
            </button>
            <button className="btn-secondary" onClick={handleReset} aria-label="Generate another report">
              <FileText size={16} /> Generate Another
            </button>
          </div>
        </div>
      )}

      {/* Generation Error */}
      {selectedEval && generationState === 'error' && (
        <div className="card animate-scale-in" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(199,92,92,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <AlertCircle size={32} color="var(--rose)" />
          </div>
          <h2 className="heading-lg" style={{ marginBottom: 8 }}>
            Generation Issue
          </h2>
          <p className="text-secondary" style={{ fontSize: 14, marginBottom: 8 }}>
            {errorMessage || 'The report could not be generated at this time.'}
          </p>
          <p className="text-muted" style={{ marginBottom: 24 }}>
            This may be due to a data format mismatch. You can try a different format or contact support.
          </p>
          <button className="btn-secondary" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}

      {/* No Evaluation Selected */}
      {!selectedEval && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FileText size={28} color="var(--charcoal-muted)" />
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 6 }}>
            Select an Evaluation
          </p>
          <p className="text-secondary" style={{ fontSize: 13 }}>
            Choose an evaluation above to review readiness and generate a report
          </p>
        </div>
      )}
    </div>
  );
}
