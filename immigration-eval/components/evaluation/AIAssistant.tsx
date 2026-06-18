// @ts-nocheck
'use client';
import { useAppStore } from '@/lib/store';
import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, AlertTriangle } from 'lucide-react';

const QUICK_PROMPTS = [
  { label: 'Summarize this section', icon: '📝' },
  { label: 'Find missing details', icon: '🔍' },
  { label: 'Draft clinical narrative', icon: '📄' },
  { label: 'Suggest follow-up questions', icon: '❓' },
  { label: 'Rewrite professionally', icon: '✨' },
  { label: 'Check consistency', icon: '🔗' },
  { label: 'Generate recommendations draft', icon: '💡' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PLACEHOLDER_RESPONSE = 'AI assistant will be available when connected to an LLM API. This feature is API-ready and supports OpenAI, Claude, and custom endpoints.\n\nOnce configured, this assistant can help you:\n• Draft clinical narratives\n• Summarize evaluation sections\n• Identify missing information\n• Generate professional language\n• Check internal consistency';

export default function AIAssistant() {
  const { aiPanelOpen, toggleAIPanel } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content, timestamp: new Date() };
    const aiMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: PLACEHOLDER_RESPONSE, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const handlePrompt = (label: string) => {
    sendMessage(label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
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
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)' }}>Evaluation Assistant</h3>
          <p className="text-muted">AI-powered drafting support</p>
        </div>
        <button
          onClick={toggleAIPanel}
          aria-label="Close AI panel"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--charcoal-light)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{
        margin: '16px 16px 0',
        padding: '12px 14px',
        background: 'var(--amber-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex', gap: 10,
      }}>
        <AlertTriangle size={14} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 11, color: 'var(--charcoal-light)', lineHeight: 1.5 }}>
          AI suggestions are for drafting support only. All clinical conclusions must be reviewed and approved by the licensed evaluator.
        </p>
      </div>

      {/* Quick prompts */}
      {messages.length === 0 && (
        <div style={{ padding: '16px 16px 8px' }}>
          <p className="form-label" style={{ marginBottom: 10 }}>Quick Prompts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt.label}
                className="ai-prompt-btn"
                onClick={() => handlePrompt(prompt.label)}
                aria-label={prompt.label}
              >
                <span>{prompt.icon}</span>
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'var(--forest)' : 'var(--ivory)',
              color: msg.role === 'user' ? 'white' : 'var(--charcoal)',
              fontSize: 13, lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex', gap: 8,
      }}>
        <input
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask the AI assistant..."
          aria-label="AI assistant message input"
          style={{ flex: 1 }}
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
    </div>
  );
}
