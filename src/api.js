import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_WOOFR_API}/api`;

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/all`);
};

export const getUser = (id) => {
  return axios.get(`${BASE_URL}/woofr/${id}`);
};

export const login = (user) => {
  return axios.post(`${BASE_URL}/login`, user);
};

export const signup = (user) => {
  return axios.post(`${BASE_URL}/signup`, user);
};

export const verify = (token) => {
  return axios.get(`${BASE_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
