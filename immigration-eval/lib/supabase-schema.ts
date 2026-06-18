'use client';
/**
 * TJIL Immigration Evaluation Platform — Supabase Schema Documentation
 * SQL table definitions for future backend migration
 * This file is documentation only — it is NOT executed against any database.
 */

export const SCHEMA_VERSION = '1.0.0';

export const USERS_TABLE = `
-- Users table: authentication and profile
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'evaluator' CHECK (role IN ('admin', 'evaluator', 'reviewer', 'assistant')),
  practice_id UUID REFERENCES practices(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const PRACTICES_TABLE = `
-- Practices table: organization/practice info
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  report_header_text TEXT DEFAULT '',
  signature_block TEXT DEFAULT '',
  subscription_tier TEXT NOT NULL DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'professional', 'practice')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const CLIENTS_TABLE = `
-- Clients table: client demographics
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  date_of_birth DATE,
  age TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  pronouns TEXT DEFAULT 'She/Her',
  nationality TEXT DEFAULT '',
  country_of_origin TEXT DEFAULT '',
  ethnicity TEXT DEFAULT '',
  spoken_languages TEXT DEFAULT '',
  marital_status TEXT DEFAULT '',
  number_of_children TEXT DEFAULT '',
  contact_email TEXT DEFAULT '',
  contact_phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  referring_attorney TEXT DEFAULT '',
  a_number TEXT DEFAULT '',
  profile_photo TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_clients_practice ON clients(practice_id);
CREATE INDEX idx_clients_name ON clients(full_name);
`;

export const EVALUATIONS_TABLE = `
-- Evaluations table: core evaluation record
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  evaluator_id UUID REFERENCES users(id) ON DELETE SET NULL,
  case_type TEXT NOT NULL DEFAULT 'asylum',
  status TEXT NOT NULL DEFAULT 'draft',
  current_step INT NOT NULL DEFAULT 0,
  completed_steps INT[] DEFAULT '{}',
  interview_date DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_evaluations_client ON evaluations(client_id);
CREATE INDEX idx_evaluations_practice ON evaluations(practice_id);
CREATE INDEX idx_evaluations_status ON evaluations(status);
`;

export const EVALUATION_SECTIONS_TABLE = `
-- Evaluation sections: JSON storage for each step
CREATE TABLE evaluation_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  step_key TEXT NOT NULL, -- e.g., 'step01', 'step02', ...
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(evaluation_id, step_key)
);
CREATE INDEX idx_sections_eval ON evaluation_sections(evaluation_id);
`;

export const DOCUMENTS_TABLE = `
-- Documents table: uploaded evidence files
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'other',
  filename TEXT NOT NULL DEFAULT '',
  mime_type TEXT DEFAULT '',
  size_bytes BIGINT DEFAULT 0,
  storage_path TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_documents_eval ON documents(evaluation_id);
`;

export const REPORTS_TABLE = `
-- Reports table: generated report records
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  format TEXT NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf', 'docx')),
  version INT NOT NULL DEFAULT 1,
  storage_path TEXT DEFAULT '',
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'finalized')),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_reports_eval ON reports(evaluation_id);
`;

export const TEMPLATES_TABLE = `
-- Templates table: custom report templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  case_type TEXT NOT NULL DEFAULT 'asylum',
  storage_path TEXT DEFAULT '',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_templates_practice ON templates(practice_id);
`;

export const SNIPPETS_TABLE = `
-- Snippets table: reusable clinical text snippets
CREATE TABLE snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'diagnostic',
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_snippets_practice ON snippets(practice_id);
CREATE INDEX idx_snippets_category ON snippets(category);
`;

export const SUBSCRIPTIONS_TABLE = `
-- Subscriptions table: billing and plan management
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'practice')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  evaluations_this_month INT DEFAULT 0,
  evaluations_limit INT DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_subscriptions_practice ON subscriptions(practice_id);
`;

/** All schema SQL concatenated for reference */
export const FULL_SCHEMA = [
  USERS_TABLE,
  PRACTICES_TABLE,
  CLIENTS_TABLE,
  EVALUATIONS_TABLE,
  EVALUATION_SECTIONS_TABLE,
  DOCUMENTS_TABLE,
  REPORTS_TABLE,
  TEMPLATES_TABLE,
  SNIPPETS_TABLE,
  SUBSCRIPTIONS_TABLE,
].join('\n');
