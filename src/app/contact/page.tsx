import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">Contact Us</h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          We'd love to hear from you. Get in touch with our support team or sales department.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6">Send a Message</h2>
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm text-text-muted mb-2 font-medium">Full Name</label>
              <input type="text" name="name" autoComplete="name" className="w-full p-4 rounded-lg bg-bg-surface border border-border-strong text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary-accent transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2 font-medium">Email Address</label>
              <input type="email" name="email" autoComplete="email" className="w-full p-4 rounded-lg bg-bg-surface border border-border-strong text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary-accent transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2 font-medium">Message</label>
              <textarea rows={5} className="w-full p-4 rounded-lg bg-bg-surface border border-border-strong text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary-accent transition-colors" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="btn-primary w-full py-4 text-lg font-bold rounded-lg mt-2">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="flex flex-col gap-8">
          <div className="glass-panel p-8">
            <h3 className="text-xl font-bold text-text-main mb-2">Email Support</h3>
            <p className="text-text-muted mb-4">Our team typically responds within 24 hours.</p>
            <a href="mailto:support@awardsplatform.com" className="text-primary-accent font-bold hover:underline">support@awardsplatform.com</a>
          </div>
          <div className="glass-panel p-8">
            <h3 className="text-xl font-bold text-text-main mb-2">Headquarters</h3>
            <p className="text-text-muted leading-relaxed">
              123 Innovation Drive<br />
              Tech District, TX 78701<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
