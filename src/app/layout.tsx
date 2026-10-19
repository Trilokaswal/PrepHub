import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrepHub - Mock Test Platform',
  description:
    'Modern mock examination and assessment management platform for instructors and students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
