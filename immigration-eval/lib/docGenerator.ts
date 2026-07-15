// @ts-nocheck
'use client';
/**
 * Document Generation Engine — V2
 * Generates clinical psychological evaluation reports matching the Asylum Template.docx structure.
 * Maps the V2 Zustand store data model (evaluation.client, evaluation.sections.*) into
 * a professional clinical report with proper formatting, score breakdowns, and addenda.
 */
import type { Evaluation, Client, EvalStep01, EvalStep03, EvalStep04, EvalStep05, EvalStep06, EvalStep07, EvalStep08, EvalStep10 } from './types';
import { DIAGNOSIS_LABELS, CASE_TYPE_CONFIG } from './types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function esc(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function orPlaceholder(val: string | undefined | null, placeholder: string): string {
  return val?.trim() || placeholder;
}

/** Pronoun mapping */
function getPronouns(pronouns: string) {
  const map: Record<string, { subject: string; object: string; possessive: string; reflexive: string; title: string }> = {
    'She/Her': { subject: 'she', object: 'her', possessive: 'her', reflexive: 'herself', title: 'Ms.' },
    'He/Him': { subject: 'he', object: 'him', possessive: 'his', reflexive: 'himself', title: 'Mr.' },
    'They/Them': { subject: 'they', object: 'them', possessive: 'their', reflexive: 'themselves', title: 'Mx.' },
    'Other': { subject: 'they', object: 'them', possessive: 'their', reflexive: 'themselves', title: '' },
  };
  return map[pronouns] || map['She/Her'];
}

/** Build "Ms. LastName" or "Mr. LastName" */
function clientTitle(client: Client): string {
  const pro = getPronouns(client.pronouns);
  const lastName = client.fullName?.split(' ').pop() || 'XXX';
  return pro.title ? `${pro.title} ${lastName}` : lastName;
}

// ── PHQ-9 Items ──────────────────────────────────────────────────────────────

const PHQ9_ITEMS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself, that you are a failure or have let yourself or family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed',
  'Thoughts that you would be better off dead or hurting yourself in some way',
];

const PHQ9_LABELS = ['not at all', 'several days', 'more than half the days', 'nearly every day'];
const PHQ9_SEVERITY_RANGES = [
  { max: 4, label: 'none-minimal' },
  { max: 9, label: 'mild' },
  { max: 14, label: 'moderate' },
  { max: 19, label: 'moderately severe' },
  { max: 27, label: 'severe' },
];

// ── GAD-7 Items ──────────────────────────────────────────────────────────────

const GAD7_ITEMS = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
];

const GAD7_LABELS = ['not at all', 'several days', 'more than half the days', 'nearly every day'];
const GAD7_SEVERITY_RANGES = [
  { max: 4, label: 'none-minimal' },
  { max: 9, label: 'mild' },
  { max: 14, label: 'moderate' },
  { max: 21, label: 'severe' },
];

// ── PCL-5 Items ──────────────────────────────────────────────────────────────

const PCL5_ITEMS = [
  'Repeated, disturbing, and unwanted memories of the stressful experience',
  'Repeated, disturbing dreams of the stressful experience',
  'Suddenly feeling or acting as if the stressful experience were actually happening again',
  'Feeling very upset when reminded of the stressful experience',
  'Having strong physical reactions when reminded of the stressful experience',
  'Avoiding memories, thoughts, or feelings related to the stressful experience',
  'Avoiding external reminders of the stressful experience',
  'Trouble remembering important parts of the stressful experience',
  'Having strong negative beliefs about yourself, other people, or the world',
  'Blaming yourself for the stressful experience or what happened after it',
  'Having strong negative feelings such as fear, horror, anger, guilt, or shame',
  'Loss of interest in activities that were once enjoyable',
  'Feeling distant or cut off from other people',
  'Trouble experiencing positive feelings',
  'Irritable behavior, angry outbursts, or acting aggressively',
  'Taking too many risks or doing things that could cause you harm',
  'Being "superalert" or watchful or on guard',
  'Feeling jumpy or easily startled',
  'Having difficulty concentrating',
  'Trouble falling or staying asleep',
];

