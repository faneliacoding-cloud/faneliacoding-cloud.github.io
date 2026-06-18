'use client';
/**
 * TopBar — Glassmorphism top bar with search, navigation title, and actions
 * Sticky at top of main content area
 */
import { useAppStore } from '@/lib/store';
import { Search, Plus, Bell, Menu } from 'lucide-react';
import type { View } from '@/lib/types';

const VIEW_TITLES: Record<View, string> = {
  'dashboard': 'Dashboard',
  'evaluations': 'Evaluations',
  'clients': 'Clients',
  'client-profile': 'Client Profile',
  'templates': 'Template Library',
  'reports': 'Reports',
  'evidence': 'Evidence Manager',
  'snippets': 'Snippet Library',
  'settings': 'Settings',
  'new-eval': 'New Evaluation',
  'report-builder': 'Report Builder',
};

export default function TopBar() {
  const { activeView, searchQuery, setSearchQuery, toggleSidebar, createEvaluation } = useAppStore();

  const pageTitle = VIEW_TITLES[activeView] || 'Dashboard';

  return (
    <header className="topbar" role="banner" aria-label="Top navigation bar">
      {/* Mobile hamburger */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--charcoal)',
          flexShrink: 0,
        }}
        className="topbar-hamburger"
      >
        <Menu size={22} />
      </button>

      {/* Page title */}
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--charcoal)',
          whiteSpace: 'nowrap',
          marginRight: 8,
        }}
      >
        {pageTitle}
      </h1>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--charcoal-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Search evaluations, clients, templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
          style={{
            paddingLeft: 40,
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid transparent',
            borderRadius: 'var(--radius-pill)',
            height: 40,
            fontSize: 13,
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button
          className="btn-primary"
          onClick={() => createEvaluation()}
          aria-label="Start new evaluation"
          style={{ padding: '8px 18px', fontSize: 13, gap: 6 }}
        >
          <Plus size={16} />
          <span className="topbar-btn-label">New Evaluation</span>
        </button>

        {/* Notification bell */}
        <button
          aria-label="Notifications"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--charcoal-light)',
            transition: 'background var(--transition-fast)',
            position: 'relative',
          }}
        >
          <Bell size={18} />
          {/* Notification dot */}
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 9,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--gold)',
              border: '2px solid var(--ivory)',
            }}
          />
        </button>

        {/* User avatar */}
        <div
          aria-label="User profile"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--sage), var(--forest-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--white)',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          CL
        </div>
      </div>
    </header>
  );
}
