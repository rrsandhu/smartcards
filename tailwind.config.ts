import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Primary scale: slate-blue hybrid ──────────────────────────────────
        // Light end (50–500) = cool neutral slate for hover BGs, borders, muted text
        // Dark end (600–950) = vivid blue CTA → deep slate for dark surfaces/footer
        navy: {
          50:  '#EFF6FF',  // very light blue tint — hover backgrounds, chip fills
          100: '#DBEAFE',  // light blue — badge backgrounds
          200: '#E2E8F0',  // slate-200 — borders, dividers (intentionally neutral)
          300: '#CBD5E1',  // slate-300 — muted text on dark backgrounds
          400: '#94A3B8',  // slate-400 — de-emphasised text
          500: '#64748B',  // slate-500 — muted body text on light bg
          600: '#2563EB',  // ← PRIMARY BLUE — buttons, links, CTAs, top-bar
          700: '#1D4ED8',  // blue-700  — hover state for primary blue
          800: '#1E293B',  // slate-800 — dark UI chrome, dark card headers
          900: '#0F172A',  // slate-950 — footer, hero dark sections
          950: '#07101E',  // deepest dark
        },
        // ── Accent scale: teal ─────────────────────────────────────────────────
        gold: {
          50:  '#F0FDFA',  // mint tint — section backgrounds
          100: '#CCFBF1',  // light teal — badge backgrounds
          200: '#99F6E4',  // teal-200
          300: '#5EEAD4',  // teal-300
          400: '#2DD4BF',  // teal-400 — light accent, "North" footer logo
          500: '#14B8A6',  // ← PRIMARY TEAL — section labels, editor picks, logo box
          600: '#0D9488',  // teal-600 — hover on teal elements
          700: '#0F766E',  // teal-700 — dark teal text on teal-100 badges
          800: '#115E59',  // teal-800
          900: '#134E4A',  // teal-900
        },
        // ── Neutral surface scale: cool slate gray ─────────────────────────────
        parchment: {
          50:  '#F8FAFC',  // slate-50  — page section backgrounds
          100: '#F1F5F9',  // slate-100 — alternate table rows, sidebar BG
          200: '#E2E8F0',  // slate-200 — card borders, dividers
          300: '#CBD5E1',  // slate-300 — image placeholders
          400: '#94A3B8',  // slate-400 — placeholder text
          500: '#64748B',  // slate-500 — muted text
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-md': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
        'card-lg': '0 8px 24px 0 rgb(0 0 0 / 0.10), 0 4px 8px -2px rgb(0 0 0 / 0.06)',
        'dropdown': '0 8px 24px -4px rgb(0 0 0 / 0.12), 0 2px 8px -2px rgb(0 0 0 / 0.06)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1E293B',
            a: {
              color: '#2563EB',
              '&:hover': { color: '#14B8A6' },
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