const PCL5_LABELS = ['not at all', 'a little bit', 'moderately', 'quite a bit', 'extremely'];

// ── Score Helpers ─────────────────────────────────────────────────────────────

function sumScores(scores: number[]): number {
  return scores.filter(s => s >= 0).reduce((a, b) => a + b, 0);
}

function getSeverity(total: number, ranges: { max: number; label: string }[]): string {
  for (const r of ranges) {
    if (total <= r.max) return r.label;
  }
  return ranges[ranges.length - 1].label;
}

function buildScoreBreakdown(scores: number[], items: string[], labels: string[], title: string, maxPerItem: number): string {
  const groups = new Map<number, string[]>();
  scores.forEach((score, idx) => {
    if (score < 0) return; // unanswered
    const list = groups.get(score) || [];
    list.push(`${idx + 1}) ${items[idx]}`);
    groups.set(score, list);
  });

  let text = '';
  // From highest severity to lowest
  for (let level = maxPerItem; level >= 0; level--) {
    const itemsAtLevel = groups.get(level);
    if (!itemsAtLevel || itemsAtLevel.length === 0) continue;
    const label = labels[level] || `level ${level}`;
    if (level === maxPerItem) {
      text += `${title} scaled the following ${itemsAtLevel.length} out of ${items.length} symptoms at the most severe level, indicating that they bother ${title.split(' ').pop()?.toLowerCase() === 'xxx' ? 'them' : title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'him' : 'them'} "${label}" in ${title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'his' : 'their'} day-to-day functioning:\n`;
    } else if (level === maxPerItem - 1) {
      text += `\n${title.includes('Ms.') ? 'She' : title.includes('Mr.') ? 'He' : 'They'} scaled the following ${itemsAtLevel.length} out of ${items.length} symptoms at the next most severe level, indicating that they bother ${title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'him' : 'them'} "${label}" in ${title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'his' : 'their'} day-to-day functioning:\n`;
    } else if (level > 0) {
      text += `\n${title.includes('Ms.') ? 'She' : title.includes('Mr.') ? 'He' : 'They'} scaled the following ${itemsAtLevel.length} out of ${items.length} symptoms at ${level === maxPerItem - 2 ? 'the third most severe' : 'a lower'} level, indicating that they bother ${title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'him' : 'them'} "${label}" in ${title.includes('Ms.') ? 'her' : title.includes('Mr.') ? 'his' : 'their'} day-to-day functioning:\n`;
    } else {
      text += `\nThe following ${itemsAtLevel.length} symptoms ${title.includes('Ms.') ? 'she' : title.includes('Mr.') ? 'he' : 'they'} experience${title.includes('They') ? '' : 's'} "${label}":\n`;
    }
    itemsAtLevel.forEach(item => { text += `${item} `; });
    text += '\n';
  }
  return text;
}

// ── Main Report Builder ──────────────────────────────────────────────────────

