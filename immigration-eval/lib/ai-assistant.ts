'use client';
/**
 * TJIL Immigration Evaluation Platform — AI Assistant Module
 * Quick prompts and placeholder AI integration
 */

export interface AIPrompt {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const AI_PROMPTS: AIPrompt[] = [
  {
    id: 'refine-narrative',
    title: 'Refine Trauma Narrative',
    icon: '📝',
    description: 'Help organize and structure the client\'s trauma narrative for clinical documentation.',
  },
  {
    id: 'suggest-diagnoses',
    title: 'Suggest Diagnoses',
    icon: '🧠',
    description: 'Review symptom presentation and suggest appropriate DSM-5 diagnostic considerations.',
  },
  {
    id: 'clinical-language',
    title: 'Improve Clinical Language',
    icon: '✍️',
    description: 'Refine notes into professional clinical language suitable for legal proceedings.',
  },
  {
    id: 'mse-draft',
    title: 'Draft MSE Section',
    icon: '🔍',
    description: 'Generate a mental status examination narrative from observation notes.',
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment Framework',
    icon: '⚠️',
    description: 'Structure risk factors and protective factors into a comprehensive assessment.',
  },
  {
    id: 'treatment-plan',
    title: 'Treatment Recommendations',
    icon: '💊',
    description: 'Generate evidence-based treatment recommendations based on diagnoses and presentation.',
  },
  {
    id: 'country-conditions',
    title: 'Country Conditions Brief',
    icon: '🌍',
    description: 'Summarize relevant country conditions to contextualize the client\'s experiences.',
  },
];

/**
 * Placeholder AI response function
 * In production, this would connect to an AI API (e.g., OpenAI, Anthropic)
 */
export async function getAIResponse(prompt: string, context: string): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  return `**AI Assistant — Integration Pending**

Thank you for your request. The AI clinical assistant is currently in development and will be available in an upcoming release.

**Your prompt:** "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"

**What this feature will do:**
• Analyze the evaluation context you provide
• Generate professional clinical language suggestions
• Offer DSM-5 diagnostic considerations based on reported symptoms
• Draft section narratives following immigration evaluation best practices

**Important:** All AI-generated content will require clinician review and approval before inclusion in any report. The AI assistant is designed to support — never replace — professional clinical judgment.

To enable this feature, configure your API credentials in Settings → AI Integration.`;
}
