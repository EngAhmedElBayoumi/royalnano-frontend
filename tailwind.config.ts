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
        gray: "var(--gray)",
        lightGray: "#F5F2F2",
        darkGray: "#5A5A5A",
      },
      borderWidth: {
        "5": "5px",
        "10": "10px",
      },
      borderColor: {
        primary: "var(--primary)",
      },
      borderRadius: {
        "10": "10px",
      },
      // screens: {
      //   xs: "400px",
      // },
    },
    fontSize: {
      lg: [
        "40px",
        {
          lineHeight: "74px",
          fontWeight: "700",
        },
      ],
      md: [
        "25px",
        {
          lineHeight: "46px",
          fontWeight: "700",
        },
      ],
      sm: [
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
