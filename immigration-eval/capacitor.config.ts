import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Unique app identifier — matches Apple Bundle ID format
  appId: 'com.tjil.immigrationeval',
  appName: 'TJIL Immigration Evaluation',

  // Point Capacitor at the static Next.js build output
  webDir: 'out',

  server: {
    // In production (device), use the bundled web assets
    androidScheme: 'https',
  },

  ios: {
    // Allow file downloads (DOCX export)
    allowsLinkPreview: false,
    contentInset: 'automatic',
    // Use WKWebView — required for modern web APIs
    scheme: 'tjileval',
    backgroundColor: '#f5f5f7',
  },

  plugins: {
    // Allow localStorage persistence
    CapacitorCookies: { enabled: true },
  },
};

export default config;
