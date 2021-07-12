import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { CommonActions } from "@react-navigation/routers";
import ColorSelector from "../components/ColorSelector";
import Button from "../components/Button";

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGrey",
];

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.blue);
  const [isValid, setIsValid] = useState(true);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>List Name</Text>
          {!isValid && (
            <Text style={{ marginLeft: 4, color: Colors.red, fontSize: 12 }}>
              * List Name cannot be empty *
            </Text>
          )}
        </View>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autofocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setIsValid(true);
          }}
          placeholder={"New List Name"}
          maxLength={30}
          style={styles.input}
        />
        <Text style={styles.label}>Choose Color</Text>
        <ColorSelector
          onSelect={(color) => {
            setColor(color);
            navigation.dispatch(CommonActions.setParams({ color }));
          }}
          selectedColor={color}
          colorOptions={colorList}
        />
      </View>
      <Button
        text="Save"
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setIsValid(false);
          }
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.darkGrey,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.darkGrey,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
