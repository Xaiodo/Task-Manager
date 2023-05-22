import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import AddGroupButton from "../../../components/CustomPositionedButton";
import GroupInput from "../../../components/CustomTextInput";
import AddGroup from "../../../components/ModalBottomSheet";
import groupService from "../../../services/groupService";

import GroupItem from "./GroupItem";

const GroupList = ({ navigation }) => {
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
      id={item._id}
      imageSource={item.imageUrl}
      navigation={navigation}
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
    <View style={{ height: "100%", backgroundColor: "#363a55" }}>
      <View style={{ padding: 20, backgroundColor: "#363a55" }}>
        <GroupInput
          backgroundColor={"#b3aebe"}
          icon="search"
          onIconPress={onSearchHandle}
          placeholder="Search your group"
          setValue={onSearchHandle}
          value={searchGroup}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={searchGroup.length > 0 ? filteredGroups : groups}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <AddGroup
        closeModal={closeModal}
        modalVisible={visible}
        navigation={navigation}
      />
      <AddGroupButton onPress={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});

export default GroupList;
