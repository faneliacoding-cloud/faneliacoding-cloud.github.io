'use client';
/**
 * Document Generation Engine
 * Handles DOCX template population and PDF export
 * Production-hardened with photo embedding, validation, and cross-browser compatibility
 */
import type { Evaluation } from './store';
import { getAllImagesForExport } from './imageStore';

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
    GENDER: c.gender || '[Gender]',
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
    FUNCTIONAL_IMPAIRMENT: f.functionalImpairment || '[Functional Impairment]',
    PROGNOSIS: f.prognosis || '[Prognosis]',
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
  const vars = buildTemplateVars(evaluation);
  const clientName = evaluation.clientInfo.fullName || 'Evaluation';
  const filename = `${clientName}_Psych_Eval_${new Date().toISOString().split('T')[0]}.docx`;

  // Try template-based approach first
  try {
    const { default: PizZip } = await import('pizzip');
    const { default: Docxtemplater } = await import('docxtemplater');

    // Try multiple paths for the template
    let response = await fetch('/immigration-eval-app/asylum-template.docx');
    if (!response.ok) response = await fetch('/asylum-template.docx');

    if (response.ok) {
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
  } catch (e) {
    console.warn('[DOCX] Template approach failed, using HTML fallback:', e);
  }

  // Fallback: Generate a proper HTML-based Word document
  const content = buildReportText(evaluation, vars);
  const htmlDoc = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${clientName} - Psychological Evaluation</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  body { font-family: 'Times New Roman', Georgia, serif; font-size: 12pt; line-height: 1.6; color: #1a1a1a; margin: 1in; }
  pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: 12pt; margin: 0; }
  @page { size: letter; margin: 1in; }
  @page Section1 { mso-header-margin: .5in; mso-footer-margin: .5in; }
  div.Section1 { page: Section1; }
</style>
</head>
<body>
<div class="Section1">
<pre>${content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</div>
</body>
</html>`;

  const blob = new Blob([htmlDoc], { type: 'application/msword' });
  return { blob, filename: filename.replace('.docx', '.doc') };
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
    <style>
      body{font-family:Georgia,serif;max-width:800px;margin:40px auto;line-height:1.7;color:#1a1a1a;font-size:13px}
      pre{white-space:pre-wrap;font-family:inherit}
      @page{margin:1in;@bottom-center{content:"Page " counter(page) " of " counter(pages);font-size:9px;color:#999}}
      @media print{body{margin:0}}
      .page-break{page-break-before:always}
    </style>
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
  const { clientInfo: c, findings: f, phq9, gad7, pcl5, optionalSections: os } = evaluation;

  let optionalContent = '';

  if (os.lgbtqAsylum.enabled && os.lgbtqAsylum.personalExperiences) {
    optionalContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LGBTQ+ ASYLUM CONSIDERATIONS

${os.lgbtqAsylum.personalExperiences}
`;
  }
  if (os.delayedFiling.enabled && os.delayedFiling.explanation) {
    optionalContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELAYED FILING EXPLANATION

${os.delayedFiling.explanation}
${os.delayedFiling.psychologicalBarriers ? `\nPsychological Barriers: ${os.delayedFiling.psychologicalBarriers}` : ''}
`;
  }
  if (os.physicalScars.enabled && os.physicalScars.scarDescription) {
    optionalContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHYSICAL SCARS/MARKS DOCUMENTATION

${os.physicalScars.scarDescription}
${os.physicalScars.location ? `Location: ${os.physicalScars.location}` : ''}
${os.physicalScars.consistentWithAccount ? 'Finding: Consistent with client\'s account of events.' : ''}
`;
  }
  if (os.medicalConditions.enabled && os.medicalConditions.conditions) {
    optionalContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEDICAL CONDITIONS

${os.medicalConditions.conditions}
${os.medicalConditions.medications ? `Medications: ${os.medicalConditions.medications}` : ''}
${os.medicalConditions.traumaRelated ? 'These conditions are related to the traumatic events described.' : ''}
`;
  }

  return `
CLINICAL PSYCHOLOGICAL EVALUATION
${vars.CLINICIAN_NAME}, ${vars.LICENSE_TYPE} #${vars.LICENSE_NUMBER}
${vars.OFFICE_ADDRESS} | ${vars.CLINICIAN_PHONE} | ${vars.CLINICIAN_EMAIL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL EVALUATION

Name: ${vars.MS_XXX}
Date of Birth: ${vars.DOB} (${vars.AGE} years old)
Gender: ${vars.GENDER}
Nationality: ${vars.NATIONALITY}
Country of Origin: ${vars.COUNTRY_OF_ORIGIN}
Marital Status: ${vars.MARITAL_STATUS}
Clinician: ${vars.CLINICIAN_CREDENTIALS}
Interpreter: ${vars.INTERPRETER}
Dates of Evaluation: ${vars.EVAL_DATES}
Place of Evaluation: ${vars.EVAL_LOCATION}
Report Date: ${vars.REPORT_DATE}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CASE SUMMARY

${vars.CASE_SUMMARY}
${vars.KEY_QUOTE ? `\n${vars.KEY_QUOTE}` : ''}

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
Type of Abuse/Persecution: ${vars.ABUSE_TYPE}

${vars.TRAUMA_DESCRIPTION}

Perpetrator: ${vars.PERPETRATOR}
Date(s) of Trauma: ${vars.TRAUMA_DATES}
Physical Violence: ${vars.PHYSICAL_VIOLENCE}
Sexual Violence: ${vars.SEXUAL_VIOLENCE}
Police Involvement: ${vars.POLICE_INVOLVEMENT}
${vars.TRAUMA_QUOTE ? `\nDirect Quote: ${vars.TRAUMA_QUOTE}` : ''}

Decision to Leave: ${vars.DECISION_TO_LEAVE}

Why ${vars.MS_XXX} Cannot Return: ${vars.WHY_CANT_RETURN}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PSYCHOLOGICAL FUNCTIONING — MENTAL STATUS EXAM

Appearance: ${vars.APPEARANCE || 'Not assessed'}
Eye Contact: ${vars.EYE_CONTACT || 'Not assessed'}
Speech: ${vars.SPEECH || 'Not assessed'}
Mood: ${vars.MOOD || 'Not assessed'}
Affect: ${vars.AFFECT || 'Not assessed'}
Thought Process: ${vars.THOUGHT_PROCESS || 'Not assessed'}
Orientation: ${vars.ORIENTATION || 'Not assessed'}
${vars.MSE_NOTES ? `\nAdditional Observations: ${vars.MSE_NOTES}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASSESSMENT RESULTS

PHQ-9 Depression: ${vars.PHQ9_TOTAL}/27 — ${vars.PHQ9_SEVERITY}
GAD-7 Anxiety: ${vars.GAD7_TOTAL}/21 — ${vars.GAD7_SEVERITY}
PCL-5 PTSD: ${vars.PCL5_TOTAL}/80 — ${vars.PCL5_SEVERITY}
PTSD Threshold: ${vars.PCL5_PTSD}
${optionalContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLINICAL IMPRESSION & DIAGNOSES

${vars.CLINICAL_IMPRESSION}

Diagnoses:
${vars.DIAGNOSES}

Credibility Assessment:
${vars.CREDIBILITY}

Functional Impairment:
${vars.FUNCTIONAL_IMPAIRMENT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

${vars.RECOMMENDATIONS}

Risk Assessment: ${vars.RISK_ASSESSMENT}

Prognosis: ${vars.PROGNOSIS}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Respectfully submitted,

${vars.CLINICIAN_NAME}, ${vars.LICENSE_TYPE}
${vars.REPORT_DATE}
`;
}

// Generate PDF via print — improved for cross-browser compatibility
export async function generatePDF(evaluation: Evaluation): Promise<void> {
  const vars = buildTemplateVars(evaluation);
  const content = buildReportText(evaluation, vars);

  // Try to load photos
  let photoHTML = '';
  try {
    const photos = await getAllImagesForExport(evaluation.id);
    if (photos.length > 0) {
      photoHTML = `
        <div class="page-break"></div>
        <h2 style="font-size:16px;margin-bottom:16px;border-bottom:2px solid #333;padding-bottom:8px;">SUPPORTING IMAGES & DOCUMENTATION</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          ${photos.filter(p => p.metadata.mimeType !== 'application/pdf').map(p => `
            <div style="text-align:center;">
              <img src="${p.dataUrl}" style="max-width:100%;max-height:300px;border:1px solid #ddd;border-radius:4px;" />
              <div style="font-size:10px;color:#666;margin-top:4px;">${p.metadata.filename}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  } catch {
    // Silently skip photos if storage unavailable
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to generate PDF. Go to Settings → Pop-ups and redirects → Allow for this site.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html><html><head>
    <title>${evaluation.clientInfo.fullName || 'Evaluation'} - Psychological Evaluation</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 40px auto; line-height: 1.7; color: #1a1a1a; font-size: 13px; }
      pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; margin: 0; }
      .page-break { page-break-before: always; }
      @page { margin: 0.9in; size: letter; }
      @media print {
        body { margin: 0; max-width: none; }
        .no-print { display: none !important; }
      }
      img { max-width: 100%; height: auto; }
    </style></head><body>
    <pre>${content}</pre>
    ${photoHTML}
    <script>
      window.onload = function() {
        setTimeout(function() { window.print(); }, 300);
        window.onafterprint = function() { window.close(); };
        // Fallback close for Safari
        setTimeout(function() { window.close(); }, 60000);
      };
    </script>
    </body></html>
  `);
  printWindow.document.close();
}
