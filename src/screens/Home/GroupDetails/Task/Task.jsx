import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";

import { HomeContext } from "../../../../navigation/AppStack/AppStackNavigation";
import authService from "../../../../services/authService";
import jwtService from "../../../../services/jwt";
import tasksService from "../../../../services/tasksService";

const Task = ({ item, navigation }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { setTasks } = useContext(HomeContext).tasks;
  const [currentUser, setCurrentUser] = useState(null);

  const [user, setUSer] = useState(null);

  useEffect(() => {
    authService.getUserById(item.assignmentTo).then((res) => {
      setUSer(res);
    });
  }, [item]);

  useEffect(() => {
    getCurrentUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  const getCurrentUser = async () => {
    const res = await jwtService.getUser();

    const user = await authService.findUser(res);

    return user;
  };

  const handleOnDelete = async () => {
    try {
      await tasksService.deleteTask(item._id);

      const newTasks = await tasksService.getTasks(item.group);

      setTasks(newTasks.data);
    } catch (error) {
      return error;
    }
  };

  const isCanDelete = () => {
    if (currentUser && currentUser._id && currentUser._id === item.ownerId)
      return true;
    return false;
  };

  const handleOnEdit = () => {
    navigation.navigate("EditTask", { task: item });
  };

  const isAssignedToMe = () => {
    try {
      if (user._id === currentUser._id) return true;
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleOnAssignToMe = async () => {
    try {
      const user = await getCurrentUser();

      await tasksService.assignTask(item._id, user._id);

      const newTasks = await tasksService.getTasks(item.group);

      setTasks(newTasks.data);
    } catch (error) {
      return error;
    }
  };

  const handleOnComplete = async () => {
    try {
      await tasksService.updateTask(item._id);

      const newTasks = await tasksService.getTasks(item.group);

      setTasks(newTasks.data);
    } catch (error) {
      return error;
    }
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
        {isCanDelete() ? (
          <TouchableOpacity onPress={handleOnEdit}>
            <MaterialIcons
              color="gray"
              name="edit"
              size={24}
              style={styles.delete}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Collapsible collapsed={collapsed} style={styles.collapsed}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.details}>
          <Text style={styles.detailsItem}>Assigned to: </Text>
          <Text style={styles.detailsItem}>{item.imageUrl} </Text>
          <View>
            {user && user.imageUrl ? (
              <TouchableOpacity>
                <Image source={{ uri: user.imageUrl }} style={styles.image} />
                <Text style={{ alignSelf: "center" }}>{user.username}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleOnAssignToMe}>
                <Text style={{ color: "blue" }}>assign to me</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.detailsButtons}>
          {isCanDelete() && (
            <View>
              <Button onPress={handleOnDelete} title="Delete" />
            </View>
          )}
          {isAssignedToMe() && (
            <View style={styles.buttonContainer}>
              <Button onPress={handleOnComplete} title="Complete" />
            </View>
          )}
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

  buttonContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  collapsed: {
    flexDirection: "column",
  },
  description: {
    alignSelf: "flex-start",
    fontSize: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  detailsItem: {
    alignSelf: "center",
    fontSize: 16,
  },
  image: {
    borderRadius: 40,
    height: 50,
    paddingTop: "100%",
    width: 50,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Task;
