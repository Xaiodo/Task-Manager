import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

const AddGroupModal = ({ visible, onClose }) => {
  const handleAddGroup = () => {
    // Логіка для додавання нової групи
  };

  const handleFindGroup = () => {
    // Логіка для пошуку групи
  };

  return (
    <Modal
      animationType="fade"
      style={{ width: "min" }}
      transparent={true}
      visible={visible}
    >
      <View blurRadius={10} style={styles.backgroundImage}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleAddGroup} style={styles.button}>
            <Text style={styles.buttonText}>Add new group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFindGroup} style={styles.button}>
            <Text style={styles.buttonText}>Find group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4287f5",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

export default AddGroupModal;
