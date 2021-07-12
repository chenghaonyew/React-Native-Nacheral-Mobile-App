import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ProductList from "./screens/ProductList";
import EditList from "./screens/EditList";
import Colors from "./constants/Colors";
import firebase from "firebase";
import Login from "./screens/Login";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};
const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nacheral" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: "white",
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title}`
              : "Create New List",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyDioacdUPN1-pV8gH0OVgVsTR9eZ2z1iyc",
  authDomain: "nacheralapp.firebaseapp.com",
  projectId: "nacheralapp",
  storageBucket: "nacheralapp.appspot.com",
  messagingSenderId: "754144162559",
  appId: "1:754144162559:web:0ada1f756af6bd9a6892ca",
};

firebase.initializeApp(firebaseConfig);
