@import "tailwindcss";
@tailwind base;
@tailwind components;
@tailwind utilities;

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --font-sans: "Vazirmatn", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --color-canvas: var(--n-canvas);
  --color-canvas-elevated: var(--n-canvas-elevated);

  --color-ink-primary: var(--n-text-primary);
  --color-ink-secondary: var(--n-text-secondary);
  --color-ink-tertiary: var(--n-text-tertiary);
  --color-ink-disabled: var(--n-text-disabled);

  --color-accent: var(--n-accent);
  --color-accent-hover: var(--n-accent-hover);
  --color-accent-soft: var(--n-accent-soft);

  --color-success: var(--n-success);
  --color-warning: var(--n-warning);
  --color-danger: var(--n-danger);
  --color-info: var(--n-info);

  --radius-panel: 1.75rem;       /* 28px */
  --radius-panel-compact: 1.5rem; /* 24px */
  --radius-section: 1.25rem;     /* 20px */
  --radius-rail: 1.125rem;       /* 18px */
  --radius-control: 1rem;        /* 16px */
  --radius-small: 0.75rem;       /* 12px */

  --shadow-panel: var(--n-shadow-panel);
  --shadow-floating: var(--n-shadow-floating);
  --shadow-control: var(--n-shadow-control);

  --ease-fluid: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snappy: cubic-bezier(0.2, 0.8, 0.2, 1);
}

:root {
  color-scheme: light;

  --shell-gutter: clamp(12px, 1.35vw, 24px);
  --shell-gap: clamp(12px, 1vw, 18px);
  --sidebar-expanded: 288px;
  --sidebar-compact: 88px;
  --command-bar-height: 64px;
  --command-bar-offset: clamp(12px, 1.2vw, 20px);
  --stage-max-width: 1800px;

  --n-canvas: oklch(0.976 0.008 255);
  --n-canvas-elevated: oklch(0.989 0.004 255);

  --n-blob-blue: oklch(0.84 0.09 248 / 0.24);
  --n-blob-violet: oklch(0.88 0.07 302 / 0.18);
  --n-blob-mint: oklch(0.90 0.055 205 / 0.15); /* cyan */
  --n-blob-rose: oklch(0.90 0.060 20 / 0.14);

  --n-text-primary: rgb(15 23 42 / 0.95);
  --n-text-secondary: rgb(30 41 59 / 0.68);
  --n-text-tertiary: rgb(51 65 85 / 0.48);
  --n-text-disabled: rgb(71 85 105 / 0.32);

  --n-accent: oklch(0.61 0.19 263);
  --n-accent-hover: oklch(0.56 0.20 263);
  --n-accent-soft: oklch(0.72 0.14 263 / 0.16);

  --n-success: oklch(0.62 0.17 153);
  --n-warning: oklch(0.72 0.16 76);
  --n-danger: oklch(0.61 0.22 27);
  --n-info: oklch(0.64 0.16 240);

  /* Content material */
  --n-panel-bg: rgb(255 255 255 / 0.86);
  --n-panel-border: rgb(255 255 255 / 0.82);
  --n-panel-divider: rgb(30 41 59 / 0.075);
  --n-panel-highlight: rgb(255 255 255 / 0.90);
  --n-panel-subtle: rgb(255 255 255 / 0.42);

  /* Functional glass */
  --n-control-glass-bg: rgb(255 255 255 / 0.48);
  --n-control-glass-border: rgb(255 255 255 / 0.68);
  --n-control-glass-highlight: rgb(255 255 255 / 0.86);

  /* Transient glass */
  --n-popover-bg: rgb(255 255 255 / 0.78);
  --n-popover-border: rgb(255 255 255 / 0.82);

  --n-hover-bg: rgb(255 255 255 / 0.48);
  --n-pressed-bg: rgb(255 255 255 / 0.68);
  --n-selected-bg: oklch(0.72 0.13 250 / 0.18);

  --n-shadow-panel:
    0 1px 1px rgb(15 23 42 / 0.035),
    0 8px 24px rgb(15 23 42 / 0.060),
    0 24px 64px rgb(15 23 42 / 0.055);

  --n-shadow-floating:
    0 2px 3px rgb(15 23 42 / 0.055),
    0 14px 38px rgb(15 23 42 / 0.105),
    0 36px 90px rgb(15 23 42 / 0.090);

  --n-shadow-control:
    0 1px 2px rgb(15 23 42 / 0.06),
    0 7px 20px rgb(15 23 42 / 0.075);
}

