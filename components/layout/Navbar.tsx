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
    { href: '/issues', label: 'Issues' },
    { href: '/changelog', label: 'Changelog' },
  ];

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="floating-nav rounded-full px-2 py-2 pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between gap-3 relative">
        {/* Christmas Hat - Left Corner */}
        <div className="absolute left-0 -top-8 pointer-events-none transform -rotate-12 z-10">
          <svg width="50" height="50" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
              <linearGradient id="hatGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="shadowLeft">
                <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.4" />
              </filter>
            </defs>
            {/* Main hat cone */}
            <path
              d="M 50 8 L 22 68 L 22 78 L 78 78 L 78 68 Z"
              fill="url(#hatGradientLeft)"
              filter="url(#shadowLeft)"
            />
            {/* Highlight on hat */}
            <path
              d="M 50 8 L 35 50 L 50 50 Z"
              fill="#ff6b6b"
              opacity="0.5"
            />
            {/* White fluffy trim */}
            <ellipse
              cx="50"
              cy="73"
              rx="28"
              ry="12"
              fill="#ffffff"
              filter="url(#shadowLeft)"
            />
            {/* Trim texture lines */}
            <path
              d="M 22 73 Q 30 68, 38 73 T 54 73 T 70 73 T 78 73"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 22 78 Q 30 73, 38 78 T 54 78 T 70 78 T 78 78"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Pom pom */}
            <circle cx="50" cy="8" r="8" fill="#ffffff" filter="url(#shadowLeft)" />
            <circle cx="50" cy="8" r="6" fill="#fef3c7" />
            <circle cx="48" cy="6" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="52" cy="10" r="2.5" fill="#ffffff" opacity="0.7" />
            <circle cx="50" cy="8" r="2" fill="#fbbf24" />
          </svg>
        </div>

        {/* Christmas Hat - Right Corner */}
        <div className="absolute right-0 -top-8 pointer-events-none transform rotate-12 z-10">
          <svg width="50" height="50" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
              <linearGradient id="hatGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="shadowRight">
                <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.4" />
              </filter>
            </defs>
            {/* Main hat cone */}
            <path
              d="M 50 8 L 22 68 L 22 78 L 78 78 L 78 68 Z"
              fill="url(#hatGradientRight)"
              filter="url(#shadowRight)"
            />
            {/* Highlight on hat */}
            <path
              d="M 50 8 L 35 50 L 50 50 Z"
              fill="#ff6b6b"
              opacity="0.5"
            />
            {/* White fluffy trim */}
            <ellipse
              cx="50"
              cy="73"
              rx="28"
              ry="12"
              fill="#ffffff"
              filter="url(#shadowRight)"
            />
            {/* Trim texture lines */}
            <path
              d="M 22 73 Q 30 68, 38 73 T 54 73 T 70 73 T 78 73"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 22 78 Q 30 73, 38 78 T 54 78 T 70 78 T 78 78"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Pom pom */}
            <circle cx="50" cy="8" r="8" fill="#ffffff" filter="url(#shadowRight)" />
            <circle cx="50" cy="8" r="6" fill="#fef3c7" />
            <circle cx="48" cy="6" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="52" cy="10" r="2.5" fill="#ffffff" opacity="0.7" />
            <circle cx="50" cy="8" r="2" fill="#fbbf24" />
          </svg>
        </div>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 px-4 shrink-0">
          <Image
            src="/images/schedulr-logo.png"
            alt="Schedulr"
            width={32}
            height={32}
            className="rounded-lg"
            sizes="32px"
          />
          <span className="text-lg font-bold text-gray-900 font-heading whitespace-nowrap">Schedulr</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 rounded-full px-1 py-1 flex-1 justify-center min-w-0 relative">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href!}
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
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 border border-indigo-100"
              title="iOS Only - View on App Store"
            >
              iOS Only
            </a>
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
              href={link.href!}
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

