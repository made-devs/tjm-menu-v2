# TJM Auto Care — Menu Web App Guideline

> Digital menu untuk tablet outlet TJM Auto Care. Menampilkan Promo & Paket Service dengan tampilan racing modern.

---

## 1. Project Overview

| Item | Detail |
|---|---|
| **Nama** | TJM Auto Care Menu |
| **Tujuan** | Menampilkan promo & paket service di tablet outlet |
| **Target Device** | Mobile (360–430px) & Tablet (768–1024px) — **locked, no desktop** |
| **Tech Stack** | Next.js 16, Tailwind CSS v4, GSAP (latest, full free) |
| **Bahasa** | Indonesia |

---

## 2. Brand Identity & Sub-Brands

### Main Brand
**TJM Auto Care** — Bengkel mobil multiservis

### 5 Sub-Brands
Masing-masing punya promo & paket service sendiri:

| # | Sub-Brand | Deskripsi | Warna Aksen (saran) |
|---|---|---|---|
| 1 | **TJM AC Mobil** | Service AC kendaraan | 🔵 Cold Blue `#00B4D8` |
| 2 | **TJM Auto Care** | Perawatan umum kendaraan | 🔴 Main Red (brand) |
| 3 | **TJM Auto Detailing** | Detailing & coating | 🟡 Gold `#FFB800` |
| 4 | **TJM Express** | Service cepat & ringan | 🟢 Lime `#76FF03` |
| 5 | **TJM Undercarriage** | Kaki-kaki & undercarriage | 🟠 Orange `#FF6D00` |

> [!IMPORTANT]
> Warna aksen sub-brand di atas hanya saran untuk membedakan tiap sub-brand secara visual. Main color tetap **merah & hitam**. Apakah setuju dengan skema ini atau mau semua sub-brand pakai merah-hitam saja?

---

## 3. Design System

### 3.1 Color Palette

```
── PRIMARY ──────────────────────────────────
--tjm-red-600:    #DC2626    ← Main Red
--tjm-red-500:    #EF4444    ← Active / Accent
--tjm-red-700:    #B91C1C    ← Deep Red
--tjm-red-900:    #7F1D1D    ← Darkest Red

── NEUTRAL (Dark Base) ─────────────────────
--tjm-black:      #0A0A0A    ← Background
--tjm-dark-900:   #111111    ← Cards / Surface
--tjm-dark-800:   #1A1A1A    ← Elevated Surface
--tjm-dark-700:   #252525    ← Borders
--tjm-dark-600:   #333333    ← Subtle elements

── TEXT ─────────────────────────────────────
--tjm-white:      #FFFFFF    ← Primary text
--tjm-gray-300:   #D4D4D4    ← Secondary text
--tjm-gray-500:   #737373    ← Muted text

── GRADIENTS ────────────────────────────────
Racing Red:       linear-gradient(135deg, #DC2626, #7F1D1D)
Carbon Fiber:     linear-gradient(180deg, #1A1A1A, #0A0A0A)
Gloss Stripe:     linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)
```

### 3.2 Typography

```
── FONT FAMILY ──────────────────────────────
Primary:          Rajdhani (Google Fonts) — Racing / Industrial feel
Fallback:         system-ui, sans-serif

── SCALE ────────────────────────────────────
Hero:             48px / 700 (bold)    ← Splash screens
Title:            28px / 700 (bold)    ← Page titles
Subtitle:         20px / 600 (semi)    ← Section headers
Body:             16px / 400 (regular) ← Body text
Caption:          14px / 400 (regular) ← Meta info
Small:            12px / 500 (medium)  ← Badges, tags

── LETTER SPACING ───────────────────────────
Headings:         0.05em (wider)
Body:             0.02em (subtle)
```

> [!NOTE]
> **Rajdhani** dipilih karena karakter racing/motorsport yang tegas. Alternatif: Orbitron (lebih futuristik), Exo 2 (lebih clean), atau Bebas Neue (lebih bold). Preferensi?

### 3.3 Spacing & Sizing

