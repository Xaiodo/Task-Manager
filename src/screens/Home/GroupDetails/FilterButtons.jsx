import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const FilterButtons = ({ handleFilter, filter }) => {
  const buttonStyle = (buttonFilter) => ({
    ...styles.button,
    backgroundColor: filter === buttonFilter ? "blue" : "gray",
  });

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => handleFilter("All")}
        style={buttonStyle("All")}
      >
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFilter("Pending")}
        style={buttonStyle("Pending")}
      >
        <Text style={styles.buttonText}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFilter("Completed")}
        style={buttonStyle("Completed")}
      >
        <Text style={styles.buttonText}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    borderRadius: 30,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
});

export default FilterButtons;
