// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { Globe } from 'lucide-react';

export default function Step04Immigration({ evalId }: { evalId: string }) {
  const evaluation = useAppStore(s => s.evaluations.find(e => e.id === evalId));
  const updateEvalSection = useAppStore(s => s.updateEvalSection);

  if (!evaluation) return null;
  const s04 = evaluation.sections.step04;

  const update = (field: string, value: string) => {
    updateEvalSection(evalId, 'step04', { [field]: value });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>Immigration History</h2>
            <p className="text-secondary" style={{ marginTop: 2 }}>Document the client&apos;s immigration journey and current legal status</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Journey Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="dateOfArrival">Date of Arrival to the U.S.</label>
            <input id="dateOfArrival" className="form-input" value={s04.dateOfArrival} onChange={e => update('dateOfArrival', e.target.value)} placeholder="e.g., March 2019 or 03/15/2019" aria-label="Date of arrival" />
          </div>
          <div>
            <label className="form-label" htmlFor="mannerOfEntry">Manner of Entry</label>
            <input id="mannerOfEntry" className="form-input" value={s04.mannerOfEntry} onChange={e => update('mannerOfEntry', e.target.value)} placeholder="e.g., Visa overstay, border crossing, port of entry" aria-label="Manner of entry" />
            <p className="form-hint">How the client entered the United States</p>
          </div>
          <div>
            <label className="form-label" htmlFor="currentStatus">Current Immigration Status</label>
            <input id="currentStatus" className="form-input" value={s04.currentStatus} onChange={e => update('currentStatus', e.target.value)} placeholder="e.g., Pending asylum, TPS, undocumented" aria-label="Current immigration status" />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="immigrationHistory">Immigration Journey Narrative</label>
        <textarea
          id="immigrationHistory"
          className="form-textarea"
          value={s04.immigrationHistory}
          onChange={e => update('immigrationHistory', e.target.value)}
          placeholder="Provide a detailed narrative of the client's immigration journey, including circumstances leading to departure from country of origin, route taken, experiences during transit, and circumstances upon arrival in the U.S."
          style={{ minHeight: 180 }}
          aria-label="Immigration journey narrative"
        />
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <label className="form-label" htmlFor="reasonForFleeing">Reason for Fleeing</label>
        <textarea
          id="reasonForFleeing"
          className="form-textarea"
          value={s04.reasonForFleeing}
          onChange={e => update('reasonForFleeing', e.target.value)}
          placeholder="Describe the specific circumstances, threats, persecution, or violence that led the client to leave their country of origin. Include details about who posed the threat and what actions were taken."
          style={{ minHeight: 160 }}
          aria-label="Reason for fleeing"
        />
      </div>

      <div className="card" style={{ padding: 28 }}>
        <label className="form-label" htmlFor="previousApplications">Previous Immigration Applications</label>
        <textarea
          id="previousApplications"
          className="form-textarea"
          value={s04.previousApplications}
          onChange={e => update('previousApplications', e.target.value)}
          placeholder="List any previous immigration applications filed, their outcomes, dates, and relevant details (e.g., prior asylum applications, visa applications, removal proceedings, etc.)."
          style={{ minHeight: 120 }}
          aria-label="Previous immigration applications"
        />
      </div>
    </div>
  );
}
