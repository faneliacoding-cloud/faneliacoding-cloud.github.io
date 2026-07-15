// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { searchKnowledge, getTopMatches, type KnowledgeEntry } from '@/lib/aiKnowledge';
import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, AlertTriangle, BookOpen, Scale, Brain, Stethoscope, FileText, RotateCcw } from 'lucide-react';

const QUICK_PROMPTS = [
  { label: 'What is the legal standard for asylum?', icon: '⚖️', category: 'legal' },
  { label: 'How do I diagnose PTSD?', icon: '🧠', category: 'clinical' },
  { label: 'How should I assess credibility?', icon: '🔍', category: 'clinical' },
  { label: 'How do I write the Mental Status Exam?', icon: '📋', category: 'assessment' },
  { label: 'What are common DSM-5 diagnoses?', icon: '📊', category: 'clinical' },
  { label: 'What should a VAWA evaluation cover?', icon: '🛡️', category: 'legal' },
  { label: 'How do I assess depression with PHQ-9?', icon: '📝', category: 'clinical' },
  { label: 'How should I write the prognosis?', icon: '💡', category: 'report' },
  { label: 'What about the one-year filing deadline?', icon: '📅', category: 'legal' },
  { label: 'How do I document functional impairment?', icon: '📑', category: 'clinical' },
  { label: 'What is a U Visa evaluation?', icon: '🏛️', category: 'legal' },
  { label: 'How should I assess suicidal ideation?', icon: '⚠️', category: 'clinical' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  category?: string;
  relatedQuestions?: string[];
  timestamp: Date;
}

const CATEGORY_ICONS: Record<string, typeof Scale> = {
  legal: Scale,
  clinical: Brain,
  assessment: Stethoscope,
  report: FileText,
  procedure: BookOpen,
};

const CATEGORY_COLORS: Record<string, string> = {
  legal: '#6366f1',
  clinical: '#059669',
  assessment: '#d97706',
  report: '#8b5cf6',
  procedure: '#0891b2',
};

const CATEGORY_LABELS: Record<string, string> = {
  legal: 'Immigration Law',
  clinical: 'Clinical Assessment',
  assessment: 'Evaluation Methods',
  report: 'Report Writing',
  procedure: 'Procedures',
};

const FALLBACK_RESPONSE = `I can help with immigration evaluation questions in these areas:

**⚖️ Immigration Law**
Asylum, VAWA, U Visa, T Visa, SIJS, hardship waivers, CAT, N-648, bond hearings, cancellation of removal, good faith marriage

**🧠 Mental Health Assessment**
PTSD, depression, anxiety, DSM-5 diagnoses, suicidal ideation, functional impairment, prognosis

**📋 Evaluation Methods**
Mental Status Exam, PCL-5, PHQ-9, GAD-7 scoring, credibility assessment, cultural considerations

**📄 Report Writing**
Clinical narrative, template structure, professional language, findings, recommendations

Try asking a specific question like "What are the criteria for PTSD?" or "How do I assess credibility?"`;

export default function AIAssistant() {
  const { aiPanelOpen, toggleAIPanel } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (aiPanelOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [aiPanelOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate brief processing delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

    const match = searchKnowledge(content);
    const relatedMatches = getTopMatches(content, 3);
    const relatedQuestions = relatedMatches
      .filter(m => m.question !== match?.question)
      .map(m => m.question)
      .slice(0, 2);

    const aiMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: match ? match.answer : FALLBACK_RESPONSE,
      category: match?.category,
      relatedQuestions: relatedQuestions.length > 0 ? relatedQuestions : undefined,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const Icon = CATEGORY_ICONS[category] || BookOpen;
    const color = CATEGORY_COLORS[category] || '#6b7280';
    const label = CATEGORY_LABELS[category] || category;
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 10, fontWeight: 600, padding: '3px 8px',
        borderRadius: 6, background: `${color}12`, color,
        marginBottom: 8,
      }}>
        <Icon size={11} />
        {label}
      </span>
    );
  };

  return (
    <div className={`ai-panel ${aiPanelOpen ? 'open' : ''}`} aria-label="AI Evaluation Assistant">
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--purple), #9B8ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={18} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)' }}>Clinical Assistant</h3>
          <p className="text-muted">Immigration law & mental health</p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              aria-label="Clear conversation"
              title="Clear conversation"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--charcoal-light)', borderRadius: 8 }}
            >
              <RotateCcw size={15} />
            </button>
          )}
          <button
            onClick={toggleAIPanel}
            aria-label="Close AI panel"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--charcoal-light)', borderRadius: 8 }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        margin: '16px 16px 0',
        padding: '10px 14px',
        background: 'var(--amber-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex', gap: 10,
      }}>
        <AlertTriangle size={13} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 10, color: 'var(--charcoal-light)', lineHeight: 1.5 }}>
          Reference only — not a substitute for clinical judgment. All conclusions must be made by the licensed evaluator.
        </p>
      </div>

      {/* Quick prompts (show when no messages) */}
      {messages.length === 0 && (
        <div style={{ padding: '16px 16px 8px', overflowY: 'auto', flex: 1 }}>
          <p className="form-label" style={{ marginBottom: 12, fontSize: 12 }}>Common Questions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt.label}
                className="ai-prompt-btn"
                onClick={() => sendMessage(prompt.label)}
                aria-label={prompt.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  border: '1px solid var(--border-light)',
                  background: 'var(--white)', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'var(--font-sans)',
                  fontSize: 12, color: 'var(--charcoal)',
                  transition: 'all 0.15s ease',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: 14 }}>{prompt.icon}</span>
                <span style={{ flex: 1 }}>{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.length > 0 && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '92%',
                padding: msg.role === 'user' ? '10px 16px' : '14px 18px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? 'var(--forest)' : 'var(--white)',
                color: msg.role === 'user' ? 'white' : 'var(--charcoal)',
                fontSize: 13, lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                border: msg.role === 'assistant' ? '1px solid var(--border-light)' : 'none',
                boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
              }}>
                {msg.category && <CategoryBadge category={msg.category} />}
                <div dangerouslySetInnerHTML={{
                  __html: formatMarkdown(msg.content)
                }} />
                {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                  <div style={{
                    marginTop: 14, paddingTop: 12,
                    borderTop: '1px solid var(--border-light)',
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-light)', marginBottom: 8 }}>
                      Related Questions:
                    </p>
                    {msg.relatedQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '6px 10px', marginBottom: 4, borderRadius: 8,
                          border: '1px solid var(--border-light)',
                          background: 'var(--ivory)', cursor: 'pointer',
                          fontSize: 11, color: 'var(--forest)',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        → {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
              <div style={{
                padding: '12px 18px', borderRadius: '16px 16px 16px 4px',
                background: 'var(--white)', border: '1px solid var(--border-light)',
                display: 'flex', gap: 4, alignItems: 'center',
              }}>
                <span className="typing-dot" style={{ animationDelay: '0s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      )}

      {/* Input bar */}
      <form onSubmit={handleSubmit} style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex', gap: 8,
      }}>
        <input
          ref={inputRef}
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about immigration law or clinical assessment..."
          aria-label="AI assistant message input"
          style={{ flex: 1, fontSize: 13 }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={!input.trim()}
          aria-label="Send message"
          style={{ padding: '11px 14px' }}
        >
          <Send size={16} />
        </button>
      </form>

      {/* Typing animation */}
      <style>{`
        .typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--charcoal-muted);
          animation: typingPulse 1s ease-in-out infinite;
        }
        @keyframes typingPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// Simple markdown-to-HTML for bold, bullets, and headers
function formatMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^• /gm, '<span style="color:var(--forest);margin-right:6px;">●</span>')
    .replace(/^(\d+)\. /gm, '<span style="color:var(--forest);font-weight:600;margin-right:6px;">$1.</span>')
    .replace(/\n/g, '<br/>');
}
