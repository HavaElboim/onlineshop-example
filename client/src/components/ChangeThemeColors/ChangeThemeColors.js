import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContexts";

const ChangeThemeColors = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ paddingBottom: "20px" }}>
      <button
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
