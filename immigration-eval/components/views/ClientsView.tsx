'use client';
/**
 * ClientsView — Searchable client database
 */
import { useAppStore } from '@/lib/store';
import { Users, Search, FileText, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

export default function ClientsView() {
  const { evaluations, setView, setActiveEval, createEvaluation, deleteEvaluation } = useAppStore();
  const [search, setSearch] = useState('');
  const [deleteClient, setDeleteClient] = useState<{ name: string; evalIds: string[] } | null>(null);

  // Aggregate by client name
  const clientMap: Record<string, typeof evaluations> = {};
  evaluations.forEach(e => {
    const name = e.clientInfo.fullName || 'Unnamed Client';
    if (!clientMap[name]) clientMap[name] = [];
    clientMap[name].push(e);
  });

  const clients = Object.entries(clientMap).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (id: string) => {
    setActiveEval(id);
    setView('new-eval');
  };

  const handleNewForClient = () => {
    const id = createEvaluation();
    setActiveEval(id);
    setView('new-eval');
  };

  const confirmDeleteClient = () => {
    if (deleteClient) {
      deleteClient.evalIds.forEach(id => deleteEvaluation(id));
      setDeleteClient(null);
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(191,90,242,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} color="#bf5af2" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Client Database</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{clients.length} clients</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleNewForClient}><Plus size={15} /> New Evaluation</button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
        <input className="form-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ paddingLeft: 40 }} />
      </div>

      {clients.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Users size={48} color="var(--text-tertiary)" style={{ marginBottom: 16 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No clients found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clients.map(([name, evals]) => {
            const latest = evals.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
            return (
              <div key={name} className="glass-card" style={{ borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #0071e3, #5e5ce6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>{name[0]}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {latest.clientInfo.countryOfOrigin || 'Unknown country'} · {evals.length} evaluation{evals.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {evals.map(ev => (
                      <button key={ev.id} className="btn-secondary" onClick={() => handleOpen(ev.id)} style={{ fontSize: 12, gap: 6 }}>
                        <FileText size={12} />
                        {new Date(ev.createdAt).toLocaleDateString()}
                        <span className={`badge badge-${ev.status === 'completed' ? 'complete' : 'progress'}`} style={{ marginLeft: 4 }}>
                          {ev.status === 'completed' ? 'Done' : 'Draft'}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => setDeleteClient({ name, evalIds: evals.map(e => e.id) })}
                      aria-label={`Delete all evaluations for ${name}`}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff453a', display: 'flex', alignItems: 'center', padding: '4px 8px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteClient && (
        <ConfirmDeleteModal
          clientName={deleteClient.name}
          onConfirm={confirmDeleteClient}
          onCancel={() => setDeleteClient(null)}
        />
      )}
    </div>
  );
}
