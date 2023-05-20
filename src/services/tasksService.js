import axios from "axios";

import { api } from "../constants/backend";

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

const getTasks = async (groupId) => {
  try {
    const response = await ApiManager.get(`${api.tasks.base}?${groupId}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

const createTask = async (groupId, name, description, imageUrl) => {
  try {
    const response = await ApiManager.post(`${api.tasks.base}`, {
      groupId,
      name,
      description,
      imageUrl,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const updateTask = async (taskId, name, description, imageUrl) => {
  try {
    const response = await ApiManager.put(`${api.tasks.base}/${taskId}`, {
      name,
      description,
      imageUrl,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await ApiManager.delete(`${api.tasks.base}/${taskId}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
