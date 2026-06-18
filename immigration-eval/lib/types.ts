'use client';
/**
 * TJIL Immigration Evaluation Platform — Type Definitions
 * Supabase-ready data model for the complete SaaS platform
 */

// ── Case Status Lifecycle ────────────────────────────────────────────────────
export type CaseStatus =
  | 'draft'
  | 'intake_started'
  | 'awaiting_interview'
  | 'awaiting_documents'
  | 'in_clinical_review'
  | 'ready_to_generate'
  | 'report_complete'
  | 'delivered';

export const CASE_STATUS_CONFIG: Record<CaseStatus, { label: string; color: string; bg: string }> = {
  draft:               { label: 'Draft',              color: '#6B6B6F', bg: 'rgba(107,107,111,0.10)' },
  intake_started:      { label: 'Intake Started',     color: '#4A9B8E', bg: 'rgba(74,155,142,0.10)' },
  awaiting_interview:  { label: 'Awaiting Interview', color: '#C5A55A', bg: 'rgba(197,165,90,0.10)' },
  awaiting_documents:  { label: 'Awaiting Documents', color: '#D4883E', bg: 'rgba(212,136,62,0.10)' },
  in_clinical_review:  { label: 'Clinical Review',    color: '#7C6BC4', bg: 'rgba(124,107,196,0.10)' },
  ready_to_generate:   { label: 'Ready to Generate',  color: '#2D5A45', bg: 'rgba(45,90,69,0.10)' },
  report_complete:     { label: 'Report Complete',     color: '#1B3A2D', bg: 'rgba(27,58,45,0.12)' },
  delivered:           { label: 'Delivered',           color: '#4A9B8E', bg: 'rgba(74,155,142,0.12)' },
};

// ── Case Types ───────────────────────────────────────────────────────────────
export type CaseType =
  | 'asylum'
  | 'vawa'
  | 'u_visa'
  | 't_visa'
  | 'extreme_hardship'
  | 'cancellation_of_removal'
  | 'n648_disability'
  | 'custom';

export const CASE_TYPE_CONFIG: Record<CaseType, { label: string; description: string; estimatedTime: string; icon: string }> = {
  asylum:                 { label: 'Asylum Evaluation',           description: 'Psychological evaluation for asylum seekers documenting persecution, trauma, and fear of return.',                icon: '🛡️', estimatedTime: '2–4 hours' },
  vawa:                   { label: 'VAWA Evaluation',             description: 'Evaluation for victims of domestic violence by U.S. citizen or permanent resident spouse/parent.',               icon: '💜', estimatedTime: '2–3 hours' },
  u_visa:                 { label: 'U Visa Evaluation',           description: 'Psychological assessment for victims of qualifying crimes who suffered substantial abuse.',                     icon: '⚖️', estimatedTime: '2–3 hours' },
  t_visa:                 { label: 'T Visa Evaluation',           description: 'Evaluation for victims of human trafficking documenting psychological impact and trauma.',                      icon: '🔒', estimatedTime: '2–3 hours' },
  extreme_hardship:       { label: 'Extreme Hardship',            description: 'Assessment documenting extreme hardship to qualifying relatives if applicant is removed.',                      icon: '📋', estimatedTime: '3–5 hours' },
  cancellation_of_removal:{ label: 'Cancellation of Removal',    description: 'Evaluation supporting cancellation of removal based on exceptional and extremely unusual hardship.',            icon: '🏛️', estimatedTime: '3–5 hours' },
  n648_disability:        { label: 'N-648 Disability Waiver',     description: 'Mental health evaluation supporting waiver of English/civics naturalization requirements.',                    icon: '📝', estimatedTime: '1–2 hours' },
  custom:                 { label: 'Custom Evaluation',           description: 'Custom evaluation type for unique immigration cases not covered by standard templates.',                        icon: '✨', estimatedTime: 'Varies' },
};

// ── Document Categories ──────────────────────────────────────────────────────
export type DocumentCategory =
  | 'affidavit'
  | 'identity'
  | 'medical'
  | 'police_report'
  | 'photo'
  | 'attorney_letter'
  | 'court_document'
  | 'prior_evaluation'
  | 'other';

