'use client';
/**
 * Sidebar — Forest green sidebar navigation
 * Fixed on desktop, slide-in with overlay on mobile/tablet
 */
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard, FileText, Users,
  Layers, FolderOpen, BookOpen,
  Download, Settings, Shield, Lock,
} from 'lucide-react';
import type { View } from '@/lib/types';

interface NavItemConfig {
  view: View;
  label: string;
  icon: React.ReactNode;
  countKey?: 'active' | 'drafts' | 'awaiting' | 'completed';
}

interface NavSection {
  label: string;
  items: NavItemConfig[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'WORKSPACE',
    items: [
      { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { view: 'evaluations', label: 'Evaluations', icon: <FileText size={18} />, countKey: 'active' },
      { view: 'clients', label: 'Clients', icon: <Users size={18} /> },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { view: 'templates', label: 'Templates', icon: <Layers size={18} /> },
      { view: 'evidence', label: 'Evidence', icon: <FolderOpen size={18} /> },
      { view: 'snippets', label: 'Snippets', icon: <BookOpen size={18} /> },
    ],
  },
  {
    label: 'OUTPUT',
    items: [
      { view: 'reports', label: 'Reports', icon: <Download size={18} />, countKey: 'completed' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { view: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const { activeView, setView, sidebarOpen, toggleSidebar, evaluations } = useAppStore();

  // Compute counts from store
  const counts = {
    active: evaluations.filter(e =>
      e.status !== 'report_complete' && e.status !== 'delivered'
    ).length,
    drafts: evaluations.filter(e => e.status === 'draft').length,
    awaiting: evaluations.filter(e => e.status === 'awaiting_documents').length,
    completed: evaluations.filter(e =>
      e.status === 'report_complete' || e.status === 'delivered'
    ).length,
  };

  const handleNavClick = (view: View) => {
    setView(view);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024 && sidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          aria-hidden="true"
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 99,
          }}
          className="sidebar-overlay"
        />
      )}

      <aside
        className={`sidebar${sidebarOpen ? ' mobile-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'linear-gradient(135deg, var(--sage), var(--forest-lighter))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={20} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}
              >
                TJIL
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.3,
                }}
              >
                Evaluation Platform
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => {
                const isActive = activeView === item.view;
                const count = item.countKey ? counts[item.countKey] : null;
                return (
                  <button
                    key={item.view}
                    className={`sidebar-item${isActive ? ' active' : ''}`}
                    onClick={() => handleNavClick(item.view)}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.icon}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {count !== null && count > 0 && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.50)',
                          background: 'rgba(255,255,255,0.10)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          lineHeight: 1.4,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 4px',
            }}
          >
            <Lock size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.02em',
              }}
            >
              Privacy-First Platform
            </span>
          </div>
          <div
            style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.20)',
              paddingLeft: 4,
              marginTop: 2,
            }}
          >
            v2.0
          </div>
        </div>
      </aside>
    </>
  );
}
