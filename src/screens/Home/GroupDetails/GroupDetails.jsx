import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import tasksService from "../../../services/tasksService";
import CustomTextInput from "../../Auth/CustomTextInput";

import HeaderButtonBack from "./HeaderButtonBack";
import HeaderIconButton from "./HeaderIconButton";
import Task from "./Task";

const GroupDetails = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    tasksService.getTasks().then((res) => {
      setTasks(res);
    });
    setFilteredTasks(
      tasks.filter((task) =>
        task.name.toLocaleLowerCase().includes(searchTask.toLocaleLowerCase())
      )
    );

    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton iconName={"add"} onPress={handleOnAddPress} />
      ),
      headerLeft: () => <HeaderButtonBack onPress={handleOnBackPress} />,
    });
  }, [setFilteredTasks, setSearchTask]);

  const handleOnAddPress = () => {};

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Find task"
        setValue={setSearchTask}
        value={searchTask}
      />
      <FlatList
        contentContainerStyle={styles.taskList}
        data={filteredTasks.length > 0 ? filteredTasks : tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => <Task item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskList: {
    alignItems: "center",
    flexDirection: "column",
  },
});

export default GroupDetails;