export const DOCUMENT_CATEGORIES: Record<DocumentCategory, { label: string; icon: string }> = {
  affidavit:        { label: 'Affidavit',           icon: '📄' },
  identity:         { label: 'Identity Document',   icon: '🪪' },
  medical:          { label: 'Medical Record',      icon: '🏥' },
  police_report:    { label: 'Police Report',       icon: '🚔' },
  photo:            { label: 'Photograph',          icon: '📷' },
  attorney_letter:  { label: 'Attorney Letter',     icon: '⚖️' },
  court_document:   { label: 'Court Document',      icon: '🏛️' },
  prior_evaluation: { label: 'Prior Evaluation',    icon: '📋' },
  other:            { label: 'Other',               icon: '📎' },
};

// ── Severity / Diagnosis ─────────────────────────────────────────────────────
export type Severity = 'none' | 'mild' | 'moderate' | 'severe';
export type Pronoun = 'He/Him' | 'She/Her' | 'They/Them' | 'Other';
export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Transgender Male' | 'Transgender Female' | 'Other' | 'Prefer not to say';
export type MaritalStatus = '' | 'Single' | 'Married' | 'Divorced' | 'Separated' | 'Widowed' | 'Domestic Partnership';

export type DiagnosisCode =
  | 'F43.10' | 'F43.11' | 'F43.12'
  | 'F32.0' | 'F32.1' | 'F32.2'
  | 'F33.0' | 'F33.1' | 'F33.2'
  | 'F41.1' | 'F41.0' | 'F40.10'
  | 'F44.0' | 'F44.81'
  | 'F43.0' | 'F43.20' | 'F43.21' | 'F43.22' | 'F43.23' | 'F43.25'
  | 'Z65.4' | 'Z60.0' | 'Z63.0';

export const DIAGNOSIS_LABELS: Record<string, string> = {
  'F43.10': 'PTSD, Unspecified',
  'F43.11': 'PTSD, Acute',
  'F43.12': 'PTSD, Chronic',
  'F32.0': 'Major Depressive Disorder, Single Episode, Mild',
  'F32.1': 'Major Depressive Disorder, Single Episode, Moderate',
  'F32.2': 'Major Depressive Disorder, Single Episode, Severe',
  'F33.0': 'Major Depressive Disorder, Recurrent, Mild',
  'F33.1': 'Major Depressive Disorder, Recurrent, Moderate',
  'F33.2': 'Major Depressive Disorder, Recurrent, Severe',
  'F41.1': 'Generalized Anxiety Disorder',
  'F41.0': 'Panic Disorder',
  'F40.10': 'Social Anxiety Disorder',
  'F44.0': 'Dissociative Amnesia',
  'F44.81': 'Dissociative Identity Disorder',
  'F43.0': 'Acute Stress Disorder',
  'F43.20': 'Adjustment Disorder, Unspecified',
  'F43.21': 'Adjustment Disorder with Depressed Mood',
  'F43.22': 'Adjustment Disorder with Anxiety',
  'F43.23': 'Adjustment Disorder with Mixed Anxiety and Depressed Mood',
  'F43.25': 'Adjustment Disorder with Mixed Disturbance',
  'Z65.4': 'Victim of Torture',
  'Z60.0': 'Problems Related to Acculturation',
  'Z63.0': 'Problems in Relationship with Spouse/Partner',
};

