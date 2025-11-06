import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
    { href: '/about', label: 'About' },
  ];

  const legalLinks = [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
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
              />
              <span className="text-xl font-bold gradient-brand-text">Schedulr</span>
            </Link>
            <p className="text-gray-800 text-sm max-w-md">
              Group scheduling made simple. Find the perfect time to meet with your friends, family, or team.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-800 hover:text-[#FA4A8C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-800 hover:text-[#FA4A8C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-800 text-sm">
            © {new Date().getFullYear()} Schedulr. All rights reserved.
          </p>
          <a
            href="mailto:support@schedulr.co.uk"
            className="text-gray-800 hover:text-[#FA4A8C] transition-colors text-sm mt-4 md:mt-0"
          >
            support@schedulr.co.uk
          </a>
        </div>
      </div>
    </footer>
  );
}

