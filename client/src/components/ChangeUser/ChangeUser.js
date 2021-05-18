import React, { useContext } from "react";
import UserContext from "../../contexts/UserContexts";
import ThemeContext from "../../contexts/ThemeContexts";
import "../ChangeThemeColors/ChangeThemeColors.css";
import "./ChangeUser.css";
// import "../Header/Header.css";

const ChangeUser = () => {
  const { user, toggleUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="button"
      style={{
        background: theme.background,
        color: theme.foreground,
        marginLeft: 10
      }}
      onClick={toggleUser}
    >
      {user.name === "Admin" && <div className="loginButton">Login as Guest</div>}
      {user.name === "Guest" && <div className="loginButton">Login as Admin</div>}
    </button>
  );
};

export default ChangeUser;
