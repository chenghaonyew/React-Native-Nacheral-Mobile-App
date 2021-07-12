import React from "react";
import { View } from "react-native";
import Button from "../components/Button";
import firebase from "firebase";

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button
        text="Log out"
        onPress={() => {
          firebase.auth().signOut();
        }}
      ></Button>
    </View>
  );
};
