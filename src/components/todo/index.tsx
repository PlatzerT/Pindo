import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { ITodo } from "../../models/ITodo";
import { colors } from "../../styles/base";
import PriorityPoint from "../priority-point";
import styles from "./index.styles";

interface IProps {
  todo: ITodo;
  navigation: any;
  onSwipeLeftOpen: any;
  onSwipeRightOpen: any;
}

export default function Todo({
  todo,
  navigation,
  onSwipeLeftOpen,
  onSwipeRightOpen,
}: IProps) {
  function onPress() {
    navigation.navigate("Edit", { todo: todo });
  }

  const leftSwipe = () => {
    return (
      <View style={styles.swipeOuterBox}>
        <View
          style={todo.isChecked ? styles.restoreStyle : styles.checkedStyle}
        >
          <Icon
            name={todo.isChecked ? "skip-back" : "check"}
            style={styles.iconStyle}
            size={24}
          />
        </View>
      </View>
    );
  };

  const rightSwipe = () => {
    return (
      <View style={styles.swipeOuterBox}>
        <View style={styles.deleteStyle}>
          <Icon name="delete" style={styles.iconStyle} size={24} />
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={leftSwipe}
        renderRightActions={todo.isChecked ? rightSwipe : null}
        onSwipeableLeftOpen={() => onSwipeLeftOpen()}
        onSwipeableRightOpen={() => onSwipeRightOpen()}
      >
        <TouchableHighlight
          disabled={todo.isChecked}
          style={{ borderRadius: 5 }}
          activeOpacity={0.8}
          underlayColor={"#fafafa"}
          onPress={() => onPress()}
        >
          <View style={styles.todo}>
            <PriorityPoint
              pointColor={
                todo.isChecked ? colors.pointDeleted : colors.pointActive
              }
              ringColor={
                todo.isChecked ? colors.ringDeleted : colors.ringActive
              }
            />
            <View style={styles.todoTextSection}>
              <Text
                style={
                  todo.isChecked ? styles.checkedTodoText : styles.todoTitle
                }
              >
                {todo.text}
              </Text>
              <Text style={styles.todoDescription}>
                {todo.description ? todo.description : "-"}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
