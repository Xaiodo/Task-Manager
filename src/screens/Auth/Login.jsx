import { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../navigation/AppNavigation/AppNavigation";
import authService from "../../services/authService";

import CustomTextInput from "./CustomTextInput";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { setIsLogged } = useContext(AuthContext);

  const handleLogin = () => {
    setError("");
    if (email === "") {
      setError("Email cannot be empty");
      return;
    }
    if (password === "") {
      setError("Password cannot be empty");
      return;
    }
    authService
      .login(email, password)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setIsLogged(res.token.length > 0);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fefefe", flex: 1 }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, marginTop: 30, fontWeight: "bold" }}>
            Login
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginVertical: 20,
              maxWidth: "60%",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            It`s great to have you back! You were missed!
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            padding: 10,
          }}
        >
          <Text style={{ color: "red", alignSelf: "flex-start" }}>{error}</Text>
          <CustomTextInput
            placeholder="Email"
            setValue={setEmail}
            value={email}
          />
          <CustomTextInput
            isSecure={true}
            placeholder="Password"
            setValue={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            padding: 10,
            backgroundColor: "#1c37b3",
            borderRadius: 8,
            marginVertical: 40,
            alignSelf: "center",
            width: "90%",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 22,
              fontWeight: "600",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
