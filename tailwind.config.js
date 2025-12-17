/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./portfolio/**/*.{html,md}",
    "./Blogs/**/*.{html,md}",
    "./shared/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "background-light": "#F9FAFB",
        "background-dark": "#111827",
      },
      fontFamily: {
        display: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
