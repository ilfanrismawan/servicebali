'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import OptimizedImage from './OptimizedImage';
import StructuredData from './StructuredData';
import type { ContentData } from '../../lib/content';

// Lazy load heavy sections - only load when needed
const LazyGallery = dynamic(() => import('./sections/Gallery'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
  ssr: false,
});

const LazyTestimonials = dynamic(() => import('./sections/Testimonials'), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 rounded-lg" />,
  ssr: false,
});

const LazyFAQ = dynamic(() => import('./sections/FAQ'), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-100 rounded-lg" />,
  ssr: false,
});

interface HomeClientProps {
  content: ContentData;
}

export default function HomeClient({ content }: HomeClientProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState<Record<string, string>>({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
            
            // Trigger counter animation for stats
            if (entry.target.id === 'stats-section' && content?.stats) {
              content.stats.items.forEach((stat, index) => {
                const numStr = stat.number.replace(/[^0-9]/g, '');
                const suffix = stat.number.replace(/[0-9]/g, '');
                if (numStr) {
                  animateCounter(`stat-${index}`, parseInt(numStr), suffix, 2000);
                }
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [content]);

  // Counter animation function
  const animateCounter = (id: string, target: number, suffix: string, duration: number) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters((prev) => ({
        ...prev,
        [id]: Math.floor(current) + suffix,
      }));
    }, 16);
  };

  const whatsappUrl = `https://wa.me/6285162773332?text=${encodeURIComponent(content.contact.message)}`;

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={content} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ServiceBali
              </div>
              <Link 
                href="/admin" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                prefetch={false}
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section with Optimized Image */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {content.hero.image && (
            <div className="absolute inset-0 z-0">
              <OptimizedImage
                src={content.hero.image}
                alt="Hero"
                fill
                priority
                className="object-cover opacity-20"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
            </div>
          )}
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in drop-shadow-lg">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-delay">
                {content.hero.subtitle}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-delay-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {content.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        {content.whyChooseUs && (
          <section 
            id="why-choose-section"
            data-animate
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 ${
                visibleSections.has('why-choose-section') ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {content.whyChooseUs.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {content.whyChooseUs.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.whyChooseUs.items.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-center ${
                      visibleSections.has('why-choose-section') ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="text-5xl mb-4 animate-float">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        {content.stats && (
          <section 
            id="stats-section"
            data-animate
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white ${
              visibleSections.has('stats-section') ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                  visibleSections.has('stats-section') ? 'animate-slide-in-left' : 'opacity-0'
                }`}>
                  {content.stats.title}
                </h2>
                <p className={`text-xl text-blue-100 max-w-2xl mx-auto ${
                  visibleSections.has('stats-section') ? 'animate-slide-in-right' : 'opacity-0'
                }`}>
                  {content.stats.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.stats.items.map((stat, index) => {
                  const numStr = stat.number.replace(/[^0-9]/g, '');
                  const suffix = stat.number.replace(/[0-9]/g, '');
                  const displayNumber = counters[`stat-${index}`] || (visibleSections.has('stats-section') ? stat.number : '0' + suffix);
                  
                  return (
                    <div
                      key={index}
                      className={`text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-1 ${
                        visibleSections.has('stats-section') ? `animate-fade-in-up` : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-5xl mb-4 animate-bounce-slow">{stat.icon}</div>
                      <div className="text-5xl md:text-6xl font-bold mb-2">
                        {displayNumber}
                      </div>
                      <div className="text-lg text-blue-100">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section 
          id="services-section"
          data-animate
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 ${
              visibleSections.has('services-section') ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {content.services.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.services.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.items.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 ${
                    visibleSections.has('services-section') ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl mb-4 animate-pulse-slow">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {content.pricing && (
          <section 
            id="pricing-section"
            data-animate
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 ${
                visibleSections.has('pricing-section') ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {content.pricing.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
                  {content.pricing.subtitle}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {content.pricing.note}
                </p>
              </div>
              <div className="space-y-12">
                {content.pricing.categories.map((category, catIndex) => (
                  <div 
                    key={catIndex} 
                    className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg ${
                      visibleSections.has('pricing-section') ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${catIndex * 0.2}s` }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 hover-lift hover:scale-105"
                        >
                          <h4 className="font-semibold text-gray-900 mb-3">
                            {item.service}
                          </h4>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {item.price}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Garansi:</span> {item.warranty}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        {content.process && (
          <section 
            id="process-section"
            data-animate
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 ${
                visibleSections.has('process-section') ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {content.process.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {content.process.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.process.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative text-center ${
                      visibleSections.has('process-section') ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-slow">
                      {step.step}
                    </div>
                    <div className="text-4xl mb-3 animate-float">{step.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                    {index < content.process!.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-x-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Section with Optimized Image */}
        <section 
          id="about-section"
          data-animate
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {content.about.image && (
                <div className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl ${
                  visibleSections.has('about-section') ? 'animate-slide-in-left' : 'opacity-0'
                }`}>
                  <OptimizedImage
                    src={content.about.image}
                    alt="About Us"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className={`${
                visibleSections.has('about-section') ? 'animate-slide-in-right' : 'opacity-0'
              }`}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {content.about.title}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {content.about.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lazy Loaded Testimonials */}
        {content.testimonials && (
          <LazyTestimonials content={content.testimonials} visibleSections={visibleSections} />
        )}

        {/* Lazy Loaded Gallery */}
        {content.gallery && (
          <LazyGallery content={content.gallery} visibleSections={visibleSections} />
        )}

        {/* Lazy Loaded FAQ */}
        {content.faq && (
          <LazyFAQ content={content.faq} visibleSections={visibleSections} />
        )}

        {/* Locations Section */}
        <section 
          id="locations-section"
          data-animate
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 ${
              visibleSections.has('locations-section') ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {content.locations.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.locations.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.locations.items.map((location, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-105 ${
                    visibleSections.has('locations-section') ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h3>
                        <p className="text-gray-600 mb-4">{location.description}</p>
                      </div>
                      <div className="text-3xl">📍</div>
                    </div>
                    {location.address && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">Alamat:</p>
                        <p className="text-gray-700">{location.address}</p>
                      </div>
                    )}
                    {location.phone && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">Telepon:</p>
                        <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-800">
                          {location.phone}
                        </a>
                      </div>
                    )}
                    {location.hours && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Jam Operasional:</p>
                        <p className="text-gray-700">{location.hours}</p>
                      </div>
                    )}
                    {location.mapUrl && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <iframe
                          src={location.mapUrl}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full"
                          title={`Map ${location.name}`}
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {content.contact.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {content.contact.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp: {content.contact.whatsapp}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold mb-4">ServiceBali</div>
            <p className="text-gray-400 mb-4">Service Handphone Terpercaya di Bali</p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ServiceBali. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300 flex items-center gap-2 group animate-float"
          aria-label="Hubungi via WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="hidden md:block text-sm font-semibold pr-2">Chat WhatsApp</span>
        </a>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          
          .animate-fade-in-delay {
            animation: fade-in 0.8s ease-out 0.2s both;
          }
          
          .animate-fade-in-delay-2 {
            animation: fade-in 0.8s ease-out 0.4s both;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out forwards;
          }
          
          .animate-scale-in {
            animation: scale-in 0.6s ease-out forwards;
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </>
  );
}
