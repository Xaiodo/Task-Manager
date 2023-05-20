import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

const GroupInput = ({ placeholder, value, setValue, icon, onIconPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        value={value}
      />
      <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
        <Feather color="black" name={icon} size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default GroupInput;
