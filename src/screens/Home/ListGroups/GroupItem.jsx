import { View, Text, Image, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

const GroupItem = ({
  imageSource,
  groupName,
  participantCount,
  navigation,
}) => {
  const handleOnPress = () => {
    navigation.navigate("GroupDetails", {
      groupName,
      imageSource,
      participantCount,
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.groupName}>{groupName}</Text>
          <Text style={styles.participantCount}>
            {participantCount}{" "}
            {`${participantCount === 1 ? "member" : "members"}  `}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  innerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
  },
  participantCount: {
    color: "gray",
  },
});

export default GroupItem;
