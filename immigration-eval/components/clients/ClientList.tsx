'use client';
import { useAppStore } from '@/lib/store';
import { CASE_TYPE_CONFIG, CASE_STATUS_CONFIG, type CaseType } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Users, Search, Plus, MapPin, FileText } from 'lucide-react';

interface AggregatedClient {
  name: string;
  country: string;
  evalCount: number;
  latestStatus: string;
  latestStatusColor: string;
  latestStatusBg: string;
  lastUpdated: string;
  evalIds: string[];
  caseTypes: CaseType[];
}

export default function ClientList() {
  const { evaluations, setView, setActiveEval, setActiveClient, createEvaluation } = useAppStore();
  const [search, setSearch] = useState('');
  const [filterCaseType, setFilterCaseType] = useState<string>('all');

  const clients = useMemo(() => {
    const map: Record<string, AggregatedClient> = {};
    evaluations.forEach(ev => {
      const name = ev.client.fullName || 'Unnamed Client';
      if (!map[name]) {
        const statusCfg = CASE_STATUS_CONFIG[ev.status] || CASE_STATUS_CONFIG.draft;
        map[name] = {
          name,
          country: ev.client.countryOfOrigin || 'Unknown',
          evalCount: 0,
          latestStatus: statusCfg.label,
          latestStatusColor: statusCfg.color,
          latestStatusBg: statusCfg.bg,
          lastUpdated: ev.updatedAt,
          evalIds: [],
          caseTypes: [],
        };
      }
      map[name].evalCount++;
      map[name].evalIds.push(ev.id);
      if (!map[name].caseTypes.includes(ev.caseType)) {
        map[name].caseTypes.push(ev.caseType);
      }
      if (new Date(ev.updatedAt) > new Date(map[name].lastUpdated)) {
        map[name].lastUpdated = ev.updatedAt;
        const statusCfg = CASE_STATUS_CONFIG[ev.status] || CASE_STATUS_CONFIG.draft;
        map[name].latestStatus = statusCfg.label;
        map[name].latestStatusColor = statusCfg.color;
        map[name].latestStatusBg = statusCfg.bg;
      }
    });
    return Object.values(map)
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      .filter(c => filterCaseType === 'all' || c.caseTypes.includes(filterCaseType as CaseType))
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [evaluations, search, filterCaseType]);

  const handleClientClick = (client: AggregatedClient) => {
    setActiveClient(client.evalIds[0]);
    setActiveEval(client.evalIds[0]);
    setView('client-profile');
  };

  const handleNewEval = () => {
    const id = createEvaluation();
    setActiveEval(id);
    setView('new-eval');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, var(--forest), var(--forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} color="white" />
          </div>
          <div>
            <h1 className="heading-lg">Client Directory</h1>
            <p className="text-secondary">{clients.length} client{clients.length !== 1 ? 's' : ''} · {evaluations.length} total evaluation{evaluations.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleNewEval} aria-label="New evaluation">
          <Plus size={16} /> New Evaluation
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-muted)' }} />
          <input
            className="form-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search clients by name..."
            style={{ paddingLeft: 40 }}
            aria-label="Search clients"
          />
        </div>
        <select
          className="form-select"
          value={filterCaseType}
          onChange={e => setFilterCaseType(e.target.value)}
          style={{ width: 220 }}
          aria-label="Filter by case type"
        >
          <option value="all">All Case Types</option>
          {Object.entries(CASE_TYPE_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>
      </div>

      {/* Client Grid */}
      {clients.length === 0 ? (
        <div className="card" style={{ padding: 32 }}>
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 8 }}>No Clients Found</h3>
            <p className="text-secondary" style={{ maxWidth: 360, marginBottom: 20 }}>
              {search ? 'No clients match your search. Try adjusting your filters.' : 'Start by creating your first evaluation to add a client.'}
            </p>
            <button className="btn-primary" onClick={handleNewEval}>
              <Plus size={16} /> Begin New Evaluation
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {clients.map(client => (
            <button
              key={client.name}
              className="card card-interactive"
              onClick={() => handleClientClick(client)}
              aria-label={`View ${client.name}`}
              style={{ padding: 24, textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border-light)', fontFamily: 'var(--font-sans)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--forest), var(--forest-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-sans)',
                }}>
                  {getInitials(client.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <MapPin size={11} color="var(--charcoal-muted)" />
                    <span className="text-muted">{client.country}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={12} color="var(--charcoal-muted)" />
                  <span className="text-muted">{client.evalCount} evaluation{client.evalCount !== 1 ? 's' : ''}</span>
                </div>
                <span className="status-pill" style={{ color: client.latestStatusColor, background: client.latestStatusBg }}>
                  {client.latestStatus}
                </span>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--charcoal-muted)' }}>
                Updated {formatDate(client.lastUpdated)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
