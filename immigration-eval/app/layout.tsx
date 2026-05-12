import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImmigEval — Immigration Evaluation Form Generator",
  description: "Premium clinical platform for immigration psychological evaluations. Generate professional DOCX and PDF reports with guided intake forms.",
  keywords: "immigration evaluation, psychological assessment, asylum evaluation, clinical report generator",
  authors: [{ name: "ImmigEval" }],
  openGraph: {
    title: "ImmigEval — Immigration Evaluation Form Generator",
    description: "Premium clinical platform for immigration psychological evaluations.",
    type: "website",
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
