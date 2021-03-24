import { createContext } from "react";

const themes = {
  light: {
    foreground: "#ffffee",
    background: "#220000",
    salePriceColor: "red",
  },
  dark: {
    foreground: "#002200",
    background: "#ffffee",
    salePriceColor: "yellow",
  },
};

let currentTheme = themes.light;

const ThemeContext = createContext(null);

export { themes, currentTheme };
export default ThemeContext;
