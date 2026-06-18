import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TJIL | Immigration Evaluation Platform",
  description: "The complete immigration evaluation platform for clinicians",
  keywords: "immigration evaluation, psychological assessment, asylum evaluation, clinical report generator",
  authors: [{ name: "TJIL Immigration Evaluation" }],
  manifest: "/immigration-eval-app/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TJIL Eval",
  },
  openGraph: {
    title: "TJIL | Immigration Evaluation Platform",
    description: "The complete immigration evaluation platform for clinicians",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/immigration-eval-app/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/immigration-eval-app/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/immigration-eval-app/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3A2D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* PWA / Apple specific */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TJIL Eval" />
        {/* Content Security Policy — mitigate XSS */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.dropbox.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://www.googleapis.com https://graph.microsoft.com https://accounts.google.com https://login.microsoftonline.com; frame-src 'none';"
        />
        <link rel="apple-touch-icon" href="/immigration-eval-app/apple-touch-icon.png" />
        <link rel="manifest" href="/immigration-eval-app/manifest.json" />
        <meta name="msapplication-TileColor" content="#1B3A2D" />
        <meta name="msapplication-TileImage" content="/immigration-eval-app/icons/icon-144.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
