/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app.js"],
  safelist: [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-[0.5rem]",
    "text-[0.95rem]",
    "text-[1.05rem]",
    "text-[1.1rem]",
    "text-[1.2rem]",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Hace que `font-sans` use Cal Sans en primer lugar
        sans: ["\"Cal Sans\"", "system-ui", "sans-serif"],
        display: ["\"Zen Dots\"", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

