import axios from "axios";

import { api } from "../constants/backend";

import jwtService from "./jwt";

const ApiManager = axios.create({
  baseURL: api.baseUrl,
  responseType: "json",
});

const login = async (email, password) => {
  try {
    const response = await ApiManager.post(api.users.login, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      email,
      password,
    });

    const { token, user } = response.data;

    await jwtService.storeToken(token, user);

    return response.data;
  } catch (error) {
    return {
      error: error.response.data.message,
      errorStatus: error.response.status,
    };
  }
};

const register = async (email, password, username, imageUrl) => {
  try {
    const response = await ApiManager.post(api.register, {
      email,
      password,
      username,
      imageUrl,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const authService = {
  login,
  register,
};

export default authService;
