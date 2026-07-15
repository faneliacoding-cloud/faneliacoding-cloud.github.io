// @ts-nocheck
'use client';
/**
 * AI Knowledge Engine
 * Built-in knowledge base for immigration evaluation clinical and legal questions.
 * Uses keyword matching + scoring to provide expert-level responses on:
 * - Immigration law (asylum, VAWA, U visa, hardship waivers, etc.)
 * - Mental health assessment (PTSD, depression, anxiety, trauma)
 * - Clinical evaluation methodology (MSE, DSM-5, PCL-5, PHQ-9, GAD-7)
 * - Report writing best practices
 * - Credibility assessment
 */

export interface KnowledgeEntry {
  keywords: string[];
  category: 'legal' | 'clinical' | 'assessment' | 'report' | 'procedure';
  question: string;
  answer: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ── ASYLUM ─────────────────────────────────────────────────────────────────
  {
    keywords: ['asylum', 'asylee', 'persecution', 'refugee', 'well-founded fear'],
    category: 'legal',
    question: 'What is the legal standard for asylum?',
    answer: `**Asylum Legal Standard**

Under INA § 208, an applicant must demonstrate a **well-founded fear of persecution** on account of one of five protected grounds:

1. **Race**
2. **Religion**
3. **Nationality**
4. **Membership in a particular social group**
5. **Political opinion**

**Key requirements:**
• The applicant must file within **one year** of arrival (with exceptions for changed/extraordinary circumstances)
• Must demonstrate the government is either the persecutor or **unable/unwilling to control** the persecutor
• Past persecution creates a **presumption** of future persecution (rebuttable)
• Must show they cannot safely relocate within their country

**Clinical relevance:** Your evaluation should document how the client's psychological symptoms are consistent with the reported persecution, and how return to the country of origin would likely exacerbate symptoms.`
  },
  {
    keywords: ['one year', 'filing deadline', 'late filing', 'delayed', 'extraordinary circumstances', 'changed circumstances'],
    category: 'legal',
    question: 'What about the one-year filing deadline for asylum?',
    answer: `**One-Year Filing Deadline for Asylum**

Applicants must generally file within **one year of arrival** in the U.S. However, there are exceptions:

**Changed Circumstances:**
• Changes in country conditions
• Changes in U.S. law
• Change in applicant's personal circumstances (e.g., coming out as LGBTQ+)

**Extraordinary Circumstances:**
• Serious illness or mental/physical disability
• Legal disability (e.g., unaccompanied minor)
• Ineffective assistance of counsel
• Maintained other legal status (TPS, student visa)
• Death or serious illness of legal representative

**Clinical role:** As evaluators, we can document how **PTSD avoidance symptoms**, severe depression, fear, and trauma responses created psychological barriers that prevented timely filing. This is one of the most important contributions a clinical evaluation can make.

Common clinical explanations include:
• PTSD avoidance of trauma-related material
• Dissociation and emotional numbing
• Fear of authority figures
• Cognitive impairment from depression
• Distrust and hypervigilance`
  },
  {
    keywords: ['credibility', 'credible', 'reliable', 'believable', 'malingering', 'fabricat', 'lying', 'truthful'],
    category: 'clinical',
    question: 'How should I assess credibility in an immigration evaluation?',
    answer: `**Credibility Assessment in Immigration Evaluations**

Credibility is one of the most critical aspects of your evaluation. Consider these factors:

**Indicators of Credibility:**
1. **Consistency** — Details remain consistent across multiple interviews, even when questioned repeatedly
2. **Lack of over-endorsement** — Client doesn't report every symptom at maximum severity; denies some symptoms entirely
3. **Visible symptoms/body language** — Observable affect consistent with reported experiences (tearfulness, hypervigilance, restricted affect)
4. **Emotional complexity** — Account contains shame, ambivalence, humiliation, and nuanced emotions (difficult to fabricate)
5. **Spontaneous corrections** — Client self-corrects or acknowledges uncertainty about details
6. **Reluctance to disclose** — Hesitation around shameful material (sexual violence, LGBTQ identity)

**Trauma and Memory:**
• Fragmented, non-linear recall is **consistent with trauma**, not evidence of fabrication
• Difficulty with chronology and specific details is expected in PTSD
• Emotional flooding during recall indicates authentic trauma response
• Peripheral details may shift while core narrative remains stable

**Red flags for malingering (rare in this population):**
• Symptom endorsement exactly matching textbook descriptions
• Dramatic inconsistencies in core narrative
• Endorsement of absurd or incompatible symptoms
• Coaching indicators (rehearsed-sounding responses)

**Clinical note:** Include the "Impact of Trauma on Memory" addendum to educate the court about why trauma survivors may appear inconsistent.`
  },
  // ── VAWA ──────────────────────────────────────────────────────────────────
  {
    keywords: ['vawa', 'violence against women', 'domestic violence', 'abuse', 'abusive spouse', 'battered', 'self-petition'],
    category: 'legal',
    question: 'What are the requirements for a VAWA evaluation?',
    answer: `**VAWA (Violence Against Women Act) Evaluation**

VAWA allows victims of domestic violence by a U.S. citizen or permanent resident spouse, parent, or child to self-petition for immigration relief.

**Legal requirements:**
• Marriage to (or child/parent of) a U.S. citizen or LPR who is abusive
• Residence in the United States
• Good moral character
• Battery or extreme cruelty during the relationship
• Entered marriage in good faith (not solely for immigration)

**Clinical evaluation should document:**
1. **Nature and pattern of abuse** — physical, emotional, sexual, financial, coercive control
2. **Psychological impact** — PTSD, depression, anxiety, learned helplessness
3. **Power and control dynamics** — isolation, threats, immigration-related abuse
4. **Barriers to leaving** — financial dependence, fear, cultural factors, children
5. **Good faith marriage indicators** — emotional investment, shared plans, genuine relationship

**Common diagnoses:**
• PTSD (F43.10-12)
• Major Depressive Disorder (F32.x/F33.x)
• Generalized Anxiety Disorder (F41.1)
• Adjustment Disorder (F43.2x)

**Key clinical consideration:** Document the "cycle of violence" and how trauma bonding/learned helplessness prevented the client from leaving sooner.`
  },
  // ── U VISA ────────────────────────────────────────────────────────────────
  {
    keywords: ['u visa', 'u-visa', 'crime victim', 'law enforcement certification', 'substantial harm'],
    category: 'legal',
    question: 'What should a U Visa evaluation cover?',
    answer: `**U Visa Evaluation**

The U visa is for victims of qualifying crimes who have suffered substantial physical or mental abuse and have been helpful to law enforcement.

**Qualifying crimes include:** domestic violence, sexual assault, trafficking, kidnapping, stalking, witness tampering, torture, and others.

**Evaluation should document:**
1. **Substantial physical or mental abuse** — This is the primary clinical question
2. **Nature of the qualifying crime** and its impact
3. **Current psychological symptoms** resulting from the crime
4. **Functional impairment** in daily life, work, relationships
5. **Ongoing treatment needs**

**"Substantial abuse" factors (from regulations):**
• Nature and severity of the injury
• Severity of the perpetrator's conduct
• Duration of victimization
• Whether permanent/serious harm occurred
• Whether the victim was physically or psychologically incapacitated

**Clinical tip:** Focus on the **before/after** comparison — how was the client functioning before the crime vs. now? Document specific functional impairments (can't work, can't sleep, can't be in relationships, afraid to leave home).`
  },
  // ── EXTREME HARDSHIP ──────────────────────────────────────────────────────
  {
    keywords: ['hardship', 'extreme hardship', 'waiver', 'qualifying relative', 'i-601', 'inadmissibility'],
    category: 'legal',
    question: 'What constitutes extreme hardship in a waiver case?',
    answer: `**Extreme Hardship Evaluations**

Extreme hardship waivers (I-601/I-601A) require showing that a **qualifying relative** (U.S. citizen or LPR spouse or parent) would suffer extreme hardship if the applicant is denied admission.

**Hardship factors to document:**

**Psychological:**
• Depression, anxiety, grief if separated
• Impact on qualifying relative's mental health treatment
• Children's psychological wellbeing
• Caregiver burden and stress

**Financial:**
• Loss of income/financial support
• Cost of maintaining two households
• Loss of health insurance
• Economic conditions in home country

**Medical:**
• Qualifying relative's medical conditions
• Availability of treatment in home country
• Disruption of ongoing treatment

**Social/Family:**
• Separation from children
• Disruption of family unit
• Loss of community support
• Educational disruption for children

**Country conditions:**
• Safety concerns
• Limited medical/mental health resources
• Economic instability

**Clinical tip:** Interview the qualifying relative separately and document their specific emotional and psychological response to the prospect of separation or relocation. Use concrete examples, not generalizations.`
  },
  // ── SIJS ──────────────────────────────────────────────────────────────────
  {
    keywords: ['sijs', 'special immigrant juvenile', 'juvenile', 'minor', 'child', 'abuse neglect abandonment', 'unaccompanied'],
    category: 'legal',
    question: 'What does an SIJS evaluation involve?',
    answer: `**Special Immigrant Juvenile Status (SIJS) Evaluation**

SIJS is for children under 21 who have been abused, neglected, or abandoned by one or both parents.

**The evaluation must support findings that:**
1. The child has been **abused, neglected, or abandoned** by one or both parents
2. It is not in the child's best interest to return to their home country
3. Reunification with the abusive parent is not viable

**Clinical considerations:**
• Use **developmentally appropriate** assessment methods
• Document the child's understanding of their situation
• Assess attachment patterns and their disruption
• Evaluate impact of separation, migration stress, and acculturation
• Screen for PTSD, depression, anxiety, and developmental delays
• Document educational functioning and peer relationships

**Age-appropriate tools:**
• For younger children: behavioral observations, drawing, play
• For adolescents: standard self-report measures adapted for age
• Collateral information from caregivers, teachers, social workers

**Important:** Be cautious about how much the child knows about their immigration case. Coordinate with the attorney about what is appropriate to discuss.`
  },
  // ── PTSD ──────────────────────────────────────────────────────────────────
  {
    keywords: ['ptsd', 'post-traumatic', 'posttraumatic', 'trauma', 'f43.1', 'pcl-5', 'pcl5', 'flashback', 'nightmare', 'hypervigilance', 'avoidance'],
    category: 'clinical',
    question: 'How do I diagnose PTSD in immigration evaluations?',
    answer: `**PTSD Diagnosis in Immigration Evaluations (DSM-5)**

**DSM-5 Diagnostic Code:** F43.10 (unspecified), F43.11 (acute), F43.12 (chronic)

**Criterion A — Traumatic Event Exposure:**
Direct experience, witnessing, learning about close family/friend, or repeated exposure to aversive details of traumatic events.

**Criterion B — Intrusion Symptoms (≥1):**
• Intrusive memories
• Distressing dreams/nightmares
• Dissociative reactions (flashbacks)
• Psychological distress at reminders
• Physiological reactions to cues

**Criterion C — Avoidance (≥1):**
• Avoidance of distressing memories/thoughts/feelings
• Avoidance of external reminders

**Criterion D — Negative Cognitions/Mood (≥2):**
• Inability to remember important aspects
• Persistent negative beliefs
• Distorted blame of self/others
• Persistent negative emotional state
• Diminished interest in activities
• Feelings of detachment
• Inability to experience positive emotions

**Criterion E — Arousal/Reactivity (≥2):**
• Irritability/angry outbursts
• Reckless/self-destructive behavior
• Hypervigilance
• Exaggerated startle response
• Concentration problems
• Sleep disturbance

**Criterion F:** Duration > 1 month
**Criterion G:** Clinically significant distress/impairment
**Criterion H:** Not attributable to substance/medical condition

**PCL-5 Scoring:**
• Score range: 0–80
• **Cutoff score of 33** suggests probable PTSD
• Document scores by cluster for clinical detail`
  },
  // ── DEPRESSION ────────────────────────────────────────────────────────────
  {
    keywords: ['depression', 'depressive', 'depressed', 'phq-9', 'phq9', 'f32', 'f33', 'major depressive', 'mdd', 'sad', 'hopeless', 'suicidal'],
    category: 'clinical',
    question: 'How do I assess depression using the PHQ-9?',
    answer: `**Depression Assessment — PHQ-9**

**PHQ-9 Scoring Interpretation:**
• **0–4:** None to minimal depression
• **5–9:** Mild depression
• **10–14:** Moderate depression
• **15–19:** Moderately severe depression
• **20–27:** Severe depression

**DSM-5 Major Depressive Disorder Criteria (≥5 symptoms, ≥2 weeks):**
1. Depressed mood most of the day, nearly every day
2. Markedly diminished interest/pleasure (anhedonia)
3. Significant weight loss/gain or appetite change
4. Insomnia or hypersomnia
5. Psychomotor agitation or retardation
6. Fatigue or loss of energy
7. Feelings of worthlessness or excessive guilt
8. Diminished concentration or indecisiveness
9. Recurrent thoughts of death or suicidal ideation

*At least one symptom must be (1) or (2).*

**Common DSM-5 Codes:**
• F32.0 — Single episode, mild
• F32.1 — Single episode, moderate
• F32.2 — Single episode, severe
• F33.0/F33.1/F33.2 — Recurrent episodes

**In immigration evaluations:** Document the causal link between the traumatic experiences and the onset of depressive symptoms. Note functional impairments — inability to work, care for children, maintain relationships, or perform daily activities.

**Safety assessment:** Always document suicidal ideation screening, even when negative. This demonstrates clinical thoroughness.`
  },
  // ── ANXIETY ───────────────────────────────────────────────────────────────
  {
    keywords: ['anxiety', 'anxious', 'gad-7', 'gad7', 'generalized anxiety', 'f41', 'worry', 'panic', 'nervous', 'fear'],
    category: 'clinical',
    question: 'How do I assess anxiety using the GAD-7?',
    answer: `**Anxiety Assessment — GAD-7**

**GAD-7 Scoring Interpretation:**
• **0–4:** None to minimal anxiety
• **5–9:** Mild anxiety
• **10–14:** Moderate anxiety
• **15–21:** Severe anxiety

**DSM-5 Generalized Anxiety Disorder (F41.1) Criteria:**
1. Excessive anxiety and worry for ≥6 months about multiple events/activities
2. Difficulty controlling the worry
3. ≥3 of the following (only 1 for children):
   • Restlessness or feeling on edge
   • Being easily fatigued
   • Difficulty concentrating
   • Irritability
   • Muscle tension
   • Sleep disturbance
4. Clinically significant distress or impairment
5. Not attributable to substance/medical condition
6. Not better explained by another mental disorder

**Other anxiety disorders to consider:**
• **F41.0 — Panic Disorder:** Recurrent unexpected panic attacks with fear of future attacks
• **F40.10 — Social Anxiety Disorder:** Marked fear of social situations

**Clinical tip for immigration evals:** Many immigration clients present with anxiety that is situational (fear of deportation, court appearances) layered on top of trauma-based anxiety. Document both the chronic trait anxiety and the acute situational anxiety.`
  },
  // ── MSE ────────────────────────────────────────────────────────────────────
  {
    keywords: ['mental status', 'mse', 'mental status exam', 'appearance', 'affect', 'mood', 'orientation', 'thought process', 'insight', 'judgment'],
    category: 'assessment',
    question: 'How should I write the Mental Status Exam?',
    answer: `**Mental Status Exam (MSE) Guide for Immigration Evaluations**

Write the MSE as a **narrative paragraph** rather than a checklist. Key domains:

**1. Appearance & Behavior:**
"Ms. X is a [age]-year-old [gender] who arrived on time and was [grooming]. She appeared [physical description]."

**2. Psychomotor Activity:**
Normal, agitation (restlessness, fidgeting), or retardation (slowed movements, latency before responding)

**3. Speech:**
Rate (normal/pressured/slow), volume, tone, spontaneity, articulation

**4. Mood (client's report):**
"Client described her mood as '___'" — use the client's own words in quotes

**5. Affect (your observation):**
Range (broad/restricted/flat), congruence with mood, quality (tearful, anxious, fearful, blunted)

**6. Thought Process:**
Logical and goal-directed vs. tangential, circumstantial, loose, flight of ideas

**7. Thought Content:**
Suicidal/homicidal ideation, delusions, obsessions, phobias, preoccupations

**8. Perceptions:**
Hallucinations (auditory/visual), illusions, dissociative experiences

**9. Cognition & Orientation:**
Oriented x4 (person, place, time, situation), attention, memory, fund of knowledge

**10. Insight & Judgment:**
Good/fair/poor — does client understand their condition? Can they make safe decisions?

**Clinical tip:** In immigration evals, highlight symptoms you **observed** that corroborate the client's report — tearfulness, hypervigilance, restricted affect, psychomotor agitation. These observable symptoms strengthen credibility.`
  },
  // ── TRAUMA AND MEMORY ─────────────────────────────────────────────────────
  {
    keywords: ['memory', 'inconsistency', 'inconsistent', 'recall', 'remember', 'forget', 'confusion', 'chronology', 'faulty', 'trauma memory'],
    category: 'clinical',
    question: 'Why are trauma survivors inconsistent in their accounts?',
    answer: `**Impact of Trauma on Memory**

This is a critical topic for immigration evaluations. Trauma fundamentally alters how memories are encoded, stored, and retrieved.

**Neurobiological basis:**
• During trauma, the amygdala (fear center) is hyperactivated while the hippocampus (memory organization) is suppressed
• This results in **fragmented, sensory-based memories** rather than coherent narratives
• The prefrontal cortex (executive function) goes offline, impairing chronological encoding

**Common memory effects in trauma survivors:**
1. **Fragmented recall** — memories stored as sensory fragments, not organized narratives
2. **Non-linear chronology** — inability to recount events in proper sequence
3. **Peripheral detail loss** — central emotional details preserved, peripheral facts lost
4. **State-dependent retrieval** — memories emerge differently depending on emotional state
5. **Dissociative amnesia** — gaps in memory for traumatic events
6. **Hypermnesia** — intrusive, vivid recall of certain aspects

**Why this matters in court:**
• Immigration judges may interpret inconsistencies as evidence of fabrication
• Your evaluation should explain that **inconsistency is actually consistent with trauma**
• Include the "Impact of Trauma on Memory" addendum in every report
• Document specific instances where the client struggled with chronology during your interview

**Clinical tip:** If the client's account has inconsistencies, address them directly in your report rather than ignoring them. Explain why the inconsistencies are clinically expected.`
  },
  // ── REPORT WRITING ────────────────────────────────────────────────────────
  {
    keywords: ['report', 'write', 'writing', 'narrative', 'draft', 'clinical narrative', 'professional', 'language', 'template'],
    category: 'report',
    question: 'How should I write the clinical evaluation report?',
    answer: `**Clinical Report Writing Best Practices**

**Structure your report:**
1. **Header** — Your credentials, client demographics, eval dates
2. **Referral & Purpose** — Who referred, why, your methodology
3. **History** — Early life, family, education, employment
4. **Immigration History** — Journey, arrival, current status
5. **Trauma Narrative** — Detailed account in client's words
6. **MSE** — Your clinical observations
7. **Symptoms** — Current psychological functioning
8. **Diagnoses** — DSM-5 codes with rationale
9. **Credibility** — Your clinical assessment of believability
10. **Findings** — Clinical conclusions linking trauma → symptoms
11. **Recommendations** — Treatment needs, risk if deported
12. **Addenda** — Score breakdowns, trauma & memory explanation

**Writing tips:**
• Use **direct quotes** from the client — they're powerful evidence
• Write in **third person** professional tone
• Be **specific** — "cried for 10 minutes" > "became emotional"
• Link symptoms to **specific traumatic events**
• Avoid advocacy language — present clinical findings objectively
• State your opinions as **clinical conclusions** based on evidence
• Include the **"not the client's therapist"** impartiality statement

**Common mistakes to avoid:**
• Using legal conclusions (don't say "she was persecuted")
• Over-advocating for the client
• Omitting the credibility assessment
• Failing to address inconsistencies
• Not linking symptoms to specific DSM-5 criteria`
  },
  // ── DIAGNOSES / DSM-5 ─────────────────────────────────────────────────────
  {
    keywords: ['dsm', 'dsm-5', 'diagnosis', 'diagnose', 'diagnostic', 'code', 'icd', 'f-code'],
    category: 'clinical',
    question: 'What are common DSM-5 diagnoses in immigration evaluations?',
    answer: `**Common DSM-5 Diagnoses in Immigration Evaluations**

**Trauma & Stressor-Related:**
• **F43.10** — PTSD, Unspecified
• **F43.11** — PTSD, Acute (symptoms < 3 months)
• **F43.12** — PTSD, Chronic (symptoms ≥ 3 months)
• **F43.0** — Acute Stress Disorder
• **F43.20–F43.25** — Adjustment Disorders (various specifiers)

**Depressive Disorders:**
• **F32.0/F32.1/F32.2** — MDD, Single Episode (mild/moderate/severe)
• **F33.0/F33.1/F33.2** — MDD, Recurrent (mild/moderate/severe)

**Anxiety Disorders:**
• **F41.1** — Generalized Anxiety Disorder
• **F41.0** — Panic Disorder
• **F40.10** — Social Anxiety Disorder

**Dissociative Disorders:**
• **F44.0** — Dissociative Amnesia
• **F44.81** — Dissociative Identity Disorder

**Other relevant codes:**
• **Z65.4** — Victim of Torture
• **Z60.0** — Problems Related to Acculturation
• **Z63.0** — Problems in Relationship with Spouse/Partner

**Clinical tip:** Most immigration clients will have **comorbid** diagnoses. PTSD + MDD + GAD is a very common triad. Document the diagnostic rationale for each, showing how each diagnosis is supported by specific criteria.`
  },
  // ── SUICIDAL IDEATION ─────────────────────────────────────────────────────
  {
    keywords: ['suicid', 'self-harm', 'self harm', 'safety', 'risk', 'danger', 'ideation', 'intent', 'plan'],
    category: 'clinical',
    question: 'How should I assess and document suicidal ideation?',
    answer: `**Suicidal Ideation Assessment in Immigration Evaluations**

**Always conduct a safety screening**, even if the client denies ideation. Document it either way.

**Assessment framework (Columbia Protocol):**
1. **Wish to be dead** — "Have you wished you were dead or wished you could go to sleep and not wake up?"
2. **Suicidal thoughts** — "Have you actually had any thoughts of killing yourself?"
3. **Intent** — "Have you been thinking about how you might do this?"
4. **Plan** — "Do you have a plan for how you would kill yourself?"
5. **Behavior** — "Have you ever done anything, started to do anything, or prepared to do anything to end your life?"

**Documenting in the report:**
• If **denied**: "Client denied current suicidal ideation, intent, and plan. No history of suicide attempts."
• If **endorsed**: Document frequency, intensity, duration, plan specificity, deterrents, access to means, and any safety interventions made

**Risk factors common in immigration population:**
• Separation from family/children
• Fear of deportation/return to danger
• Isolation and lack of social support
• History of torture or severe trauma
• Detention
• Loss of hope about case outcome

**Protective factors to note:**
• Children/family responsibilities
• Religious/cultural beliefs
• Future orientation (hopes, goals)
• Therapeutic relationship
• Community connections

**Important:** If a client endorses active suicidal ideation with plan/intent, you have a **duty to intervene** regardless of the evaluation context.`
  },
  // ── CULTURAL CONSIDERATIONS ───────────────────────────────────────────────
  {
    keywords: ['cultural', 'culture', 'interpreter', 'language', 'barrier', 'bias', 'competency', 'cross-cultural'],
    category: 'procedure',
    question: 'How do cultural factors affect immigration evaluations?',
    answer: `**Cultural Considerations in Immigration Evaluations**

**Language & Communication:**
• Use a **qualified interpreter** — never family members
• Document the interpreter's name and qualifications
• Allow extra time; interpreted interviews take 2-3x longer
• Note any communication difficulties

**Cultural expression of distress:**
• **Somatic symptoms** — many cultures express psychological distress through physical complaints (headaches, stomach pain, body aches)
• **Idioms of distress** — culture-specific expressions (e.g., "nervios," "susto," "ataque de nervios" in Latin American cultures)
• **Stigma** — mental health stigma may prevent full disclosure
• **Gender dynamics** — some clients may have difficulty discussing certain topics with evaluators of a different gender

**Assessment bias:**
• Standard assessment tools (PHQ-9, GAD-7, PCL-5) have been validated cross-culturally but may underestimate symptoms in some populations
• Somaticizers may score lower on mood-focused items
• Acquiescence bias in some cultures (tendency to agree)

**Trust and disclosure:**
• Trauma survivors from authoritarian regimes may distrust professionals
• LGBTQ+ clients may be afraid to disclose in the presence of interpreters from their community
• Discuss confidentiality explicitly at the start

**Best practices:**
• Acknowledge cultural differences respectfully
• Ask about culturally specific healing practices
• Consider the meaning of symptoms within the client's cultural framework
• Document your cultural competency considerations`
  },
  // ── CANCELLATION OF REMOVAL ───────────────────────────────────────────────
  {
    keywords: ['cancellation', 'removal', 'cancel', 'deportation', 'ten year', '10 year', 'exceptional hardship'],
    category: 'legal',
    question: 'What is cancellation of removal?',
    answer: `**Cancellation of Removal**

**Non-LPR Cancellation (INA § 240A(b)):**
Requires showing:
1. **10 years** continuous physical presence in the U.S.
2. **Good moral character** for 10 years
3. Not convicted of certain offenses
4. Removal would result in **"exceptional and extremely unusual hardship"** to a qualifying relative (U.S. citizen or LPR spouse, parent, or child)

**This is a very high standard** — must be substantially beyond what would normally be expected from deportation.

**Clinical evaluation should document:**
• Psychological impact on qualifying relatives if client is removed
• Children's attachment, developmental needs, educational disruption
• Qualifying relative's mental/physical health conditions
• How separation would worsen existing conditions
• Lack of adequate mental health resources in home country
• Financial and emotional dependence on the client

**Clinical tip:** Focus heavily on the **children's** psychological wellbeing. Courts are most receptive to evidence about how removal would harm U.S. citizen children's emotional development, attachment, educational stability, and access to necessary services.`
  },
  // ── T VISA ────────────────────────────────────────────────────────────────
  {
    keywords: ['t visa', 't-visa', 'trafficking', 'trafficked', 'forced labor', 'sex trafficking', 'human trafficking'],
    category: 'legal',
    question: 'What should a T Visa evaluation address?',
    answer: `**T Visa — Human Trafficking Evaluation**

T visas are for victims of severe forms of trafficking in persons.

**Types of trafficking:**
• **Sex trafficking** — commercial sex acts induced by force, fraud, or coercion (or involving minors)
• **Labor trafficking** — forced labor, involuntary servitude, debt bondage, peonage, slavery

**Evaluation should document:**
1. **Nature of the trafficking** — how they were recruited, transported, exploited
2. **Coercive control mechanisms** — threats, isolation, document confiscation, debt bondage
3. **Psychological impact** — trauma bonding, PTSD, depression, shame, dissociation
4. **Barriers to escape** — fear, dependency, cultural factors, language barriers
5. **Current functioning** — safety, symptoms, treatment needs
6. **Would suffer extreme hardship** if removed from the U.S.

**Common psychological effects:**
• Complex PTSD (sustained, repeated trauma)
• Stockholm syndrome / trauma bonding
• Severe shame and self-blame
• Dissociative symptoms
• Substance use (sometimes forced by traffickers)
• Trust difficulties

**Clinical note:** Trafficking survivors often do not self-identify as "trafficked." Use concrete behavioral descriptions rather than labels when interviewing.`
  },
  // ── N-648 ─────────────────────────────────────────────────────────────────
  {
    keywords: ['n-648', 'n648', 'disability waiver', 'naturalization', 'citizenship', 'english', 'civics'],
    category: 'legal',
    question: 'What is required for an N-648 disability waiver?',
    answer: `**N-648 Medical Certification for Disability Exceptions**

The N-648 waives the English and/or civics requirements for naturalization due to a physical or mental impairment.

**Requirements:**
1. A **medically determinable** physical or developmental disability or mental impairment
2. The disability/impairment has lasted or is expected to last **≥12 months**
3. The impairment is **so severe** that the applicant is unable to learn or demonstrate knowledge of English and/or civics

**The evaluator must document:**
• DSM-5 diagnosis with code
• How the specific diagnosis **prevents learning** English/civics
• The clinical nexus between the impairment and the inability
• Why the impairment is **not due to lack of effort** or opportunity
• Duration and expected course of the condition
• Tests administered and results

**Common qualifying conditions:**
• PTSD with concentration/memory impairment
• Major Depression with cognitive symptoms
• Traumatic Brain Injury
• Intellectual Disability
• Learning Disabilities
• Dementia/cognitive decline

**Clinical tip:** USCIS scrutinizes N-648s heavily. Be **very specific** about how symptoms (e.g., "concentration difficulties rated 'extremely' on PCL-5") prevent the specific task of learning English or civics material. Generic statements will be rejected.`
  },
  // ── BOND HEARING ──────────────────────────────────────────────────────────
  {
    keywords: ['bond', 'detention', 'detained', 'ice', 'custody', 'flight risk', 'danger'],
    category: 'legal',
    question: 'What is relevant for a bond hearing evaluation?',
    answer: `**Bond Hearing Evaluation**

Immigration judges set bond based on two factors:
1. **Flight risk** — Will the person appear for future hearings?
2. **Danger to the community**

**Evaluation should address:**
• Current mental health status and need for treatment
• Impact of detention on psychological functioning
• Community ties (family, employment, housing, community involvement)
• Motivation to comply with legal proceedings
• Risk assessment (danger to self or others)
• Treatment recommendations that require release

**Clinical considerations:**
• Detention can significantly worsen PTSD, depression, and anxiety
• Document any deterioration since detention began
• Note if the client is unable to access adequate mental health treatment in detention
• Assess for suicidal ideation (elevated in detained populations)
• Document any torture history — relevant to conditions of confinement

**Practical tip:** These evaluations are often **urgent** and may need to be conducted via phone or video in the detention facility. Document the limitations of the evaluation setting.`
  },
  // ── GOOD FAITH MARRIAGE ───────────────────────────────────────────────────
  {
    keywords: ['good faith', 'marriage', 'i-751', 'conditional', 'bona fide', 'genuine'],
    category: 'legal',
    question: 'What does a good faith marriage evaluation involve?',
    answer: `**Good Faith Marriage Evaluation (I-751)**

These evaluations support the removal of conditions on permanent residence by establishing that the marriage was entered in good faith.

**Factors to assess:**
1. **How the couple met** and courtship history
2. **Decision to marry** — timeline, motivations, discussions
3. **Shared life** — cohabitation, finances, social activities
4. **Emotional bond** — descriptions of the relationship quality
5. **If divorced:** What led to the breakdown of the marriage
6. **VAWA overlay:** If applicable, document domestic violence

**Interview both parties (if possible) separately:**
• Look for consistency in the narrative
• Assess emotional quality of descriptions
• Note specificity of details (dates, places, feelings)
• Observe affect when discussing the relationship

**Red flags vs. genuine indicators:**
• Genuine: Emotional complexity, specific memories, realistic relationship challenges
• Concerning: Vague details, lack of emotional content, inconsistencies in timeline

**Clinical note:** You're assessing the **genuineness of the relationship at the time of marriage**, not whether it's a good marriage. Some genuine marriages end in divorce — that doesn't make them fraudulent.`
  },
  // ── CAT ───────────────────────────────────────────────────────────────────
  {
    keywords: ['cat', 'convention against torture', 'torture', 'withholding', 'deferral'],
    category: 'legal',
    question: 'What is Convention Against Torture protection?',
    answer: `**Convention Against Torture (CAT) Evaluation**

CAT protection is available to individuals who would **more likely than not** be tortured if removed to their country.

**Torture is defined as:**
• Severe pain or suffering (physical or mental)
• Intentionally inflicted
• For a prohibited purpose (punishment, coercion, intimidation, discrimination)
• By or with the acquiescence of a public official

**Evaluation should document:**
1. **Past torture** — detailed account with psychological and physical sequelae
2. **Current psychological impact** — PTSD, complex trauma responses
3. **Risk if returned** — based on country conditions and personal circumstances
4. **Government involvement** — evidence of state action or acquiescence
5. **Pattern of torture** in the country for people in the client's situation

**Clinical considerations:**
• Use the Istanbul Protocol framework for documenting torture
• Physical scars and marks should be documented with specificity (location, size, shape, consistency with reported mechanism)
• Document all forms of torture: physical, psychological, sexual
• Psychological torture includes: threats to family, mock executions, prolonged isolation, witnessing torture of others

**This is a higher standard than asylum** — you must show it is "more likely than not" (>50%) that torture would occur, not just persecution.`
  },
  // ── FUNCTIONAL IMPAIRMENT ─────────────────────────────────────────────────
  {
    keywords: ['function', 'functioning', 'impairment', 'daily', 'activities', 'work', 'relationships', 'ability'],
    category: 'clinical',
    question: 'How should I document functional impairment?',
    answer: `**Documenting Functional Impairment**

Functional impairment is the bridge between diagnoses and legal standards. It shows **real-world impact** of psychological conditions.

**Domains to assess:**

**1. Occupational/Academic:**
• Can they work? In what capacity?
• Job performance changes
• Ability to concentrate, complete tasks
• Absenteeism

**2. Social/Interpersonal:**
• Quality of relationships
• Isolation and withdrawal
• Ability to trust
• Parenting capacity

**3. Daily Activities:**
• Self-care (hygiene, nutrition, sleep)
• Household management
• Transportation
• Financial management

**4. Cognitive:**
• Memory and concentration
• Decision-making
• Problem-solving
• Learning new information

**5. Emotional:**
• Ability to regulate emotions
• Tolerance for frustration
• Reactivity to stress

**Before/after comparison:**
Always compare current functioning to **pre-trauma baseline**. This demonstrates causation:
"Before the trauma, Ms. X was employed full-time, maintained close friendships, and was active in her community. Currently, she is unable to work, has withdrawn from social contact, and struggles to care for her basic needs."

**Use specific examples**, not generalizations. Concrete descriptions are far more persuasive than clinical jargon.`
  },
  // ── PROGNOSIS ─────────────────────────────────────────────────────────────
  {
    keywords: ['prognosis', 'outcome', 'future', 'improve', 'worsen', 'return', 'deport', 'remove'],
    category: 'clinical',
    question: 'How should I write the prognosis section?',
    answer: `**Writing the Prognosis Section**

The prognosis section is critical because it connects your clinical findings to the legal question — what will happen to this person?

**Two scenarios to address:**

**If allowed to remain in the U.S.:**
• Symptoms are likely to improve with appropriate treatment
• Stability and safety will reduce hypervigilance and fear
• Access to mental health resources
• Family reunification/stability benefits
• Can become a contributing member of the community

**If removed to country of origin:**
• Symptoms are likely to **significantly worsen**
• Re-exposure to the environment where trauma occurred
• Re-traumatization and triggering of PTSD
• Lack of mental health resources in home country
• Risk of decompensation (breakdown of functioning)
• Potential for suicidal crisis
• Separation from support system

**Language template:**
"Given [Client]'s current diagnoses and the traumatic origins of [their] psychological conditions, removal to [Country] would likely result in a significant deterioration of [their] mental health. Re-exposure to the environment associated with [their] trauma would predictably trigger intensified PTSD symptoms, worsening depression, and heightened anxiety. With appropriate treatment and the stability of remaining in the United States, [their] prognosis for meaningful improvement is favorable."

**Clinical tip:** Be honest but clear. Don't overstate — judges can tell when clinicians are advocating rather than offering clinical opinions.`
  },
];

