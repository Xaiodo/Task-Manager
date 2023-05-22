import { useEffect, useState } from "react";
import { Text, StyleSheet, Animated } from "react-native";

const Snackbar = ({ message, color }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    fadeInSnackbar();

    const timer = setTimeout(() => {
      fadeOutSnackbar();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const fadeInSnackbar = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutSnackbar = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.snackbar,
        { backgroundColor: color, opacity: fadeAnimation },
      ]}
    >
      <Text style={styles.snackbarText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 5,
    bottom: 20,
    left: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "absolute",
    right: 20,
  },
  snackbarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Snackbar;
