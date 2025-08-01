// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { Amphora } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/?search=${search}`);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-gray-900">
          {/*<Amphora className="w-6 h-6" />*/}
           <img src="/CustomLogo.svg" alt="Logo" className="w-10 h-10" />
          <span>Bloggr</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              {label}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts"
              className="w-48 md:w-64 pl-4 pr-10 py-2 rounded-lg bg-muted text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
