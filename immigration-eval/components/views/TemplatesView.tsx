// @ts-nocheck
'use client';
/**
 * TemplatesView — Template info and upload
 */
import { FolderOpen, Upload, Info } from 'lucide-react';

export default function TemplatesView() {
  return (
    <div style={{ padding: 32, maxWidth: 760, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(90,200,250,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FolderOpen size={20} color="#5ac8fa" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Template Manager</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Manage DOCX report templates</p>
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 24, display: 'flex', gap: 12 }}>
        <Info size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: 13, color: 'var(--accent-blue)', lineHeight: 1.6 }}>
          <strong>How DOCX templates work:</strong> Place your <code>asylum-template.docx</code> file in the <code>public/</code> folder. 
          The system will automatically replace placeholders like <code>{'{{FULL_NAME}}'}</code>, <code>{'{{PHQ9_TOTAL}}'}</code>, etc. 
          with your evaluation data. If no template is found, a clean formatted document is generated automatically.
        </div>
      </div>

      <div className="glass-card" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Available Placeholders</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Use these tags in your DOCX template. They are replaced with evaluation data on export.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {[
            ['{{FULL_NAME}}', 'Client full name'],
            ['{{MS_XXX}}', 'Title + last name'],
            ['{{AGE}}', 'Client age'],
            ['{{DOB}}', 'Date of birth'],
            ['{{NATIONALITY}}', 'Nationality'],
            ['{{COUNTRY_XXX}}', 'Country of origin'],
            ['{{EVAL_DATES}}', 'Evaluation dates'],
            ['{{EVAL_LOCATION}}', 'Evaluation location'],
            ['{{INTERPRETER}}', 'Interpreter name'],
            ['{{CLINICIAN_NAME}}', 'Clinician name'],
            ['{{LICENSE_TYPE}}', 'License type'],
            ['{{LICENSE_NUMBER}}', 'License number'],
            ['{{CLINICIAN_BIO}}', 'Clinician bio'],
            ['{{CASE_SUMMARY}}', 'Full case summary'],
            ['{{TRAUMA_CATEGORY}}', 'Trauma category'],
            ['{{TRAUMA_DESCRIPTION}}', 'Trauma description'],
            ['{{PHQ9_TOTAL}}', 'PHQ-9 total score'],
            ['{{PHQ9_SEVERITY}}', 'PHQ-9 severity'],
            ['{{GAD7_TOTAL}}', 'GAD-7 total score'],
            ['{{GAD7_SEVERITY}}', 'GAD-7 severity'],
            ['{{PCL5_TOTAL}}', 'PCL-5 total score'],
            ['{{PCL5_SEVERITY}}', 'PCL-5 severity'],
            ['{{DIAGNOSES}}', 'All DSM-5 diagnoses'],
            ['{{CLINICAL_IMPRESSION}}', 'Clinical impression'],
            ['{{CREDIBILITY}}', 'Credibility assessment'],
            ['{{RECOMMENDATIONS}}', 'Recommendations'],
            ['{{REPORT_DATE}}', 'Report generation date'],
            ['{{SUBJECT}}', 'Pronoun (she/he/they)'],
            ['{{POSSESSIVE}}', 'Possessive (her/his/their)'],
          ].map(([tag, desc]) => (
            <div key={tag} style={{ display: 'flex', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--bg-tertiary)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, color: '#5e5ce6', fontFamily: 'monospace', flexShrink: 0, background: 'rgba(94,92,230,0.10)', padding: '2px 6px', borderRadius: 4 }}>{tag}</code>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ borderRadius: 16, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Upload Template</h2>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Place your modified template in <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>immigration-eval/public/asylum-template.docx</code>
        </p>
        <div style={{
          border: '2px dashed var(--border-medium)', borderRadius: 12, padding: '32px',
          textAlign: 'center', color: 'var(--text-secondary)',
        }}>
          <Upload size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 14, fontWeight: 500 }}>Drop asylum-template.docx here</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Or place it manually in <code>/public/</code></p>
        </div>
      </div>
    </div>
  );
}
