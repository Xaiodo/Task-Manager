import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import FilterButtons from "../../../components/FilterButtons";
import HeaderButtonBack from "../../../components/HeaderButtonBack";
import HeaderIconButton from "../../../components/HeaderIconButton";
import Task from "../../../components/Task";
import { HomeContext } from "../../../navigation/AppStack/AppStackNavigation";
import tasksService from "../../../services/tasksService";

const GroupDetails = ({ navigation, route }) => {
  const { tasks, setTasks } = useContext(HomeContext).tasks;
  const [filter, setFilter] = useState("All");

  const [filteredTasks, setFilteredTasks] = useState([]);
  const groupId = route.params.id;

  useEffect(() => {
    tasksService.getTasks(groupId).then((res) => {
      setTasks(res.data);
    });

    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton iconName="add" onPress={handleOnAddPress} />
      ),
      headerLeft: () => <HeaderButtonBack onPress={handleOnBackPress} />,
    });
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "All") {
        return true;
      } else if (filter === "Pending") {
        return !task.isDone;
      } else if (filter === "Completed") {
        return task.isDone;
      }
    });

    setFilteredTasks(filtered);
  }, [filter, tasks]);

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const handleOnAddPress = () => {
    navigation.navigate("AddTask", { groupId });
  };

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FilterButtons filter={filter} handleFilter={handleFilter} />

      <View style={{ height: 20 }} />
      {filteredTasks.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white" }}>No tasks</Text>
        </View>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.taskList}
            data={filteredTasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Task item={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#363a55",
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
