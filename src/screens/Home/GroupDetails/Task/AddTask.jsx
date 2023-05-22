import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../../../../components/CustomButton";
import GroupInput from "../../../../components/CustomTextInput";
import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../../services/tasksService";

const AddTask = ({ route }) => {
  const { tasks, setTasks } = useContext(HomeContext).tasks;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const group = route.params.groupId;

  const handleOnPress = () => {
    if (title === "") {
      setError("Title are required!");
      return;
    }
    tasksService.createTask(group, title, description).then((res) => {
      setTitle("");
      setDescription("");
      setError("");
      setTasks([...tasks, res]);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
        Please fill in all the required fields below and create your own task
      </Text>

      <Text style={{ fontSize: 18, textAlign: "left", color: "red" }}>
        {error}
      </Text>
      <View style={{ height: 20 }} />
      <GroupInput
        backgroundColor={"#e6e8f0"}
        placeholder={"Enter the title of your`s task"}
        setValue={setTitle}
        value={title}
      />
      <View style={{ height: 20 }} />

      <GroupInput
        backgroundColor={"#e6e8f0"}
        placeholder={"Enter the description of your`s task"}
        setValue={setDescription}
        value={description}
      />
      <View style={{ height: 20 }} />

      <CustomButton
        backgroundColor={"#cd266e"}
        onPress={handleOnPress}
        textColor={"white"}
        title="Create"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#363a55",
    flex: 1,
    padding: 20,
  },
});

export default AddTask;
