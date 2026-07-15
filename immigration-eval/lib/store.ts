'use client';
/**
 * TJIL Immigration Evaluation Platform — State Management
 * Zustand store with persist middleware. Supabase-ready architecture.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Evaluation, Client, CaseType, CaseStatus, View, PracticeSettings, Snippet, EvaluationSections, TimelineEvent, EvalDocument, DEFAULT_CLIENT, DEFAULT_SECTIONS } from './types';

// Re-export defaults
const defaultClient: Client = {
  id: '', fullName: '', dateOfBirth: '', age: '', gender: 'Male',
  pronouns: 'He/Him', nationality: '', countryOfOrigin: '', ethnicity: '',
  spokenLanguages: '', maritalStatus: '', numberOfChildren: '',
  contactEmail: '', contactPhone: '', address: '', referringAttorney: '',
  aNumber: '', profilePhoto: '', createdAt: '', updatedAt: '',
};

const defaultSections: EvaluationSections = {
  step01: { evaluationDates: '', interpreterUsed: false, interpreterLanguage: '', evaluationLocation: '', referralSource: '', clinicianName: '', clinicianCredentials: '', clinicianLicense: '', clinicianBio: '' },
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

const defaultPracticeSettings: PracticeSettings = {
  practiceName: '',
  evaluatorName: '',
  credentials: '',
  licenseNumber: '',
  licenseType: '',
  address: '',
  phone: '',
  email: '',
  logoUrl: '',
  signatureBlock: '',
  reportHeaderText: '',
};

// ── App State ────────────────────────────────────────────────────────────────
interface AppState {
  // Navigation
  activeView: View;
  activeEvalId: string | null;
  activeClientId: string | null;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;

  // Data
  evaluations: Evaluation[];
  snippets: Snippet[];
  practiceSettings: PracticeSettings;

  // UI
  searchQuery: string;
  lastSaved: number;

  // Actions — Navigation
  setView: (view: View) => void;
  setActiveEval: (id: string | null) => void;
  setActiveClient: (id: string | null) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  setSearchQuery: (q: string) => void;

  // Actions — Evaluations
  createEvaluation: (caseType?: CaseType) => string;
  updateEvaluation: (id: string, updates: Partial<Evaluation>) => void;
  updateEvalClient: (id: string, updates: Partial<Client>) => void;
  updateEvalSection: <K extends keyof EvaluationSections>(id: string, section: K, data: Partial<EvaluationSections[K]>) => void;
  updateEvalStatus: (id: string, status: CaseStatus) => void;
  addTimelineEvent: (id: string, event: Omit<TimelineEvent, 'id' | 'timestamp'>) => void;
  addDocument: (id: string, doc: Omit<EvalDocument, 'id' | 'uploadedAt'>) => void;
  removeDocument: (evalId: string, docId: string) => void;
  completeStep: (id: string, step: number) => void;
  deleteEvaluation: (id: string) => void;
  duplicateEvaluation: (id: string) => string;

  // Actions — Snippets
  addSnippet: (snippet: Omit<Snippet, 'id'>) => void;
  updateSnippet: (id: string, updates: Partial<Snippet>) => void;
  deleteSnippet: (id: string) => void;

  // Actions — Settings
  updatePracticeSettings: (updates: Partial<PracticeSettings>) => void;
}

// ── Safe storage adapter ─────────────────────────────────────────────────────
const safeStorage = {
  getItem: (name: string): string | null => {
    try { return localStorage.getItem(name); }
    catch { return null; }
  },
  setItem: (name: string, value: string): void => {
    try { localStorage.setItem(name, value); }
    catch (e) { console.warn('[Store] localStorage quota exceeded:', e); }
  },
  removeItem: (name: string): void => {
    try { localStorage.removeItem(name); }
    catch { /* silently fail */ }
  },
};

