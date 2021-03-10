import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContexts";

const ChangeThemeColors = () => {
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
      onClick={toggleTheme}
    >
      {" "}
      Change Theme{" "}
    </button>
  );
};

export default ChangeThemeColors;
