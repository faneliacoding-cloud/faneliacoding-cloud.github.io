'use client';
/**
 * Document Generation Engine
 * Handles DOCX template population and PDF export
 */
import type { Evaluation } from './store';

// Build template variables from evaluation data
export function buildTemplateVars(eval_: Evaluation): Record<string, string> {
  const { clientInfo: c, clinicianInfo: cl, caseSummary: cs, traumaHistory: t,
    psychSymptoms: ps, mentalStatusExam: mse, phq9, gad7, pcl5,
    optionalSections: os, findings: f } = eval_;

  const pronounMap: Record<string, { subject: string; object: string; possessive: string; title: string }> = {
    'She/Her': { subject: 'she', object: 'her', possessive: 'her', title: 'Ms.' },
    'He/Him': { subject: 'he', object: 'him', possessive: 'his', title: 'Mr.' },
    'They/Them': { subject: 'they', object: 'them', possessive: 'their', title: '' },
    'Other': { subject: 'they', object: 'them', possessive: 'their', title: '' },
  };
  const pro = pronounMap[c.pronouns] || pronounMap['She/Her'];

  const diagnosesList = f.diagnoses.map(d => `${d.code} ${d.name}${d.specifier ? `, ${d.specifier}` : ''}`).join('\n');

  return {
    // Client basics
    FULL_NAME: c.fullName || '[Client Name]',
    PREFERRED_NAME: c.preferredName || c.fullName || '[Preferred Name]',
    PRONOUNS: c.pronouns,
    TITLE: pro.title,
    MS_XXX: `${pro.title} ${c.fullName?.split(' ').pop() || 'XXX'}`,
    DOB: c.dateOfBirth || '00-00-0000',
    AGE: c.age || '00',
    NATIONALITY: c.nationality || '[Nationality]',
    COUNTRY_OF_ORIGIN: c.countryOfOrigin || '[Country of Origin]',
    COUNTRY_XXX: c.countryOfOrigin || 'CountryXXX',
    ADDRESS: c.currentAddress || '[Address]',
    PHONE: c.phone || '[Phone]',
    EMAIL: c.email || '[Email]',
    MARITAL_STATUS: c.maritalStatus || '[Marital Status]',
    NUM_CHILDREN: c.numberOfChildren || '0',
    INTERPRETER: c.interpreterNeeded ? c.interpreterName || '[Interpreter Name]' : 'Not required',
    EVAL_LOCATION: c.evaluationLocation === 'Other' ? c.otherLocation : c.evaluationLocation,
    EVAL_DATES: c.evaluationDates || '00-00-00 and 00-00-00',
    SUBJECT: pro.subject,
    OBJECT: pro.object,
    POSSESSIVE: pro.possessive,
    // Clinician
    CLINICIAN_NAME: cl.name || '[Clinician Name]',
    LICENSE_TYPE: cl.licenseType || '[License]',
    LICENSE_NUMBER: cl.licenseNumber || '[License #]',
    CLINICIAN_CREDENTIALS: `${cl.name}, ${cl.licenseType} #${cl.licenseNumber}`,
    OFFICE_ADDRESS: cl.officeAddress || '[Office Address]',
    CLINICIAN_PHONE: cl.phone || '[Phone]',
    CLINICIAN_EMAIL: cl.email || '[Email]',
    CLINICIAN_BIO: cl.bio || '[Clinician Bio]',
    // Case Summary
    CASE_SUMMARY: cs.summary || '[Case Summary]',
    KEY_QUOTE: cs.keyQuote ? `"${cs.keyQuote}"` : '',
    // Trauma
    TRAUMA_CATEGORY: t.traumaCategory || '[Trauma Category]',
    TRAUMA_DESCRIPTION: t.descriptionOfEvents || '[Trauma Description]',
    ABUSE_TYPE: t.abuseType || '[Abuse Type]',
    PERPETRATOR: t.perpetratorInfo || '[Perpetrator]',
    TRAUMA_DATES: t.datesOfTrauma || '[Dates]',
    PHYSICAL_VIOLENCE: t.physicalViolence ? 'Yes' : 'No',
    SEXUAL_VIOLENCE: t.sexualViolence ? 'Yes' : 'No',
    POLICE_INVOLVEMENT: t.policeInvolvement || 'None reported',
    DECISION_TO_LEAVE: t.decisionToLeave || '[Decision to Leave]',
    WHY_CANT_RETURN: t.whyCantReturn || '[Cannot Return Because]',
    TRAUMA_QUOTE: t.keyQuote ? `"${t.keyQuote}"` : '',
    // Symptoms
    DEPRESSION_SEVERITY: ps.depressionSeverity,
    ANXIETY_SEVERITY: ps.anxietySeverity,
    PTSD_SYMPTOMS: ps.ptsdSymptoms,
    SLEEP_PROBLEMS: ps.sleepProblems,
    SUICIDAL_IDEATION: ps.suicidalIdeation,
    // MSE
    APPEARANCE: mse.appearance,
    EYE_CONTACT: mse.eyeContact,
    SPEECH: mse.speech,
    MOOD: mse.mood,
    AFFECT: mse.affect,
    THOUGHT_PROCESS: mse.thoughtProcess,
    ORIENTATION: mse.orientation,
    MSE_NOTES: mse.additionalObservations,
    // Scores
    PHQ9_TOTAL: String(phq9.total),
    PHQ9_SEVERITY: phq9.severity,
    GAD7_TOTAL: String(gad7.total),
    GAD7_SEVERITY: gad7.severity,
    PCL5_TOTAL: String(pcl5.total),
    PCL5_SEVERITY: pcl5.severity,
    PCL5_PTSD: pcl5.likelyPTSD ? 'Yes – meets threshold' : 'Below threshold',
    // Findings
    DIAGNOSES: diagnosesList || '[Diagnoses]',
    CLINICAL_IMPRESSION: f.clinicalImpression || '[Clinical Impression]',
    CREDIBILITY: f.credibilityAssessment || '[Credibility Assessment]',
    RECOMMENDATIONS: f.recommendations || '[Recommendations]',
    RISK_ASSESSMENT: f.riskAssessment || '[Risk Assessment]',
    // Optional
    LGBTQ_SECTION: os.lgbtqAsylum.enabled ? os.lgbtqAsylum.personalExperiences : '',
    DELAYED_FILING: os.delayedFiling.enabled ? os.delayedFiling.explanation : '',
    PHYSICAL_SCARS: os.physicalScars.enabled ? os.physicalScars.scarDescription : '',
    MEDICAL_CONDITIONS: os.medicalConditions.enabled ? os.medicalConditions.conditions : '',
    // Date
    REPORT_DATE: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

// Build DOCX blob (core logic — reused by generateDOCX and cloud upload)
export async function generateDOCXBlob(evaluation: Evaluation): Promise<{ blob: Blob; filename: string }> {
  const { default: PizZip } = await import('pizzip');
  const { default: Docxtemplater } = await import('docxtemplater');
  const vars = buildTemplateVars(evaluation);
  const filename = `${evaluation.clientInfo.fullName || 'Evaluation'}_Psych_Eval_${new Date().toISOString().split('T')[0]}.docx`;

  const response = await fetch('/asylum-template.docx');
  if (!response.ok) {
    const content = buildReportText(evaluation, vars);
    return { blob: new Blob([content], { type: 'application/msword' }), filename: filename.replace('.docx', '.doc') };
  }

  const arrayBuffer = await response.arrayBuffer();
  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  doc.render(vars);
  const blob = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  return { blob, filename };
}

// Generate DOCX and save locally
export async function generateDOCX(evaluation: Evaluation): Promise<void> {
  const { blob, filename } = await generateDOCXBlob(evaluation);
  const { saveAs } = await import('file-saver');
  saveAs(blob, filename);
}

// Generate PDF blob for cloud upload
export function buildPDFHTML(evaluation: Evaluation): string {
  const vars = buildTemplateVars(evaluation);
  const content = buildReportText(evaluation, vars);
  return `<!DOCTYPE html><html><head>
    <title>${evaluation.clientInfo.fullName} - Psychological Evaluation</title>
    <style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;line-height:1.7;color:#1a1a1a;font-size:13px}pre{white-space:pre-wrap;font-family:inherit}@page{margin:1in}</style>
    </head><body><pre>${content}</pre></body></html>`;
}

// Fallback: generate from scratch without template
async function generateSimpleDOCX(evaluation: Evaluation, vars: Record<string, string>): Promise<void> {
  const { saveAs } = await import('file-saver');
  const content = buildReportText(evaluation, vars);
  const blob = new Blob([content], { type: 'application/msword' });
  const filename = `${evaluation.clientInfo.fullName || 'Evaluation'}_Psych_Eval_${new Date().toISOString().split('T')[0]}.doc`;
  saveAs(blob, filename);
}

// Build full report text
export function buildReportText(evaluation: Evaluation, vars: Record<string, string>): string {
  const { clientInfo: c, findings: f, phq9, gad7, pcl5 } = evaluation;
  return `
CLINICAL PSYCHOLOGICAL EVALUATION
${vars.CLINICIAN_NAME}, ${vars.LICENSE_TYPE} #${vars.LICENSE_NUMBER}
${vars.OFFICE_ADDRESS} | ${vars.CLINICIAN_PHONE} | ${vars.CLINICIAN_EMAIL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL EVALUATION

Name: ${vars.MS_XXX}
Date of Birth: ${vars.DOB} (${vars.AGE} years old)
Nationality: ${vars.NATIONALITY}
Clinician: ${vars.CLINICIAN_CREDENTIALS}
Interpreter: ${vars.INTERPRETER}
Dates of Evaluation: ${vars.EVAL_DATES}
Place of Evaluation: ${vars.EVAL_LOCATION}
Report Date: ${vars.REPORT_DATE}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CASE SUMMARY

${vars.CASE_SUMMARY}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVALUATION METHODS

For this clinical assessment, I met with ${vars.MS_XXX} for the purposes of evaluating ${vars.POSSESSIVE} psychological symptoms. 
Assessment tools included:
• The PTSD Checklist for DSM-5 (PCL-5) — Total: ${vars.PCL5_TOTAL}/80 — ${vars.PCL5_SEVERITY}
• The Patient Health Questionnaire-9 (PHQ-9) — Total: ${vars.PHQ9_TOTAL}/27 — ${vars.PHQ9_SEVERITY}
• The Generalized Anxiety Disorder-7 (GAD-7) — Total: ${vars.GAD7_TOTAL}/21 — ${vars.GAD7_SEVERITY}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRAUMA HISTORY

Category: ${vars.TRAUMA_CATEGORY}
${vars.TRAUMA_DESCRIPTION}

Decision to Leave: ${vars.DECISION_TO_LEAVE}

Why ${vars.MS_XXX} Cannot Return: ${vars.WHY_CANT_RETURN}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PSYCHOLOGICAL FUNCTIONING — MENTAL STATUS EXAM

${vars.MSE_NOTES}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASSESSMENT RESULTS

PHQ-9 Depression: ${vars.PHQ9_TOTAL}/27 — ${vars.PHQ9_SEVERITY}
GAD-7 Anxiety: ${vars.GAD7_TOTAL}/21 — ${vars.GAD7_SEVERITY}
PCL-5 PTSD: ${vars.PCL5_TOTAL}/80 — ${vars.PCL5_SEVERITY}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL IMPRESSION & DIAGNOSES

${vars.CLINICAL_IMPRESSION}

Diagnoses:
${vars.DIAGNOSES}

Credibility Assessment:
${vars.CREDIBILITY}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

${vars.RECOMMENDATIONS}

Risk Assessment: ${vars.RISK_ASSESSMENT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Respectfully submitted,

${vars.CLINICIAN_NAME}, ${vars.LICENSE_TYPE}
${vars.REPORT_DATE}
`;
}

// Generate PDF via print
export function generatePDF(evaluation: Evaluation): void {
  const vars = buildTemplateVars(evaluation);
  const content = buildReportText(evaluation, vars);
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(`
    <!DOCTYPE html><html><head>
    <title>${evaluation.clientInfo.fullName} - Psychological Evaluation</title>
    <style>
      body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; line-height: 1.7; color: #1a1a1a; font-size: 13px; }
      pre { white-space: pre-wrap; font-family: inherit; }
      @page { margin: 1in; }
      @media print { body { margin: 0; } }
    </style></head><body>
    <pre>${content}</pre>
    <script>window.onload = () => { window.print(); window.close(); }</script>
    </body></html>
  `);
  printWindow.document.close();
}
