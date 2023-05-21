import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../../services/tasksService";
import GroupInput from "../../ListGroups/GroupInput";

const EditTask = ({ route, navigation }) => {
  const { setTasks } = useContext(HomeContext).tasks;
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setNewTitle(route.params.task.title);
    setNewDescription(route.params.task.description);
  }, []);

  const handleOnUpdatePress = async () => {
    if (newTitle === "") {
      setError("Title are required!");
      setNewTitle("");
      return;
    }
    try {
      await tasksService.updateTask(
        route.params.task._id,
        newTitle,
        newDescription
      );
      const newTasks = await tasksService.getTasks(route.params.task.group);

      setTasks(newTasks.data);
      navigation.goBack();
    } catch (err) {
      return err;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <View style={{ height: 20 }} />

      <Text style={styles.text}>Set new task</Text>
      <GroupInput
        backgroundColor={"#F2F2F2"}
        setValue={setNewTitle}
        value={newTitle}
      />
      <View style={{ height: 20 }} />
      <Text style={styles.text}>Set new description about your new task</Text>

      <GroupInput
        backgroundColor={"#F2F2F2"}
        setValue={setNewDescription}
        value={newDescription}
      />
      <View style={{ height: 20 }} />
      <Button onPress={handleOnUpdatePress} title="Update" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  error: {
    color: "red",
  },
  text: {
    marginVertical: 10,
  },
});

export default EditTask;