// ── Client ───────────────────────────────────────────────────────────────────
export interface Client {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: Gender;
  pronouns: Pronoun;
  nationality: string;
  countryOfOrigin: string;
  ethnicity: string;
  spokenLanguages: string;
  maritalStatus: MaritalStatus;
  numberOfChildren: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  referringAttorney: string;
  aNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

// ── Timeline Events ──────────────────────────────────────────────────────────
export interface TimelineEvent {
  id: string;
  type: 'created' | 'intake' | 'documents_requested' | 'interview_scheduled' | 'interview_completed' | 'evidence_uploaded' | 'clinical_review' | 'draft_generated' | 'report_finalized' | 'delivered' | 'note';
  title: string;
  description: string;
  timestamp: string;
}

// ── Evaluation Sections ──────────────────────────────────────────────────────
export interface EvalStep01 {
  evaluationDates: string;
  interpreterUsed: boolean;
  interpreterLanguage: string;
  evaluationLocation: string;
  referralSource: string;
}

export interface EvalStep02 {
  caseType: CaseType;
  caseNotes: string;
}

export interface EvalStep03 {
  personalHistory: string;
  familyBackground: string;
  educationHistory: string;
  employmentHistory: string;
  relationshipHistory: string;
  childrenInfo: string;
}

export interface EvalStep04 {
  immigrationHistory: string;
  dateOfArrival: string;
  mannerOfEntry: string;
  currentStatus: string;
  previousApplications: string;
  reasonForFleeing: string;
}

export interface EvalStep05 {
  traumaCategory: string;
  traumaNarrative: string;
  perpetratorInfo: string;
  frequencyDuration: string;
  reportedToAuthorities: boolean;
  authoritiesResponse: string;
  whyCantReturn: string;
  ongoingThreats: string;
}

export interface EvalStep06 {
  currentSymptoms: string;
  sleepDisturbances: string;
  appetiteChanges: string;
  concentrationDifficulties: string;
  emotionalRegulation: string;
  avoidanceBehaviors: string;
  hypervigilance: string;
  flashbacksNightmares: string;
  suicidalIdeation: string;
  selfHarm: string;
  substanceUse: string;
  functionalImpairment: string;
  phq9Scores: number[];
  gad7Scores: number[];
  pcl5Scores: number[];
}

export interface EvalStep07 {
  appearance: string;
  behavior: string;
  speech: string;
  mood: string;
  affect: string;
  thoughtProcess: string;
  thoughtContent: string;
  perceptions: string;
  cognition: string;
  insight: string;
  judgment: string;
  rapport: string;
  credibilityAssessment: string;
}

export interface EvalStep08 {
  diagnoses: DiagnosisCode[];
  diagnosticRationale: string;
  differentialDiagnosis: string;
  ruleOutConditions: string;
  severityLevel: Severity;
  prognosticFactors: string;
}

export interface EvalStep09 {
  supportingDocuments: string[];
  documentNotes: string;
}

export interface EvalStep10 {
  clinicalImpression: string;
  recommendations: string;
  treatmentRecommendations: string;
  riskAssessment: string;
  prognosticStatement: string;
  returnRisk: string;
  finalStatement: string;
}

export interface EvaluationSections {
  step01: EvalStep01;
  step02: EvalStep02;
  step03: EvalStep03;
  step04: EvalStep04;
  step05: EvalStep05;
  step06: EvalStep06;
  step07: EvalStep07;
  step08: EvalStep08;
  step09: EvalStep09;
  step10: EvalStep10;
}

// ── Documents ────────────────────────────────────────────────────────────────
export interface EvalDocument {
  id: string;
  evalId: string;
  category: DocumentCategory;
  filename: string;
  mimeType: string;
  size: number;
  notes: string;
  thumbnailUrl: string;
  uploadedAt: string;
}

// ── Reports ──────────────────────────────────────────────────────────────────
export interface EvalReport {
  id: string;
  evalId: string;
  format: 'pdf' | 'docx';
  version: number;
  generatedAt: string;
  reviewedBy: string;
  status: 'draft' | 'reviewed' | 'finalized';
}

// ── Evaluation ───────────────────────────────────────────────────────────────
export interface Evaluation {
  id: string;
  client: Client;
  caseType: CaseType;
  status: CaseStatus;
  currentStep: number;
  completedSteps: number[];
  interviewDate: string;
  sections: EvaluationSections;
  timeline: TimelineEvent[];
  documents: EvalDocument[];
  reports: EvalReport[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Snippets ─────────────────────────────────────────────────────────────────
export interface Snippet {
  id: string;
  category: 'diagnostic' | 'symptom_impact' | 'trauma_summary' | 'recommendation' | 'limitations' | 'follow_up';
  title: string;
  content: string;
  isDefault: boolean;
}

// ── Practice Settings ────────────────────────────────────────────────────────
export interface PracticeSettings {
  practiceName: string;
  evaluatorName: string;
  credentials: string;
  licenseNumber: string;
  licenseType: string;
  address: string;
  phone: string;
  email: string;
  logoUrl: string;
  signatureBlock: string;
  reportHeaderText: string;
}

// ── Navigation ───────────────────────────────────────────────────────────────
export type View =
  | 'dashboard'
  | 'evaluations'
  | 'clients'
  | 'client-profile'
  | 'templates'
  | 'reports'
  | 'evidence'
  | 'snippets'
  | 'settings'
  | 'new-eval'
  | 'report-builder';

// ── Evaluation Step Config ───────────────────────────────────────────────────
export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

export const EVAL_STEPS: StepConfig[] = [
  { id: 0,  title: 'Client Information',         subtitle: 'Demographics and contact details',      icon: '👤' },
  { id: 1,  title: 'Immigration Case Type',      subtitle: 'Type and context of the case',          icon: '📋' },
  { id: 2,  title: 'Personal & Family History',  subtitle: 'Background and family dynamics',        icon: '👨‍👩‍👧' },
  { id: 3,  title: 'Immigration History',         subtitle: 'Journey and current status',            icon: '🌍' },
  { id: 4,  title: 'Trauma / Stressor History',  subtitle: 'Persecution and traumatic events',      icon: '⚡' },
  { id: 5,  title: 'Symptoms & Mental Health',    subtitle: 'Current psychological impact',          icon: '🧠' },
  { id: 6,  title: 'Clinical Observations',       subtitle: 'Mental status examination',             icon: '🔍' },
  { id: 7,  title: 'Diagnosis & Impression',      subtitle: 'DSM-5 diagnoses and rationale',         icon: '📊' },
  { id: 8,  title: 'Supporting Evidence',          subtitle: 'Documents and corroboration',           icon: '📁' },
  { id: 9,  title: 'Recommendations',             subtitle: 'Clinical conclusions and risk',         icon: '✅' },
  { id: 10, title: 'Review & Generate',           subtitle: 'Final review and report generation',    icon: '📝' },
];

// ── Default Values ───────────────────────────────────────────────────────────
export const DEFAULT_CLIENT: Client = {
  id: '', fullName: '', dateOfBirth: '', age: '', gender: 'Male' as Gender,
  pronouns: 'He/Him' as Pronoun, nationality: '', countryOfOrigin: '', ethnicity: '',
  spokenLanguages: '', maritalStatus: '' as MaritalStatus, numberOfChildren: '',
  contactEmail: '', contactPhone: '', address: '', referringAttorney: '',
  aNumber: '', profilePhoto: '', createdAt: '', updatedAt: '',
};

export const DEFAULT_SECTIONS: EvaluationSections = {
  step01: { evaluationDates: '', interpreterUsed: false, interpreterLanguage: '', evaluationLocation: '', referralSource: '' },
  step02: { caseType: 'asylum', caseNotes: '' },
  step03: { personalHistory: '', familyBackground: '', educationHistory: '', employmentHistory: '', relationshipHistory: '', childrenInfo: '' },
  step04: { immigrationHistory: '', dateOfArrival: '', mannerOfEntry: '', currentStatus: '', previousApplications: '', reasonForFleeing: '' },
  step05: { traumaCategory: '', traumaNarrative: '', perpetratorInfo: '', frequencyDuration: '', reportedToAuthorities: false, authoritiesResponse: '', whyCantReturn: '', ongoingThreats: '' },
  step06: { currentSymptoms: '', sleepDisturbances: '', appetiteChanges: '', concentrationDifficulties: '', emotionalRegulation: '', avoidanceBehaviors: '', hypervigilance: '', flashbacksNightmares: '', suicidalIdeation: '', selfHarm: '', substanceUse: '', functionalImpairment: '', phq9Scores: Array(9).fill(-1), gad7Scores: Array(7).fill(-1), pcl5Scores: Array(20).fill(-1) },
  step07: { appearance: '', behavior: '', speech: '', mood: '', affect: '', thoughtProcess: '', thoughtContent: '', perceptions: '', cognition: '', insight: '', judgment: '', rapport: '', credibilityAssessment: '' },
  step08: { diagnoses: [], diagnosticRationale: '', differentialDiagnosis: '', ruleOutConditions: '', severityLevel: 'moderate', prognosticFactors: '' },
  step09: { supportingDocuments: [], documentNotes: '' },
  step10: { clinicalImpression: '', recommendations: '', treatmentRecommendations: '', riskAssessment: '', prognosticStatement: '', returnRisk: '', finalStatement: '' },
};
