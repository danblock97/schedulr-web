'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useDeviceDetection } from '@/lib/useDeviceDetection';

const APP_STORE_URL = 'https://apps.apple.com/gb/app/schedulr/id6754965988';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const deviceInfo = useDeviceDetection();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
    { href: '/changelog', label: 'Changelog' },
  ];

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="floating-nav rounded-full px-2 py-2 pointer-events-auto w-full max-w-3xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 px-4">
          <Image
            src="/images/schedulr-logo.png"
            alt="Schedulr"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-gray-900 font-heading">Schedulr</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 rounded-full px-1 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center px-2">
          {deviceInfo.canOpenAppStore ? (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
          ) : (
            <Button
              variant="primary"
              size="sm"
              disabled
              className="opacity-50 cursor-not-allowed bg-gray-200 text-gray-500"
              title="iOS Only"
            >
              iOS Only
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 pointer-events-auto md:hidden flex flex-col space-y-2 animate-in slide-in-from-top-4 fade-in duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

