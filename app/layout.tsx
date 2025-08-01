// app/layout.tsx
import Header from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'Shady-Blog',
  description: 'A Next.js + Sanity blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <Header />
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
