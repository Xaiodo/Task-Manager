import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Collapsible from "react-native-collapsible";

const Task = (task) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const onCollapsedPressed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <TouchableOpacity onPress={onCollapsedPressed} style={styles.body}>
      <View style={styles.item}>
        <Text style={styles.text}>{task.title}</Text>
      </View>
      <Collapsible collapsed={collapsed} style={styles.collapsed}>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.details}>
          <Text style={styles.description}>Assigned to: </Text>
          <View>
            <Image source={{ uri: task.userImage }} style={styles.image} />
            <Text style={styles.description}>{task.username}</Text>
          </View>
        </View>
      </Collapsible>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
  },
  collapsed: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  description: {
    alignSelf: "center",
    fontSize: 16,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  image: {
    borderRadius: 100,
    paddingTop: "100%",
    width: "100%",
  },
  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Task;
