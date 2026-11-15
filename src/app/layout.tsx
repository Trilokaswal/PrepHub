import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { GlobalBackground } from '@/components/layout/GlobalBackground';
import { PageTransitionLoader } from '@/components/layout/PageTransitionLoader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'PrepHub — Mock Tests & Online Exam Arena',
  description:
    'A distraction-free exam arena with countdown timers, clear question navigation, and instant scoring. Choose your course and semester, then turn revision into real, measurable readiness.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Pre-hydration cleanup script for browser extensions (Urban VPN, Bitdefender, etc.)
          that synchronously inject 'bis_skin_checked="1"' onto <div> elements before React hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var o=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(typeof n==='string'&&(n==='bis_skin_checked'||n==='bis_register'||n==='bis_size'||n.indexOf('bis_')===0)){return;}return o.apply(this,arguments);};if(typeof MutationObserver!=='undefined'){new MutationObserver(function(mutations){for(var i=0;i<mutations.length;i++){var m=mutations[i];if(m.type==='attributes'&&m.attributeName&&m.attributeName.indexOf('bis_')===0){m.target.removeAttribute(m.attributeName);}if(m.type==='childList'){for(var j=0;j<m.addedNodes.length;j++){var node=m.addedNodes[j];if(node.nodeType===1){if(node.hasAttribute('bis_skin_checked')){node.removeAttribute('bis_skin_checked');}if(node.querySelectorAll){var els=node.querySelectorAll('[bis_skin_checked],[bis_register]');for(var k=0;k<els.length;k++){els[k].removeAttribute('bis_skin_checked');els[k].removeAttribute('bis_register');}}}}}}}).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:['bis_skin_checked','bis_register','bis_size']});}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-indigo-500/15 selection:text-indigo-900 relative"
        suppressHydrationWarning
      >
        <GlobalBackground />
        <Suspense fallback={null}>
          <PageTransitionLoader />
        </Suspense>
        <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
