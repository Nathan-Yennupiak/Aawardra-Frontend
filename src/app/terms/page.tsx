import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20 min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-text-muted text-lg">Last Updated: October 2026</p>
      </div>
      
      <div className="glass-panel p-8 md:p-12 space-y-8 text-text-muted text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Awards Platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">2. Nomination and Payments</h2>
          <p>
            All nominations cast through our platform are final. Payments made for nominations are non-refundable unless expressly stated by the award organizer. We are not responsible for disputes between voters and award organizers regarding the outcome of awards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">3. User Conduct</h2>
          <p>
            You agree not to use the platform for any unlawful purpose or any purpose prohibited under this clause. You agree not to use automated systems or bots to cast fraudulent votes or manipulate award results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-main mb-4">4. Modifications to Service</h2>
          <p>
            We reserve the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
          </p>
        </section>
      </div>
    </div>
  );
}