```
Base unit:        4px
Content padding:  16px (mobile), 24px (tablet)
Card gap:         12px (mobile), 16px (tablet)
Border radius:    12px (cards), 8px (buttons), 4px (tags)
Bottom nav height: 72px
Safe area bottom: env(safe-area-inset-bottom, 0px)
```

### 3.4 Racing Visual Elements

| Element | Implementasi |
|---|---|
| **Checkered Pattern** | CSS repeating-gradient sebagai background subtle |
| **Speed Lines** | SVG diagonal lines animasi → masuk dari kanan |
| **Skewed Sections** | `transform: skewY(-3deg)` pada section dividers |
| **Carbon Fiber** | CSS pattern texture pada card backgrounds |
| **Glow Effect** | Box-shadow merah pada elemen aktif / CTA |
| **Diagonal Stripes** | Accent stripes pada header/badge dengan 45° gradient |
| **Rev Counter** | Animasi loading bar bergaya tachometer |

---

## 4. Layout & Navigation

### 4.1 Screen Structure

```
┌──────────────────────────────┐
│         STATUS BAR           │  ← System (hidden via PWA)
├──────────────────────────────┤
│                              │
│                              │
│                              │
│       MAIN CONTENT           │  ← Scrollable area
│       (pb-[88px])            │     height: calc(100dvh - 72px)
│                              │
│                              │
│                              │
├──────────────────────────────┤
│  🏠    🎯    🔧    🖼️    │  ← Bottom Nav (fixed, 72px)
│ Home  Promo Service Gallery  │     backdrop-blur + glass effect
└──────────────────────────────┘
```

### 4.2 Bottom Navigation Bar

- **Fixed bottom**, `backdrop-blur-xl`, semi-transparent hitam
- **4 tabs**: Home, Promo, Service, Gallery
- Active tab: Ikon merah + label merah + glow subtle
- Inactive: Icon abu-abu
- **Touch feedback**: Scale down 0.9 on tap → spring back
- Tab indicator: Red line/dot animasi geser (GSAP)

### 4.3 Page Descriptions

#### 🏠 Home
- **Hero section**: Logo TJM + tagline animasi (typewriter / reveal)
- **Racing marquee**: Scrolling ticker tape dengan promo highlights
- **Quick access**: Grid 2×3 shortcut ke sub-brand (dengan ikon racing)
- **Featured promo**: Horizontal scroll card (1 featured prominent)
- **CTA buttons**: "Lihat Promo" & "Lihat Service"

#### 🎯 Promo
- **Sub-brand filter**: Horizontal scrollable tabs/pills (5 sub-brands)
- **Active filter**: Pill merah dengan glow
- **Promo cards**: Aspect ratio **4:5**, stacked vertical
- **Card animation**: Stagger reveal dari bawah (GSAP ScrollTrigger)
- **Card content**: Image + badge "NEW" / "HOT" + judul promo
- **Tap to expand**: Modal / bottom sheet dengan detail promo

#### 🔧 Service
- **Sub-brand filter**: Sama seperti Promo
- **Service cards**: Aspect ratio **1:1**, grid 2 kolom
- **Card content**: Image + nama paket + harga range
- **Tap to expand**: Detail paket → isi paket, harga, estimasi waktu
- **Category badges**: "AC", "Oli", "Tune Up", dsb.

#### 🖼️ Gallery
- **Grid masonry / uniform**: Foto-foto hasil kerja
- **Lightbox**: Tap foto → fullscreen dengan gesture swipe
- **Filter by sub-brand**: Tabs atas
- **Before/After**: Swipe slider comparison (jika ada)

### 4.4 Potential Additional Tabs

| Tab | Icon | Deskripsi |
|---|---|---|
| ℹ️ **About** | Info circle | Profil TJM, lokasi, jam operasional |
| 📞 **Contact** | Phone | WhatsApp link, telepon, maps |

---

## 5. Animation Strategy (GSAP)

> [!IMPORTANT]
> Semua animasi berbasis **touch/tap dan scroll** — **TIDAK ADA hover animation**. Ini krusial karena digunakan di tablet.

### 5.1 Page Transitions
```
Masuk:     Fade in + slide up (y: 30 → 0, opacity: 0 → 1)
Keluar:    Fade out + slide down (y: 0 → -20, opacity: 1 → 0)
Duration:  0.4s, ease: "power2.out"
```

