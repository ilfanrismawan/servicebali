'use client';

import OptimizedImage from '../OptimizedImage';
import type { ContentData } from '../../../lib/content';

interface TestimonialsProps {
  content: ContentData['testimonials'];
  visibleSections: Set<string>;
}

export default function Testimonials({ content, visibleSections }: TestimonialsProps) {
  if (!content) return null;

  return (
    <section 
      id="testimonials-section"
      data-animate
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${
          visibleSections.has('testimonials-section') ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                visibleSections.has('testimonials-section') ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-blue-200">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20" style={{ animationDelay: `${i * 0.1}s` }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

