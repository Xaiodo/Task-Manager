import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const BottomLeftButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons color="white" name="ios-add" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cd266e",
    borderRadius: 30,
    padding: 10,
  },
  container: {
    bottom: 0,
    padding: 15,
    position: "absolute",
    right: 0,
  },
});

export default BottomLeftButton;
