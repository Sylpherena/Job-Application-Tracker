import themes from "daisyui/src/theming/themes";
const { themeOverrides, forestOverride } = require("./theme-overrides.js");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      "cupcake",
      "retro",
      "valentine",
      "lofi",
      "pastel",
      "wireframe",
      "black",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "nord",
      { ...themeOverrides },
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  safelist: [
    "alert-success",
    "alert-info",
    "alert-error",
    "input-sm",
    "input-md",
    "file-input-sm",
    "file-input-md",
  ],
};
