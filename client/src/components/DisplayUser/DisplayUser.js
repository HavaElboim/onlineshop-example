import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContexts";
import ThemeContext from "../../contexts/ThemeContexts";

const DisplayUser = () => {
  const [user, toggleUser] = useContext(UserContext);
  const [theme, toggleTheme] = useContext(ThemeContext);

  return <div>Logged in as: {user.name}</div>;
};

export default DisplayUser;
