import { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../../services/tasksService";
import GroupInput from "../../ListGroups/GroupInput";

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
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Please fill in all the required fields below and create your own task!
        </Text>

        <View style={{ height: 40 }} />
        <Text style={{ fontSize: 18, textAlign: "left", color: "red" }}>
          {error}
        </Text>
        <View style={{ height: 20 }} />
        <GroupInput
          backgroundColor={"#F1F1F1"}
          placeholder={"Enter the title of your`s task"}
          setValue={setTitle}
          value={title}
        />
        <View style={{ height: 20 }} />

        <GroupInput
          backgroundColor={"#F1F1F1"}
          placeholder={"Enter the description of your`s task"}
          setValue={setDescription}
          value={description}
        />
        <View style={{ height: 20 }} />

        <Button onPress={handleOnPress} title="Create" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
});

export default AddTask;
