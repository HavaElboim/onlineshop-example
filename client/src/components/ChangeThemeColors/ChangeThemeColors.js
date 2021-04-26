import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import "./ChangeThemeColors.css";

const ChangeThemeColors = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ paddingBottom: "20px" }}>
      <button className="button"
        style={{
          background: theme.background,
          color: theme.foreground,
        }}
        onClick={toggleTheme}
      >
        Visibility
      </button>
    </div>
  );
};

export default ChangeThemeColors;
