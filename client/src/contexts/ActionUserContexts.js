import { ActionTypes } from "./ReducerContexts.js";

export const ROOT_URL = "https://online-garden-shop.herokuapp.com/";

//const ROOT_URL = "http://localhost:5000";

export async function fetchLog(location, requestOptions) {
  console.log("fetch", location, requestOptions);
  const response = await fetch(`${ROOT_URL}${location}`, requestOptions);
  console.log("response", response);
  return response;
}

function addToken(options) {
  if (options == undefined) options = {};
  if (options.headers == undefined) options.headers = {};
  return {
    ...options,
    mode: "cors",
    headers: {
      ...options.headers,
      authorization: "Bearer " + localStorage.getItem("currentUser"),
    },
  };
}

export async function fetchLogWithToken(location, requestOptions) {
  return fetchLog(location, addToken(requestOptions));
}

export async function putUser(dispatch, user) {
  console.log("user for putting", user);
  const response = await fetchLog(
    "/users/me",
    addToken({ method: "PUT", body: JSON.stringify(user) })
  );
  const data = await response.json();
  console.log("returned user data", data);
  dispatch({ type: ActionTypes.UPDATE_USER, user: data });
}

export async function getUser(dispatch) {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetchLog("/users/me", addToken(requestOptions));
    const data = await response.json();

    dispatch({ type: ActionTypes.LOGIN_SUCCESS, user: data });
  } catch (error) {
    dispatch({ type: ActionTypes.LOGIN_ERROR, error: error });
  }
}

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetchLog("/login", requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        user: data,
      });

      localStorage.setItem("currentUser", data.token);
      return;
    }

    dispatch({ type: ActionTypes.LOGIN_ERROR, error: data });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function registerUser(dispatch, registerPayload) {
  console.log("registerUser", dispatch, registerPayload);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetchLog("/register", requestOptions);
    let data = await response.json();

    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", data.token);
      return;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    return;
  }

  return null;
}

export async function getInquiries() {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetchLogWithToken(
    "/inquiries/user",
    addToken(requestOptions)
  );
  const data = await response.json();
  return data;
}

// export async function Logout(dispatch) {
export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
