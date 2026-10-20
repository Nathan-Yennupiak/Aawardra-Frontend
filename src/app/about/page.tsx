import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">About Us</h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          We believe in celebrating excellence and recognizing those who push the boundaries of innovation and creativity.
        </p>
      </div>
      
      <div className="glass-panel p-8 md:p-12 border-t-4 border-t-primary-accent shadow-2xl">
        <h2 className="text-2xl font-bold text-text-main mb-4">Our Mission</h2>
        <p className="text-text-muted text-lg leading-relaxed mb-8">
          Our mission is to provide a transparent, secure, and highly engaging platform for communities to nominate, vote, and celebrate their local and global heroes. Whether it's arts, technology, or community service, we ensure every voice is heard and every achievement is properly recognized.
        </p>

        <h2 className="text-2xl font-bold text-text-main mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed space-y-3 mb-8">
          <li><strong className="text-text-main">Transparency:</strong> Real-time tracking and public audits ensure a fair voting process.</li>
          <li><strong className="text-text-main">Security:</strong> We utilize state-of-the-art payment gateways and anti-fraud mechanisms.</li>
          <li><strong className="text-text-main">Premium Experience:</strong> Designed with modern aesthetics to make your award stand out.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-text-main mb-4">Get Involved</h2>
        <p className="text-text-muted text-lg leading-relaxed">
          Interested in hosting your own awards event on our platform? We provide end-to-end solutions for organizers. Reach out to our team via the contact page to get started.
        </p>
      </div>
    </div>
  );
}
