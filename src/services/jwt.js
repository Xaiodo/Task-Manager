import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token, user) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", user);
  } catch (error) {
    return null;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    return token;
  } catch (error) {
    return null;
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");

    return user;
  } catch (error) {
    return null;
  }
};

const isLogged = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    return token != null;
  } catch (error) {
    return false;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token1");
    await AsyncStorage.removeItem("user1");
  } catch (error) {
    return null;
  }
};

const jwtService = {
  storeToken,
  getToken,
  getUser,
  removeToken,
  isLogged,
};

export default jwtService;
