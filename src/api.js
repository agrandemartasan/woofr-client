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

export const getInvites = (userId) => {
  return axios.get(`${BASE_URL}/invites/${userId}`);
};

export const acceptInvite = (inviteId) => {
  return axios.put(`${BASE_URL}/invites/${inviteId}/accept`);
};

export const rejectInvite = (inviteId) => {
  return axios.put(`${BASE_URL}/invites/${inviteId}/reject`);
};

export const getFriends = (userId) => {
  return axios.get(`${BASE_URL}/friends`);
};

export const unfriendUser = (userId, friendId) => {
  return axios.put(`${BASE_URL}/${userId}/unfriend`, { friendId });
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