### 5.2 Entrance Animations (ScrollTrigger)
```
Cards:        Stagger dari bawah, 0.1s interval
Badges:       Scale dari 0 → 1 dengan elastic ease
Section title: Slide dari kiri + clip-path reveal
Numbers/price: CountUp animation (GSAP to)
```

### 5.3 Micro Animations (Always-on)
```
Logo pulse:       Scale 1 → 1.02 → 1, infinite, 3s
Glow breathing:   Box-shadow opacity pulse, 2s
Speed lines:      Translate diagonal, continuous, 1.5s
Ticker marquee:   translateX continuous scroll
Active tab glow:  Red shadow pulse, 1.5s
Floating badges:  Gentle float up/down, 2s, stagger
```

### 5.4 Interaction Animations (Touch)
```
Card tap:         Scale 0.97 → 1, 0.2s, "power2.out"
Button tap:       Scale 0.95 → 1 + red flash
Tab switch:       Indicator bar slide (GSAP .to, x)
Modal open:       Slide up from bottom + overlay fade
Modal close:      Slide down + overlay fade out
Pull to refresh:  (optional) tachometer spin
Filter tap:       Pill expand + color transition
```

### 5.5 GSAP Plugins Used

| Plugin | Gunakan Untuk |
|---|---|
| **ScrollTrigger** | Scroll-based entrance animations |
| **Flip** | Layout transition saat filter berubah |
| **TextPlugin** | Typewriter effect di hero |
| **MotionPathPlugin** | Animasi element along racing track path (home) |
| **SplitText** | Split karakter untuk stagger reveal (jika tersedia gratis) |
| **Draggable** | Swipe gallery, bottom sheet drag |
| **Observer** | Touch gesture detection |

> [!NOTE]
> Per Mei 2026, GSAP sudah fully free. Semua plugin termasuk premium yang sebelumnya berbayar kini bisa digunakan tanpa lisensi.

---

## 6. Component Architecture

### 6.1 Shared Components

```
src/
├── components/
│   ├── layout/
│   │   ├── BottomNav.jsx          ← Bottom navigation bar
│   │   ├── PageWrapper.jsx        ← Scroll container + transitions
│   │   └── SafeAreaProvider.jsx   ← Device safe area handler
│   │
│   ├── ui/
│   │   ├── Badge.jsx              ← "NEW", "HOT", sub-brand tags
│   │   ├── Card.jsx               ← Base card with tap animation
│   │   ├── PromoCard.jsx          ← 4:5 promo image card
│   │   ├── ServiceCard.jsx        ← 1:1 service image card
│   │   ├── SubBrandFilter.jsx     ← Horizontal filter pills
│   │   ├── Modal.jsx              ← Bottom sheet / modal overlay
│   │   ├── Ticker.jsx             ← Racing marquee ticker
│   │   ├── SpeedLines.jsx         ← Decorative animated speed lines
│   │   ├── CheckeredBg.jsx        ← Checkered pattern background
│   │   └── GlowButton.jsx         ← CTA button with red glow
│   │
│   └── animations/
│       ├── useGSAP.js             ← GSAP context hook (cleanup)
│       ├── useScrollReveal.js     ← ScrollTrigger entrance hook
│       └── useTapAnimation.js     ← Touch feedback hook
```

### 6.2 Page Components

```
src/app/
├── layout.js                      ← Root layout (fonts, meta, theme lock)
├── page.js                        ← Home page (default route)
├── promo/
│   └── page.js                    ← Promo listing page
├── service/
│   └── page.js                    ← Service listing page
├── gallery/
│   └── page.js                    ← Gallery page
└── globals.css                    ← Tailwind + custom properties + patterns
```

---

## 7. Data Structure

> [!IMPORTANT]
> Data promo dan service untuk fase awal akan menggunakan **static JSON files**. Ini bisa dimigrasikan ke CMS/API nanti. Setuju dengan pendekatan ini?

### 7.1 Sub-Brands

