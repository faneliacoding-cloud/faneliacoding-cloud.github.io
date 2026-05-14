'use client';
/**
 * Global Error Boundary
 * Catches component crashes and renders a graceful fallback UI
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100vh', background: '#f5f5f7',
          fontFamily: 'Inter, -apple-system, sans-serif',
          flexDirection: 'column', gap: 16, padding: 24,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: 'rgba(255,69,58,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1d1d1f', textAlign: 'center' }}>
            Something went wrong
          </div>
          <div style={{ fontSize: 13, color: '#6e6e73', textAlign: 'center', maxWidth: 400, lineHeight: 1.5 }}>
            The application encountered an unexpected error. Your data is safely stored and will be available when you reload.
          </div>
          {this.state.error && (
            <div style={{
              fontSize: 11, color: '#aeaeb2', background: 'rgba(0,0,0,0.03)',
              padding: '8px 14px', borderRadius: 8, maxWidth: 500, overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace',
            }}>
              {this.state.error.message}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={this.handleRetry} style={{
              padding: '10px 20px', borderRadius: 12, border: 'none',
              background: '#0071e3', color: 'white', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Try Again
            </button>
            <button onClick={() => window.location.reload()} style={{
              padding: '10px 20px', borderRadius: 12, border: '1.5px solid rgba(0,0,0,0.1)',
              background: 'white', color: '#1d1d1f', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
