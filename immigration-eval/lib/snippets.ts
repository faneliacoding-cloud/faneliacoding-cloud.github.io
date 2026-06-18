'use client';
/**
 * TJIL Immigration Evaluation Platform — Default Clinical Snippets
 * Professional clinical language templates for immigration evaluations
 */
import type { Snippet } from './types';

export const DEFAULT_SNIPPETS: Snippet[] = [
  // ── Diagnostic ─────────────────────────────────────────────────────────────
  {
    id: 'snip-ptsd-dx',
    category: 'diagnostic',
    title: 'PTSD Diagnosis Statement',
    content: 'Based on a comprehensive clinical evaluation, the client meets the full diagnostic criteria for Posttraumatic Stress Disorder (PTSD) as outlined in the DSM-5 (F43.10). The client demonstrates clinically significant symptoms across all four PTSD symptom clusters: intrusive re-experiencing, persistent avoidance, negative alterations in cognition and mood, and marked alterations in arousal and reactivity. These symptoms have persisted for more than one month and cause clinically significant distress and impairment in social, occupational, and other important areas of functioning.',
    isDefault: true,
  },
  {
    id: 'snip-mdd-dx',
    category: 'diagnostic',
    title: 'Major Depression Statement',
    content: 'The client meets diagnostic criteria for Major Depressive Disorder, Recurrent Episode, Moderate (F33.1) as defined by the DSM-5. The client presents with pervasive depressed mood, markedly diminished interest in activities, significant changes in appetite and sleep patterns, psychomotor retardation, fatigue, feelings of worthlessness, and difficulty concentrating. These symptoms represent a change from previous functioning and are present nearly every day for a period exceeding two weeks.',
    isDefault: true,
  },
  {
    id: 'snip-gad-dx',
    category: 'diagnostic',
    title: 'GAD Statement',
    content: 'Clinical assessment reveals that the client meets diagnostic criteria for Generalized Anxiety Disorder (F41.1) as defined in the DSM-5. The client reports excessive anxiety and worry occurring more days than not for at least six months, with difficulty controlling the worry. Associated symptoms include restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbance. The anxiety and worry cause clinically significant distress and functional impairment.',
    isDefault: true,
  },

  // ── Symptom Impact ─────────────────────────────────────────────────────────
  {
    id: 'snip-sleep-impact',
    category: 'symptom_impact',
    title: 'Sleep Disruption Impact',
    content: 'The client reports chronic and severe sleep disturbance directly attributable to the traumatic experiences described. The client experiences recurrent nightmares related to the trauma, initial and middle insomnia, and hypervigilance that prevents restful sleep. The client reports averaging only 3–4 hours of fragmented sleep per night, resulting in significant daytime fatigue that impairs concentration, emotional regulation, occupational functioning, and the ability to care for daily responsibilities.',
    isDefault: true,
  },
  {
    id: 'snip-functional-impairment',
    category: 'symptom_impact',
    title: 'Functional Impairment Summary',
    content: 'The client\'s psychological symptoms result in significant functional impairment across multiple domains of daily living. Occupationally, the client has difficulty maintaining employment due to concentration deficits, avoidance behaviors, and emotional dysregulation. Socially, the client has become increasingly isolated, avoids interpersonal contact, and reports difficulty trusting others. In terms of self-care, the client reports neglecting personal hygiene, nutrition, and medical needs during periods of symptom exacerbation.',
    isDefault: true,
  },
  {
    id: 'snip-concentration',
    category: 'symptom_impact',
    title: 'Concentration Difficulties',
    content: 'The client demonstrates marked difficulty with concentration and sustained attention, consistent with the cognitive disruption commonly observed in individuals with PTSD and major depression. During the evaluation, the client required questions to be repeated on multiple occasions and lost track of the conversational thread. The client reports that these cognitive difficulties significantly interfere with the ability to complete work tasks, manage household responsibilities, and engage in language acquisition efforts.',
    isDefault: true,
  },

  // ── Trauma Summary ─────────────────────────────────────────────────────────
  {
    id: 'snip-persecution-framework',
    category: 'trauma_summary',
    title: 'Persecution Narrative Framework',
    content: 'The client provides a detailed, consistent, and emotionally congruent account of persecution in the country of origin. The narrative includes specific incidents of harm or threats of harm on account of a protected ground. The client\'s psychological presentation, including the onset and trajectory of symptoms, is fully consistent with the reported traumatic experiences. The level of detail, the presence of sensory memories, and the emotional responses observed during the clinical interview lend credibility to the client\'s account.',
    isDefault: true,
  },
  {
    id: 'snip-dv-pattern',
    category: 'trauma_summary',
    title: 'Domestic Violence Pattern',
    content: 'The client describes a pattern of intimate partner violence characterized by escalating physical, emotional, psychological, and financial abuse. The pattern is consistent with coercive control dynamics well-documented in the clinical literature. The client reports a cycle of tension-building, acute battering, and reconciliation phases that created a climate of fear and psychological captivity. The psychological impact of this sustained abuse has resulted in complex trauma responses including hypervigilance, learned helplessness, and profound disruption of the client\'s sense of self and safety.',
    isDefault: true,
  },

  // ── Recommendation ─────────────────────────────────────────────────────────
  {
    id: 'snip-treatment-rec',
    category: 'recommendation',
    title: 'Treatment Recommendation',
    content: 'It is this evaluator\'s professional recommendation that the client receive ongoing individual psychotherapy utilizing trauma-focused evidence-based interventions such as Cognitive Processing Therapy (CPT) or Prolonged Exposure (PE). Additionally, the client would benefit from a psychiatric medication evaluation to address the severity of depressive and anxious symptomatology. Treatment should be provided by a clinician with expertise in trauma and, ideally, cross-cultural competency and access to interpretation services.',
    isDefault: true,
  },
  {
    id: 'snip-return-risk',
    category: 'recommendation',
    title: 'Return Risk Statement',
    content: 'In my professional clinical opinion, returning the client to the country of origin would constitute a severe and potentially irreversible risk to the client\'s psychological well-being. The client\'s current symptomatology would be significantly exacerbated by re-exposure to the environment and individuals associated with the traumatic experiences. The client presents with a well-founded fear of return that is psychologically genuine and consistent with the documented trauma history. Repatriation would likely precipitate a psychiatric crisis, including the potential for suicidal ideation and complete functional decompensation.',
    isDefault: true,
  },

  // ── Limitations ────────────────────────────────────────────────────────────
  {
    id: 'snip-limitations',
    category: 'limitations',
    title: 'Evaluation Limitations Disclaimer',
    content: 'This evaluation is based upon a clinical interview, behavioral observations, self-report measures, and review of available documents. The evaluator did not independently verify the factual claims made by the client. This evaluation represents a clinical assessment conducted at a specific point in time and reflects the client\'s presentation during the evaluation sessions. Cultural and linguistic factors were considered throughout the assessment process, and an interpreter was utilized where necessary. The findings and opinions expressed herein are held to a reasonable degree of clinical certainty.',
    isDefault: true,
  },

  // ── Follow-up ──────────────────────────────────────────────────────────────
  {
    id: 'snip-followup',
    category: 'follow_up',
    title: 'Follow-up Recommendation',
    content: 'A follow-up evaluation is recommended in 6 to 12 months, or sooner if the client\'s immigration case status changes, to reassess symptom severity and document any changes in psychological functioning. Ongoing monitoring is particularly important given the chronic nature of the client\'s symptoms and the ongoing psychosocial stressors related to immigration proceedings. This evaluator is available for additional consultation, testimony, or supplemental documentation as needed by the client\'s legal team.',
    isDefault: true,
  },
];
