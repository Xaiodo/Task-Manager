import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token, user) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    return token;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");

    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
};

const isLogged = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
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
