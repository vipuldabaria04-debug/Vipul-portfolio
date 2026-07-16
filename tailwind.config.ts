import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "ink" now carries the deep graphite/navy surface ramp. Never pure
        // black — always a hair of blue in the mix, per spec.
        ink: {
          950: "#090B10", // primary page background
          900: "#0D1117", // secondary surface
          850: "#11161D", // recessed / banded surface
          800: "#171B22", // card surface — the first visible "step up" off the page
          750: "#1B212B", // elevated / hover surface
          700: "#232936", // inset borders
          600: "#2C3341", // strongest border tone, used sparingly
        },
        // Titanium — cool neutral greys for hairline borders and quiet depth
        titanium: {
          900: "#B8C0CE",
          700: "#8B93A3",
          500: "#5E6779",
          300: "#333A48",
          100: "#1B212B",
        },
        // Primary text ramp — never pure white
        paper: {
          DEFAULT: "#F7F7F7",
          dim: "#D6DAE1",
          muted: "#A6B0C0", // secondary text, per spec
          faint: "#6B7383",
        },
        signal: {
          // the one deliberate accent — electric blue, used for interactive and
          // structural emphasis. Everything else stays quiet.
          DEFAULT: "#3B82F6",
          bright: "#60A0FF",
          dim: "#2A63C4",
        },
        trace: {
          // secondary informational tone — cool slate, for research/data context
          // that needs distinction from signal without introducing a new hue.
          DEFAULT: "#7C8AA5",
          bright: "#9CAAC4",
          dim: "#565F72",
        },
        // Gold — reserved exclusively for engineering achievement. Not a general
        // secondary accent. If it appears outside Achievements, that's a bug.
        gold: {
          DEFAULT: "#C9A15A",
          bright: "#E0BC7C",
          dim: "#8F7038",
        },
        success: {
          DEFAULT: "#3FAE79",
          bright: "#5FCB96",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "directional-light":
          "radial-gradient(ellipse 900px 500px at 20% -10%, rgba(59,130,246,0.08) 0%, transparent 60%)",
        "surface-sheen": "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%)",
      },
      boxShadow: {
        "glow-brass": "0 0 0 1px rgba(59,130,246,0.35), 0 8px 28px -8px rgba(59,130,246,0.4)",
        "glow-trace": "0 0 0 1px rgba(124,138,165,0.25), 0 8px 24px -10px rgba(124,138,165,0.25)",
        "card-lift": "0 30px 70px -30px rgba(0,0,0,0.6)",
        // Real physical depth: an ambient shadow (wide, soft) + a contact shadow
        // (tight, dark) + an inset top-edge specular catch, composed together —
        // not one flat drop-shadow standing in for "elevation."
        soft: "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 40px -22px rgba(0,0,0,0.55), 0 2px 6px -2px rgba(0,0,0,0.4)",
        elevated: "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 64px -24px rgba(0,0,0,0.65), 0 4px 12px -3px rgba(0,0,0,0.5)",
        panel: "0 1px 0 rgba(255,255,255,0.08) inset, 0 36px 80px -26px rgba(0,0,0,0.7), 0 6px 16px -4px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseTrace: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(6px,-14px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        dashFlow: {
          to: { strokeDashoffset: "-200" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        floatPanel: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        tick: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        pulseTrace: "pulseTrace 2.4s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        drift: "drift 7s ease-in-out infinite",
        dashFlow: "dashFlow 3.5s linear infinite",
        glowPulse: "glowPulse 3.2s ease-in-out infinite",
        floatPanel: "floatPanel 8s ease-in-out infinite",
        tick: "tick 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
