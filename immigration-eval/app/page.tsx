'use client';
/**
 * Page entry point — defers all rendering to the client.
 * Prevents localStorage/Zustand hydration mismatches on GitHub Pages static export.
 */
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AppClient = dynamic(() => import('@/components/App'), { ssr: false });

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#f5f5f7',
        fontFamily: 'Inter, -apple-system, sans-serif',
        flexDirection: 'column', gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'linear-gradient(135deg, #0071e3, #5e5ce6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,113,227,0.3)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>TJIL Immigration Evaluation</div>
        <div style={{ fontSize: 13, color: '#6e6e73' }}>Loading clinical platform...</div>
      </div>
    );
  }

  return <AppClient />;
}
