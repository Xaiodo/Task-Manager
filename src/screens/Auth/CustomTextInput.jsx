import { TextInput } from "react-native";

const CustomTextInput = ({ placeholder, value, setValue, isSecure }) => {
  return (
    <TextInput
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={isSecure}
      style={{
        padding: 10,
        backgroundColor: "#eff2ff",
        borderRadius: 6,
        marginTop: 20,
      }}
      value={value}
    />
  );
};

export default CustomTextInput;
