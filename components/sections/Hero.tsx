import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-white overflow-hidden">
      <div className="container-content relative z-10 text-center py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-brand-text">
          Schedulr
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
          Group Scheduling Made Simple
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Find the perfect time to meet with your friends, family, or team. No more back-and-forth texts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://apps.apple.com/app/schedulr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Download on the App Store
          </a>
          <Link
            href="#features"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] text-[#FA4A8C] hover:text-[#945AE0] hover:underline underline-offset-4 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

