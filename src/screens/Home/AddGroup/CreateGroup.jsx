import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import CustomButton from "../../../components/CustomButton";
import GroupInput from "../../../components/CustomTextInput";
import Snackbar from "../../../components/SnackBar";
import isValidImageUrl from "../../../constants/images";
import { HomeContext } from "../../../navigation/AppStack/AppStackNavigation";
import groupService from "../../../services/groupService";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [secretWord, setGroupCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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

  const onCreateHandle = () => {
    if (groupName === "" || secretWord === "" || imageUrl === "") {
      setSnackbarMessage("Please fill all fields");
      setSnackbarColor("red");
      return;
    }
    groupService
      .createGroup(groupName, secretWord, isValidImageUrl(imageUrl))
      .then((res) => {
        if (res.status === 200) {
          setSnackbarMessage("You have successfully created the group");
          setSnackbarColor("green");
          setGroups([...groups, res.data]);
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
      <Text style={styles.text}>
        Please provide the group name, image url and group secret word below to
        create your own group
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
        placeholder="Enter group image url "
        setValue={setImageUrl}
        style={styles.textInput}
        value={imageUrl}
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
          onPress={onCreateHandle}
          textColor={"white"}
          title="Create group"
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

export default CreateGroup;
