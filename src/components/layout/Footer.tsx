import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-subtle pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block text-2xl font-heading font-black text-text-main mb-4 tracking-tighter">
              AWARDS<span className="text-primary-accent">.</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Empowering communities to celebrate excellence and recognize outstanding achievements through a secure and transparent platform.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-text-main font-bold mb-4 uppercase text-sm tracking-wider">Platform</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-primary-accent transition-colors">Home</Link></li>
              <li><Link href="/awards" className="hover:text-primary-accent transition-colors">All Awards</Link></li>
              <li><Link href="/about" className="hover:text-primary-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-main font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li><Link href="/faq" className="hover:text-primary-accent transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-text-main font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li><Link href="/terms" className="hover:text-primary-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} Awards Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-text-main transition-colors" aria-label="Twitter">Twitter</a>
            <a href="#" className="hover:text-text-main transition-colors" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className="hover:text-text-main transition-colors" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
