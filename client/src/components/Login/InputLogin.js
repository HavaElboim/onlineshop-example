import { useState } from "react";
import InputField from "../InputField/InputField";

const InputLogin = ({ loginDetails, setLoginDetails, isLogin }) => {
  const [errorMessage, setErrorMessage] = useState();
  return (
    <form>
      <InputField onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} label="אימייל" />
      <InputField
        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        label="Password"
        type="password"
      />
      {isLogin && (
        <div>
          <InputField
            onChange={(e) => setErrorMessage(loginDetails.password !== e.target.value)}
            label="Repeat password"
            type="password"
          />
          {errorMessage && <h5 style={{ color: "red" }}>Passwords don't match</h5>}{" "}
        </div>
      )}
    </form>
  );
};

export default InputLogin;
