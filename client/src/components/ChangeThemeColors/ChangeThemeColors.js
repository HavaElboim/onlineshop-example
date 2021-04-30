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
        title="Change site colors for better visibility"
      >
        Visibility
      </button>
    </div>
  );
};

export default ChangeThemeColors;
