import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../../../../components/CustomButton";
import GroupInput from "../../../../components/CustomTextInput";
import Snackbar from "../../../../components/SnackBar";
import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../../services/tasksService";

const EditTask = ({ route, navigation }) => {
  const { setTasks } = useContext(HomeContext).tasks;
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (snackbarMessage.length !== 0) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  useEffect(() => {
    setNewTitle(route.params.task.title);
    setNewDescription(route.params.task.description);
  }, []);

  const handleOnUpdatePress = async () => {
    if (newTitle === "") {
      setSnackbarMessage("Title are required!");
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
      <Text style={styles.text}>
        Please update the required fields below to edit your task
      </Text>
      <View style={{ height: 20 }} />
      <Text style={styles.error}>{snackbarMessage}</Text>
      <View style={{ height: 10 }} />

      <GroupInput
        backgroundColor={"#e6e8f0"}
        placeholder={"Enter the title of your`s task"}
        setValue={setNewTitle}
        value={newTitle}
      />
      <View style={{ height: 20 }} />

      <GroupInput
        backgroundColor={"#e6e8f0"}
        placeholder={"Enter the description of your`s task"}
        setValue={setNewDescription}
        value={newDescription}
      />
      <View style={{ height: 20 }} />
      <CustomButton
        backgroundColor={"#cd266e"}
        onPress={handleOnUpdatePress}
        textColor={"white"}
        title="Update"
      />
      {snackbarMessage.length !== 0 && (
        <Snackbar color="red" message={snackbarMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    backgroundColor: "#363a55",
    flex: 1,
    padding: 20,
  },
  error: {
    color: "#ff595f",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default EditTask;
