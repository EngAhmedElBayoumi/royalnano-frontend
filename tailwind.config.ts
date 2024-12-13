import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      // screens: {
      //   xs: "400px",
      // },
    },
    fontSize: {
      "hero-header": [
        "40px",
        {
          lineHeight: "74px",
          fontWeight: "700",
        },
      ],
      "link-text": [
        "25px",
        {
          lineHeight: "46px",
          fontWeight: "700",
        },
      ],
      "text-sm": [
        "18px",
        {
          fontWeight: "500",
          lineHeight: "34px",
        },
      ],
    },
  },
  plugins: [],
} satisfies Config;
