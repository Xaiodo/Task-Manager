import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import groupService from "../../../services/groupService";
import CustomTextInput from "../../Auth/CustomTextInput";

import Snackbar from "./SnackBar";

const FindGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [secretWord, setGroupCode] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const onSearchHandle = () => {
    if (groupName === "" || secretWord === "") {
      alert("Please fill all fields");
      return;
    }
    groupService
      .addMember(groupName, secretWord)
      .then((res) => {
        if (res.status === 200) {
          setSnackbarMessage("You have successfully joined the group");
          setSnackbarColor("green");
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
      <CustomTextInput
        placeholder="Enter group name"
        setValue={setGroupName}
        style={styles.textInput}
        value={groupName}
      />
      <CustomTextInput
        isSecure={true}
        placeholder="Enter group code"
        setValue={setGroupCode}
        style={styles.textInput}
        value={secretWord}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={onSearchHandle} title="Find a group" />
      </View>
      {snackbarMessage !== "" && (
        <Snackbar color={snackbarColor} message={snackbarMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },

  textInput: {
    marginBottom: 10,
    width: "90%",
  },
});

export default FindGroup;
