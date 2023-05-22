import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/CustomButton";
import GroupInput from "../../components/CustomTextInput";
import Snackbar from "../../components/SnackBar";
import isValidImageUrl from "../../constants/images";
import { AuthContext } from "../../navigation/AppNavigation/AppNavigation";
import authService from "../../services/authService";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const { setIsLogged } = useContext(AuthContext);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (snackbarMessage.length !== 0) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  const handleRegister = () => {
    setSnackbarMessage("");
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      return;
    }
    if (username.length < 3) {
      setSnackbarMessage("Username must be at least 3 characters long");
      if (username === "") {
        setSnackbarMessage("Username cannot be empty");
        return;
      }
      return;
    }
    if (email.length < 5) {
      setSnackbarMessage("Email must be at least 5 characters long");
      if (email === "") {
        setSnackbarMessage("Email cannot be empty");
        return;
      }
      return;
    }
    if (password.length < 4) {
      setSnackbarMessage("Password must be at least 4 characters long");
      if (password === "") {
        setSnackbarMessage("Password cannot be empty");
        return;
      }
      return;
    }
    if (image === "") {
      setSnackbarMessage("Image cannot be empty");
    }
    authService
      .register(username, email, password, isValidImageUrl(image))
      .then(() => {
        setIsLogged(true);
      })
      .catch((err) => {
        setSnackbarMessage(err.message);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#363a55", flex: 1 }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              marginTop: 30,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginVertical: 20,
              textAlign: "center",
              fontWeight: "600",
              color: "white",
            }}
          >
            Create an account to continue using the app
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <GroupInput
            backgroundColor={"#e6e8f0"}
            placeholder="Username"
            setValue={setUsername}
            value={username}
          />
          <View style={{ height: 20 }} />
          <GroupInput
            backgroundColor={"#e6e8f0"}
            placeholder="Email"
            setValue={setEmail}
            value={email}
          />
          <View style={{ height: 20 }} />
          <GroupInput
            backgroundColor={"#e6e8f0"}
            placeholder="Image url"
            setValue={setImage}
            value={image}
          />
          <View style={{ height: 20 }} />
          <GroupInput
            backgroundColor={"#e6e8f0"}
            isSecure={true}
            placeholder="Password"
            setValue={setPassword}
            value={password}
          />
          <View style={{ height: 20 }} />
          <GroupInput
            backgroundColor={"#e6e8f0"}
            isSecure={true}
            placeholder="Confirm password"
            setValue={setConfirmPassword}
            value={confirmPassword}
          />
          <View style={{ height: 20 }} />

          <CustomButton
            backgroundColor={"#cd266e"}
            onPress={handleRegister}
            textColor={"white"}
            title={"Sign up"}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              color: "white",
              fontWeight: "500",
            }}
          >
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
      {snackbarMessage.length !== 0 && (
        <Snackbar color="red" message={snackbarMessage} />
      )}
    </SafeAreaView>
  );
};

export default Register;
