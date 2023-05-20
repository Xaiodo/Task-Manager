import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import groupService from "../../../services/groupService";
import CustomTextInput from "../../Auth/CustomTextInput";

import Snackbar from "./SnackBar";

const FindGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [secretWord, setGroupCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const onSearchHandle = () => {
    if (groupName === "" || secretWord === "") {
      alert("Please fill all fields");
      return;
    }
    groupService
      .createGroup(groupName, secretWord, imageUrl)
      .then((res) => {
        if (res.status === 200) {
          setSnackbarMessage("You have successfully created the group");
          setSnackbarColor("green");
        } else if (res.status === 409) {
          setSnackbarMessage("Group with this name is already exists");
          setSnackbarColor("orange");
        } else if (res.status === 500) {
          setSnackbarMessage("Something went wrong with the server");
          setSnackbarColor("red");
        }
      })
      .then(() => {
        setGroupName("");
        setGroupCode("");
        setImageUrl("");
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
        placeholder="Enter group image url "
        setValue={setImageUrl}
        style={styles.textInput}
        value={imageUrl}
      />
      <CustomTextInput
        isSecure={true}
        placeholder="Enter group code"
        setValue={setGroupCode}
        style={styles.textInput}
        value={secretWord}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={onSearchHandle} title="Create group" />
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
