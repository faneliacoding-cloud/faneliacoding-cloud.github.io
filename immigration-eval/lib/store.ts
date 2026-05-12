'use client';
/**
 * Global Application Store
 * Manages all evaluation data, client records, UI state, and autosave functionality
 * Built with Zustand for lightweight, scalable state management
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Type Definitions ────────────────────────────────────────────────────────

export type Pronoun = 'She/Her' | 'He/Him' | 'They/Them' | 'Other';
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' | 'Domestic Partnership';
export type EvaluationLocation = 'Videoconference' | 'Office' | 'Other';
export type Severity = 'None' | 'Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe';
export type DiagnosisCode = 
  | 'F32.0' | 'F32.1' | 'F32.2' | 'F32.3'
  | 'F41.1' | 'F41.0'
  | 'F43.10' | 'F43.11' | 'F43.12'
  | 'F60.3' | 'F44.0' | 'F33.0' | 'F33.1' | 'F33.2'
  | 'Other';

export type LicenseType = 
  | 'LCSW' | 'LMFT' | 'LPC' | 'PhD' | 'PsyD' | 'MD' 
  | 'LCSW-C' | 'LCPC' | 'LMHC' | 'Other';

export type View = 
  | 'dashboard' 
  | 'clients' 
  | 'new-eval' 
  | 'draft-evals' 
  | 'completed' 
  | 'templates' 
  | 'settings' 
  | 'export';

// ─── Client Information ───────────────────────────────────────────────────────
export interface ClientInfo {
  fullName: string;
  preferredName: string;
  pronouns: Pronoun;
  dateOfBirth: string;
  age: string;
  nationality: string;
  countryOfOrigin: string;
  currentAddress: string;
  phone: string;
  email: string;
  maritalStatus: MaritalStatus | '';
  numberOfChildren: string;
  interpreterNeeded: boolean;
  interpreterName: string;
  evaluationLocation: EvaluationLocation;
  evaluationDates: string;
  otherLocation: string;
}

// ─── Clinician Information ────────────────────────────────────────────────────
export interface ClinicianInfo {
  name: string;
  licenseType: LicenseType | '';
  licenseNumber: string;
  officeAddress: string;
  phone: string;
  email: string;
  credentials: string;
  bio: string;
}

// ─── Case Summary ─────────────────────────────────────────────────────────────
export interface CaseSummary {
  summary: string;
  backgroundNotes: string;
  keyQuote: string;
}

// ─── Trauma History ───────────────────────────────────────────────────────────
export type TraumaCategory = 
  | 'Sexual Orientation/Gender Identity'
  | 'Political Opinion'
  | 'Religious Persecution'
  | 'Domestic Violence'
  | 'Gang Violence'
  | 'Ethnic/Racial Persecution'
  | 'Human Trafficking'
  | 'Female Genital Mutilation'
  | 'Child Abuse'
  | 'Other';

export type AbuseType = 
  | 'Physical' | 'Sexual' | 'Emotional/Psychological' 
  | 'Economic' | 'Spiritual/Religious' | 'Multiple Types';

export interface TraumaHistory {
  traumaCategory: TraumaCategory | '';
  descriptionOfEvents: string;
  abuseType: AbuseType | '';
  perpetratorInfo: string;
  datesOfTrauma: string;
  threatsExperienced: string;
  physicalViolence: boolean;
  sexualViolence: boolean;
  policeInvolvement: string;
  evidenceAvailable: boolean;
  evidenceDescription: string;
  decisionToLeave: string;
  whyCantReturn: string;
  keyQuote: string;
}

// ─── Psychological Symptoms ───────────────────────────────────────────────────
export interface PsychSymptoms {
  depressionSeverity: Severity;
  anxietySeverity: Severity;
  ptsdSymptoms: Severity;
  sleepProblems: Severity;
  appetiteChanges: Severity;
  panicAttacks: Severity;
  dissociation: Severity;
  nightmares: Severity;
  hypervigilance: Severity;
  suicidalIdeation: 'None' | 'Passive' | 'Active without plan' | 'Active with plan';
  additionalNotes: string;
  physicalSymptoms: string;
  functionalImpairment: string;
}

// ─── Mental Status Exam ───────────────────────────────────────────────────────
export interface MentalStatusExam {
  appearance: string;
  eyeContact: string;
  speech: string;
  mood: string;
  affect: string;
  thoughtProcess: string;
  insight: string;
  orientation: string;
  psychomotorActivity: string;
  cognition: string;
  suicidalHomicidalIdeation: string;
  additionalObservations: string;
}

// ─── Assessment Scores ────────────────────────────────────────────────────────
export interface PHQ9Scores {
  // 0-3 each: 0=Not at all, 1=Several days, 2=More than half, 3=Nearly every day
  q1: number; // Little interest
  q2: number; // Feeling down
  q3: number; // Sleep problems
  q4: number; // Feeling tired
  q5: number; // Appetite
  q6: number; // Feeling bad about self
  q7: number; // Concentration
  q8: number; // Moving slowly/restless
  q9: number; // Thoughts of self-harm
  total: number;
  severity: string;
}

export interface GAD7Scores {
  // 0-3 each
  q1: number; // Feeling nervous
  q2: number; // Worrying too much
  q3: number; // Trouble relaxing
  q4: number; // Restless
  q5: number; // Easily annoyed
  q6: number; // Afraid something awful
  q7: number; // Can't stop worrying
  total: number;
  severity: string;
}

export interface PCL5Scores {
  // 0-4 each: 0=Not at all, 1=A little, 2=Moderately, 3=Quite a bit, 4=Extremely
  q1: number; q2: number; q3: number; q4: number; q5: number;
  q6: number; q7: number; q8: number; q9: number; q10: number;
  q11: number; q12: number; q13: number; q14: number; q15: number;
  q16: number; q17: number; q18: number; q19: number; q20: number;
  total: number;
  severity: string;
  likelyPTSD: boolean;
}

// ─── Optional Sections ────────────────────────────────────────────────────────
export interface OptionalSections {
  lgbtqAsylum: {
    enabled: boolean;
    sexualOrientationHistory: string;
    genderExpressionHistory: string;
    countryDangers: string;
    personalExperiences: string;
    communityExperiences: string;
  };
  childInterview: {
    enabled: boolean;
    childName: string;
    childAge: string;
    childRelationship: string;
    interviewNotes: string;
    consistencyWithParent: string;
  };
  delayedFiling: {
    enabled: boolean;
    explanation: string;
    psychologicalBarriers: string;
  };
  physicalScars: {
    enabled: boolean;
    scarDescription: string;
    location: string;
    consistentWithAccount: boolean;
    medicalExaminer: string;
  };
  medicalConditions: {
    enabled: boolean;
    conditions: string;
    medications: string;
    traumaRelated: boolean;
  };
  humanitarianConsiderations: {
    enabled: boolean;
    details: string;
  };
}

// ─── Findings & Recommendations ──────────────────────────────────────────────
export interface Diagnoses {
  code: DiagnosisCode;
  name: string;
  specifier?: string;
}

export interface FindingsRecommendations {
  clinicalImpression: string;
  diagnoses: Diagnoses[];
  credibilityAssessment: string;
  functionalImpairment: string;
  recommendations: string;
  riskAssessment: string;
  prognosis: string;
}

// ─── Full Evaluation ─────────────────────────────────────────────────────────
export interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'in-progress' | 'completed';
  currentStep: number;
  
  clientInfo: ClientInfo;
  clinicianInfo: ClinicianInfo;
  caseSummary: CaseSummary;
  traumaHistory: TraumaHistory;
  psychSymptoms: PsychSymptoms;
  mentalStatusExam: MentalStatusExam;
  phq9: PHQ9Scores;
  gad7: GAD7Scores;
  pcl5: PCL5Scores;
  optionalSections: OptionalSections;
  findings: FindingsRecommendations;
}

// ─── App Store ────────────────────────────────────────────────────────────────
interface AppState {
  // UI State
  activeView: View;
  darkMode: boolean;
  sidebarCollapsed: boolean;
  activeEvalId: string | null;
  
  // Clinician profile (saved across evals)
  savedClinicianInfo: ClinicianInfo;
  
  // Evaluations database
  evaluations: Evaluation[];
  
  // Actions
  setView: (view: View) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  
  // Evaluation CRUD
  createEvaluation: () => string;
  updateEvaluation: (id: string, updates: Partial<Evaluation>) => void;
  deleteEvaluation: (id: string) => void;
  duplicateEvaluation: (id: string) => string;
  setActiveEval: (id: string | null) => void;
  getActiveEval: () => Evaluation | null;
  completeEvaluation: (id: string) => void;
  
  // Clinician profile
  saveClinicianInfo: (info: ClinicianInfo) => void;
  
  // Autosave
  lastSaved: string | null;
}

// ─── Default Values ───────────────────────────────────────────────────────────
const defaultClientInfo: ClientInfo = {
  fullName: '', preferredName: '', pronouns: 'She/Her',
  dateOfBirth: '', age: '', nationality: '', countryOfOrigin: '',
  currentAddress: '', phone: '', email: '',
  maritalStatus: '', numberOfChildren: '',
  interpreterNeeded: false, interpreterName: '',
  evaluationLocation: 'Videoconference', evaluationDates: '', otherLocation: '',
};

const defaultClinicianInfo: ClinicianInfo = {
  name: '', licenseType: '', licenseNumber: '',
  officeAddress: '', phone: '', email: '',
  credentials: '', bio: '',
};

const defaultCaseSummary: CaseSummary = {
  summary: '', backgroundNotes: '', keyQuote: '',
};

const defaultTraumaHistory: TraumaHistory = {
  traumaCategory: '', descriptionOfEvents: '', abuseType: '',
  perpetratorInfo: '', datesOfTrauma: '', threatsExperienced: '',
  physicalViolence: false, sexualViolence: false,
  policeInvolvement: '', evidenceAvailable: false, evidenceDescription: '',
  decisionToLeave: '', whyCantReturn: '', keyQuote: '',
};

const defaultPsychSymptoms: PsychSymptoms = {
  depressionSeverity: 'None', anxietySeverity: 'None', ptsdSymptoms: 'None',
  sleepProblems: 'None', appetiteChanges: 'None', panicAttacks: 'None',
  dissociation: 'None', nightmares: 'None', hypervigilance: 'None',
  suicidalIdeation: 'None', additionalNotes: '', physicalSymptoms: '', functionalImpairment: '',
};

const defaultMSE: MentalStatusExam = {
  appearance: '', eyeContact: '', speech: '', mood: '', affect: '',
  thoughtProcess: '', insight: '', orientation: '', psychomotorActivity: '',
  cognition: '', suicidalHomicidalIdeation: '', additionalObservations: '',
};

const defaultPHQ9: PHQ9Scores = {
  q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0,
  total: 0, severity: 'None/Minimal',
};

const defaultGAD7: GAD7Scores = {
  q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0,
  total: 0, severity: 'Minimal',
};

const defaultPCL5: PCL5Scores = {
  q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0,
  q11: 0, q12: 0, q13: 0, q14: 0, q15: 0, q16: 0, q17: 0, q18: 0, q19: 0, q20: 0,
  total: 0, severity: 'Below threshold', likelyPTSD: false,
};

const defaultOptionalSections: OptionalSections = {
  lgbtqAsylum: {
    enabled: false,
    sexualOrientationHistory: '', genderExpressionHistory: '',
    countryDangers: '', personalExperiences: '', communityExperiences: '',
  },
  childInterview: {
    enabled: false,
    childName: '', childAge: '', childRelationship: '',
    interviewNotes: '', consistencyWithParent: '',
  },
  delayedFiling: {
    enabled: false,
    explanation: '', psychologicalBarriers: '',
  },
  physicalScars: {
    enabled: false,
    scarDescription: '', location: '',
    consistentWithAccount: false, medicalExaminer: '',
  },
  medicalConditions: {
    enabled: false,
    conditions: '', medications: '', traumaRelated: false,
  },
  humanitarianConsiderations: {
    enabled: false,
    details: '',
  },
};

const defaultFindings: FindingsRecommendations = {
  clinicalImpression: '', diagnoses: [], credibilityAssessment: '',
  functionalImpairment: '', recommendations: '', riskAssessment: '', prognosis: '',
};

// ─── Store Implementation ─────────────────────────────────────────────────────
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeView: 'dashboard',
      darkMode: false,
      sidebarCollapsed: false,
      activeEvalId: null,
      savedClinicianInfo: defaultClinicianInfo,
      evaluations: [],
      lastSaved: null,

      setView: (view) => set({ activeView: view }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      createEvaluation: () => {
        const id = `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();
        const clinicianInfo = get().savedClinicianInfo;
        const newEval: Evaluation = {
          id, createdAt: now, updatedAt: now,
          status: 'draft', currentStep: 0,
          clientInfo: { ...defaultClientInfo },
          clinicianInfo: { ...clinicianInfo },
          caseSummary: { ...defaultCaseSummary },
          traumaHistory: { ...defaultTraumaHistory },
          psychSymptoms: { ...defaultPsychSymptoms },
          mentalStatusExam: { ...defaultMSE },
          phq9: { ...defaultPHQ9 },
          gad7: { ...defaultGAD7 },
          pcl5: { ...defaultPCL5 },
          optionalSections: JSON.parse(JSON.stringify(defaultOptionalSections)),
          findings: { ...defaultFindings },
        };
        set((s) => ({
          evaluations: [newEval, ...s.evaluations],
          activeEvalId: id,
          lastSaved: new Date().toISOString(),
        }));
        return id;
      },

      updateEvaluation: (id, updates) => {
        set((s) => ({
          evaluations: s.evaluations.map((e) =>
            e.id === id
              ? { ...e, ...updates, updatedAt: new Date().toISOString() }
              : e
          ),
          lastSaved: new Date().toISOString(),
        }));
      },

      deleteEvaluation: (id) => {
        set((s) => ({
          evaluations: s.evaluations.filter((e) => e.id !== id),
          activeEvalId: s.activeEvalId === id ? null : s.activeEvalId,
        }));
      },

      duplicateEvaluation: (id) => {
        const original = get().evaluations.find((e) => e.id === id);
        if (!original) return '';
        const newId = `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();
        const duplicate: Evaluation = {
          ...JSON.parse(JSON.stringify(original)),
          id: newId,
          createdAt: now,
          updatedAt: now,
          status: 'draft',
          clientInfo: {
            ...original.clientInfo,
            fullName: `${original.clientInfo.fullName} (Copy)`,
          },
        };
        set((s) => ({
          evaluations: [duplicate, ...s.evaluations],
          activeEvalId: newId,
        }));
        return newId;
      },

      setActiveEval: (id) => set({ activeEvalId: id }),

      getActiveEval: () => {
        const { evaluations, activeEvalId } = get();
        return evaluations.find((e) => e.id === activeEvalId) || null;
      },

      completeEvaluation: (id) => {
        set((s) => ({
          evaluations: s.evaluations.map((e) =>
            e.id === id
              ? { ...e, status: 'completed', updatedAt: new Date().toISOString() }
              : e
          ),
        }));
      },

      saveClinicianInfo: (info) => set({ savedClinicianInfo: info }),
    }),
    {
      name: 'immigeval-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        evaluations: state.evaluations,
        savedClinicianInfo: state.savedClinicianInfo,
        darkMode: state.darkMode,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

// ─── Score Calculators ────────────────────────────────────────────────────────
export function calculatePHQ9Severity(total: number): string {
  if (total <= 4) return 'None/Minimal';
  if (total <= 9) return 'Mild';
  if (total <= 14) return 'Moderate';
  if (total <= 19) return 'Moderately Severe';
  return 'Severe';
}

export function calculateGAD7Severity(total: number): string {
  if (total <= 4) return 'Minimal';
  if (total <= 9) return 'Mild';
  if (total <= 14) return 'Moderate';
  return 'Severe';
}

export function calculatePCL5Severity(total: number): { severity: string; likelyPTSD: boolean } {
  const likelyPTSD = total >= 31;
  let severity = 'Below threshold';
  if (total >= 31 && total <= 40) severity = 'Moderate PTSD';
  if (total > 40 && total <= 60) severity = 'Moderately Severe PTSD';
  if (total > 60) severity = 'Severe PTSD';
  return { severity, likelyPTSD };
}
