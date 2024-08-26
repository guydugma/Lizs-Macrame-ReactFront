import axios from "axios";
import { LoginUser, RegisterUser } from "../@types/types";

export const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api
`;
export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${baseUrl}/users/login`;


export const register = (data: RegisterUser) => axios.post(usersUrl, data);
export const login = (data: LoginUser) => axios.post(loginUrl, data);

export const userDetails = (id: string) => {
  const url = `${usersUrl}/${id}`;

  return axios.get(url, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const getAllUsers = () => {
  return axios.get(usersUrl, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};



export const auth = {
  register,
  login,
  userDetails,
  getAllUsers,
};
//import auth from './auth.ts'

export default auth;
