import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Todo } from "../../models/Todo";
import styles from "./index.styles";

interface IProps {
  sectionTitle: string;
  todos: Todo[];
}

export default function CategorySection({ sectionTitle, todos }: IProps) {
  return (
    <View>
      <View style={styles.categoryBar}>
        <Text style={styles.categoryTitle}>{sectionTitle}</Text>
        <Text style={styles.numberOfTodosInSection}>{todos.length}</Text>
      </View>
      <ScrollView style={styles.todoList}>
        {todos.map((todo) => (
          <Text key={todo.id}>{todo.text}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
