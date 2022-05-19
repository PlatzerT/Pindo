import React from "react";
import {Text, TouchableHighlight, View} from "react-native";
import priorityToColor from "../../utils/priorityToColor";
import {ITodo} from "../../models/ITodo";
import PriorityPoint from "../priority-point";
import styles from "./index.styles";
import formatDate from "../../utils/formatDate";
import {colors} from "../../styles/base";

interface IProps {
  todo: ITodo;
}

export default function Todo({ todo }: IProps) {
  const { pointColor, ringColor } = priorityToColor(todo.priority);
  return (
    <TouchableHighlight disabled={todo.isDeleted} style={{borderRadius: 5}} activeOpacity={0.8} underlayColor={"#fafafa"} onPress={() => alert("Ok")}>
        <View style={styles.todo}>
            <PriorityPoint pointColor={todo.isDeleted ? colors.pDeleted : pointColor} ringColor={todo.isDeleted ? colors.pRingDeleted : ringColor} />
            <View style={styles.todoTextSection}>
                <Text style={todo.isDeleted ? styles.deletedTodoText : styles.todoText}>{todo.text}</Text>
                <Text style={styles.todoDeadline}>{formatDate(todo.deadline)}</Text>
            </View>
        </View>
    </TouchableHighlight>
  );
}
