'use client';
/**
 * Main Application Entry Point
 * Renders the macOS-style layout: sidebar + content area
 * Wrapped with ErrorBoundary for crash recovery
 */
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import EvalForm from '@/components/EvalForm';
import ClientsView from '@/components/views/ClientsView';
import DraftsView from '@/components/views/DraftsView';
import CompletedView from '@/components/views/CompletedView';
import TemplatesView from '@/components/views/TemplatesView';
import SettingsView from '@/components/views/SettingsView';
import ExportView from '@/components/views/ExportView';

export default function AppClient() {
  const { activeView, darkMode } = useAppStore();

  // Apply dark mode to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':    return <Dashboard />;
      case 'clients':      return <ClientsView />;
      case 'new-eval':     return <EvalForm />;
      case 'draft-evals':  return <DraftsView />;
      case 'completed':    return <CompletedView />;
      case 'templates':    return <TemplatesView />;
      case 'settings':     return <SettingsView />;
      case 'export':       return <ExportView />;
      default:             return <Dashboard />;
    }
  };

  const fullscreen = activeView === 'new-eval';

  return (
    <ErrorBoundary>
      <div style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}>
        <Sidebar />
        <main style={{
          flex: 1,
          overflow: fullscreen ? 'hidden' : 'auto',
          display: fullscreen ? 'flex' : 'block',
          flexDirection: 'column',
          background: 'var(--bg-primary)',
        }}>
          {renderView()}
        </main>
      </div>
    </ErrorBoundary>
  );
}
