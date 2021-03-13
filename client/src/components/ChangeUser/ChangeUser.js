import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContexts";
import ThemeContext from "../../contexts/ThemeContexts";

const ChangeUser = () => {
  const [user, toggleUser] = useContext(UserContext);
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
      onClick={toggleUser}
    >
      {" "}
      {user.name === "Admin" && <div>Login as Guest</div>}
      {user.name === "Guest" && <div>Login as Admin</div>}
    </button>
  );
};

export default ChangeUser;
