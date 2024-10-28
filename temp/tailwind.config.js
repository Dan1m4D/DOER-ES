// tailwindcss configuration file
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          colors: {
            text: "#020d0d",
            background: "#f7fdfd",
            primary: "#29e0da",
            secondary: "#a586ea",
            accent: "#803cf6",
          }, // light theme colors
        },
        dark: {
          colors: {
            text: "#f2fdfd",
            background: "#092020",
            primary: "#1fd6d0",
            secondary: "#41306b",
            accent: "#6725fe",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
