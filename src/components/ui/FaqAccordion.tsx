'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className={`glass-panel overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary-accent/40 shadow-lg' : 'hover:border-white/20'}`}
          >
            <button 
              onClick={() => toggleOpen(idx)}
              className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
            >
              <h3 className="text-xl font-bold text-text-main flex items-start gap-3 m-0">
                <span className="text-primary-accent">Q.</span> {faq.q}
              </h3>
              <div className="shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-bg-surface border border-border-subtle text-primary-accent transition-colors hover:bg-bg-surface-hover">
                <span className={`text-lg font-bold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-125 opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}
            >
              <p className="text-text-muted text-lg leading-relaxed pl-6 md:pl-13 pr-6 md:pr-8">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
