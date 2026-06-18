'use client';
/**
 * StatusPill — Renders a colored status indicator pill
 * Uses CASE_STATUS_CONFIG for consistent styling across the platform
 */
import { CaseStatus, CASE_STATUS_CONFIG } from '@/lib/types';

interface StatusPillProps {
  status: CaseStatus;
}

export default function StatusPill({ status }: StatusPillProps) {
  const config = CASE_STATUS_CONFIG[status];

  return (
    <span
      className="status-pill"
      style={{
        color: config.color,
        background: config.bg,
      }}
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
