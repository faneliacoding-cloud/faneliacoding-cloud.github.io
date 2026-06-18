'use client';
/**
 * SnippetLibrary — Clinical snippet management
 * Browse, copy, edit, and create reusable clinical text snippets
 */
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { DEFAULT_SNIPPETS } from '@/lib/snippets';
import type { Snippet } from '@/lib/types';
import { Copy, Edit3, Trash2, Plus, Check, X, BookOpen } from 'lucide-react';

type SnippetCategory = Snippet['category'];

const CATEGORY_TABS: { key: SnippetCategory; label: string; icon: string }[] = [
  { key: 'diagnostic', label: 'Diagnostic', icon: '🧠' },
  { key: 'symptom_impact', label: 'Symptom Impact', icon: '💭' },
  { key: 'trauma_summary', label: 'Trauma Summary', icon: '⚡' },
  { key: 'recommendation', label: 'Recommendation', icon: '✅' },
  { key: 'limitations', label: 'Limitations', icon: '⚖️' },
  { key: 'follow_up', label: 'Follow-up', icon: '📋' },
];

export default function SnippetLibrary() {
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<SnippetCategory>('diagnostic');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Seed defaults if store is empty
  useEffect(() => {
    if (snippets.length === 0) {
      DEFAULT_SNIPPETS.forEach(s => {
        addSnippet({ category: s.category, title: s.title, content: s.content, isDefault: s.isDefault });
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allSnippets = snippets.length > 0 ? snippets : DEFAULT_SNIPPETS;
  const filteredSnippets = allSnippets.filter(s => s.category === activeCategory);

  const handleCopy = async (snippet: Snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopiedId(snippet.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = snippet.content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedId(snippet.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingId(snippet.id);
    setEditTitle(snippet.title);
    setEditContent(snippet.content);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim() && editContent.trim()) {
      updateSnippet(editingId, { title: editTitle, content: editContent });
      setEditingId(null);
    }
  };

  const handleAddSnippet = () => {
    if (newTitle.trim() && newContent.trim()) {
      addSnippet({
        category: activeCategory,
        title: newTitle,
        content: newContent,
        isDefault: false,
      });
      setNewTitle('');
      setNewContent('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: 32, maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="heading-xl" style={{ marginBottom: 8 }}>
            Clinical Snippets
          </h1>
          <p className="text-secondary" style={{ fontSize: 15 }}>
            Commonly used professional language for reports
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
          aria-label="Add new snippet"
        >
          <Plus size={16} />
          Add Snippet
        </button>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 24,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
        role="tablist"
        aria-label="Snippet categories"
      >
        {CATEGORY_TABS.map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeCategory === tab.key}
            onClick={() => setActiveCategory(tab.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              borderRadius: 100,
              border: activeCategory === tab.key ? '1.5px solid var(--forest)' : '1.5px solid var(--border-light)',
              background: activeCategory === tab.key ? 'var(--forest)' : 'var(--white)',
              color: activeCategory === tab.key ? 'var(--white)' : 'var(--charcoal-light)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)',
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Snippet Form */}
      {showAddForm && (
        <div className="card animate-scale-in" style={{ padding: 24, marginBottom: 20 }}>
          <h3 className="heading-md" style={{ marginBottom: 16 }}>
            New Snippet — {CATEGORY_TABS.find(t => t.key === activeCategory)?.label}
          </h3>
          <div style={{ marginBottom: 14 }}>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g., PTSD Diagnosis Statement"
              aria-label="Snippet title"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Clinical Content</label>
            <textarea
              className="form-textarea"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Enter professional clinical language..."
              rows={5}
              aria-label="Snippet content"
            />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn-ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleAddSnippet}
              disabled={!newTitle.trim() || !newContent.trim()}
            >
              <Check size={15} />
              Save Snippet
            </button>
          </div>
        </div>
      )}

      {/* Snippet Cards */}
      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredSnippets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <BookOpen size={28} color="var(--charcoal-muted)" />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 6 }}>
              No snippets in this category
            </p>
            <p className="text-secondary" style={{ fontSize: 13 }}>
              Click &ldquo;Add Snippet&rdquo; to create one
            </p>
          </div>
        ) : (
          filteredSnippets.map(snippet => (
            <div key={snippet.id} className="card" style={{ padding: 22 }}>
              {editingId === snippet.id ? (
                /* Edit Mode */
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label className="form-label">Title</label>
                    <input
                      className="form-input"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      aria-label="Edit snippet title"
                    />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-textarea"
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={5}
                      aria-label="Edit snippet content"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className="btn-ghost" onClick={() => setEditingId(null)}>
                      <X size={14} /> Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSaveEdit}>
                      <Check size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--charcoal)',
                    }}>
                      {snippet.title}
                    </h3>
                    {snippet.isDefault && (
                      <span
                        className="status-pill"
                        style={{
                          color: 'var(--gold)',
                          background: 'var(--gold-lighter)',
                          fontSize: 10,
                          flexShrink: 0,
                        }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-secondary" style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {snippet.content}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn-ghost"
                      onClick={() => handleCopy(snippet)}
                      aria-label={`Copy ${snippet.title} to clipboard`}
                      style={{
                        color: copiedId === snippet.id ? 'var(--teal)' : undefined,
                      }}
                    >
                      {copiedId === snippet.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === snippet.id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => handleEdit(snippet)}
                      aria-label={`Edit ${snippet.title}`}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => deleteSnippet(snippet.id)}
                      aria-label={`Delete ${snippet.title}`}
                      style={{ color: 'var(--rose)' }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
