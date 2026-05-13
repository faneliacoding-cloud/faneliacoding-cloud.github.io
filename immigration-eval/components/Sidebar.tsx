'use client';
/**
 * Sidebar Navigation Component
 * macOS-inspired dark sidebar with icon navigation
 */
import { useAppStore, View } from '@/lib/store';
import {
  LayoutDashboard, Users, FileText, Clock, CheckSquare,
  FolderOpen, Settings, Download, ChevronLeft, ChevronRight,
  Shield, Moon, Sun,
} from 'lucide-react';

interface NavItem {
  id: View;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  badge?: number;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'clients', label: 'Client Database', icon: Users },
    ],
  },
  {
    title: 'Evaluations',
    items: [
      { id: 'new-eval', label: 'New Evaluation', icon: FileText },
      { id: 'draft-evals', label: 'Drafts', icon: Clock },
      { id: 'completed', label: 'Completed', icon: CheckSquare },
    ],
  },
  {
    title: 'Tools',
    items: [
      { id: 'templates', label: 'Templates', icon: FolderOpen },
      { id: 'export', label: 'Export Center', icon: Download },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const { activeView, sidebarCollapsed, darkMode, setView, toggleSidebar, toggleDarkMode, evaluations } = useAppStore();

  const draftCount = evaluations.filter(e => e.status !== 'completed').length;
  const completedCount = evaluations.filter(e => e.status === 'completed').length;

  const getBadge = (id: View) => {
    if (id === 'draft-evals') return draftCount || undefined;
    if (id === 'completed') return completedCount || undefined;
    return undefined;
  };

  return (
    <aside
      style={{
        width: sidebarCollapsed ? '68px' : '260px',
        minWidth: sidebarCollapsed ? '68px' : '260px',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: sidebarCollapsed ? '20px 16px' : '20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0071e3, #5e5ce6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(0,113,227,0.35)',
        }}>
          <Shield size={16} color="white" strokeWidth={2} />
        </div>
        {!sidebarCollapsed && (
          <div>
            <div style={{ color: '#f5f5f7', fontSize: 11, fontWeight: 700, letterSpacing: '0em', whiteSpace: 'nowrap' }}>
              TJIL Immigration Evaluation
            </div>
            <div style={{ color: '#636366', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>
              Clinical Platform
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {navSections.map((section) => (
          <div key={section.title} style={{ marginBottom: 24 }}>
            {!sidebarCollapsed && (
              <div style={{
                color: '#636366',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0 6px',
                marginBottom: 6,
              }}>
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const badge = getBadge(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: sidebarCollapsed ? '9px 14px' : '9px 10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                    color: isActive ? '#f5f5f7' : '#8e8e93',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 500,
                    textAlign: 'left',
                    marginBottom: 2,
                    transition: 'all 150ms ease',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#f5f5f7';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93';
                  }}
                >
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 3,
                      height: 18,
                      background: '#0071e3',
                      borderRadius: '0 3px 3px 0',
                    }} />
                  )}
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  {!sidebarCollapsed && (
                    <>
                      <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{item.label}</span>
                      {badge !== undefined && badge > 0 && (
                        <span style={{
                          background: '#0071e3',
                          color: 'white',
                          borderRadius: '100px',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '1px 7px',
                          minWidth: 20,
                          textAlign: 'center',
                        }}>
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom controls */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: sidebarCollapsed ? 'column' : 'row',
        gap: 8,
        alignItems: 'center',
      }}>
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Light mode' : 'Dark mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.06)',
            color: '#8e8e93',
            cursor: 'pointer',
          }}
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button
          onClick={toggleSidebar}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.06)',
            color: '#8e8e93',
            cursor: 'pointer',
            marginLeft: sidebarCollapsed ? 0 : 'auto',
          }}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
