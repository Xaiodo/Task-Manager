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

const getTasks = async (groupId) => {
  try {
    const response = await ApiManager.get(`${api.tasks.base}/${groupId}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

const assignTask = async (taskId, assignmentTo) => {
  try {
    const response = await ApiManager.put(`${api.tasks.base}/${taskId}`, {
      assignmentTo,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const createTask = async (group, title, description) => {
  try {
    const email = await jwtService.getUser();
    const ownerId = await authService.findUser(email);

    const response = await ApiManager.post(`${api.tasks.base}`, {
      group,
      title,
      description,
      ownerId: ownerId._id,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

const updateTask = async (taskId, title, description, isDone) => {
  try {
    const response = await ApiManager.put(`${api.tasks.base}/${taskId}`, {
      title,
      description,
      isDone,
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
  assignTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
