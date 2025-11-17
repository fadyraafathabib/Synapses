import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#dcf1ff",
          70: "#0043ce",
          100: "#bde5ff",
          200: "#7bccfe",
          300: "#34b1fe",
          400: "#0193ee",
          500: "#016bac",
          600: "#015589",
          700: "#013f65",
        },
        red: {
          200: "#ef9a9a",
          300: "#ff6b6b",
        },
        green: {
          500: "#26d526",
          600: "#2bbbad",
        },
        secondary: {
          500: "#2bbbad",
        },
        gray: {
          50: "#ffffff",
          100: "#f3f5f6",
          200: "#e5e8eb",
          300: "#cad1d8",
          400: "#87919d",
          500: "#424d59",
          600: "#3d4752",
          700: "#272e35",
          800: "#1a1e23",
          900: "#0d0f12",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

