import { Platform } from "react-native";

const baseUrl =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api/v1"
    : "https://localhost:3000/api/v1";

export const api = {
  baseUrl,
  register: baseUrl + "/register",
  users: {
    login: baseUrl + "/users/login",
    register: baseUrl + "/users/register",
  },
};
