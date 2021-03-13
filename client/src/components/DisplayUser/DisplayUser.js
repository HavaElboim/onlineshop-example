import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContexts";
import ThemeContext from "../../contexts/ThemeContexts";
import ChangeUser from "../ChangeUser/ChangeUser";

const DisplayUser = () => {
  const [user, toggleUser] = useContext(UserContext);
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <div>
      <div>Logged in as: {user.name}</div>
      <ChangeUser />
    </div>
  );
};

export default DisplayUser;
