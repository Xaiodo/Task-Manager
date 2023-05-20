import axios from "axios";

import { api } from "../constants/backend";

import authService from "./authService";
import jwtService from "./jwt";

const ApiManager = axios.create({
  baseURL: api.groups.base,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
});

ApiManager.interceptors.request.use(
  async (config) => {
    const token = await jwtService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getGroups = async () => {
  try {
    const email = await jwtService.getUser();

    const user = await authService.findUser(email);

    const response = await ApiManager.get(`${api.groups.base}/${user._id}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

const createGroup = async (name, description, imageUrl) => {
  try {
    const userId = await authService.getUser();

    const response = await ApiManager.post(`${api.groups.base}/${userId._id}`, {
      name,
      description,
      imageUrl,
      userId: userId._id,
    });

    // return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const updateGroup = async (groupId, name, description, imageUrl) => {
  try {
    const response = await ApiManager.put(`${api.groups.base}/${groupId}`, {
      name,
      description,
      imageUrl,
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const deleteGroup = async (groupId) => {
  try {
    const response = await ApiManager.delete(`${api.groups.base}/${groupId}`);

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const addMember = async (groupName, secretWord) => {
  try {
    const userId = await jwtService.getUser();

    const response = await ApiManager.post(`${api.groups.base}/${userId._id}`, {
      groupName,
      secretWord,
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const groupService = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addMember,
};

export default groupService;