export function buildReportText(evaluation: Evaluation): string {
  const c = evaluation.client;
  const s01 = evaluation.sections?.step01 || {} as EvalStep01;
  const s02 = evaluation.sections?.step02 || {};
  const s03 = evaluation.sections?.step03 || {} as EvalStep03;
  const s04 = evaluation.sections?.step04 || {} as EvalStep04;
  const s05 = evaluation.sections?.step05 || {} as EvalStep05;
  const s06 = evaluation.sections?.step06 || {} as EvalStep06;
  const s07 = evaluation.sections?.step07 || {} as EvalStep07;
  const s08 = evaluation.sections?.step08 || {} as EvalStep08;
  const s10 = evaluation.sections?.step10 || {} as EvalStep10;

  const pro = getPronouns(c.pronouns);
  const name = clientTitle(c);
  const fullName = c.fullName || '[Client Name]';
  const Sub = pro.subject.charAt(0).toUpperCase() + pro.subject.slice(1);
  const sub = pro.subject;
  const obj = pro.object;
  const pos = pro.possessive;
  const Pos = pro.possessive.charAt(0).toUpperCase() + pro.possessive.slice(1);
  const refl = pro.reflexive;
  const country = c.countryOfOrigin || 'CountryXXX';
  const caseLabel = CASE_TYPE_CONFIG[evaluation.caseType]?.label || evaluation.caseType;
  const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Scores
  const phq9Scores = s06.phq9Scores || Array(9).fill(-1);
  const gad7Scores = s06.gad7Scores || Array(7).fill(-1);
  const pcl5Scores = s06.pcl5Scores || Array(20).fill(-1);
  const phq9Total = sumScores(phq9Scores);
  const gad7Total = sumScores(gad7Scores);
  const pcl5Total = sumScores(pcl5Scores);
  const phq9Severity = getSeverity(phq9Total, PHQ9_SEVERITY_RANGES);
  const gad7Severity = getSeverity(gad7Total, GAD7_SEVERITY_RANGES);
  const pcl5Severity = pcl5Total >= 33 ? 'meets threshold for PTSD' : 'below threshold';

  // Diagnoses
  const diagCodes = s08.diagnoses || [];
  const diagText = diagCodes.length > 0
    ? diagCodes.map(code => `${code}  ${DIAGNOSIS_LABELS[code] || code}`).join('\n')
    : '[No diagnoses selected]';

  // ── Build sections ──────────────────────────────────────────────────────

  let report = '';

  // ══ HEADER ══
  report += `CLINICAL PSYCHOLOGICAL EVALUATION
${orPlaceholder(s01.clinicianName, '[Clinician Name]')}, ${orPlaceholder(s01.clinicianCredentials, '[Credentials]')}
${orPlaceholder(s01.clinicianLicense, '[License]')}


RE: ${fullName}
Date of Birth: ${orPlaceholder(c.dateOfBirth, '[DOB]')} (${orPlaceholder(c.age, '[Age]')} years old)
Gender: ${orPlaceholder(c.gender, '[Gender]')}
Nationality: ${orPlaceholder(c.nationality, '[Nationality]')}
Country of Origin: ${country}
Marital Status: ${orPlaceholder(c.maritalStatus, '[Marital Status]')}
Number of Children: ${orPlaceholder(c.numberOfChildren, '0')}
A-Number: ${orPlaceholder(c.aNumber, '[A-Number]')}
Referring Attorney: ${orPlaceholder(c.referringAttorney, '[Attorney]')}
Referral Source: ${orPlaceholder(s01.referralSource, '[Referral Source]')}
Dates of Evaluation: ${orPlaceholder(s01.evaluationDates, '[Evaluation Dates]')}
Location of Evaluation: ${orPlaceholder(s01.evaluationLocation, '[Location]')}
Interpreter: ${s01.interpreterUsed ? `Yes — ${orPlaceholder(s01.interpreterLanguage, '[Language]')}` : 'Not required'}
Date of Report: ${reportDate}


`;

  // ══ EVALUATOR QUALIFICATIONS ══
  if (s01.clinicianBio) {
    report += `EVALUATOR QUALIFICATIONS

${s01.clinicianBio}

`;
  }

  // ══ REFERRAL AND PURPOSE ══
  report += `REFERRAL AND PURPOSE OF EVALUATION

${name} is a ${orPlaceholder(c.age, '[age]')}-year-old ${orPlaceholder(c.nationality, '[nationality]')} ${c.gender?.toLowerCase() || 'individual'} who was referred for a clinical psychological evaluation by ${orPlaceholder(c.referringAttorney, pos + ' attorney')} in connection with ${pos} ${caseLabel} case. The purpose of this evaluation is to assess ${name}'s current psychological functioning, document ${pos} trauma history, and provide a clinical opinion regarding the psychological impact of the events ${sub} experienced.

I met with ${name} on ${orPlaceholder(s01.evaluationDates, '[dates]')}${s01.evaluationLocation ? ` at ${s01.evaluationLocation}` : ''}.${s01.interpreterUsed ? ` The interview was conducted with the assistance of a ${orPlaceholder(s01.interpreterLanguage, '[language]')} interpreter.` : ''} During this evaluation, I conducted a thorough clinical interview and administered the following standardized assessment instruments:

• PTSD Checklist for DSM-5 (PCL-5)
• Patient Health Questionnaire-9 (PHQ-9)
• Generalized Anxiety Disorder-7 (GAD-7)

Please note that I am not ${name}'s therapist, and I only met with ${obj} for this clinical evaluation. I met with ${obj} as an impartial, objective assessor, and I have no vested interest in the outcome of ${pos} legal proceedings.


`;

  // ══ HISTORY — EARLY LIFE ══
  report += `HISTORY

Early Life

`;
  if (s03.personalHistory) report += `${s03.personalHistory}\n\n`;
  if (s03.familyBackground) report += `${s03.familyBackground}\n\n`;
  if (s03.educationHistory) report += `${s03.educationHistory}\n\n`;
  if (s03.employmentHistory) report += `${s03.employmentHistory}\n\n`;
  if (s03.relationshipHistory) report += `${s03.relationshipHistory}\n\n`;
  if (s03.childrenInfo) report += `${s03.childrenInfo}\n\n`;

  // ══ IMMIGRATION HISTORY ══
  if (s04.immigrationHistory || s04.dateOfArrival || s04.mannerOfEntry || s04.reasonForFleeing) {
    report += `Immigration History

`;
    if (s04.immigrationHistory) report += `${s04.immigrationHistory}\n\n`;
    if (s04.dateOfArrival) report += `Date of Arrival: ${s04.dateOfArrival}\n`;
    if (s04.mannerOfEntry) report += `Manner of Entry: ${s04.mannerOfEntry}\n`;
    if (s04.currentStatus) report += `Current Immigration Status: ${s04.currentStatus}\n`;
    if (s04.previousApplications) report += `Previous Applications: ${s04.previousApplications}\n`;
    report += '\n';
    if (s04.reasonForFleeing) report += `Reason for Fleeing: ${s04.reasonForFleeing}\n\n`;
  }

  // ══ TRAUMA / STRESSOR HISTORY ══
  report += `TRAUMA EXPERIENCED

`;
  if (s05.traumaCategory) report += `Trauma Category: ${s05.traumaCategory}\n\n`;
  if (s05.traumaNarrative) report += `During the interviews, ${name} shared the following:\n\n${s05.traumaNarrative}\n\n`;
  if (s05.perpetratorInfo) report += `Perpetrator Information: ${s05.perpetratorInfo}\n\n`;
  if (s05.frequencyDuration) report += `Frequency/Duration: ${s05.frequencyDuration}\n\n`;

  if (s05.reportedToAuthorities !== undefined) {
    report += `Reported to Authorities: ${s05.reportedToAuthorities ? 'Yes' : 'No'}\n`;
    if (s05.authoritiesResponse) report += `Authorities Response: ${s05.authoritiesResponse}\n`;
    report += '\n';
  }

  // ══ FEARS ABOUT RETURNING ══
  if (s05.whyCantReturn || s05.ongoingThreats) {
    report += `Fears About Returning to ${country}

`;
    if (s05.whyCantReturn) report += `${s05.whyCantReturn}\n\n`;
    if (s05.ongoingThreats) report += `Ongoing Threats: ${s05.ongoingThreats}\n\n`;
  }

  // ══ PSYCHOLOGICAL FUNCTIONING — MSE ══
  report += `PSYCHOLOGICAL FUNCTIONING

Mental Status Exam

`;
  // Build MSE as narrative paragraph like the template
  const mseNarrative: string[] = [];
  if (s07.appearance) mseNarrative.push(s07.appearance);
  if (s07.behavior) mseNarrative.push(s07.behavior);
  if (s07.speech) mseNarrative.push(`${Pos} speech was ${s07.speech.toLowerCase()}.`);
  if (s07.mood) mseNarrative.push(`${Pos} mood appeared ${s07.mood.toLowerCase()}.`);
  if (s07.affect) mseNarrative.push(`${Pos} affect was ${s07.affect.toLowerCase()}.`);
  if (s07.thoughtProcess) mseNarrative.push(`Thought process: ${s07.thoughtProcess}.`);
  if (s07.thoughtContent) mseNarrative.push(`Thought content: ${s07.thoughtContent}.`);
  if (s07.perceptions) mseNarrative.push(`Perceptions: ${s07.perceptions}.`);
  if (s07.cognition) mseNarrative.push(`Cognition: ${s07.cognition}.`);
  if (s07.insight) mseNarrative.push(`Insight: ${s07.insight}.`);
  if (s07.judgment) mseNarrative.push(`Judgment: ${s07.judgment}.`);
  if (s07.rapport) mseNarrative.push(`Rapport: ${s07.rapport}.`);

  if (mseNarrative.length > 0) {
    report += mseNarrative.join(' ') + '\n\n';
  } else {
    report += `${name} is a ${orPlaceholder(c.age, '[age]')}-year-old self-identified ${c.gender?.toLowerCase() || 'individual'} who arrived at the appointment on time and was neatly groomed. ${Sub} was oriented to person, place, time, and situation. There was no evidence of impaired thought process, and ${sub} did not appear to respond to internal stimuli or exhibit other symptoms indicative of psychosis.\n\n`;
  }

  // ══ CURRENT PSYCHOLOGICAL SYMPTOMS ══
  report += `Current Psychological Symptoms

`;
  if (s06.currentSymptoms) report += `${s06.currentSymptoms}\n\n`;
  if (s06.sleepDisturbances) report += `Sleep: ${s06.sleepDisturbances}\n\n`;
  if (s06.appetiteChanges) report += `Appetite: ${s06.appetiteChanges}\n\n`;
  if (s06.concentrationDifficulties) report += `Concentration: ${s06.concentrationDifficulties}\n\n`;
  if (s06.emotionalRegulation) report += `Emotional Regulation: ${s06.emotionalRegulation}\n\n`;
  if (s06.avoidanceBehaviors) report += `Avoidance: ${s06.avoidanceBehaviors}\n\n`;
  if (s06.hypervigilance) report += `Hypervigilance: ${s06.hypervigilance}\n\n`;
  if (s06.flashbacksNightmares) report += `Flashbacks/Nightmares: ${s06.flashbacksNightmares}\n\n`;
  if (s06.suicidalIdeation) report += `Suicidal Ideation: ${s06.suicidalIdeation}\n\n`;
  if (s06.selfHarm) report += `Self-Harm: ${s06.selfHarm}\n\n`;
  if (s06.substanceUse) report += `Substance Use: ${s06.substanceUse}\n\n`;
  if (s06.functionalImpairment) report += `Functional Impairment: ${s06.functionalImpairment}\n\n`;

  // ══ DIAGNOSTIC FINDINGS ══
  report += `Diagnostic Findings

${name}'s symptoms meet criteria for the following DSM-5 psychological disorders:

${diagText}

`;
  if (s08.diagnosticRationale) report += `Diagnostic Rationale: ${s08.diagnosticRationale}\n\n`;
  if (s08.differentialDiagnosis) report += `Differential Diagnosis: ${s08.differentialDiagnosis}\n\n`;
  if (s08.ruleOutConditions) report += `Rule-Out Conditions: ${s08.ruleOutConditions}\n\n`;
  if (s08.severityLevel && s08.severityLevel !== 'none') report += `Severity: ${s08.severityLevel}\n\n`;
  if (s08.prognosticFactors) report += `Prognostic Factors: ${s08.prognosticFactors}\n\n`;

  // ══ CREDIBILITY ASSESSMENT ══
  if (s07.credibilityAssessment) {
    report += `CREDIBILITY OF ${name.toUpperCase()}'S ACCOUNT

${s07.credibilityAssessment}

`;
  }

  // ══ FINDINGS ══
  report += `FINDINGS

After thorough assessment including clinical interview${phq9Total > 0 || gad7Total > 0 || pcl5Total > 0 ? ' and review of three self-assessment scales' : ''}, I have concluded the following:

${name} is a reliable reporter, and ${pos} account is highly credible.

${Pos} current psychological symptoms include ${s06.currentSymptoms ? s06.currentSymptoms.substring(0, 200) + (s06.currentSymptoms.length > 200 ? '...' : '') : '[symptoms summary]'}. ${Sub} ${diagCodes.length > 0 ? 'fully meets' : 'may meet'} criteria for the following psychological disorder(s):

${diagText}

`;
  if (s10.clinicalImpression) report += `${s10.clinicalImpression}\n\n`;
  report += `${name}'s psychological distress has resulted primarily from the trauma ${sub} suffered and ${pos} fear of returning to ${country}.

Due to ${name}'s traumatic experiences, ${pos} psychological functioning has been compromised. If faced with significant stressors, ${sub} is at high risk of worsening symptoms which could necessitate a higher level of care.

`;

  // ══ RECOMMENDATIONS ══
  report += `RECOMMENDATIONS

To improve symptoms and functioning, I recommend that:

${name} be allowed to remain in the United States to reduce ${pos} fear of persecution and improve ${pos} psychological functioning and well-being.

`;
  if (s10.treatmentRecommendations) report += `${s10.treatmentRecommendations}\n\n`;
  if (s10.recommendations) report += `${s10.recommendations}\n\n`;
  if (s10.returnRisk) report += `Return Risk: ${s10.returnRisk}\n\n`;
  if (s10.finalStatement) {
    report += `${s10.finalStatement}\n\n`;
  } else {
    report += `${name}'s personal strengths and resiliency are substantial. If allowed to remain in the safety of the United States, it is likely that ${pos} symptoms and functioning will significantly improve, allowing ${obj} to continue making contributions to ${pos} family and community.\n\n`;
  }

  if (s10.riskAssessment) report += `Risk Assessment: ${s10.riskAssessment}\n\n`;
  if (s10.prognosticStatement) report += `Prognosis: ${s10.prognosticStatement}\n\n`;

  // ══ SIGNATURE ══
  report += `________________________________________________________

${orPlaceholder(s01.clinicianName, '[NAME]')}, ${orPlaceholder(s01.clinicianCredentials, '[LICENSE]')}
${reportDate}
${orPlaceholder(s01.clinicianLicense, '[License State and Number]')}


`;

  // ══ ADDENDUM 1: SELF-ASSESSMENT SCALES ══
  const hasScores = phq9Scores.some(s => s >= 0) || gad7Scores.some(s => s >= 0) || pcl5Scores.some(s => s >= 0);

  if (hasScores) {
    report += `ADDENDUM 1: SELF-ASSESSMENT SCALES

`;

    // PCL-5
    if (pcl5Scores.some(s => s >= 0)) {
      report += `1) PTSD Checklist for DSM-5 (PCL-5)

The first scale completed by ${name} was the PCL-5, which was developed by the National Center for PTSD to assess individuals who experience traumatic events. Here, the respondent rates the severity of 20 different trauma-related symptoms. ${name} was asked to scale to what degree each symptom disturbed or impaired ${obj} over the past month. Symptoms are rated from 0 to 4, with 0 indicating "not at all," 1 indicating "a little bit," 2 indicating "moderately," 3 indicating "quite a bit," and 4 indicating "extremely."

${buildScoreBreakdown(pcl5Scores, PCL5_ITEMS, PCL5_LABELS, name, 4)}
Scoring: To interpret the results, a total symptom severity score (range 0–80) can be obtained by adding the scores for each of the 20 items. A score of 33 or higher indicates that the individual may suffer from a trauma or stress-related disorder such as PTSD. ${name} scored ${pcl5Total} out of 80${pcl5Total >= 33 ? ', which meets the threshold for a probable PTSD diagnosis' : ''}.

`;
    }

    // PHQ-9
    if (phq9Scores.some(s => s >= 0)) {
      report += `2) Patient Health Questionnaire-9 (PHQ-9)

The second scale completed was the PHQ-9, which assesses depression. On this assessment, the individual rates the frequency of symptoms experienced over the past two weeks. Symptoms are rated from 0 to 3, with 0 indicating "not at all," 1 indicating "several days," 2 indicating "more than half the days," and 3 indicating "nearly every day."

${buildScoreBreakdown(phq9Scores, PHQ9_ITEMS, PHQ9_LABELS, name, 3)}
Scoring: 0–4 (none-minimal); 5–9 (mild); 10–14 (moderate); 15–19 (moderately severe); 20–27 (severe). ${name}'s score of ${phq9Total} out of 27 indicates that ${sub} is suffering from ${phq9Severity} depression.

`;
    }

    // GAD-7
    if (gad7Scores.some(s => s >= 0)) {
      report += `3) Generalized Anxiety Disorder-7 Item Scale (GAD-7)

The third scale completed was the GAD-7. On this assessment, the individual is asked to rate the frequency of symptoms experienced over the past two weeks. Symptoms are rated from 0 to 3, with 0 indicating "not at all," 1 indicating "several days," 2 indicating "more than half the days," and 3 indicating "nearly every day."

${buildScoreBreakdown(gad7Scores, GAD7_ITEMS, GAD7_LABELS, name, 3)}
Scoring: 0–4 (none-minimal); 5–9 (mild); 10–14 (moderate); 15–21 (severe). ${name}'s score of ${gad7Total} out of 21 indicates that ${sub} is suffering from ${gad7Severity} anxiety.

`;
    }
  }

  // ══ ADDENDUM 2: IMPACT OF TRAUMA ON MEMORY ══
  report += `ADDENDUM ${hasScores ? '2' : '1'}: IMPACT OF TRAUMA ON MEMORY

Due to the impact of trauma on memory and thinking, it is common for trauma victims to have trouble remembering specific details and chronology of past traumatic events. This is known as the "faulty nature of traumatic recall." It should be noted that these difficulties with thinking and memory generally worsen when the individual is in psychological distress, such as when testifying in court or being questioned by an authority figure. In this kind of high-pressure situation, it is quite common for trauma victims to seem confused or make mistakes about the details and chronology of past events. By no means does this necessarily indicate that a client is malingering. Paradoxically, this confusion could actually point to the authenticity of their accounts of past trauma.
`;

  return report;
}

