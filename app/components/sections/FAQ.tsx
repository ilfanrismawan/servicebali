'use client';

import { useState } from 'react';
import type { ContentData } from '../../../lib/content';

interface FAQProps {
  content: ContentData['faq'];
  visibleSections: Set<string>;
}

export default function FAQ({ content, visibleSections }: FAQProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  if (!content) return null;

  return (
    <section 
      id="faq-section"
      data-animate
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${
          visibleSections.has('faq-section') ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        <div className="space-y-4">
          {content.items.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                visibleSections.has('faq-section') ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-white text-gray-700 animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

