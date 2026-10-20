import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PrepHub — Examination & Assessment Platform',
  description:
    'Production-grade examination and assessment management platform for educators and academic institutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
