import { useCallback, useEffect, useState } from "react";
import { loginUser, registerUser } from "../../contexts/ActionUserContexts"; 
import { useUserDispatch, useUserState } from "../../contexts/UserContexts";
import InputLogin from "./InputLogin";
import "./Login.css";
import { useHistory, useLocation } from "react-router";

let isProfileFullFilled = true;

function login(email, password) {
  console.log("login", email, password);
}

function register(email, password) {
  console.log("register", email, password);
}

const Login = () => {
  const {pathname} = useLocation();
  const history = useHistory();
  const isLogin = pathname.replace(/\//g,'') === 'login'
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const userState = useUserState();
  const dispatch = useUserDispatch();
  // isLogin ? (
  //console.log("Login userState", userState);

  const onClick = useCallback(async () => {
    if (isLogin) {
      await loginUser(dispatch, loginDetails);
    } else {
      await registerUser(dispatch, loginDetails);
    }
  }, [loginDetails, isLogin, dispatch]);
  return (
    <div className="container">
      <div className="details">
        <h3 className="login-title">{isLogin ? "Login" : "Register"}</h3>
        <p className="description">
Login or create an account.        </p>
      </div>

      <InputLogin
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
        isLogin={!isLogin}
      />

      <div className="buttons">
        {/* <button className="email-button" style={{ top: "470px" }}>
         Connect to Google account
        </button> */}
        {/* <Link to={isProfileFullFilled ? "/home" : "/profile/edit"}></Link> */}
        <button
          onClick={() => {
            onClick(loginDetails);
          }}
        >
          {isLogin ? "Connect via email account" : "Register with email account"}
        </button>
      </div>

      <h4 className="footer">
        {isLogin ? " Account not found" : "Logged in "}
        <span
          style={{ textDecoration: "underline" }}
          onClick={() => {history.push(isLogin?'/register':'/login')}}
        >
          {isLogin ? "Register now" : "Login now"}
        </span>
      </h4>
    </div>
  );
};

export default Login;
