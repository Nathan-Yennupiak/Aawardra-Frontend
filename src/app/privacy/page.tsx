import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20 min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-text-muted text-lg">Last Updated: October 2026</p>
      </div>
      
      <div className="glass-panel p-8 md:p-12 space-y-8 text-text-muted text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">1. Information We Collect</h2>
          <p>
            When you use the Awards Platform, we collect information that you provide to us directly, such as when you create an account, cast a nomination, or communicate with us. This may include your name, email address, and payment information (processed securely via Paystack).
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate, maintain, and provide the features of the platform. Your email address may be used to send transaction receipts, important updates, and nomination confirmations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">3. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Payment transactions are strictly processed by PCI-DSS compliant third-party gateways.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@awardsplatform.com" className="text-primary-accent hover:underline">privacy@awardsplatform.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
