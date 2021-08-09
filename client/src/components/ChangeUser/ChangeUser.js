import React, { useContext } from "react";
import { useSelector } from "react-redux";

import ThemeContext from "../../contexts/ThemeContexts";
import "../ChangeThemeColors/ChangeThemeColors.css";
import "./ChangeUser.css";
import Login from "../Login/Login";
import { useDispatch } from "react-redux";
import { logout } from  "../../actions/auth";

const ChangeUser = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="logout-div">
    
    <button className="button"
      style={{
        background: theme.background,
        color: theme.foreground,
        marginLeft: 10
      }}
    >
      {currentUser && ( <div onClick={(e) => logOut()}>Logout</div>)}
    </button>
    <Login></Login>
    </div>
 
  );
};

export default ChangeUser;
