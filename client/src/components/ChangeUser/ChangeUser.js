import React, { useContext } from "react";
import { useSelector } from "react-redux";

import ThemeContext from "../../contexts/ThemeContexts";
import "../ChangeThemeColors/ChangeThemeColors.css";
import "./ChangeUser.css";
import Login from "../Login/Login";
// import "../Header/Header.css";

const ChangeUser = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
    <button className="button"
      style={{
        background: theme.background,
        color: theme.foreground,
        marginLeft: 10
      }}
    >
      {currentUser && (<div className="loginButton">Logout</div>)}
    </button>
    <Login></Login>
    </div>
  );
};

export default ChangeUser;
