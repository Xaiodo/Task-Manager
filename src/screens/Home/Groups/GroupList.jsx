import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import groupService from "../../../services/groupService";
import AddGroup from "../AddGroup/AddModalGroup";

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
    groupName: "Test",
    participantCount: 2,
  },
  {
    imageSource:
      "https://cdn.discordapp.com/attachments/1046399512526205038/1106615898871185428/Lucy.png",
    groupName: "Soft Wars",
    participantCount: 2,
  },
  {
    imageSource:
      "https://cdn.discordapp.com/attachments/1046399512526205038/1106615898871185428/Lucy.png",
    groupName: "Ekreative",
    participantCount: 2,
  },
];

const GroupList = () => {
  const [searchGroup, setSearchGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    groupService.getGroups().then((res) => {
      setGroups(res);
    });
    setFilteredGroups(
      groups.filter((group) =>
        group.name.toLocaleLowerCase().includes(searchGroup.toLocaleLowerCase())
      )
    );
  }, [searchGroup]);

  const onSearchHandle = (text) => {
    setSearchGroup(text);
  };

  const [visible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <GroupItem
      groupName={item.name}
      imageSource={item.imageUrl}
      participantCount={item.users.length}
    />
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={{ padding: 20 }}>
        <GroupInput
          icon="search"
          onIconPress={onSearchHandle}
          placeholder="Search your group"
          setValue={onSearchHandle}
          value={searchGroup}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={filteredGroups}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <AddGroup closeModal={closeModal} modalVisible={visible} />
      <AddGroupButton onPress={openModal} />
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
