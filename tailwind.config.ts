import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Homelink Brand Colors
        brand: {
          navy: "#0E1F3D",
          gold: "#C9A227",
          "electric-blue-1": "#2A6FFF",
          "electric-blue-2": "#6CA8FF",
        },
        // UI Colors
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#0A1628",
        },
        foreground: {
          DEFAULT: "#0E1F3D",
          dark: "#F9FAFB",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#9CA3AF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1A2742",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#2D3F5B",
        },
        // Status Colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Custom font sizes for consistency
        "display-1": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-1": ["2.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "heading-2": ["2rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "heading-3": ["1.5rem", { lineHeight: "1.5" }],
        "body-large": ["1.125rem", { lineHeight: "1.75" }],
        "body": ["1rem", { lineHeight: "1.75" }],
        "body-small": ["0.875rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
        "2xl": "1.5rem", // 24px as specified
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 16px -4px rgba(0, 0, 0, 0.1)",
        large: "0 8px 32px -8px rgba(0, 0, 0, 0.1)",
        "gold-glow": "0 0 24px -4px rgba(201, 162, 39, 0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-electric": "linear-gradient(135deg, #2A6FFF 0%, #6CA8FF 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A227 0%, #E5C157 100%)",
        "gradient-navy": "linear-gradient(135deg, #0E1F3D 0%, #1A3258 100%)",
      },
      animation: {
        "fade-in": "fade-in 0.18s ease-out",
        "fade-out": "fade-out 0.15s ease-out",
        "slide-in-right": "slide-in-right 0.18s ease-out",
        "slide-in-left": "slide-in-left 0.18s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.18s ease-out",
        "scale-in": "scale-in 0.15s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
