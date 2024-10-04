// types
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ServerStatusProvider } from '@/components/ServerStatus/context/ServerContext';
// styles
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'DiceDB Playground',
  description:
    'DiceDB is an in-memory, real-time, and reactive database with Redis and SQL support optimized for modern hardware and building real-time applications.', // Added meaningful description
  icons: {
    icon: 'https://dicedb.io/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <ServerStatusProvider>
        <body>{children}</body>
      </ServerStatusProvider>
    </html>
  );
}
