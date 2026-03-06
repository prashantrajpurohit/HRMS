import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "!./src/app/invoiceManagement/generateInvoice/generateInvoicePdf/**/*",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
      },
      fontWeight: {
        medium: "var(--font-weight-medium)",
        normal: "var(--font-weight-normal)",
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        hover: {
          DEFAULT: "oklch(var(--hover))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        "input-background": "var(--input-background)",
        "switch-background": "var(--switch-background)",
        chart: {
          "1": "oklch(var(--chart-1))",
          "2": "oklch(var(--chart-2))",
          "3": "oklch(var(--chart-3))",
          "4": "oklch(var(--chart-4))",
          "5": "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar-background))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      keyframes: {
        "gradient-bg": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-left": {
          from: {
            transform: "translateX(-200%) scale(0.5)",
            opacity: "0",
          },
          to: {
            transform: "translateX(-32px) scale(0.75)",
            opacity: "0.6",
          },
        },
        "slide-in-center": {
          from: {
            transform: "translateX(-100%) scale(0.8) rotateY(-30deg)",
            opacity: "0.3",
          },
          to: {
            transform: "translateX(0) scale(1) rotateY(0deg)",
            opacity: "1",
          },
        },
        "slide-in-right": {
          from: {
            transform: "translateX(200%) scale(0.6)",
            opacity: "0.2",
          },
          to: {
            transform: "translateX(96px) scale(0.85)",
            opacity: "0.7",
          },
        },
        "slide-in-far-right": {
          from: {
            transform: "translateX(300%) translateY(0) scale(0.4)",
            opacity: "0",
          },
          to: {
            transform: "translateX(160px) translateY(24px) scale(0.75)",
            opacity: "0.5",
          },
        },
        "sweep-right": {
          from: {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          to: {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        "card-flip-in": {
          from: {
            transform: "rotateY(-90deg) scale(0.8)",
            opacity: "0",
          },
          to: {
            transform: "rotateY(0deg) scale(1)",
            opacity: "1",
          },
        },
        "card-bounce-in": {
          "0%": {
            transform: "scale(0.3) rotate(-10deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.1) rotate(5deg)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "1",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "gradient-bg": "gradient-bg 4s ease infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "slide-in-left": "slide-in-left 0.7s ease-out",
        "slide-in-center": "slide-in-center 0.7s ease-out",
        "slide-in-right": "slide-in-right 0.7s ease-out",
        "slide-in-far-right": "slide-in-far-right 0.7s ease-out",
        "sweep-right": "sweep-right 0.7s ease-in-out",
        "card-flip-in": "card-flip-in 0.6s ease-out",
        "card-bounce-in":
          "card-bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "3xl": "0 20px 40px -12px rgba(0, 0, 0, 0.2)",
        "4xl":
          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      },
      perspective: {
        "1000": "1000px",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
export default config;
