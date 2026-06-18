'use client';
/**
 * App — Root application shell
 * Renders sidebar, topbar, main content (routed by activeView), and mobile nav
 * Wrapped with ErrorBoundary for crash recovery
 */
import { useAppStore } from '@/lib/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileNav from '@/components/layout/MobileNav';
import Dashboard from '@/components/dashboard/Dashboard';
import TemplateLibrary from '@/components/templates/TemplateLibrary';
import EvidenceManager from '@/components/evidence/EvidenceManager';
import SnippetLibrary from '@/components/snippets/SnippetLibrary';
import ReportBuilder from '@/components/reports/ReportBuilder';
import SettingsPage from '@/components/settings/SettingsPage';
import ClientList from '@/components/clients/ClientList';
import ClientProfile from '@/components/clients/ClientProfile';
import EvalWorkflow from '@/components/evaluation/EvalWorkflow';
import type { View } from '@/lib/types';

/* ── View Router ──────────────────────────────────────────────────────────── */
function ViewRouter({ activeView }: { activeView: View }) {
  switch (activeView) {
    case 'dashboard':
      return <Dashboard />;
    case 'evaluations':
      return <Dashboard showAll />;
    case 'clients':
      return <ClientList />;
    case 'client-profile':
      return <ClientProfile />;
    case 'templates':
      return <TemplateLibrary />;
    case 'reports':
    case 'report-builder':
      return <ReportBuilder />;
    case 'evidence':
      return <EvidenceManager />;
    case 'snippets':
      return <SnippetLibrary />;
    case 'settings':
      return <SettingsPage />;
    case 'new-eval':
      return <EvalWorkflow />;
    default:
      return <Dashboard />;
  }
}

/* ── App Shell ────────────────────────────────────────────────────────────── */
export default function AppClient() {
  const { activeView } = useAppStore();

  return (
    <ErrorBoundary>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--ivory)',
        }}
      >
        {/* Sidebar — fixed on desktop, slide-in on mobile */}
        <Sidebar />

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'var(--sidebar-width)',
            height: '100vh',
            overflow: 'hidden',
            transition: 'margin-left var(--transition-base)',
          }}
        >
          {/* Top bar — sticky glassmorphism */}
          <TopBar />

          {/* Scrollable content */}
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              background: 'var(--ivory)',
            }}
            role="main"
            aria-label="Main content"
          >
            <ViewRouter activeView={activeView} />
          </main>
        </div>

        {/* Mobile bottom navigation */}
        <MobileNav />
      </div>
    </ErrorBoundary>
  );
}
