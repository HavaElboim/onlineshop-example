import { createContext } from "react";

const themes = {
  light: {
    foreground: "darkgreen",
    background: "rgb(185 249 115)",
    salePriceColor: "green",
    links: "#c5730d",
    listBackground: "rgb(226 250 200);",
    listColor: "rgb(7 45 7)"
  },
  dark: {
    foreground: "rgb(185 249 115)",
    background: "rgb(7 45 7)",
    salePriceColor: "#09c709",
    links: "#c5730d",
    listBackground: "rgb(226 250 200);",
    listColor: "rgb(7 45 7)"
  },
};

let currentTheme = themes.light;

const ThemeContext = createContext(null);

export { themes, currentTheme };
export default ThemeContext;
