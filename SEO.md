# Panduan SEO untuk ServiceBali

## ✅ Fitur SEO yang Sudah Diimplementasikan

### 1. Meta Tags Lengkap
- ✅ Title dengan template
- ✅ Description yang informatif
- ✅ Keywords untuk pencarian
- ✅ Open Graph tags untuk social media
- ✅ Twitter Card tags
- ✅ Canonical URLs

### 2. Structured Data (JSON-LD)
- ✅ Organization Schema (LocalBusiness)
- ✅ Service Schema
- ✅ FAQ Schema
- ✅ Area Served (Klungkung, Amlapura, Denpasar, Gilimanuk)

### 3. Technical SEO
- ✅ Sitemap.xml (otomatis di-generate)
- ✅ Robots.txt (otomatis di-generate)
- ✅ Lang attribute (id untuk bahasa Indonesia)
- ✅ Mobile-friendly viewport
- ✅ Theme color

### 4. Performance
- ✅ Image optimization dengan Next.js Image
- ✅ Lazy loading untuk images
- ✅ Optimized fonts

## 📝 Langkah-langkah Setup

### 1. Environment Variables
Buat file `.env.local` dan tambahkan:
```env
NEXT_PUBLIC_SITE_URL=https://servicebali.com
```

### 2. Google Search Console
1. Daftar di [Google Search Console](https://search.google.com/search-console)
2. Verifikasi website Anda
3. Submit sitemap: `https://servicebali.com/sitemap.xml`
4. Tambahkan verification code ke `app/layout.tsx` di bagian `verification.google`

### 3. Google Analytics (Opsional)
1. Buat Google Analytics account
2. Dapatkan Measurement ID
3. Tambahkan ke `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Social Media Images
Tambahkan gambar untuk social media sharing:
- `public/og-image.jpg` (1200x630px) - untuk Open Graph
- `public/apple-touch-icon.png` (180x180px) - untuk iOS
- `public/favicon.ico` - favicon website

### 5. Verifikasi SEO
Gunakan tools berikut untuk verifikasi:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)

## 🎯 Best Practices

### Content Optimization
1. **Title Tags**: Pastikan setiap halaman punya title yang unik dan deskriptif
2. **Meta Descriptions**: Tulis deskripsi yang menarik (150-160 karakter)
3. **Headings**: Gunakan H1, H2, H3 dengan hierarki yang benar
4. **Alt Text**: Semua gambar harus punya alt text yang deskriptif
5. **Internal Linking**: Link ke halaman lain di website

### Technical SEO
1. **Page Speed**: Optimalkan images dan minimize JavaScript
2. **Mobile First**: Pastikan website responsive dan mobile-friendly
3. **HTTPS**: Gunakan SSL certificate
4. **404 Pages**: Buat custom 404 page yang user-friendly

### Local SEO
1. **Google Business Profile**: Buat profil Google Business
2. **Local Citations**: Daftarkan di direktori lokal
3. **Reviews**: Minta review dari pelanggan
4. **NAP Consistency**: Pastikan Name, Address, Phone konsisten di semua platform

## 📊 Monitoring

### Tools yang Direkomendasikan
- Google Search Console
- Google Analytics
- Bing Webmaster Tools
- Ahrefs / SEMrush (opsional)

### Metrics yang Perlu Dimonitor
- Organic traffic
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Page load speed
- Mobile usability

## 🔄 Maintenance

1. **Update Content**: Update konten secara berkala
2. **Check Broken Links**: Periksa link yang rusak
3. **Monitor Performance**: Pantau page speed dan Core Web Vitals
4. **Update Sitemap**: Sitemap otomatis update, tapi pastikan semua halaman penting terindex

## 📞 Support

Jika ada pertanyaan tentang SEO, konsultasikan dengan:
- Google Search Central: https://developers.google.com/search
- Schema.org Documentation: https://schema.org/

