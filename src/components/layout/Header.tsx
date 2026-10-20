'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-base/90 md:bg-bg-base/70 backdrop-blur-md border-b-2 border-border-subtle py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <Link href="/" className="inline-block text-2xl font-heading font-black text-text-main mb-4 tracking-tighter">
              AWARDS<span className="text-primary-accent">.</span>
            </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mr-4">
          <Link href="/" className="inline-block font-heading font-medium text-text-main hover:text-primary-accent transition-all duration-300">
            Home
          </Link>
          <Link href="/awards" className="inline-block font-heading font-medium text-text-main hover:text-primary-accent transition-all duration-300">
            All Awards
          </Link>
          <Link href="/about" className="inline-block font-heading font-medium text-text-main hover:text-primary-accent transition-all duration-300">
            About
          </Link>
          <Link href="/faq" className="inline-block font-heading font-medium text-text-main hover:text-primary-accent transition-all duration-300">
            FAQ
          </Link>

          <ThemeToggle />
        </nav>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="flex flex-col justify-center items-center w-8 h-8 md:w-10 md:h-10 border border-border-subtle rounded-md bg-bg-surface cursor-pointer hover:bg-bg-surface-hover transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-4 md:w-5 h-0.5 bg-text-main transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
            <span className={`block w-4 md:w-5 h-0.5 bg-text-main transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-4 md:w-5 h-0.5 bg-text-main transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-bg-base/95 backdrop-blur-xl border-b border-border-subtle overflow-hidden transition-all duration-300 flex flex-col ${isMobileMenuOpen ? 'max-h-100 py-6 border-b-2' : 'max-h-0 py-0 border-transparent'}`}>
        <nav className="flex flex-col items-center gap-5 px-6">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="inline-block font-heading font-medium text-lg text-text-main hover:text-primary-accent transition-colors">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="inline-block font-heading font-medium text-lg text-text-main hover:text-primary-accent transition-colors">
            About
          </Link>
          <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="inline-block font-heading font-medium text-lg text-text-main hover:text-primary-accent transition-colors">
            FAQ
          </Link>
          <Link href="/awards" onClick={() => setIsMobileMenuOpen(false)} className="inline-block font-heading font-medium text-lg text-text-main hover:text-primary-accent transition-colors">
            All Awards
          </Link>

        </nav>
      </div>
    </header>
  );
}
