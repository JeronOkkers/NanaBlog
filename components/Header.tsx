// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Amphora } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${search}`);
      setIsMenuOpen(false); // Close menu on search
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Main header row */}
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-gray-900">
            <Amphora className="w-6 h-6 text-primary" />
            <span>Bloggr</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition ${
                  pathname === href ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-48 pl-4 pr-10 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </button>
            </form>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-medium transition ${
                  pathname === href ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="relative pt-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 pt-2">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </button>
            </form>
          </nav>
        )}
      </div>
    </header>
  );
}