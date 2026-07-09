/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the official SBWAC logo mark
        brand: {
          DEFAULT: "#0099D9",
          50: "#EAF7FC",
          100: "#CDEBF7",
          300: "#7CCBEA",
          500: "#0099D9",
          600: "#0082BA",
          700: "#046B98",
        },
        // Derived deep navy for contrast sections (not sampled from the logo,
        // built to sit underneath the brand blue for depth/hierarchy)
        deep: {
          DEFAULT: "#063A5C",
          900: "#042A44",
          950: "#031E31",
        },
        foam: "#F7FBFD",
      },
      fontFamily: {
        display: ["\"Bodoni Moda\"", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
