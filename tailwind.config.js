/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0E1B2E",
          light: "#16273F",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E4CE9B",
        },
        ink: "#F4F1EA",
        charcoal: {
          DEFAULT: "#221F1D",
          light: "#332F2B",
          dark: "#151312",
        },
        skyblue: {
          DEFAULT: "#2E6C8E",
          light: "#5FA0C4",
          dark: "#193B4D",
        },
        crimson: {
          DEFAULT: "#B24339",
          light: "#D97A6C",
          dark: "#7A2A22",
        },
        // theme-aware tokens: flip value via CSS vars (see globals.css :root / .dark)
        surface: {
          DEFAULT: "rgb(var(--surface-1) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        panel: "rgb(var(--panel) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        edge: "rgb(var(--edge) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(198,161,91,0.35), 0 20px 60px -20px rgba(198,161,91,0.35)",
        luxe: "0 30px 80px -30px rgba(0,0,0,0.55)",
        "card-hover": "0 24px 48px -20px rgba(198,161,91,0.28), 0 8px 20px -8px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "gold-foil": "linear-gradient(115deg, #8f7434 0%, #E4CE9B 22%, #C6A15B 45%, #F4E4BA 55%, #97793a 78%, #C6A15B 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "-140% 0" },
          "60%, 100%": { backgroundPosition: "220% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shine: "shine 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