.dark {
  color-scheme: dark;

  --n-canvas: oklch(0.155 0.022 258);
  --n-canvas-elevated: oklch(0.19 0.024 258);

  --n-blob-blue: oklch(0.48 0.17 250 / 0.23);
  --n-blob-violet: oklch(0.48 0.16 305 / 0.19);
  --n-blob-mint: oklch(0.47 0.12 175 / 0.14);
  --n-blob-rose: oklch(0.47 0.12 20 / 0.10);

  --n-text-primary: rgb(248 250 252 / 0.96);
  --n-text-secondary: rgb(226 232 240 / 0.70);
  --n-text-tertiary: rgb(203 213 225 / 0.48);
  --n-text-disabled: rgb(148 163 184 / 0.34);

  --n-accent: oklch(0.72 0.15 259);
  --n-accent-hover: oklch(0.75 0.15 250);
  --n-accent-soft: oklch(0.63 0.15 250 / 0.22);

  --n-success: oklch(0.72 0.16 151);
  --n-warning: oklch(0.79 0.15 78);
  --n-danger: oklch(0.70 0.20 25);
  --n-info: oklch(0.73 0.14 235);

  --n-panel-bg: rgb(22 29 43 / 0.86);
  --n-panel-border: rgb(255 255 255 / 0.105);
  --n-panel-divider: rgb(255 255 255 / 0.07);
  --n-panel-highlight: rgb(25 33 48 / 0.91);
  --n-panel-subtle: rgb(255 255 255 / 0.035);

  --n-control-glass-bg: rgb(28 36 53 / 0.48);
  --n-control-glass-border: rgb(255 255 255 / 0.135);
  --n-control-glass-highlight: rgb(255 255 255 / 0.105);

  --n-popover-bg: rgb(24 31 46 / 0.82);
  --n-popover-border: rgb(255 255 255 / 0.15);

  --n-hover-bg: rgb(255 255 255 / 0.065);
  --n-pressed-bg: rgb(255 255 255 / 0.095);
  --n-selected-bg: oklch(0.62 0.16 250 / 0.23);

  --n-shadow-panel:
    0 1px 0 rgb(255 255 255 / 0.025),
    0 14px 40px rgb(0 0 0 / 0.32),
    0 32px 90px rgb(0 0 0 / 0.22);

  --n-shadow-floating:
    0 2px 3px rgb(0 0 0 / 0.25),
    0 18px 50px rgb(0 0 0 / 0.43),
    0 48px 120px rgb(0 0 0 / 0.34);

  --n-shadow-control:
    0 1px 1px rgb(0 0 0 / 0.24),
    0 9px 26px rgb(0 0 0 / 0.28);
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@layer components {
  /* Content material: Dashboard panels and cards */
  .n-panel {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid var(--n-panel-border);
    border-radius: var(--radius-panel);
    background: var(--n-panel-bg);
    background-clip: padding-box;
    box-shadow:
      var(--n-shadow-panel),
      inset 0 1px 0 var(--n-panel-highlight);
    -webkit-backdrop-filter: blur(12px) saturate(1.08);
    backdrop-filter: blur(12px) saturate(1.08);
  }

  /* Functional glass: Sidebar and toolbars */
  .n-glass-control {
    position: relative;
    isolation: isolate;
    border: 1px solid var(--n-control-glass-border);
    background: var(--n-control-glass-bg);
    background-clip: padding-box;
    box-shadow:
      var(--n-shadow-floating),
      inset 0 1px 0 var(--n-control-glass-highlight);
    -webkit-backdrop-filter: blur(28px) saturate(1.4);
    backdrop-filter: blur(28px) saturate(1.4);
  }

  /* Transient glass: Popovers and dropdowns */
  .n-glass-popover {
    position: relative;
    isolation: isolate;
    border: 1px solid var(--n-popover-border);
    border-radius: var(--radius-panel-compact);
    background: var(--n-popover-bg);
    box-shadow:
      var(--n-shadow-floating),
      inset 0 1px 0 var(--n-control-glass-highlight);
    -webkit-backdrop-filter: blur(38px) saturate(1.50);
    backdrop-filter: blur(38px) saturate(1.50);
  }

  /* Fixed Background Layer (No scrolling or repaint) */
  .ambient-mesh {
    z-index: 0;
    contain: strict;
    background:
      radial-gradient(60rem 48rem at 105% -5%, var(--n-blob-blue), transparent 70%),
      radial-gradient(54rem 44rem at -5% 30%, var(--n-blob-violet), transparent 72%),
      radial-gradient(48rem 40rem at 74% 108%, var(--n-blob-mint), transparent 72%),
      radial-gradient(34rem 28rem at 18% 92%, var(--n-blob-rose), transparent 74%),
      var(--n-canvas);
  }
}

/* Graceful fallback for non-supporting browsers */
@supports not ((backdrop-filter: blur(1px))) {
  .n-panel { background: rgb(250 252 255 / 0.96); }
  .n-glass-control, .n-glass-popover { background: rgb(246 249 253 / 0.97); }
  .dark .n-panel, .dark .n-glass-control, .dark .n-glass-popover { background: rgb(23 30 44 / 0.97); }
}

@layer base {
  * {
    corner-shape: squircle;
  }
  
  /* Persian Typography Reset (No artificial tracking) */
  [lang="fa"],
  [lang="ar"] {
    letter-spacing: 0;
  }

  [lang="en"],
  .latin-number {
    letter-spacing: -0.012em;
    font-variant-numeric: tabular-nums;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
