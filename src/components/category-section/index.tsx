import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ITodo } from "../../models/ITodo";
import Todo from "../todo";
import styles from "./index.styles";
import { useTodos } from "../../context/TodosProvider";
import {
  cancelScheduledTodoNotification,
  scheduleTodoNotification,
} from "../../services/notification-service";

interface IProps {
  sectionTitle: string;
  todos: ITodo[];
  navigation: any;
  todoSwipeAction: string;
}

export default function CategorySection({
  sectionTitle,
  todos,
  navigation,
  todoSwipeAction,
}: IProps) {
  const { checkTodo, restoreTodo, clearTodos, removeTodo } = useTodos();

  async function onSwipeLeftOpen(todo: ITodo) {
    if (todoSwipeAction === "delete") {
      checkTodo(todo);
      await cancelScheduledTodoNotification(todo.id);
    } else if (todoSwipeAction === "restore") {
      restoreTodo(todo);
      await scheduleTodoNotification(todo);
    }
  }

  async function onSwipeRightOpen(todo: ITodo) {
    await removeTodo(todo);
  }

  function onPress() {
    if (todos.length != 0) {
      todos.map(async (todo) => {
        await cancelScheduledTodoNotification(todo.id);
      });
      clearTodos();
    }
  }

  function renderItem({ item, index }) {
    return (
      <>
        {index != 0 && <View style={styles.dividerLine}></View>}
        <Todo
          key={item.id + item.text}
          onSwipeLeftOpen={() => onSwipeLeftOpen(item)}
          onSwipeRightOpen={() => onSwipeRightOpen(item)}
          todo={item}
          navigation={navigation}
        />
      </>
    );
  }

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryBar}>
        <Text style={styles.categoryTitle}>{sectionTitle}</Text>
        <View style={styles.categoryRightSide}>
          {todoSwipeAction === "restore" && (
            <TouchableOpacity
              onPress={() => onPress()}
              style={{
                borderRadius: 8,
                backgroundColor: "#dbeafe",
                padding: 6,
                marginRight: 15,
              }}
            >
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.numberOfTodosInSection}>{todos.length}</Text>
        </View>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        persistentScrollbar={true}
      />
    </View>
  );
}
