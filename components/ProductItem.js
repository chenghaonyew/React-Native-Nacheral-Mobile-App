import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";

const EditableText = ({
  code,
  height,
  width,
  thickness,
  quantity,
  color,
  onChangeCode,
  onChangeQuantity,
  onChangeHeight,
  onChangeWidth,
  onChangeThickness,
  isEditMode,
}) => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <FontAwesome
        name="circle"
        size={24}
        color={color}
        style={{ marginHorizontal: 10, paddingTop: 10 }}
      />
      <View>
        {isEditMode ? (
          <TextInput
            underlineColorAndroid={"transparent"}
            selectionColor={"transparent"}
            autoFocus={true}
            value={code}
            onChangeText={onChangeCode}
            placeholder={"Product Code"}
            onSubmitEditing={() => {}}
            maxLength={30}
            style={styles.input}
          />
        ) : (
          <Text style={styles.text}>{code}</Text>
        )}
        {isEditMode ? (
          <View style={{ flexDirection: "row" }}>
            <TextInput
              underlineColorAndroid={"transparent"}
              selectionColor={"transparent"}
              value={height}
              onChangeText={onChangeHeight}
              placeholder={"Length"}
              onSubmitEditing={() => {}}
              maxLength={10}
              style={[styles.input, { width: 60, textAlign: "center" }]}
            />
            <TextInput
              underlineColorAndroid={"transparent"}
              selectionColor={"transparent"}
              value={width}
              onChangeText={onChangeWidth}
              placeholder={"Width"}
              onSubmitEditing={() => {}}
              maxLength={10}
              style={[styles.input, { width: 60, textAlign: "center" }]}
            />
            <TextInput
              underlineColorAndroid={"transparent"}
              selectionColor={"transparent"}
              value={thickness}
              onChangeText={onChangeThickness}
              placeholder={"Thickness"}
              onSubmitEditing={() => {}}
              maxLength={10}
              style={[styles.input, { width: 80, textAlign: "center" }]}
            />
          </View>
        ) : (
          <Text style={styles.sizeText}>
            {height} * {width} * {thickness} mm
          </Text>
        )}
      </View>

      {isEditMode ? (
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          value={quantity}
          onChangeText={onChangeQuantity}
          placeholder={"Stock"}
          onSubmitEditing={() => {}}
          maxLength={5}
          style={[styles.input, { width: 50, textAlign: "center" }]}
        />
      ) : (
        <Text style={[styles.text, { marginHorizontal: 20 }]}>
          {quantity} pcs
        </Text>
      )}
    </View>
  );
};

export default ({
  code,
  height,
  thickness,
  width,
  quantity,
  color,
  onChangeCode,
  onChangeQuantity,
  onChangeHeight,
  onChangeWidth,
  onChangeThickness,
  onDelete,
  onBlur,
  ...props
}) => {
  const [isEditMode, setEditMode] = useState(props.new);
  return (
    <View style={styles.container}>
      <EditableText
        code={code}
        height={height}
        thickness={thickness}
        width={width}
        quantity={quantity}
        color={color}
        onChangeCode={onChangeCode}
        onChangeQuantity={onChangeQuantity}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onChangeThickness={onChangeThickness}
        isEditMode={isEditMode}
      />
      {isEditMode ? (
        <TouchableOpacity
          onPress={() => {
            setEditMode(false);
            onBlur();
          }}
        >
          <FontAwesome5 name="check" size={20} color={Colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setEditMode(true);
            }}
          >
            <AntDesign name="edit" size={20} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={20}
              color={Colors.red}
              style={{ paddingLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 20,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 4,
    padding: 3,
    height: 25,
    fontSize: 16,
  },
  text: {
    padding: 3,
    paddingBottom: 0,
    fontSize: 16,
  },
  sizeText: {
    fontSize: 12,
    paddingLeft: 3,
    color: Colors.grey,
  },
});
