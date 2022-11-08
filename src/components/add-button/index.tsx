import React from "react";
import styles from "./index.styles";
import { Text, TouchableOpacity } from "react-native";
import { ITodo } from "../../models/ITodo";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/Feather";

export default function AddButton({ navigation }) {
  function onPress() {
    // @ts-ignore
    const generatedId: string = uuid.v4();
    const todo: ITodo = {
      id: generatedId,
      text: "",
      isChecked: false,
    };
    navigation.navigate("Edit", { todo: todo });
  }

  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.addButton}>
      <Icon style={styles.addButtonIcon} name={"plus"} size={24} />
    </TouchableOpacity>
  );
}
