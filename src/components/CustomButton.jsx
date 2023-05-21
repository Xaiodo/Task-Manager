import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, title, backgroundColor, textColor }) => {
  const buttonStyle = {
    backgroundColor,
  };

  const textStyle = {
    color: textColor,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cd266e",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CustomButton;