```json
{
  "subBrands": [
    {
      "id": "ac-mobil",
      "name": "TJM AC Mobil",
      "shortName": "AC Mobil",
      "icon": "❄️",
      "accentColor": "#00B4D8",
      "description": "Spesialis service AC kendaraan"
    }
  ]
}
```

### 7.2 Promos (4:5 format)

```json
{
  "promos": [
    {
      "id": "promo-001",
      "subBrandId": "ac-mobil",
      "title": "Promo AC Spesial Lebaran",
      "image": "/images/promos/ac-lebaran.jpg",
      "aspectRatio": "4:5",
      "badge": "HOT",
      "validUntil": "2026-06-30",
      "description": "Isi freon R134a + cuci evaporator...",
      "price": "Mulai Rp 299.000"
    }
  ]
}
```

### 7.3 Services (1:1 format)

```json
{
  "services": [
    {
      "id": "svc-001",
      "subBrandId": "auto-care",
      "name": "Paket Tune Up Lengkap",
      "image": "/images/services/tuneup.jpg",
      "aspectRatio": "1:1",
      "category": "Tune Up",
      "priceRange": "Rp 500.000 - 1.200.000",
      "estimatedTime": "2-3 jam",
      "includes": [
        "Ganti oli mesin",
        "Ganti filter oli",
        "Ganti busi",
        "Cek & setel klep"
      ]
    }
  ]
}
```

---

## 8. Responsive Breakpoints & Device Lock

### 8.1 Breakpoints
```css
/* Mobile First */
Default:          360px – 430px    (smartphone)
@screen sm:       640px+           (large phone)
@screen md:       768px+           (tablet portrait)
@screen lg:       1024px           (tablet landscape — max)
```

### 8.2 Desktop Lock Strategy

Jika diakses dari desktop (>1024px), tampilkan:
- Layout tetap max-width 430px di tengah (phone mockup style)
- **ATAU** block screen dengan pesan "Buka di tablet atau mobile"
- Background: carbon fiber pattern gelap

> [!IMPORTANT]
> Pilih salah satu pendekatan desktop lock:
> 1. **Centered phone frame** — user tetap bisa lihat tapi dikunci max-width
> 2. **Full block** — tampilkan pesan "Gunakan tablet" + logo TJM
> 
> Mana yang diprefer?

---

## 9. File Structure (Complete)

```
tjm-menu-v2/
├── public/
│   ├── images/
│   │   ├── promos/              ← Grafis promo 4:5
│   │   ├── services/            ← Grafis service 1:1
│   │   ├── gallery/             ← Foto gallery
│   │   ├── brands/              ← Logo sub-brand
│   │   └── logo-tjm.svg         ← Logo utama
│   └── icons/
│       ├── nav-home.svg
│       ├── nav-promo.svg
│       ├── nav-service.svg
│       └── nav-gallery.svg
│
├── src/
│   ├── app/
│   │   ├── globals.css           ← Design tokens + patterns + Tailwind
│   │   ├── layout.js             ← Root layout (font, meta, BottomNav)
│   │   ├── page.js               ← Home
│   │   ├── promo/page.js         ← Promo listing
│   │   ├── service/page.js       ← Service listing
│   │   └── gallery/page.js       ← Gallery
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.jsx
│   │   │   └── PageWrapper.jsx
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── PromoCard.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── SubBrandFilter.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Ticker.jsx
│   │   │   ├── SpeedLines.jsx
│   │   │   └── GlowButton.jsx
│   │   └── animations/
│   │       ├── useGSAP.js
│   │       ├── useScrollReveal.js
│   │       └── useTapAnimation.js
│   │
│   ├── data/
│   │   ├── subBrands.js          ← Sub-brand definitions
│   │   ├── promos.js             ← Promo data
│   │   ├── services.js           ← Service data
│   │   └── gallery.js            ← Gallery data
│   │
│   └── lib/
│       └── gsap.js               ← GSAP register plugins
│
├── package.json
├── next.config.mjs
├── postcss.config.mjs
└── GUIDELINE.md                  ← This file (copy in repo)
```

---

## 10. Technical Notes

### 10.1 GSAP Integration with Next.js 16

