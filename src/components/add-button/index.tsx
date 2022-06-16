import React from 'react';
import styles from "./index.styles";
import {Text, TouchableOpacity} from "react-native";
import {ITodo} from "../../models/ITodo";
import uuid from 'react-native-uuid'

export default function AddButton({ navigation }) {

    function onPress() {
        // @ts-ignore
        const generatedId: string = uuid.v4();
        const todo: ITodo = {
            id: generatedId,
            text: "",
            isDeleted: false,
            deadline: new Date(),
            priority: "low"
        }
        navigation.navigate("Edit", { todo: todo })
    }

    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
}
