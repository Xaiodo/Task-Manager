import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import authService from "../../services/authService";

import CustomTextInput from "./CustomTextInput";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(
    "https://cdn.discordapp.com/attachments/1046399512526205038/1106624150971371640/image.png"
  );
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    if (username === "") {
      setError("Username cannot be empty");
    }
    if (email === "") {
      setError("Email cannot be empty");
    }
    if (password === "") {
      setError("Password cannot be empty");
    }
    if (confirmPassword === "") {
      setError("Confirm password cannot be empty");
    }
    authService.register(username, email, password, image).then((res) => {
      if (res.error) {
        setError(res.error);
        return;
      }
      console.log("success");
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
            Create account
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
            Create an account to continue using the app
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            padding: 10,
          }}
        >
          <Text style={{ color: "red", alignSelf: "flex-start" }}>{error}</Text>
          <CustomTextInput
            placeholder="Username"
            setValue={setUsername}
            value={username}
          />
          <CustomTextInput
            placeholder="Email"
            setValue={setEmail}
            value={email}
          />
          <CustomTextInput
            placeholder="Image url"
            setValue={setImage}
            value={image}
          />
          <CustomTextInput
            isSecure={true}
            placeholder="Password"
            setValue={setPassword}
            value={password}
          />
          <CustomTextInput
            isSecure={true}
            placeholder="Confirm password"
            setValue={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity
          onPress={handleRegister}
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
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