```jsx
// src/lib/gsap.js
'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin, Draggable, Observer);

export { gsap, ScrollTrigger, Flip, TextPlugin, Draggable, Observer };
```

### 10.2 Tailwind v4 Custom Theme

```css
/* globals.css */
@import "tailwindcss";

@theme inline {
  --color-tjm-red-500: #EF4444;
  --color-tjm-red-600: #DC2626;
  --color-tjm-red-700: #B91C1C;
  --color-tjm-red-900: #7F1D1D;
  --color-tjm-black: #0A0A0A;
  --color-tjm-dark-900: #111111;
  --color-tjm-dark-800: #1A1A1A;
  --color-tjm-dark-700: #252525;
  --font-sans: var(--font-rajdhani), system-ui, sans-serif;
}
```

### 10.3 Performance Considerations

- **GSAP cleanup**: Gunakan `gsap.context()` di setiap component, cleanup di `useEffect` return
- **ScrollTrigger refresh**: Panggil `ScrollTrigger.refresh()` setelah content berubah (filter switch)
- **Image optimization**: Gunakan `next/image` dengan priority pada above-fold images
- **Will-change**: Set `will-change: transform` pada elemen yang sering di-animate
- **Passive touch events**: Pastikan scroll performance optimal
- **100dvh**: Gunakan `dvh` unit untuk menghindari address bar issue di mobile browser

### 10.4 Viewport Meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

Mencegah zoom untuk UX tablet yang konsisten.

---

## 11. Proposed Changes

### Dependencies to Install

#### [NEW] gsap
```bash
npm install gsap
```

---

### Global Styles & Design Tokens

#### [MODIFY] [globals.css](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/globals.css)
- Replace with full Tailwind v4 theme inline config
- Add custom CSS variables for colors, spacing, patterns
- Add racing visual patterns (checkered, carbon fiber, speed lines) as CSS
- Add custom animation keyframes for breathing glow, float, etc.
- Add viewport lock styles (desktop block/centered frame)

---

### Root Layout & Fonts

#### [MODIFY] [layout.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/layout.js)
- Import Rajdhani font from `next/font/google` instead of Geist
- Update metadata (title, description, viewport)
- Add `dark` class forced on html (dark theme only)
- Include `<BottomNav />` component in layout
- Wrap children in `<PageWrapper />`
- Set `max-width` lock for desktop

---

### Layout Components

#### [NEW] [BottomNav.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/layout/BottomNav.jsx)
- Client component (`'use client'`)
- 4 tabs: Home, Promo, Service, Gallery
- Active state with red glow + GSAP indicator animation
- Backdrop blur glass effect
- Touch feedback (tap scale animation)

#### [NEW] [PageWrapper.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/layout/PageWrapper.jsx)
- Client component for GSAP page transitions
- Manages scroll container height (accounting for bottom nav)
- Fade/slide transitions between pages

---

### UI Components

#### [NEW] [PromoCard.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/ui/PromoCard.jsx)
- 4:5 aspect ratio card with image
- Badge overlay (NEW/HOT)
- Tap animation + modal trigger
- GSAP scroll entrance

#### [NEW] [ServiceCard.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/ui/ServiceCard.jsx)
- 1:1 aspect ratio card
- Service info overlay
- Tap to expand detail

#### [NEW] [SubBrandFilter.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/ui/SubBrandFilter.jsx)
- Horizontal scrollable filter pills
- Active state with GSAP Flip transitions
- Touch-friendly sizing (44px min tap target)

#### [NEW] [Modal.jsx](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/ui/Modal.jsx)
- Bottom sheet style modal
- GSAP slide up/down animation
- Overlay backdrop
- Drag to dismiss (GSAP Draggable)

#### [NEW] Other UI components
- `Badge.jsx`, `Ticker.jsx`, `SpeedLines.jsx`, `GlowButton.jsx`, `CheckeredBg.jsx`

---

### Animation Hooks

#### [NEW] [useGSAP.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/animations/useGSAP.js)
- Wraps `gsap.context()` with automatic cleanup
- Scoped to component ref

