import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import { HomeContext } from "../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../services/tasksService";
import GroupInput from "../ListGroups/GroupInput";

import HeaderButtonBack from "./HeaderButtonBack";
import HeaderIconButton from "./HeaderIconButton";
import Task from "./Task/Task";

const GroupDetails = ({ navigation, route }) => {
  const { tasks, setTasks } = useContext(HomeContext).tasks;
  const [searchTask, setSearchTask] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const groupId = route.params.id;

  useEffect(() => {
    tasksService.getTasks(groupId).then((res) => {
      setTasks(res.data);
    });
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLocaleLowerCase().includes(searchTask.toLocaleLowerCase())
      )
    );

    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton iconName={"add"} onPress={handleOnAddPress} />
      ),
      headerLeft: () => <HeaderButtonBack onPress={handleOnBackPress} />,
    });
  }, [searchTask]);

  const handleOnAddPress = () => {
    navigation.navigate("AddTask", { groupId });
  };

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <GroupInput
        backgroundColor={"#F2F2F2"}
        icon="search"
        placeholder="Find task"
        setValue={setSearchTask}
        value={searchTask}
      />
      <View style={{ height: 20 }} />
      {tasks.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text>No tasks</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.taskList}
          data={filteredTasks.length > 0 ? filteredTasks : tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Task item={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
  taskList: {
    flexDirection: "column",
    padding: 14,
    width: "100%",
  },
});

export default GroupDetails;