// ── Store ────────────────────────────────────────────────────────────────────
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      activeView: 'dashboard',
      activeEvalId: null,
      activeClientId: null,
      sidebarOpen: true,
      aiPanelOpen: false,

      // Data
      evaluations: [],
      snippets: [],
      practiceSettings: { ...defaultPracticeSettings },

      // UI
      searchQuery: '',
      lastSaved: 0,

      // ── Navigation Actions ─────────────────────────────────────────────
      setView: (view) => set({ activeView: view }),
      setActiveEval: (id) => set({ activeEvalId: id }),
      setActiveClient: (id) => set({ activeClientId: id }),
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
      toggleAIPanel: () => set(s => ({ aiPanelOpen: !s.aiPanelOpen })),
      setSearchQuery: (q) => set({ searchQuery: q }),

      // ── Evaluation CRUD ────────────────────────────────────────────────
      createEvaluation: (caseType = 'asylum') => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const newEval: Evaluation = {
          id,
          client: { ...defaultClient, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
          caseType,
          status: 'draft',
          currentStep: 0,
          completedSteps: [],
          interviewDate: '',
          sections: JSON.parse(JSON.stringify(defaultSections)),
          timeline: [{
            id: crypto.randomUUID(),
            type: 'created',
            title: 'Evaluation created',
            description: `New ${caseType.replace(/_/g, ' ')} evaluation initiated`,
            timestamp: now,
          }],
          documents: [],
          reports: [],
          notes: '',
          createdAt: now,
          updatedAt: now,
        };
        newEval.sections.step02.caseType = caseType;
        set(s => ({
          evaluations: [newEval, ...s.evaluations],
          activeEvalId: id,
          activeView: 'new-eval',
          lastSaved: Date.now(),
        }));
        return id;
      },

      updateEvaluation: (id, updates) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
        ),
        lastSaved: Date.now(),
      })),

      updateEvalClient: (id, updates) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? { ...e, client: { ...e.client, ...updates, updatedAt: new Date().toISOString() }, updatedAt: new Date().toISOString() } : e
        ),
        lastSaved: Date.now(),
      })),

      updateEvalSection: (id, section, data) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? {
            ...e,
            sections: { ...e.sections, [section]: { ...e.sections[section], ...data } },
            updatedAt: new Date().toISOString(),
          } : e
        ),
        lastSaved: Date.now(),
      })),

      updateEvalStatus: (id, status) => {
        const now = new Date().toISOString();
        set(s => ({
          evaluations: s.evaluations.map(e =>
            e.id === id ? {
              ...e,
              status,
              updatedAt: now,
              timeline: [...e.timeline, {
                id: crypto.randomUUID(),
                type: 'note',
                title: `Status updated`,
                description: `Case status changed to "${status.replace(/_/g, ' ')}"`,
                timestamp: now,
              }],
            } : e
          ),
          lastSaved: Date.now(),
        }));
      },

      addTimelineEvent: (id, event) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? {
            ...e,
            timeline: [...e.timeline, { ...event, id: crypto.randomUUID(), timestamp: new Date().toISOString() }],
            updatedAt: new Date().toISOString(),
          } : e
        ),
        lastSaved: Date.now(),
      })),

      addDocument: (id, doc) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? {
            ...e,
            documents: [...e.documents, { ...doc, id: crypto.randomUUID(), uploadedAt: new Date().toISOString() }],
            updatedAt: new Date().toISOString(),
          } : e
        ),
        lastSaved: Date.now(),
      })),

      removeDocument: (evalId, docId) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === evalId ? {
            ...e,
            documents: e.documents.filter(d => d.id !== docId),
            updatedAt: new Date().toISOString(),
          } : e
        ),
        lastSaved: Date.now(),
      })),

      completeStep: (id, step) => set(s => ({
        evaluations: s.evaluations.map(e =>
          e.id === id ? {
            ...e,
            completedSteps: e.completedSteps.includes(step) ? e.completedSteps : [...e.completedSteps, step],
            updatedAt: new Date().toISOString(),
          } : e
        ),
        lastSaved: Date.now(),
      })),

      deleteEvaluation: (id) => set(s => ({
        evaluations: s.evaluations.filter(e => e.id !== id),
        activeEvalId: s.activeEvalId === id ? null : s.activeEvalId,
        lastSaved: Date.now(),
      })),

      duplicateEvaluation: (id) => {
        const state = get();
        const original = state.evaluations.find(e => e.id === id);
        if (!original) return '';
        const newId = crypto.randomUUID();
        const now = new Date().toISOString();
        const duplicate: Evaluation = {
          ...JSON.parse(JSON.stringify(original)),
          id: newId,
          status: 'draft' as CaseStatus,
          reports: [],
          timeline: [{
            id: crypto.randomUUID(),
            type: 'created' as const,
            title: 'Evaluation duplicated',
            description: `Duplicated from ${original.client.fullName || 'unnamed'} evaluation`,
            timestamp: now,
          }],
          createdAt: now,
          updatedAt: now,
        };
        set(s => ({
          evaluations: [duplicate, ...s.evaluations],
          lastSaved: Date.now(),
        }));
        return newId;
      },

      // ── Snippets ───────────────────────────────────────────────────────
      addSnippet: (snippet) => set(s => ({
        snippets: [...s.snippets, { ...snippet, id: crypto.randomUUID() }],
        lastSaved: Date.now(),
      })),

      updateSnippet: (id, updates) => set(s => ({
        snippets: s.snippets.map(sn => sn.id === id ? { ...sn, ...updates } : sn),
        lastSaved: Date.now(),
      })),

      deleteSnippet: (id) => set(s => ({
        snippets: s.snippets.filter(sn => sn.id !== id),
        lastSaved: Date.now(),
      })),

      // ── Settings ───────────────────────────────────────────────────────
      updatePracticeSettings: (updates) => set(s => ({
        practiceSettings: { ...s.practiceSettings, ...updates },
        lastSaved: Date.now(),
      })),
    }),
    {
      name: 'tjil-platform-v2',
      storage: safeStorage as any,
      partialize: (state) => ({
        evaluations: state.evaluations.map(e => ({
          ...e,
          client: { ...e.client, profilePhoto: '' }, // Strip photos from localStorage
        })),
        snippets: state.snippets,
        practiceSettings: state.practiceSettings,
      }),
    }
  )
);
