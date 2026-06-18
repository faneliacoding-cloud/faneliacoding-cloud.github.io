// @ts-nocheck
'use client';
/**
 * Form Validation Engine
 * Production-level validation for all evaluation form sections
 */
import type { Evaluation } from './store';

export interface ValidationError {
  field: string;
  section: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  completeness: number; // 0-100 percentage
}

// ── Email validation ─────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  if (!email) return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Phone formatting ─────────────────────────────────────────────────────────
export function formatPhone(raw: string): string {
  const hasPlus = raw.trimStart().startsWith('+');
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (hasPlus && !raw.trimStart().startsWith('+')) {
    return `+${raw}`;
  }
  if (hasPlus) {
    return raw;
  }
  return raw;
}

// ── Date validation ──────────────────────────────────────────────────────────
function isValidDate(dateStr: string): boolean {
  if (!dateStr) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function isFutureDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date > new Date();
}

// ── Section validators ───────────────────────────────────────────────────────

function validateSection1(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const c = eval_.clientInfo;

  if (!c.fullName.trim()) {
    errors.push({ field: 'fullName', section: 0, message: 'Full legal name is required', severity: 'error' });
  }
  if (!c.dateOfBirth) {
    errors.push({ field: 'dateOfBirth', section: 0, message: 'Date of birth is required', severity: 'error' });
  } else if (isFutureDate(c.dateOfBirth)) {
    errors.push({ field: 'dateOfBirth', section: 0, message: 'Date of birth cannot be in the future', severity: 'error' });
  }
  if (!c.nationality.trim()) {
    errors.push({ field: 'nationality', section: 0, message: 'Nationality is required', severity: 'error' });
  }
  if (!c.countryOfOrigin) {
    errors.push({ field: 'countryOfOrigin', section: 0, message: 'Country of origin is required', severity: 'error' });
  }
  if (c.email && !isValidEmail(c.email)) {
    errors.push({ field: 'email', section: 0, message: 'Invalid email address format', severity: 'error' });
  }
  if (!c.evaluationDates.trim()) {
    errors.push({ field: 'evaluationDates', section: 0, message: 'Evaluation dates are recommended', severity: 'warning' });
  }

  return errors;
}

function validateSection2(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const cl = eval_.clinicianInfo;

  if (!cl.name.trim()) {
    errors.push({ field: 'clinicianName', section: 1, message: 'Clinician name is required', severity: 'error' });
  }
  if (!cl.licenseType) {
    errors.push({ field: 'licenseType', section: 1, message: 'License type is required', severity: 'error' });
  }
  if (!cl.licenseNumber.trim()) {
    errors.push({ field: 'licenseNumber', section: 1, message: 'License number is required', severity: 'error' });
  }
  if (cl.email && !isValidEmail(cl.email)) {
    errors.push({ field: 'clinicianEmail', section: 1, message: 'Invalid clinician email format', severity: 'error' });
  }

  return errors;
}

function validateSection3(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!eval_.caseSummary.summary.trim()) {
    errors.push({ field: 'caseSummary', section: 2, message: 'Case summary is required', severity: 'error' });
  }
  return errors;
}

function validateSection4(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const t = eval_.traumaHistory;

  if (!t.traumaCategory) {
    errors.push({ field: 'traumaCategory', section: 3, message: 'Trauma category is required', severity: 'error' });
  }
  if (!t.descriptionOfEvents.trim()) {
    errors.push({ field: 'traumaDescription', section: 3, message: 'Description of traumatic events is required', severity: 'error' });
  }
  if (!t.whyCantReturn.trim()) {
    errors.push({ field: 'whyCantReturn', section: 3, message: 'Reason client cannot return is recommended', severity: 'warning' });
  }

  return errors;
}

function validateSection5(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const ps = eval_.psychSymptoms;
  if (!ps.depressionSeverity || ps.depressionSeverity === 'None') {
    errors.push({ field: 'depressionSeverity', section: 4, message: 'Depression severity should be assessed', severity: 'warning' });
  }
  if (!ps.anxietySeverity || ps.anxietySeverity === 'None') {
    errors.push({ field: 'anxietySeverity', section: 4, message: 'Anxiety severity should be assessed', severity: 'warning' });
  }
  return errors;
}

function validateSection6(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const mse = eval_.mentalStatusExam;
  if (!mse.appearance.trim()) {
    errors.push({ field: 'appearance', section: 5, message: 'MSE appearance is recommended', severity: 'warning' });
  }
  if (!mse.mood.trim()) {
    errors.push({ field: 'mood', section: 5, message: 'MSE mood is recommended', severity: 'warning' });
  }
  if (!mse.affect.trim()) {
    errors.push({ field: 'affect', section: 5, message: 'MSE affect is recommended', severity: 'warning' });
  }
  return errors;
}

