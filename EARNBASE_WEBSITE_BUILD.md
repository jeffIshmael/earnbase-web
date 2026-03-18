# Earnbase Website — Agent Build Instructions

This document gives you everything you need to build and run the Earnbase landing page. Follow the steps in order.

---

## What You Are Building

A marketing landing page for Earnbase — a Human Feedback as a Service platform on Celo. The site has these sections:

1. **Nav** — fixed top bar with links and Launch App CTA
2. **Hero** — full-screen dark section with headline and dual CTAs
3. **What Is Earnbase** — platform explanation with 4-step flow diagram
4. **For Humans** — task types grid + earn USDC messaging
5. **For Agents** — code snippet + feature list for AI agent integrations
6. **Stats** — animated counters (tasks, participants, USDC paid, agents)
7. **Partners** — technology logos row
8. **CTA** — final conversion section
9. **Footer**

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Native React hooks + CSS transitions (no extra libraries needed)

---

## Step 1 — Project Setup

```bash
npx create-next-app@latest earnbase-site \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd earnbase-site
```

---

## Step 2 — Tailwind Config

Add the Earnbase color tokens and font to `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "celo-yellow":  "#FCFF52",
        "celo-forest":  "#4E632A",
        "celo-purple":  "#1A0329",
        "celo-lt-tan":  "#FBF6F1",
        "celo-dk-tan":  "#E6E3D5",
        "celo-orange":  "#F29E5F",
        "celo-lime":    "#B2EBA1",
        "celo-blue":    "#8AC0F9",
        "celo-success": "#329F3B",
        "celo-error":   "#E70532",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Step 3 — Google Fonts

In `app/layout.tsx`, import Inter from Google Fonts and set it as the base font:

```typescript
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Earnbase — Human Feedback as a Service",
  description:
    "Earnbase connects AI agents that need real human judgment with people who earn USDC for providing it. On-chain. Transparent. Powered by Celo.",
  openGraph: {
    title: "Earnbase",
    description: "Human Feedback as a Service on Celo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#FBF6F1]`}>
        {children}
      </body>
    </html>
  );
}
```

---

## Step 4 — Place the Page File

Copy `page.tsx` (provided separately) into `app/page.tsx`. This is the full landing page component — it is self-contained and includes all sections.

```
earnbase-site/
├── app/
│   ├── layout.tsx       ← set up above
│   ├── page.tsx         ← copy the provided page.tsx here
│   └── globals.css
├── tailwind.config.ts   ← updated above
└── package.json
```

---

## Step 5 — globals.css

Replace the contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #1A0329; }
::-webkit-scrollbar-thumb { background: #FCFF52; border-radius: 4px; }
```

---

## Step 6 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the full landing page.

---

## Step 7 — Update the Live Stats

The Stats section uses hardcoded values. Replace them with real data from your API or contract events. In `page.tsx`, find the `<Stats />` component and update the `value` props:

```tsx
// These are the stat cards — update values to match real platform data
<StatCard value={1240}  label="Agent Tasks Done"    started={started} />
<StatCard value={3800}  label="Human Participants"  started={started} />
<StatCard value={28500} label="USD Paid Out" prefix="$" started={started} />
<StatCard value={42}    label="AI Agents Served"    started={started} />
```

To fetch live stats, create `app/api/stats/route.ts` and query your contract or database, then replace the static values with a `useEffect` fetch from `/api/stats`.

---

## Step 8 — Update Links

Search for these placeholder links in `page.tsx` and replace with real URLs:

| Placeholder | Replace With |
|---|---|
| `https://earnbase.vercel.app` | Your live app URL |
| `https://github.com/jeffIshmael/earnbase-skills` | Your skills repo |
| Footer GitHub / Twitter / Docs links (`href="#"`) | Real social/docs links |

---

## Step 9 — Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo to Vercel dashboard at vercel.com
# — it will auto-deploy on every push to main
```

---

## Design System Reference

The site uses the Earnbase brutalist-lite aesthetic:

| Element | Style |
|---|---|
| Primary borders | `border-4 border-black` |
| Secondary borders | `border-2 border-black` |
| Hard shadows | `shadow-[5px_5px_0_0_rgba(0,0,0,1)]` |
| Primary bg | `#FBF6F1` (celo-lt-tan) |
| Dark bg | `#1A0329` (celo-purple) |
| Accent | `#FCFF52` (celo-yellow) |
| Success | `#4E632A` (celo-forest) |
| Border radius | `rounded-xl` or `rounded-2xl` |
| Hover effect | `hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all` |

---

## File Structure (Final)

```
earnbase-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           ← full landing page
│   └── globals.css
├── public/
│   └── (add logo/og-image here)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Common Issues

| Problem | Fix |
|---|---|
| Tailwind colors not working | Make sure `tailwind.config.ts` content paths include `./app/**/*.{tsx,ts}` |
| Fonts not loading | Verify `--font-inter` CSS variable is set in `layout.tsx` body className |
| Scroll links not working | Section `id` attributes must match href anchors exactly (e.g. `id="for-humans"`) |
| Stats counter not animating | The `IntersectionObserver` requires the section to enter the viewport — disable if testing at the top of the page |

---

*This document is the single build reference for the Earnbase landing page. Keep it alongside `page.tsx` in your project.*
