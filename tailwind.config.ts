import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          // extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#003f3a",
            foreground: "#dcfdfb",
            primary: {
              50: "#dcfdfb",
              100: "#b9f2ed",
              200: "#94e8df",
              300: "#6bddd3",
              400: "#45d3c6",
              500: "#2cbaad",
              600: "#1c9186",
              700: "#0d6860",
              800: "#003f3a",
              900: "#001814",
              DEFAULT: "#0d6860",
              foreground: "#dcfdfb",
            },
            focus: "#F182F6",
          },
        },
        light: {
          // extend: "light", // <- inherit default values from dark theme
          colors: {
            background: "#b9f2ff",
            foreground: "#001814",
            primary: {
              50: "#dcfdfb",
              100: "#b9f2ed",
              200: "#94e8df",
              300: "#6bddd3",
              400: "#45d3c6",
              500: "#2cbaad",
              600: "#1c9186",
              700: "#0d6860",
              800: "#003f3a",
              900: "#001814",
              DEFAULT: "#0d6860",
              foreground: "#dcfdfb",
            },
            focus: "#F182F6",
          },
        },
      },
    }),
  ],
} satisfies Config;
