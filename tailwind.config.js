/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Tailwind's default duration scale doesn't include 400ms.
      // We use `duration-400` in globals.css, so add it here.
      transitionDuration: {
        400: '400ms',
      },
      colors: {
        primary: {
          DEFAULT: "#1a3c1a",
          light: "#2d5a2d",
          50: "#f0f7f0",
          100: "#dceddc",
          200: "#b8dbb8",
          500: "#3a6b3a",
          600: "#2d5a2d",
          700: "#1a3c1a",
          800: "#132b13",
          900: "#0d1f0d",
        },
        accent: {
          DEFAULT: "#c4572a",
          light: "#e07a52",
          50: "#fef3ee",
          100: "#fde3d4",
          200: "#fac5a8",
          500: "#c4572a",
          600: "#b04a22",
          700: "#923c1b",
        },
        cream: {
          DEFAULT: "#faf8f4",
          warm: "#f5f0e8",
        },
        border: "#e0dbd3",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
