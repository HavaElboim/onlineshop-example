import React, { useContext, useState, useEffect } from "react";
// import {UserContext} from "../../contexts/UserContexts";
import { useSelector } from "react-redux";

import ThemeContext from "../../contexts/ThemeContexts";
import ChangeUser from "../ChangeUser/ChangeUser";
import "./DisplayUser.css";

const DisplayUser = () => {
  // const { user, toggleUser } = useContext(UserContext);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useSelector(state => state.auth);
if (currentUser) console.log("in Display User, user is ", currentUser.email);
else console.log("no user logged in");

  return (
    <div style={{ paddingBottom: "20px" }}>
      {currentUser && <div>Welcome {currentUser.email}! <ChangeUser /></div>}
    </div>
  );
};

export default DisplayUser;