// ── Search Engine ────────────────────────────────────────────────────────────

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreMatch(query: string, entry: KnowledgeEntry): number {
  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(' ').filter(w => w.length > 2);
  let score = 0;

  // Keyword matching (highest weight)
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += 10;
    }
    for (const word of queryWords) {
      if (normalizedKeyword.includes(word) || word.includes(normalizedKeyword)) {
        score += 3;
      }
    }
  }

  // Question matching
  const normalizedQuestion = normalizeText(entry.question);
  for (const word of queryWords) {
    if (normalizedQuestion.includes(word)) {
      score += 2;
    }
  }

  // Answer content matching
  const normalizedAnswer = normalizeText(entry.answer);
  for (const word of queryWords) {
    if (normalizedAnswer.includes(word)) {
      score += 1;
    }
  }

  return score;
}

export function searchKnowledge(query: string): KnowledgeEntry | null {
  if (!query?.trim()) return null;

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreMatch(query, entry);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Minimum threshold to avoid irrelevant matches
  return bestScore >= 5 ? bestMatch : null;
}

export function getTopMatches(query: string, count = 3): KnowledgeEntry[] {
  if (!query?.trim()) return [];

  const scored = KNOWLEDGE_BASE.map(entry => ({
    entry,
    score: scoreMatch(query, entry),
  }))
    .filter(r => r.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return scored.map(r => r.entry);
}

export function getQuickSuggestions(query: string): string[] {
  if (!query?.trim()) return [];
  const matches = getTopMatches(query, 5);
  return matches.map(m => m.question);
}
