import React from "react";
import { useSelector } from "react-redux";

import ChangeUser from "../ChangeUser/ChangeUser";
import "./DisplayUser.css";

const DisplayUser = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (currentUser) console.log("in Display User, user is ", currentUser.email);
else console.log("no user logged in");

  return (
    <div style={{ paddingBottom: "20px" }}>
      {currentUser && <div className="welcome-div">Welcome {currentUser.email}! <ChangeUser /></div>}
      <div className="expln-div">To test Admin functions, login as a test admin with email: testadmin@mytest.test and password: t7e6f3e4</div>
      <div className="expln-div">(This will not grant you full admin privileges, which are reserved for the real admin user)</div>
    </div>
  );
};

export default DisplayUser;

