import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/ui/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'VulnScanner - Website Vulnerability Scanner',
  description: 'Production-ready vulnerability scanner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-dark transition-colors">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
