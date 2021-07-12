import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import validator from "validator";
import firebase from "firebase";

const validateField = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };
  return isValid;
};

const createAccount = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      firebase.firestore().collection("users").doc(user.uid).set({});
      console.log("Creating User...");
    });
};

const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("Logging User...");
    });
};

export default () => {
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Nacheral</Text>
      <View style={{ flex: 1 }}>
        <LabeledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          lebelStyle={styles.label}
          autoCompleteType={"email"}
        ></LabeledInput>
        <LabeledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          lebelStyle={styles.label}
          autoCompleteType={"password"}
        ></LabeledInput>
        {isCreateMode && (
          <LabeledInput
            label="Re-enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            lebelStyle={styles.label}
          ></LabeledInput>
        )}
        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        text={isCreateMode ? "Create Account" : "Login"}
        onPress={() => {
          const isValid = validateField(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setEmailField({ ...emailField });
            isAllValid = false;
          }
          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be at least 8 long characters with numbers, uppercase, lowercase, symbol";
            setPasswordField({ ...passwordField });
            isAllValid = false;
          }
          if (isCreateMode && passwordReentryField.text != passwordField.text) {
            passwordReentryField.errorMessage = "Password do not match";
            setPasswordReentryField({ ...passwordReentryField });
            isAllValid = false;
          }
          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{ backgroundColor: "#28623a" }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  header: {
    fontSize: 72,
    color: "#335438",
    alignSelf: "center",
  },
});
