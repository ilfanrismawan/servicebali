'use client';

import OptimizedImage from '../OptimizedImage';
import type { ContentData } from '../../../lib/content';

interface GalleryProps {
  content: ContentData['gallery'];
  visibleSections: Set<string>;
}

export default function Gallery({ content, visibleSections }: GalleryProps) {
  if (!content) return null;

  return (
    <section 
      id="gallery-section"
      data-animate
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${
          visibleSections.has('gallery-section') ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.images.map((image, index) => (
            <div
              key={index}
              className={`relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 group ${
                visibleSections.has('gallery-section') ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <OptimizedImage
                src={image.url}
                alt={image.caption}
                fill
                className="object-cover group-hover:scale-125 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

