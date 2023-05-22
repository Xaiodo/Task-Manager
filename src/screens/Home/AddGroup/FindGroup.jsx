import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import CustomButton from "../../../components/CustomButton";
import GroupInput from "../../../components/CustomTextInput";
import Snackbar from "../../../components/SnackBar";
import { HomeContext } from "../../../navigation/AppStack/AppStackNavigation";
import groupService from "../../../services/groupService";

const FindGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [secretWord, setGroupCode] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");
  const { groups, setGroups } = useContext(HomeContext).groups;

  useEffect(() => {
    if (snackbarMessage.length !== 0) {
      const timer = setTimeout(() => {
        setSnackbarMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbarMessage]);

  const onSearchHandle = () => {
    if (groupName === "" || secretWord === "") {
      setSnackbarMessage("Please fill in all the fields");
      setSnackbarColor("red");
      return;
    }
    groupService
      .addMember(groupName, secretWord)
      .then((res) => {
        if (res.status === 200) {
          setSnackbarMessage("You have successfully joined the group");
          setSnackbarColor("green");
          setGroups([...groups, res.data]);
        } else if (res.status === 404) {
          setSnackbarMessage("Group not found");
          setSnackbarColor("red");
        } else if (res.status === 405) {
          setSnackbarMessage("You have already joined this group");
          setSnackbarColor("orange");
        }
      })
      .then(() => {
        setGroupName("");
        setGroupCode("");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please provide the group name and group secret word below to find your
        group
      </Text>
      <View style={{ height: 20 }} />

      <GroupInput
        backgroundColor={"#e6e8f0"}
        placeholder="Enter group name"
        setValue={setGroupName}
        style={styles.textInput}
        value={groupName}
      />
      <View style={{ height: 20 }} />

      <GroupInput
        backgroundColor={"#e6e8f0"}
        isSecure={true}
        placeholder="Enter group code"
        setValue={setGroupCode}
        style={styles.textInput}
        value={secretWord}
      />
      <View style={{ height: 20 }} />

      <View style={styles.buttonContainer}>
        <CustomButton
          backgroundColor={"#cd266e"}
          onPress={onSearchHandle}
          textColor={"white"}
          title="Find a group"
        />
      </View>
      {snackbarMessage !== "" && (
        <Snackbar color={snackbarColor} message={snackbarMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "stretch",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#363a55",
    flex: 1,
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  textInput: {
    marginBottom: 10,
    width: "90%",
  },
});

export default FindGroup;
