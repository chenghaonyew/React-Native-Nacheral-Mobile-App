import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export default ({ buttonStyle, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: Colors.darkGrey,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
