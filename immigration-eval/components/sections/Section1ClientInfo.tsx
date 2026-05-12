'use client';
/**
 * Section 1: Client Information
 * Demographics, contact details, evaluation metadata
 */
import { useAppStore, ClientInfo, Pronoun, MaritalStatus, EvaluationLocation } from '@/lib/store';
import { User, MapPin, Phone, Mail, Calendar, Globe, Mic } from 'lucide-react';

interface Props { evalId: string; }

export default function Section1ClientInfo({ evalId }: Props) {
  const { evaluations, updateEvaluation } = useAppStore();
  const eval_ = evaluations.find(e => e.id === evalId);
  if (!eval_) return null;
  const info = eval_.clientInfo;

  const update = (field: keyof ClientInfo, value: string | boolean) => {
    updateEvaluation(evalId, { clientInfo: { ...eval_.clientInfo, [field]: value } });
  };

  const F = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
    <div>
      <label className="form-label" htmlFor={id}>{label}</label>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(0,113,227,0.10)' }}>
          <User size={20} color="var(--accent-blue)" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Client Information</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Demographics and evaluation details</p>
        </div>
      </div>

      {/* Personal Info */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          Personal Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
          <F label="Full Legal Name *" id="fullName">
            <input id="fullName" className="form-input" value={info.fullName} onChange={e => update('fullName', e.target.value)} placeholder="e.g. Maria Garcia" />
          </F>
          <F label="Preferred Name" id="preferredName">
            <input id="preferredName" className="form-input" value={info.preferredName} onChange={e => update('preferredName', e.target.value)} placeholder="Nickname or preferred" />
          </F>
          <F label="Pronouns" id="pronouns">
            <select id="pronouns" className="form-select" value={info.pronouns} onChange={e => update('pronouns', e.target.value as Pronoun)}>
              <option>She/Her</option>
              <option>He/Him</option>
              <option>They/Them</option>
              <option>Other</option>
            </select>
          </F>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <F label="Date of Birth *" id="dob">
            <input id="dob" type="date" className="form-input" value={info.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)} />
          </F>
          <F label="Age" id="age">
            <input id="age" type="number" className="form-input" value={info.age} onChange={e => update('age', e.target.value)} placeholder="Age in years" min={0} max={120} />
          </F>
          <F label="Marital Status" id="marital">
            <select id="marital" className="form-select" value={info.maritalStatus} onChange={e => update('maritalStatus', e.target.value as MaritalStatus)}>
              <option value="">Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Separated</option>
              <option>Domestic Partnership</option>
            </select>
          </F>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <F label="Number of Children" id="children">
            <input id="children" type="number" className="form-input" value={info.numberOfChildren} onChange={e => update('numberOfChildren', e.target.value)} placeholder="0" min={0} />
          </F>
          <div />
        </div>
      </div>

      {/* National Origin */}
      <div style={{ marginBottom: 28, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          <Globe size={12} style={{ display: 'inline', marginRight: 6 }} />
          National Origin
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <F label="Nationality *" id="nationality">
            <input id="nationality" className="form-input" value={info.nationality} onChange={e => update('nationality', e.target.value)} placeholder="e.g. Guatemalan" />
          </F>
          <F label="Country of Origin *" id="coo">
            <select id="coo" className="form-select" value={info.countryOfOrigin} onChange={e => update('countryOfOrigin', e.target.value)}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </F>
        </div>
      </div>

      {/* Contact */}
      <div style={{ marginBottom: 28, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          <MapPin size={12} style={{ display: 'inline', marginRight: 6 }} />
          Contact Information
        </h3>
        <div style={{ marginBottom: 14 }}>
          <F label="Current Address" id="address">
            <input id="address" className="form-input" value={info.currentAddress} onChange={e => update('currentAddress', e.target.value)} placeholder="Street, City, State, ZIP" />
          </F>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <F label="Phone Number" id="phone">
            <input id="phone" type="tel" className="form-input" value={info.phone} onChange={e => update('phone', e.target.value)} placeholder="(555) 000-0000" />
          </F>
          <F label="Email Address" id="email">
            <input id="email" type="email" className="form-input" value={info.email} onChange={e => update('email', e.target.value)} placeholder="client@email.com" />
          </F>
        </div>
      </div>

      {/* Evaluation Details */}
      <div style={{ paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          <Calendar size={12} style={{ display: 'inline', marginRight: 6 }} />
          Evaluation Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <F label="Evaluation Location *" id="evalLoc">
            <select id="evalLoc" className="form-select" value={info.evaluationLocation} onChange={e => update('evaluationLocation', e.target.value as EvaluationLocation)}>
              <option>Videoconference</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </F>
          {info.evaluationLocation === 'Other' && (
            <F label="Specify Location" id="otherLoc">
              <input id="otherLoc" className="form-input" value={info.otherLocation} onChange={e => update('otherLocation', e.target.value)} placeholder="e.g. Atlanta, GA" />
            </F>
          )}
          <F label="Evaluation Dates" id="evalDates">
            <input id="evalDates" className="form-input" value={info.evaluationDates} onChange={e => update('evaluationDates', e.target.value)} placeholder="e.g. 01-15-2025 and 01-22-2025" />
          </F>
        </div>

        {/* Interpreter Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--border-light)', background: 'var(--bg-secondary)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mic size={16} color="var(--text-secondary)" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>Interpreter Required</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Client needs language assistance</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={info.interpreterNeeded} onChange={e => update('interpreterNeeded', e.target.checked)} />
            <span className="toggle-slider" />
          </label>
        </div>

        {info.interpreterNeeded && (
          <F label="Interpreter Name" id="interpName">
            <input id="interpName" className="form-input" value={info.interpreterName} onChange={e => update('interpreterName', e.target.value)} placeholder="Full name of interpreter" />
          </F>
        )}
      </div>
    </div>
  );
}

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Angola','Armenia','Azerbaijan','Bangladesh',
  'Bolivia','Brazil','Burma (Myanmar)','Burundi','Cambodia','Cameroon','Central African Republic',
  'China','Colombia','Congo (DRC)','Cuba','Ecuador','Egypt','El Salvador','Eritrea',
  'Ethiopia','Gambia','Ghana','Guatemala','Guinea','Guinea-Bissau','Haiti','Honduras',
  'India','Indonesia','Iran','Iraq','Ivory Coast','Jamaica','Jordan','Kazakhstan',
  'Kenya','Kosovo','Lebanon','Liberia','Libya','Malawi','Mali','Mauritania','Mexico',
  'Moldova','Mongolia','Morocco','Mozambique','Nepal','Nicaragua','Niger','Nigeria',
  'North Korea','Pakistan','Palestinian Territories','Papua New Guinea','Peru',
  'Philippines','Russia','Rwanda','Saudi Arabia','Senegal','Sierra Leone','Somalia',
  'South Sudan','Sri Lanka','Sudan','Syria','Tanzania','Togo','Trinidad and Tobago',
  'Turkey','Uganda','Ukraine','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
  'Other',
];
