// Data service
import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:5000/api/test/";
const API_URL = "/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getCustomerBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// export default {
//   getPublicContent,
//   getCustomerBoard,
//   getAdminBoard,
// };

const exportedObject = {
  getPublicContent,
  getCustomerBoard,
  getAdminBoard
};

export default exportedObject;

