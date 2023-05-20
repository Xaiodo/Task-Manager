import { View, Text } from "react-native";

const Task = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};

export default Task;
