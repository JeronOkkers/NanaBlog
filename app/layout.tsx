// app/layout.tsx
import Header from '../components/Header';
import { ThemeProvider } from '../components/ThemeProvider'; // Import the provider
import './globals.css';

export const metadata = {
  title: 'Shady-Blog',
  description: 'A Next.js + Sanity blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider> {/* Wrap your components */}
          <Header />
          <main className="container mx-auto px-4 py-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}