// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { BookOpen, User, GraduationCap, Briefcase, Heart, Home } from 'lucide-react';

/** Helper: renders a single text field (input or textarea) */
function Field({
  label, value, onChange, placeholder, multiline = false, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; multiline?: boolean; hint?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label className="form-label">{label}</label>
      {hint && <p className="text-muted" style={{ fontSize: 11, marginBottom: 6 }}>{hint}</p>}
      {multiline ? (
        <textarea
          className="form-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight: 100 }}
        />
      ) : (
        <input
          className="form-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

/** Section card with icon + title */
function Section({ icon, title, subtitle, children, accentColor }: {
  icon: React.ReactNode; title: string; subtitle?: string;
  children: React.ReactNode; accentColor?: string;
}) {
  return (
    <div className="card" style={{ padding: 28, borderTop: `3px solid ${accentColor || 'var(--forest)'}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${accentColor || 'var(--forest)'}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor || 'var(--forest)',
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--charcoal)' }}>{title}</h3>
          {subtitle && <p className="text-muted" style={{ fontSize: 12 }}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Step03History({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s03 = evaluation.sections?.step03 || {};
  const update = (field: string, value: string) => updateEvalSection(evalId, 'step03', { [field]: value });

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Personal &amp; Family History</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Detailed background information matching the clinical evaluation template</p>
          </div>
        </div>
      </div>

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── EARLY LIFE ─────────────────────────────────────────── */}
        <Section
          icon={<User size={18} />}
          title="Early Life & Upbringing"
          subtitle="Childhood environment and formative experiences"
          accentColor="var(--teal)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Siblings"
              value={s03.siblings || ''}
              onChange={v => update('siblings', v)}
              placeholder="e.g., 3 siblings — 2 older brothers, 1 younger sister"
              hint="How many? Where in the birth order?"
            />
            <Field
              label="Birth Order"
              value={s03.birthOrder || ''}
              onChange={v => update('birthOrder', v)}
              placeholder="e.g., Second of four children"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Raised By"
              value={s03.raisedBy || ''}
              onChange={v => update('raisedBy', v)}
              placeholder="e.g., Mother and father / Grandmother / Foster care"
              hint="Who raised the client? (mother, father, grandparents, etc.)"
            />
            <Field
              label="Parents' Work"
              value={s03.parentsWork || ''}
              onChange={v => update('parentsWork', v)}
              placeholder="e.g., Father was a farmer, mother was a teacher"
              hint="What kind of work did the parents/caregivers do?"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Childhood Location"
              value={s03.childhoodLocation || ''}
              onChange={v => update('childhoodLocation', v)}
              placeholder="e.g., Small rural village outside Guatemala City"
              hint="Did the client live in a city or rural area?"
            />
            <Field
              label="Childhood Environment"
              value={s03.childhoodEnvironment || ''}
              onChange={v => update('childhoodEnvironment', v)}
              placeholder="e.g., Generally peaceful / Marked by poverty and instability"
              hint="Was childhood overall peaceful or stressful?"
            />
          </div>
          <Field
            label="Childhood Stressors"
            value={s03.childhoodStressors || ''}
            onChange={v => update('childhoodStressors', v)}
            placeholder="If stressful, describe what the stress was related to (finances, abuse, addiction, community violence, political instability, etc.)"
            multiline
            hint="If stressful, what was the stress related to?"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Travel History"
              value={s03.travelHistory || ''}
              onChange={v => update('travelHistory', v)}
              placeholder="e.g., Never traveled outside the country / Traveled to Mexico for work"
              hint="Did the client grow up traveling to other countries?"
            />
            <Field
              label="Hobbies & Interests"
              value={s03.hobbiesInterests || ''}
              onChange={v => update('hobbiesInterests', v)}
              placeholder="e.g., Playing soccer, reading, music, cooking"
              hint="What hobbies or interests did the client have growing up?"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Faith Community (Growing Up)"
              value={s03.faithCommunity || ''}
              onChange={v => update('faithCommunity', v)}
              placeholder="e.g., Catholic church, attended weekly services"
              hint="Did the client belong to a church or faith community?"
            />
            <Field
              label="Current Faith Practice"
              value={s03.currentFaith || ''}
              onChange={v => update('currentFaith', v)}
              placeholder="e.g., Still attends church / No longer practices"
              hint="Current religious or spiritual practice?"
            />
          </div>
        </Section>

        {/* ── EDUCATION ───────────────────────────────────────────── */}
        <Section
          icon={<GraduationCap size={18} />}
          title="Education"
          subtitle="Academic background and achievements"
          accentColor="var(--gold)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Highest Education Level"
              value={s03.educationLevel || ''}
              onChange={v => update('educationLevel', v)}
              placeholder="e.g., Bachelor's degree / Completed 8th grade / No formal education"
              hint="How much schooling has the client completed?"
            />
            <Field
              label="Degrees, Awards, Honors"
              value={s03.degreesAwards || ''}
              onChange={v => update('degreesAwards', v)}
              placeholder="e.g., B.A. in Business Administration, Dean's List"
              hint="Any degrees, certifications, awards, or honors?"
            />
          </div>
          <Field
            label="Education Details"
            value={s03.educationHistory || ''}
            onChange={v => update('educationHistory', v)}
            placeholder="Describe the client's educational journey, including any disruptions, challenges, or notable achievements. Include any vocational training or professional development."
            multiline
            hint="Additional details about schooling, disruptions, or vocational training"
          />
        </Section>

        {/* ── EMPLOYMENT ──────────────────────────────────────────── */}
        <Section
          icon={<Briefcase size={18} />}
          title="Employment"
          subtitle="Work history and current occupation"
          accentColor="#6366f1"
        >
          <Field
            label="Employment History"
            value={s03.employmentHistory || ''}
            onChange={v => update('employmentHistory', v)}
            placeholder="Describe the client's work history — types of jobs held, duration, any forced labor, work-related trauma, or inability to work. Include work in home country and in the U.S."
            multiline
            hint="What kind of work has the client done in the past?"
          />
          <Field
            label="Current Employment"
            value={s03.currentEmployment || ''}
            onChange={v => update('currentEmployment', v)}
            placeholder="e.g., Currently working as a restaurant server / Currently unemployed due to symptoms"
            hint="Is the client currently working? If so, what kind of work?"
          />
        </Section>

        {/* ── RELATIONSHIPS & FAMILY ──────────────────────────────── */}
        <Section
          icon={<Heart size={18} />}
          title="Relationships & Family"
          subtitle="Marital status, children, and family relationships"
          accentColor="var(--rose)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field
              label="Marital Status"
              value={s03.maritalStatus || ''}
              onChange={v => update('maritalStatus', v)}
              placeholder="e.g., Married / Divorced / Single / Widowed / Separated"
              hint="Is the client currently married?"
            />
            <Field
              label="Number of Children"
              value={s03.numberOfChildren || ''}
              onChange={v => update('numberOfChildren', v)}
              placeholder="e.g., 3 children (ages 5, 8, 12)"
            />
          </div>
          <Field
            label="Relationship History"
            value={s03.relationshipHistory || ''}
            onChange={v => update('relationshipHistory', v)}
            placeholder="Detail significant romantic and interpersonal relationships, including any history of domestic violence, abuse, or relationship-related trauma."
            multiline
          />
          <Field
            label="Children Information"
            value={s03.childrenInfo || ''}
            onChange={v => update('childrenInfo', v)}
            placeholder="Information about children — names, ages, whereabouts, custody status, who they live with, any separation concerns, and the impact of the immigration situation on the children."
            multiline
            hint="Include ages, custody, whereabouts, and impact of immigration situation"
          />
        </Section>

        {/* ── CURRENT LIFE ───────────────────────────────────────── */}
        <Section
          icon={<Home size={18} />}
          title="Current Life"
          subtitle="Present living situation and future aspirations"
          accentColor="var(--sage)"
        >
          <Field
            label="Current Living Situation"
            value={s03.currentLiving || ''}
            onChange={v => update('currentLiving', v)}
            placeholder="Where is the client living now? Who do they live with? Describe the current home environment."
            multiline
          />
          <Field
            label="Future Hopes & Aspirations"
            value={s03.futureHopes || ''}
            onChange={v => update('futureHopes', v)}
            placeholder="What are the client's hopes for the future? What would they like to do? How do they want to contribute to the U.S.? How would they feel emotionally if granted relief?"
            multiline
            hint="What does the client want to do in the future and how do they want to contribute?"
          />
        </Section>

        {/* ── ADDITIONAL NARRATIVES ───────────────────────────────── */}
        <Section
          icon={<BookOpen size={18} />}
          title="Additional Background Narratives"
          subtitle="General narrative fields for anything not covered above"
          accentColor="var(--charcoal-light)"
        >
          <Field
            label="Personal History (General Narrative)"
            value={s03.personalHistory || ''}
            onChange={v => update('personalHistory', v)}
            placeholder="Any additional personal history, life events, or context not captured in the sections above. This can include formative events, cultural context, or other relevant background information."
            multiline
          />
          <Field
            label="Family Background (General Narrative)"
            value={s03.familyBackground || ''}
            onChange={v => update('familyBackground', v)}
            placeholder="Any additional family dynamics, relationships, or background not captured above. Include extended family, family conflicts, support systems, or family-related trauma."
            multiline
          />
        </Section>
      </div>
    </div>
  );
}
