# 🚀 Deployment Guide - Optimized Build

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Preview locally (optional)
npm run preview

# 4. Deploy to Vercel
vercel --prod
```

---

## Vercel Deployment (Recommended)

### **Method 1: Vercel CLI**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Done!** Your site will be live at `https://your-project.vercel.app`

### **Method 2: Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import this Git repository
4. Vercel auto-detects Vite
5. Click "Deploy"

### **Build Settings (Auto-Detected)**
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## Environment Variables (If Needed)

If you have any API keys or environment variables:

1. **Create `.env.local` file:**
   ```env
   VITE_API_KEY=your_key_here
   VITE_STRIPE_KEY=your_stripe_key
   ```

2. **Add to Vercel:**
   - Go to Project Settings → Environment Variables
   - Add each variable
   - Redeploy

---

## Performance Verification

After deployment, test performance:

1. **Lighthouse (Chrome DevTools)**
   - Open deployed site
   - F12 → Lighthouse tab
   - Run audit
   - Target: 90+ Performance score

2. **Web Vitals**
   - First Contentful Paint: < 1.5s ✅
   - Largest Contentful Paint: < 2.5s ✅
   - Time to Interactive: < 2s ✅

3. **Network Tab**
   - Initial JS: ~300-400 KB ✅
   - Chunks load on demand ✅

---

## Build Output Structure

```
dist/
├── index.html
└── assets/
    ├── index-[hash].js           (Main app)
    ├── react-vendor-[hash].js    (React core - cached)
    ├── animation-vendor-[hash].js (Framer Motion - cached)
    ├── three-vendor-[hash].js    (Three.js - lazy loaded)
    ├── ShopPage-[hash].js        (Shop route chunk)
    ├── ProductPage-[hash].js     (Product route chunk)
    ├── CustomizeCake-[hash].js   (Customize route chunk)
    └── ... (other route chunks)
```

---

## Caching Strategy

Vercel automatically handles caching with:

- **Immutable chunks:** React, Framer, Three.js (long cache)
- **Route chunks:** Cached until code changes
- **Main bundle:** Smart invalidation on updates

---

## Rollback (If Needed)

If you need to rollback:

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

---

## Troubleshooting

### **Build Fails**

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### **Images Not Loading**

- Ensure images are in `public/` folder
- Check image paths start with `/` (e.g., `/First.jpg`)

### **Chunk Load Error**

- Clear browser cache
- Redeploy with `vercel --prod --force`

---

## Performance Monitoring

### **Add Vercel Analytics (Optional)**

1. Install:
   ```bash
   npm install @vercel/analytics
   ```

2. Add to `src/main.tsx`:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   // In render
   <Analytics />
   ```

3. View metrics at vercel.com/dashboard

---

## Custom Domain

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your domain (e.g., `cakeshop.com`)
3. Update DNS records as instructed
4. SSL automatically configured

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **Issues:** Check OPTIMIZATION_REPORT.md

---

**Ready to deploy!** 🎉
