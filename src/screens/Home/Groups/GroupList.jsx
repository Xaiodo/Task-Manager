import { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import AddGroupButton from "./AddGroupButton";
import GroupInput from "./GroupInput";
import GroupItem from "./GroupItem";

const data = [
  {
    imageSource:
      "https://cdn.discordapp.com/attachments/1046399512526205038/1106615898871185428/Lucy.png",
    groupName: "Yak tak mozh",
    participantCount: 2,
  },
  {
    imageSource:
      "https://cdn.discordapp.com/attachments/1046399512526205038/1106615898871185428/Lucy.png",
    groupName: "Yak tak mozh",
    participantCount: 2,
  },
  {
    imageSource:
      "https://cdn.discordapp.com/attachments/1046399512526205038/1106615898871185428/Lucy.png",
    groupName: "Yak tak mozh",
    participantCount: 2,
  },
];

const GroupList = ({ navigation }) => {
  const [searchGroup, setSearchGroup] = useState("");

  const onSearchHandle = () => {};

  const renderItem = ({ item }) => (
    <GroupItem
      groupName={item.groupName}
      imageSource={item.imageSource}
      participantCount={item.participantCount}
    />
  );

  return (
    <View style={{ height: "100%" }}>
      <View style={{ padding: 20 }}>
        <GroupInput
          icon={"search"}
          onIconPress={onSearchHandle}
          placeholder={"Seach your group"}
          setValue={setSearchGroup}
          value={searchGroup}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <AddGroupButton onPress={navigation.navigate("AddGroup")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default GroupList;
