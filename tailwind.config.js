/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#AD1FEA",
          hover: "#C75AF6",
        },
        blue: {
          DEFAULT: "#4661E6",
          hover: "#7C91F9",
          dark: "#373F68",
          navy: "#3A4374",
        },
        grey: {
          light: "#F2F4FF",
          lighter: "#F7F8FD",
          dark: "#647196",
        },
        orange: "#F49F85",
        cyan: "#62BCFA",
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
