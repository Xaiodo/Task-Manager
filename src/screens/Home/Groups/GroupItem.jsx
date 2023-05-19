import { View, Text, Image, StyleSheet } from "react-native";

const GroupItem = ({ imageSource, groupName, participantCount }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.groupName}>{groupName}</Text>
        <Text style={styles.participantCount}>{participantCount} members</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "90%",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 4,
    height: 60,
    marginRight: 10,
    width: 60,
  },
  participantCount: {
    color: "gray",
  },
});

export default GroupItem;
