'use client';
/**
 * MobileNav — Bottom navigation bar for mobile devices
 * Shows on screens ≤768px via CSS .mobile-nav class
 */
import { useAppStore } from '@/lib/store';
import { LayoutDashboard, FileText, Layers, Download, Settings } from 'lucide-react';
import type { View } from '@/lib/types';

interface NavItem {
  view: View;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
  { view: 'evaluations', label: 'Cases', icon: <FileText size={22} /> },
  { view: 'templates', label: 'Templates', icon: <Layers size={22} /> },
  { view: 'reports', label: 'Reports', icon: <Download size={22} /> },
  { view: 'settings', label: 'Settings', icon: <Settings size={22} /> },
];

export default function MobileNav() {
  const { activeView, setView } = useAppStore();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            className={`mobile-nav-item${isActive ? ' active' : ''}`}
            onClick={() => setView(item.view)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
