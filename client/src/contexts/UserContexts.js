import { createContext } from "react";

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

const UserContext = createContext(null);

export { users, currentUser };
export default UserContext;
