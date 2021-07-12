import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collection";
import firebase from "firebase";

const CategoryButton = ({ title, color, onPress, onDelete, onEdit }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { backgroundColor: color }]}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onEdit}>
          <AntDesign name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderLogo = () => {
  return <Image style={styles.logo} source={require("../assets/icon.png")} />;
};

const renderAddCategoryIcon = (navigation, addItemToCategories) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 4 }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 4 }}
        onPress={() =>
          navigation.navigate("Edit", { saveChanges: addItemToCategories })
        }
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const categoriesRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("categories");

  useEffect(() => {
    onSnapshot(
      categoriesRef,
      (newCategories) => {
        setCategories([...newCategories]);
      },
      {
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }

          if (a.index > b.index) {
            return 1;
          }

          return 0;
        },
      }
    );
  }, []);

  const addItemToCategories = ({ title, color }) => {
    const index =
      categories.length > 1 ? categories[categories.length - 1].index + 1 : 0;
    addDoc(categoriesRef, { title, color, index });
  };

  const removeItemFromCategories = (id) => {
    removeDoc(categoriesRef, id);
  };

  const updateItemFromCategories = (id, item) => {
    updateDoc(categoriesRef, id, item);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => renderLogo(),
      headerRight: () => renderAddCategoryIcon(navigation, addItemToCategories),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item: { title, color, id, index } }) => {
          return (
            <CategoryButton
              title={title}
              color={color}
              onPress={() => {
                navigation.navigate("ProductList", {
                  title,
                  color,
                  categoryId: id,
                });
              }}
              onEdit={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (newitem) =>
                    updateItemFromCategories(id, { index, ...newitem }),
                });
              }}
              onDelete={() => removeItemFromCategories(id)}
            />
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemTitle: {
    fontSize: 20,
    padding: 5,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: "hidden",
    marginLeft: 10,
  },
});
