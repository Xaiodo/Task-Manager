import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Collapsible from "react-native-collapsible";

import authService from "../../../../services/authService";

const Task = ({ item }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUSer] = useState(null);

  useEffect(() => {
    authService.findUserById(item.assignmentTo).then((res) => {
      setUSer(res);
    });
  }, []);

  const handleOnAssignToMe = () => {};

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
              <Image source={{ uri: user.imageUrl }} style={styles.image} />
            ) : (
              <Text onPress={handleOnAssignToMe} style={{ color: "blue" }}>
                assign to me
              </Text>
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
