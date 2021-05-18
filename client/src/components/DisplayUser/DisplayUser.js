import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContexts";
import ThemeContext from "../../contexts/ThemeContexts";
import ChangeUser from "../ChangeUser/ChangeUser";
import "./DisplayUser.css";

const DisplayUser = () => {
  const { user, toggleUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div>Welcome {user.name}! <ChangeUser /></div>
      
    </div>
  );
};

export default DisplayUser;
