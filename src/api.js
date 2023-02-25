import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_WOOFR_API}/api`;

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/all`);
};

export const getUser = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const uploadImage = (uploadData) => {
  return axios.post(`${BASE_URL}/upload`, uploadData);
};

export const updateUser = (id, updatedUser) => {
  return axios.put(`${BASE_URL}/${id}`, updatedUser);
};

export const sendInvite = (inviteData) => {
  return axios.post(`${BASE_URL}/invites`, inviteData);
};

export const getInvites = (id) => {
  return axios.get(`${BASE_URL}/invites/${id}`);
};

export const acceptInvite = (inviteId) => {
  return axios.put(`${BASE_URL}/invites/${inviteId}/accept`);
};

export const rejectInvite = (inviteId) => {
  return axios.put(`${BASE_URL}/invites/${inviteId}/reject`);
};

export const getFriends = (id) => {
  return axios.get(`${BASE_URL}/${id}/friends`);
};

export const unfriendUser = (id, friendId) => {
  return axios.put(`${BASE_URL}/${id}/unfriend`, { friendId });
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