// ── DOCX Generation ──────────────────────────────────────────────────────────

export async function generateDOCXBlob(evaluation: Evaluation): Promise<{ blob: Blob; filename: string }> {
  const content = buildReportText(evaluation);
  const clientName = evaluation.client?.fullName || 'Evaluation';
  const safeClientName = clientName.replace(/[^a-zA-Z0-9_\s-]/g, '_');
  const filename = `${safeClientName}_Psych_Eval_${new Date().toISOString().split('T')[0]}.docx`;

  // Generate a proper HTML-based Word document with professional styling
  const htmlDoc = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${esc(clientName)} - Clinical Psychological Evaluation</title>
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
  body {
    font-family: 'Times New Roman', Georgia, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #1a1a1a;
    margin: 1in;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Times New Roman', Georgia, serif;
    font-size: 12pt;
    margin: 0;
    line-height: 1.5;
  }
  @page {
    size: letter;
    margin: 1in;
  }
  @page Section1 {
    mso-header-margin: .5in;
    mso-footer-margin: .5in;
  }
  div.Section1 { page: Section1; }
</style>
</head>
<body>
<div class="Section1">
<pre>${esc(content)}</pre>
</div>
</body>
</html>`;

  const blob = new Blob([htmlDoc], { type: 'application/msword' });
  return { blob, filename: filename.replace('.docx', '.doc') };
}

export async function generateDOCX(evaluation: Evaluation): Promise<void> {
  const { blob, filename } = await generateDOCXBlob(evaluation);
  const { saveAs } = await import('file-saver');
  saveAs(blob, filename);
}

// ── PDF Generation ───────────────────────────────────────────────────────────

export function buildPDFHTML(evaluation: Evaluation): string {
  const content = buildReportText(evaluation);
  const clientName = evaluation.client?.fullName || 'Evaluation';
  return `<!DOCTYPE html><html><head>
    <title>${esc(clientName)} - Clinical Psychological Evaluation</title>
    <style>
      body{font-family:Georgia,'Times New Roman',serif;max-width:800px;margin:40px auto;line-height:1.6;color:#1a1a1a;font-size:13px}
      pre{white-space:pre-wrap;word-wrap:break-word;font-family:inherit;font-size:13px;margin:0;line-height:1.6}
      @page{margin:1in;size:letter;@bottom-center{content:"Page " counter(page) " of " counter(pages);font-size:9px;color:#999}}
      @media print{body{margin:0;max-width:none}}
      .page-break{page-break-before:always}
    </style>
    </head><body><pre>${esc(content)}</pre></body></html>`;
}

export async function generatePDF(evaluation: Evaluation): Promise<void> {
  const html = buildPDFHTML(evaluation);

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to generate PDF. Go to Settings → Pop-ups and redirects → Allow for this site.');
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = function() {
    setTimeout(function() { printWindow.print(); }, 300);
    printWindow.onafterprint = function() { printWindow.close(); };
    setTimeout(function() { printWindow.close(); }, 60000);
  };
}

// ── Pages (RTF) Generation ───────────────────────────────────────────────────

function textToRtf(text: string): string {
  // Escape RTF special characters and convert Unicode
  let rtf = '';
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (text[i] === '\\') rtf += '\\\\';
    else if (text[i] === '{') rtf += '\\{';
    else if (text[i] === '}') rtf += '\\}';
    else if (text[i] === '\n') rtf += '\\par\n';
    else if (c > 127) rtf += `\\u${c}?`;
    else rtf += text[i];
  }
  return rtf;
}

export async function generatePages(evaluation: Evaluation): Promise<void> {
  const content = buildReportText(evaluation);
  const clientName = evaluation.client?.fullName || 'Evaluation';
  const safeClientName = clientName.replace(/[^a-zA-Z0-9_\s-]/g, '_');
  const filename = `${safeClientName}_Psych_Eval_${new Date().toISOString().split('T')[0]}.rtf`;

  const rtfContent = textToRtf(content);

  // Build RTF document with Times New Roman 12pt
  const rtf = `{\\rtf1\\ansi\\ansicpg1252\\cocoartf2761
{\\fonttbl\\f0\\froman\\fcharset0 TimesNewRomanPSMT;\\f1\\froman\\fcharset0 TimesNewRomanPS-BoldMT;}
{\\colortbl;\\red0\\green0\\blue0;\\red26\\green26\\blue26;}
{\\info{\\title ${textToRtf(clientName)} - Clinical Psychological Evaluation}}
\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1440\\margb1440
\\vieww12240\\viewh15840\\viewkind1
\\pard\\ri0\\sl360\\slmult1\\pardirnatural
\\f0\\fs24\\cf2 ${rtfContent}
}`;

  const blob = new Blob([rtf], { type: 'application/rtf' });
  const { saveAs } = await import('file-saver');
  saveAs(blob, filename);
}

