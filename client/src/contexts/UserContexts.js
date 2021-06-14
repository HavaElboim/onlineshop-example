// import { createContext } from "react";
import { createContext, useCallback, useContext, useReducer } from "react";
import { initialState, reducer } from "./ReducerContexts.js";


const users = {
  guest: {
    name: "Guest",
    adminPrivilege: "false",
  },
  admin: {
    name: "Admin",
    adminPrivilege: "true",
  },
};

let currentUser = users.guest;

// const UserContext = createContext(null);
const UserContext = createContext(initialState);
export function UserStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ dispatch, state }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUserState() {
  return useContext(UserContext).state;
}
export function useUserDispatch() {
  return useContext(UserContext).dispatch;
}

export { users, currentUser, UserContext };
// export default UserContext;
