import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.3;

const AddGroupModal = ({ modalVisible, closeModal }) => {
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <View style={styles.closeButtonText} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>Find group</Text>
              <View style={{ paddingVertical: 10 }} />
              <Text style={styles.button}>Create group</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 6,
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 30,
    width: "100%",
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 4,
  },
  closeButtonText: {
    backgroundColor: "gray",
    borderRadius: 10,
    color: "blue",
    padding: 2,
    width: 40,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: MODAL_HEIGHT,
    padding: 16,
    width: SCREEN_WIDTH,
  },
});

export default AddGroupModal;
