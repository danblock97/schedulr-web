import Image from 'next/image';
import Link from 'next/link';
import { Twitter } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
    { href: '/issues', label: 'Issues' },
    { href: '/about', label: 'About' },
    { href: '/changelog', label: 'Changelog' },
  ];

  const legalLinks = [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/schedulr-logo.png"
                alt="Schedulr"
                width={32}
                height={32}
                className="rounded-lg"
                sizes="32px"
              />
              <span className="text-xl font-bold gradient-brand-text font-heading">Schedulr</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              Group scheduling made simple. Find the perfect time to meet with your friends, family, or team.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 font-heading">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Schedulr. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="mailto:support@schedulr.co.uk"
              className="text-gray-500 hover:text-primary transition-colors text-sm"
            >
              support@schedulr.co.uk
            </a>
            <a
              href="https://x.com/schedulrai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Follow us on X"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

