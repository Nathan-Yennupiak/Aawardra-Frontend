import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I cast a nomination?",
      a: "Simply browse the active awards, click on a candidate's profile, and select 'Nominate Now'. You will be securely redirected to our payment processor to complete your nomination."
    },
    {
      q: "Is my payment secure?",
      a: "Yes. All payments are processed through Paystack, a highly secure and globally recognized payment gateway. We do not store your credit card details on our servers."
    },
    {
      q: "Can I nominate multiple times?",
      a: "Yes! There are no limits to how many times you can support your favorite candidate."
    },
    {
      q: "When do awards end?",
      a: "Each award has its own specific end date. This information is typically displayed on the main award page."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          Have questions? We're here to help. Find answers to the most common queries below.
        </p>
      </div>
      
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-panel p-6 md:p-8 hover:border-border-strong transition-colors">
            <h3 className="text-xl font-bold text-text-main mb-3 flex items-start gap-3">
              <span className="text-primary-accent">Q.</span> {faq.q}
            </h3>
            <p className="text-text-muted text-lg leading-relaxed pl-8">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
