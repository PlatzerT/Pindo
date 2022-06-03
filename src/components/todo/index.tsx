import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { ITodo } from "../../models/ITodo";
import PriorityPoint from "../priority-point";
import styles from "./index.styles";
import {formatDate} from "../../utils/dateUtils";
import { colors } from "../../styles/base";
import {priorityToColor} from "../../utils/priorityUtils";
import {todoToJson} from "../../utils/todoUtils";

interface IProps {
  todo: ITodo;
  navigation: any;
}

export default function Todo({ todo, navigation }: IProps) {
  const { pointColor, ringColor } = priorityToColor(todo.priority);
  const showContinuouslySymbol: string = "-";

  function onPress() {
    navigation.navigate("Edit", { todo: todo });
  }

  return (
    <TouchableHighlight
      disabled={todo.isDeleted}
      style={{ borderRadius: 5 }}
      activeOpacity={0.8}
      underlayColor={"#fafafa"}
      onPress={() => onPress()}
    >
      <View style={styles.todo}>
        <PriorityPoint
          pointColor={todo.isDeleted ? colors.pDeleted : pointColor}
          ringColor={todo.isDeleted ? colors.pRingDeleted : ringColor}
        />
        <View style={styles.todoTextSection}>
          <Text
            style={todo.isDeleted ? styles.deletedTodoText : styles.todoText}
          >
            {todo.text}
          </Text>
          <Text style={styles.todoDeadline}>
            {todo.deadline != null
              ? formatDate(todo.deadline)
              : showContinuouslySymbol}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
