import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Collapsible from "react-native-collapsible";

const Task = ({ item }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const onCollapsedPressed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <TouchableOpacity onPress={onCollapsedPressed} style={styles.body}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <Collapsible collapsed={collapsed} style={styles.collapsed}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.details}>
          <Text style={styles.description}>Assigned to: </Text>
          <View>
            <Image
              source={{
                uri: "https://cdn.discordapp.com/attachments/1046399512526205038/1106615938188583022/Rin.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.description}>{"Xaiodo"}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Task;
