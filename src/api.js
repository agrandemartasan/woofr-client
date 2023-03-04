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

export const sendInvite = (senderId, recipientId) => {
  return axios.post(`${BASE_URL}/invites`, {
    sender: senderId,
    recipient: recipientId
  });
};

export const getInvitesReceived = (userId) => {
  return axios.get(`${BASE_URL}/invites/${userId}/invitesReceived`);
};

export const getInvitesSent = (userId) => {
  return axios.get(`${BASE_URL}/invites/${userId}/invitesSent`);
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

export const createChat = (userId, recipientId) => {
  return axios.post(`${BASE_URL}/chats`, { userId, recipientId });
};

export const getUserChats = () => {
  return axios.get(`${BASE_URL}/chats`);
};

export const getChatMessages = (chatId) => {
  return axios.get(`${BASE_URL}/chats/${chatId}/messages`);
};

export const postMessage = (chatId, senderId, content) => {
  return axios.post(`${BASE_URL}/chats/${chatId}/messages`, {
    senderId,
    content
  });
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
