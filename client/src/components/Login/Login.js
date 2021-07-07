// This page has a Form with verification of 2 required fields: email & password.
// – If the verification is ok, we call AuthService.login() method, then direct user to Profile page: props.history.push("/profile");, or show message with response error.

// For getting the application state and dispatching actions, we use React Redux Hooks useSelector and useDispatch.
// – by checking isLoggedIn, we can redirect user to Profile page.
// – message gives us response message.

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  console.log("login state is: ", useSelector(state => state.auth));
  console.log("login msg is: ", useSelector(state => state.message));

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    console.log("set email to ", email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    console.log("set pwd");
  };

  const handleLogin = (e) => {
    console.log("handling login");
    e.preventDefault();

    setLoading(true);
console.log("setting loading");
    form.current.validateAll();
console.log("validated form");
    if (checkBtn.current.context._errors.length === 0) {
      console.log("no errors in checkbtn");
      dispatch(login(email, password))
        .then(() => {
          console.log("pushing profile:");
          props.history.push("/profile");
          // window.location.reload();
          console.log("pushed profile");
        })
        .catch(() => {
          setLoading(false);
          console.log("stopping loading false 1");
        });
    } else {
      setLoading(false);
      console.log("stopping loading false  2");
    }
  };

  if (isLoggedIn) {
    console.log("is logged in");
    return <Redirect to="/profile" />;
  } else{
console.log("not redirecting...");
  }
  

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;