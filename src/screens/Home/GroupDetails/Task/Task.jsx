import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Collapsible from "react-native-collapsible";

import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import authService from "../../../../services/authService";
import jwtService from "../../../../services/jwt";
import tasksService from "../../../../services/tasksService";

const Task = ({ item }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { tasks, setTasks } = useContext(HomeContext).tasks;

  const [user, setUSer] = useState(null);

  useEffect(() => {
    authService.getUserById(item.assignmentTo).then((res) => {
      setUSer(res);
    });
  }, [tasks]);

  const handleOnAssignToMe = async () => {
    try {
      const res = await jwtService.getUser();
      const user = await authService.findUser(res);

      await tasksService.assignTask(item._id, user._id);

      const newTask = await tasksService.getTasks(item.group);

      setTasks(newTask.data);
    } catch (error) {}
  };

  const onCollapsedPressed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onCollapsedPressed}
      style={styles.body}
    >
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <Collapsible collapsed={collapsed} style={styles.collapsed}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.details}>
          <Text style={styles.description}>Assigned to: </Text>
          <View>
            {user && user.imageUrl ? (
              <>
                <Image source={{ uri: user.imageUrl }} style={styles.image} />
                <Text style={{ alignSelf: "center" }}>{user.username}</Text>
              </>
            ) : (
              <TouchableOpacity onPress={handleOnAssignToMe}>
                <Text style={{ color: "blue" }}>assign to me</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Collapsible>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 6,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
  },
  collapsed: {
    flexDirection: "column",
  },
  description: {
    alignSelf: "center",
    fontSize: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  image: {
    borderRadius: 40,
    height: 50,
    paddingTop: "100%",
    width: 50,
  },
  item: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Task;
