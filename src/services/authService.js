import axios from "axios";

import { api } from "../constants/backend";

import jwtService from "./jwt";

const ApiManager = axios.create({
  responseType: "json",
});

const login = async (email, password) => {
  try {
    const response = await ApiManager.post(api.users.login, {
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
    const response = await ApiManager.post(api.users.register, {
      email,
      password,
      username,
      imageUrl,
    });

    const { token, user } = response.data;

    await jwtService.storeToken(token, user);

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

const findUser = async (email) => {
  try {
    const token = await jwtService.getToken();
    const response = await ApiManager.get(`${api.users.findUser}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

const getUserById = async (userId) => {
  try {
    const token = await jwtService.getToken();
    const response = await ApiManager.get(
      `${api.users.findUserById}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

const authService = {
  login,
  register,
  findUser,
  getUserById,
};

export default authService;
