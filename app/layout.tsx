import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'FlowSync | Intelligent Venue Management',
  description: 'The orchestrated event management platform for the synthetic architect.',
};

import { ThemeProvider } from '@/components/ThemeProvider';
import ThemedBackground from '@/components/Background/ThemedBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <ThemedBackground />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}