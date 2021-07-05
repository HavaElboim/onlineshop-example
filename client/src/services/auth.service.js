// Authentication service
// This service uses Axios for HTTP requests and Local Storage for user information & JWT.
//It provides following important functions:
//
// login(): POST {username, password} & save JWT to Local Storage
// logout(): remove JWT from Local Storage
// register(): POST {username, email, password}
// getCurrentUser(): get stored user information (including JWT)

import axios from "axios";

//const API_URL = "http://localhost:5000/api/auth/";
const API_URL = "/api/auth/";

export const register = (email, password) => {
    console.log("API_URL is: ", API_URL);
    console.log("going to", API_URL + "signup");
  return axios.post(API_URL + "signup", {
    email,
    password,
  }).catch(err => console.log("registration failed with error", err));
};

export const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(err => console.log("login failed with error ",err));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// export default {
//   register,
//   login,
//   logout,
//   getCurrentUser,
// };