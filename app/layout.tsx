import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Service Handphone Bali - Perbaikan Handphone Terpercaya",
    template: "%s | ServiceBali"
  },
  description: "Service handphone terpercaya di Bali. Melayani Klungkung, Amlapura, Denpasar, dan Gilimanuk. Perbaikan cepat, berkualitas, harga terjangkau. Hubungi 0851-6277-3332",
  keywords: [
    "service handphone bali",
    "perbaikan handphone bali",
    "service hp klungkung",
    "service hp amlapura",
    "service hp denpasar",
    "service hp gilimanuk",
    "ganti layar handphone bali",
    "perbaikan baterai handphone",
    "service center handphone bali",
    "perbaikan hp terpercaya bali"
  ],
  authors: [{ name: "ServiceBali" }],
  creator: "ServiceBali",
  publisher: "ServiceBali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://servicebali.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'ServiceBali',
    title: 'Service Handphone Bali - Perbaikan Handphone Terpercaya',
    description: 'Service handphone terpercaya di Bali. Melayani Klungkung, Amlapura, Denpasar, dan Gilimanuk. Perbaikan cepat, berkualitas, harga terjangkau.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Service Handphone Bali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Handphone Bali - Perbaikan Handphone Terpercaya',
    description: 'Service handphone terpercaya di Bali. Melayani Klungkung, Amlapura, Denpasar, dan Gilimanuk.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '0g_TZ1XzdflfI-7W6LDwI8XJ9eMeEudlB8Myv2KlSuU',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
