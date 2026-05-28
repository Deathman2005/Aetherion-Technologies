import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aetherion Technologies | Engineering Intelligent Futures",
  description: "Aetherion Technologies builds high-performance, enterprise-grade AI automation, full stack systems, and bespoke SaaS platforms for modern businesses seeking intelligent digital transformation.",
  keywords: [
    "AI Automation",
    "Full Stack Development",
    "SaaS Platforms",
    "IT Consultancy",
    "Enterprise Software",
    "Digital Transformation",
    "Aetherion"
  ],
  authors: [{ name: "Aetherion Technologies" }],
  openGraph: {
    title: "Aetherion Technologies | Engineering Intelligent Futures",
    description: "Intelligent digital systems, scalable full stack applications, and modern automation solutions professionally engineered for high-performance businesses.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/logo.png?v=1", // Appended query parameter '?v=1' to immediately bust browser's aggressive favicon cache
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-charcoal text-ivory">
        {/* Grain overlay for handcrafted material texture */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
