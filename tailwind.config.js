/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      body: "#fefefe",
      white: "#ffffff",
      green: {
        50: "#f0f9f2",
        100: "#dbf0de",
        200: "#bae0c2",
        300: "#8cc99d",
        400: "#5bac73",
        500: "#3c965a",
        600: "#297244",
        700: "#205c37",
        800: "#1c492d",
        900: "#183c27",
        950: "#0c2216",
      },
      gray: {
        50: "#fbfbfb",
        100: "#efefef",
        200: "#dcdcdc",
        300: "#bdbdbd",
        400: "#989898",
        500: "#7c7c7c",
        600: "#656565",
        700: "#525252",
        800: "#464646",
        900: "#3d3d3d",
        950: "#292929",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
