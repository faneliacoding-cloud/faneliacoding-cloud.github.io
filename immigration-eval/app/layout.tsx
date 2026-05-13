import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TJIL Immigration Evaluation",
  description: "Clinical platform for immigration psychological evaluations. Generate professional DOCX and PDF reports with guided intake forms.",
  keywords: "immigration evaluation, psychological assessment, asylum evaluation, clinical report generator",
  authors: [{ name: "TJIL Immigration Evaluation" }],
  manifest: "/immigration-eval-app/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TJIL Eval",
  },
  openGraph: {
    title: "TJIL Immigration Evaluation",
    description: "Clinical platform for immigration psychological evaluations.",
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
  themeColor: "#0071e3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* PWA / Apple specific */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TJIL Eval" />
        <link rel="apple-touch-icon" href="/immigration-eval-app/apple-touch-icon.png" />
        <link rel="manifest" href="/immigration-eval-app/manifest.json" />
        {/* Splash screens for iPhone */}
        <meta name="msapplication-TileColor" content="#0071e3" />
        <meta name="msapplication-TileImage" content="/immigration-eval-app/icons/icon-144.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
