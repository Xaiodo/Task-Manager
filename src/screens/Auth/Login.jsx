import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/CustomButton";
import GroupInput from "../../components/CustomTextInput";
import Snackbar from "../../components/SnackBar";
import { AuthContext } from "../../navigation/AppNavigation/AppNavigation";
import authService from "../../services/authService";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    if (snackbarMessage.length !== 0) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  const handleLogin = () => {
    if (email === "") {
      setSnackbarMessage("Email cannot be empty");
      return;
    }
    if (password === "") {
      setSnackbarMessage("Password cannot be empty");
      return;
    }
    authService
      .login(email, password)
      .then((res) => {
        if (res.error) {
          setSnackbarMessage(res.error);
        } else {
          setIsLogged(res.token.length > 0);
        }
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
              color: "white",
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginVertical: 20,
              maxWidth: "60%",
              color: "white",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            It`s great to have you back! You were missed!
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <GroupInput
            backgroundColor={"#e6e8f0"}
            placeholder="Email"
            setValue={setEmail}
            value={email}
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

          <CustomButton
            backgroundColor={"#cd266e"}
            onPress={handleLogin}
            textColor={"white"}
            title={"Login"}
          />
        </View>
        <View style={{ height: 20 }} />

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "500",
              color: "white",
            }}
          >
            Don`t have account? Create a new one
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        {snackbarMessage.length !== 0 && (
          <Snackbar color="red" message={snackbarMessage} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
