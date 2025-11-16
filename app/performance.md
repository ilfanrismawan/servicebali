# Optimasi Performa Next.js - ServiceBali

## ✅ Optimasi yang Sudah Diimplementasikan

### 1. **Static Site Generation (SSG) / Incremental Static Regeneration (ISR)**
- ✅ Page menggunakan `getContent()` di server-side
- ✅ ISR dengan `revalidate: 3600` (1 jam)
- ✅ Data di-fetch saat build time
- ✅ Konten di-cache dan di-regenerate otomatis

### 2. **Lazy Loading**
- ✅ **Dynamic Imports** untuk section berat:
  - Gallery (lazy load dengan loading state)
  - Testimonials (lazy load dengan loading state)
  - FAQ (lazy load dengan loading state)
- ✅ **Code Splitting** otomatis oleh Next.js
- ✅ **Suspense Boundaries** untuk loading states

### 3. **Optimasi Gambar**
- ✅ **OptimizedImage Component** dengan:
  - Lazy loading default (kecuali priority images)
  - Quality: 85 (balance antara kualitas dan ukuran)
  - Format: AVIF & WebP (otomatis)
  - Responsive sizes
  - Proper `sizes` attribute untuk responsive images
- ✅ **Next.js Image Optimization**:
  - Device sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  - Image sizes: [16, 32, 48, 64, 96, 128, 256, 384]
  - Minimum cache TTL: 60 detik
  - AVIF & WebP format support

### 4. **Google Indexing**
- ✅ **Sitemap.xml** otomatis di-generate
  - URL utama dengan priority 1.0
  - Location pages (jika ada)
  - Change frequency: daily untuk homepage
- ✅ **Robots.txt** otomatis
  - Allow semua halaman publik
  - Disallow /admin dan /api
  - Sitemap reference
- ✅ **Structured Data (JSON-LD)**
  - Organization Schema
  - Service Schema
  - FAQ Schema
- ✅ **Meta Tags Lengkap**
  - Title, description, keywords
  - Open Graph tags
  - Twitter Card tags
  - Canonical URLs

### 5. **Build Optimizations**
- ✅ **SWC Minification** (faster than Terser)
- ✅ **Compression** enabled
- ✅ **Font Optimization** enabled
- ✅ **Standalone Output** untuk deployment

### 6. **Runtime Optimizations**
- ✅ **Prefetch: false** untuk link admin (tidak perlu preload)
- ✅ **Intersection Observer** untuk animasi (lebih efisien dari scroll listener)
- ✅ **Memoization** untuk counter animations
- ✅ **CSS-in-JS** dengan style jsx (tidak ada runtime CSS-in-JS overhead)

## 📊 Expected Performance Metrics

### Core Web Vitals Target:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Score Target:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🔧 Cara Menggunakan

### 1. Build untuk Production
```bash
npm run build
```

### 2. Test Performance
```bash
npm run build
npm run start
# Lalu test di PageSpeed Insights atau Lighthouse
```

### 3. Monitor Performance
- Gunakan Google Search Console untuk monitoring
- Setup Google Analytics untuk tracking
- Monitor Core Web Vitals di Search Console

## 📈 Optimasi Tambahan (Opsional)

### 1. CDN untuk Images
- Upload images ke CDN (Cloudinary, Imgix, dll)
- Update image URLs di content.json

### 2. Service Worker (PWA)
- Tambahkan service worker untuk offline support
- Cache static assets

### 3. Database untuk Content
- Migrate dari JSON file ke database (PostgreSQL, MongoDB)
- Implement proper caching layer

### 4. Edge Functions
- Gunakan Edge Runtime untuk API routes
- Deploy di edge locations

## 🚀 Deployment Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` di environment variables
- [ ] Build production: `npm run build`
- [ ] Test sitemap: `https://yoursite.com/sitemap.xml`
- [ ] Test robots.txt: `https://yoursite.com/robots.txt`
- [ ] Submit sitemap ke Google Search Console
- [ ] Verify structured data di Google Rich Results Test
- [ ] Test performance di PageSpeed Insights
- [ ] Monitor Core Web Vitals di Search Console

## 📝 Notes

- ISR akan regenerate halaman setiap 1 jam atau saat ada request setelah 1 jam
- Images akan di-cache oleh Next.js dengan TTL 60 detik
- Lazy loaded components hanya akan di-load saat user scroll ke section tersebut
- Sitemap akan otomatis update saat build

