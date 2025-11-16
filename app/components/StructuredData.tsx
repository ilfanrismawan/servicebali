'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: {
    hero?: {
      title: string;
      subtitle: string;
    };
    contact?: {
      whatsapp: string;
    };
    locations?: {
      items: Array<{
        name: string;
        address?: string;
        phone?: string;
      }>;
    };
  };
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ServiceBali",
      "description": data.hero?.subtitle || "Service handphone terpercaya di Bali",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://servicebali.com",
      "telephone": data.contact?.whatsapp || "0851-6277-3332",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bali",
        "addressRegion": "Bali",
        "addressCountry": "ID"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Klungkung"
        },
        {
          "@type": "City",
          "name": "Amlapura"
        },
        {
          "@type": "City",
          "name": "Denpasar"
        },
        {
          "@type": "City",
          "name": "Gilimanuk"
        }
      ],
      "serviceType": [
        "Perbaikan Layar Handphone",
        "Perbaikan Baterai",
        "Perbaikan Software",
        "Perbaikan Charging Port",
        "Perbaikan Kamera",
        "Perbaikan Motherboard"
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Perbaikan Handphone",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ServiceBali"
      },
      "areaServed": {
        "@type": "State",
        "name": "Bali"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `https://wa.me/6285162773332`,
        "serviceType": "WhatsApp"
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa lama waktu perbaikan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waktu perbaikan bervariasi tergantung jenis kerusakan. Umumnya 1-3 jam untuk perbaikan ringan, dan 1-2 hari untuk perbaikan kompleks."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah ada garansi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, semua perbaikan dilengkapi dengan garansi. Garansi bervariasi tergantung jenis perbaikan, minimal 30 hari."
          }
        },
        {
          "@type": "Question",
          "name": "Merek handphone apa saja yang bisa diperbaiki?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami melayani semua merek handphone populer seperti iPhone, Samsung, Xiaomi, Oppo, Vivo, Realme, dan lainnya."
          }
        }
      ]
    };

    // Add scripts to head
    const scripts = [
      { id: 'org-schema', schema: organizationSchema },
      { id: 'service-schema', schema: serviceSchema },
      { id: 'faq-schema', schema: faqSchema }
    ];

    scripts.forEach(({ id, schema }) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, [data]);

  return null;
}