function validateSection7(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const { phq9, gad7 } = eval_;
  // PHQ-9: each question should be 0-3
  for (let i = 1; i <= 9; i++) {
    const val = phq9[`q${i}` as keyof typeof phq9] as number;
    if (val < 0 || val > 3) {
      errors.push({ field: `phq9_q${i}`, section: 6, message: `PHQ-9 question ${i} must be 0-3`, severity: 'error' });
    }
  }
  // GAD-7: each question should be 0-3
  for (let i = 1; i <= 7; i++) {
    const val = gad7[`q${i}` as keyof typeof gad7] as number;
    if (val < 0 || val > 3) {
      errors.push({ field: `gad7_q${i}`, section: 6, message: `GAD-7 question ${i} must be 0-3`, severity: 'error' });
    }
  }
  return errors;
}

function validateSection8(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const { pcl5 } = eval_;
  // PCL-5: each question should be 0-4
  for (let i = 1; i <= 20; i++) {
    const val = pcl5[`q${i}` as keyof typeof pcl5] as number;
    if (val < 0 || val > 4) {
      errors.push({ field: `pcl5_q${i}`, section: 7, message: `PCL-5 question ${i} must be 0-4`, severity: 'error' });
    }
  }
  return errors;
}

function validateSection9(eval_: Evaluation): ValidationError[] {
  const errors: ValidationError[] = [];
  const f = eval_.findings;

  if (f.diagnoses.length === 0) {
    errors.push({ field: 'diagnoses', section: 8, message: 'At least one DSM-5 diagnosis is required', severity: 'error' });
  }
  if (!f.clinicalImpression.trim()) {
    errors.push({ field: 'clinicalImpression', section: 8, message: 'Clinical impression is required', severity: 'error' });
  }
  if (!f.recommendations.trim()) {
    errors.push({ field: 'recommendations', section: 8, message: 'Professional recommendations are required', severity: 'error' });
  }
  if (!f.riskAssessment.trim()) {
    errors.push({ field: 'riskAssessment', section: 8, message: 'Risk assessment is recommended', severity: 'warning' });
  }

  return errors;
}

// ── Full evaluation validation ───────────────────────────────────────────────

export function validateEvaluation(eval_: Evaluation): ValidationResult {
  const allErrors = [
    ...validateSection1(eval_),
    ...validateSection2(eval_),
    ...validateSection3(eval_),
    ...validateSection4(eval_),
    ...validateSection5(eval_),
    ...validateSection6(eval_),
    ...validateSection7(eval_),
    ...validateSection8(eval_),
    ...validateSection9(eval_),
  ];

  const errors = allErrors.filter(e => e.severity === 'error');
  const warnings = allErrors.filter(e => e.severity === 'warning');

  // Completeness scoring
  let filled = 0;
  let total = 0;

  // Client info fields
  const cFields = ['fullName', 'dateOfBirth', 'nationality', 'countryOfOrigin'] as const;
  cFields.forEach(f => { total++; if (eval_.clientInfo[f]) filled++; });

  // Clinician fields
  const clFields = ['name', 'licenseType', 'licenseNumber'] as const;
  clFields.forEach(f => { total++; if (eval_.clinicianInfo[f]) filled++; });

  // Case summary
  total++; if (eval_.caseSummary.summary) filled++;

  // Trauma
  total++; if (eval_.traumaHistory.traumaCategory) filled++;
  total++; if (eval_.traumaHistory.descriptionOfEvents) filled++;

  // Findings
  total++; if (eval_.findings.diagnoses.length > 0) filled++;
  total++; if (eval_.findings.clinicalImpression) filled++;
  total++; if (eval_.findings.recommendations) filled++;

  const completeness = total > 0 ? Math.round((filled / total) * 100) : 0;

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    completeness,
  };
}

// ── Export validation ────────────────────────────────────────────────────────

export function validateForExport(eval_: Evaluation): { canExport: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!eval_.clientInfo.fullName.trim()) {
    issues.push('Client name is missing');
  }
  if (!eval_.clinicianInfo.name.trim()) {
    issues.push('Clinician name is missing');
  }
  if (!eval_.caseSummary.summary.trim()) {
    issues.push('Case summary is empty');
  }
  if (eval_.findings.diagnoses.length === 0) {
    issues.push('No diagnoses have been added');
  }
  if (!eval_.findings.clinicalImpression.trim()) {
    issues.push('Clinical impression is empty');
  }

  return { canExport: issues.length === 0, issues };
}
