export const initialState = {
    user: null,
  };
  
  export const ActionTypes = {
    UPDATE_USER: "UPDATE_USER",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    REQUEST_LOGIN: "REQUEST_LOGIN",
  };
  
  export function reducer(state = initialState, action) {
    console.log("reducer", state, action);
    switch (action.type) {
      case ActionTypes.REQUEST_LOGIN:
        return { ...state, loading: true };
      case ActionTypes.LOGIN_ERROR:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.user, loading: false };
      case ActionTypes.UPDATE_USER: {
        return { ...state, user: action.user };
      }
      default:
        console.log("reducer: unknown type: " + action.type);
      //throw new Error();
    }
  }
  