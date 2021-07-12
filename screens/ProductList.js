import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProductItem from "../components/ProductItem";
import Colors from "../constants/Colors";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collection";
import firebase from "firebase";

const renderAddProductIcon = (addProduct) => {
  return (
    <TouchableOpacity onPress={() => addProduct()}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation, route }) => {
  let [productItems, setProductItems] = useState([]);
  const [newItem, setNewItem] = useState();

  const productItemsRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("categories")
    .doc(route.params.categoryId)
    .collection("productItems");

  useEffect(() => {
    onSnapshot(
      productItemsRef,
      (newProductItem) => {
        setProductItems([...newProductItem]);
      },
      {
        sort: (a, b) => {
          if (a.code < b.code) {
            return -1;
          }

          if (a.code > b.code) {
            return 1;
          }

          return 0;
        },
      }
    );
  }, []);

  const addItemToProducts = () => {
    setNewItem({
      code: "",
      height: "",
      width: "",
      thickness: "",
      quantity: "",
      color: Colors.green,
      new: true,
    });
  };

  const removeItemFromProucts = (index) => {
    productItems.splice(index, 1);
    setProductItems([...productItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddProductIcon(addItemToProducts),
    });
  });

  if (newItem) {
    productItems = [newItem, ...productItems];
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={productItems}
        renderItem={({
          item: {
            id,
            code,
            height,
            width,
            thickness,
            quantity,
            color,
            ...params
          },
          index,
        }) => {
          return (
            <ProductItem
              {...params}
              code={code}
              quantity={quantity}
              color={color}
              height={height}
              width={width}
              thickness={thickness}
              onChangeCode={(newCode) => {
                if (params.new) {
                  setNewItem({
                    code: newCode,
                    quantity,
                    color,
                    height,
                    width,
                    thickness,
                    new: params.new,
                  });
                } else {
                  productItems[index].code = newCode;
                  setProductItems([...productItems]);
                }
              }}
              onChangeQuantity={(newQuantity) => {
                if (params.new) {
                  if (newQuantity <= 0) {
                    setNewItem({
                      code,
                      quantity: newQuantity,
                      color: Colors.red,
                      height,
                      width,
                      thickness,
                      new: params.new,
                    });
                  } else {
                    setNewItem({
                      code,
                      quantity: newQuantity,
                      color: Colors.green,
                      height,
                      width,
                      thickness,
                      new: params.new,
                    });
                  }
                } else {
                  productItems[index].quantity = newQuantity;
                  if (newQuantity <= 0) {
                    productItems[index].color = Colors.red;
                  } else {
                    productItems[index].color = Colors.green;
                  }
                  setProductItems([...productItems]);
                }
              }}
              onChangeHeight={(newHeight) => {
                if (params.new) {
                  setNewItem({
                    code,
                    quantity,
                    color,
                    height: newHeight,
                    width,
                    thickness,
                    new: params.new,
                  });
                } else {
                  productItems[index].height = newHeight;
                  setProductItems([...productItems]);
                }
              }}
              onChangeWidth={(newWidth) => {
                if (params.new) {
                  setNewItem({
                    code,
                    quantity,
                    color,
                    height,
                    width: newWidth,
                    thickness,
                    new: params.new,
                  });
                } else {
                  productItems[index].width = newWidth;
                  setProductItems([...productItems]);
                }
              }}
              onChangeThickness={(newThickness) => {
                if (params.new) {
                  setNewItem({
                    code,
                    quantity,
                    color,
                    height,
                    width,
                    thickness: newThickness,
                    new: params.new,
                  });
                } else {
                  productItems[index].thickness = newThickness;
                  setProductItems([...productItems]);
                }
              }}
              onDelete={() => {
                params.new ? setNewItem(null) : removeItemFromProucts(index);
                id && removeDoc(productItemsRef, id);
              }}
              onBlur={() => {
                if (code.length > 1) {
                  let data = {
                    code,
                    height,
                    thickness,
                    width,
                    quantity,
                    color,
                  };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(productItemsRef, data);
                  params.new && setNewItem(null);
                } else {
                  params.new ? setNewItem(null) : removeItemFromProucts(index);
                }
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
});