#### [NEW] [useScrollReveal.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/animations/useScrollReveal.js)
- ScrollTrigger-based entrance animation hook
- Configurable stagger, direction, ease

#### [NEW] [useTapAnimation.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/components/animations/useTapAnimation.js)
- Touch feedback animation (scale down/up)
- No hover, touch only

---

### Data Layer

#### [NEW] [subBrands.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/data/subBrands.js)
#### [NEW] [promos.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/data/promos.js)
#### [NEW] [services.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/data/services.js)
#### [NEW] [gallery.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/data/gallery.js)
- Static data files, placeholder content for development
- Ready to swap for API/CMS

---

### GSAP Setup

#### [NEW] [gsap.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/lib/gsap.js)
- Central GSAP plugin registration
- Client-side only

---

### Pages

#### [MODIFY] [page.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/page.js)
- Complete rewrite to Home page
- Hero, marquee ticker, quick access grid, featured promo

#### [NEW] [promo/page.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/promo/page.js)
- Sub-brand filter + promo card grid

#### [NEW] [service/page.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/service/page.js)
- Sub-brand filter + service card grid (2 columns)

#### [NEW] [gallery/page.js](file:///c:/Website%20Development/TJM/TJM%20Auto%20Care/tjm-menu-v2/src/app/gallery/page.js)
- Photo grid + lightbox viewer

---

## 12. Implementation Phases

### Phase 1: Foundation 🏗️
1. Install GSAP dependency
2. Setup `globals.css` — design tokens, racing patterns, Tailwind theme
3. Setup `layout.js` — font (Rajdhani), metadata, dark theme
4. Create GSAP setup (`src/lib/gsap.js`)
5. Create animation hooks (`useGSAP`, `useScrollReveal`, `useTapAnimation`)
6. Create `BottomNav` with GSAP tab indicator
7. Create `PageWrapper` with transition support

### Phase 2: Home Page 🏠
1. Hero section with logo + typewriter tagline
2. Racing marquee ticker
3. Sub-brand quick access grid (animated cards)
4. Featured promo horizontal scroll
5. Speed lines + checkered background decorations

### Phase 3: Promo & Service Pages 🎯🔧
1. `SubBrandFilter` component
2. `PromoCard` (4:5) with scroll reveal
3. `ServiceCard` (1:1) with scroll reveal
4. `Modal` bottom sheet for detail view
5. Promo page assembly
6. Service page assembly

### Phase 4: Gallery & Polish 🖼️✨
1. Gallery grid layout
2. Lightbox viewer with swipe
3. Cross-page transition polish
4. Performance optimization
5. Final animation tuning

---

## Open Questions

> [!IMPORTANT]
> **1. Sub-brand accent colors** — Apakah setuju tiap sub-brand punya warna aksen berbeda (biru, emas, hijau, orange) untuk differentiation? Atau semua merah-hitam saja?

> [!IMPORTANT]
> **2. Desktop lock approach** — Centered phone frame (user tetap bisa lihat) atau full block screen (pesan "Gunakan tablet")?

> [!IMPORTANT]
> **3. Font pilihan** — Rajdhani (racing feel) atau ada preferensi lain? Alternatif: Orbitron, Exo 2, Bebas Neue.

> [!NOTE]
> **4. Logo & assets** — Apakah sudah ada logo TJM dan logo sub-brand dalam format SVG/PNG? Atau perlu generate placeholder?

> [!NOTE]
> **5. Gallery content** — Gallery akan diisi foto apa? Foto hasil kerja bengkel, foto before/after, atau foto produk?

> [!NOTE]
> **6. Harga service** — Apakah data harga paket service sudah siap, atau kita pakai dummy data dulu?

---

## Verification Plan

### Automated
- `npm run build` — pastikan build berhasil tanpa error
- `npm run dev` — test di browser dengan device emulation (mobile & tablet)
- Lighthouse audit — target 90+ performance score

### Manual
- Test di tablet fisik (iPad / Android tablet)
- Test semua GSAP animasi berjalan smooth (60fps)
- Test touch interactions (tap, swipe, scroll)
- Test bottom nav navigation antar halaman
- Test modal open/close dengan drag gesture
- Verify desktop lock behavior
