import { createContext } from "react";

const themes = {
  light: {
    foreground: "darkgreen",
    background: "rgb(185 249 115)",
    splashColor: "#f1fb87",
    splashColor2: "rgb(185, 249, 115)",
    borderColor: "rgb(185 249 115)",
    borderWidth: "0px",
    bodyBackground: "#f6f6f6",
    salePriceColor: "green",
    label: "#666",
    links: "#c5730d",
    listBackground: "rgb(226 250 200);",
    listColor: "rgb(7 45 7)",
    fontSize: "18px"
  },
  dark: {
    foreground: "rgb(185 249 115)",
    background: "rgb(7 45 7)",
    splashColor: "#6ef53e",
    splashColor2: "rgb(115, 249, 185)",
    borderColor: "rgb(7 45 7)",
    borderWidth: "2px",
    bodyBackground: "060606",
    salePriceColor: "#09c709",
    label: "#222",
    links: "#c5730d",
    listBackground: "rgb(226 250 200);",
    listColor: "rgb(7 45 7)",
    fontSize: "22px"
  },
};

let currentTheme = themes.light;

const ThemeContext = createContext(null);

export { themes, currentTheme };
export default ThemeContext;
