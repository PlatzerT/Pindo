import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ITodo } from "../../models/ITodo";
import Todo from "../todo";
import styles from "./index.styles";

interface IProps {
  sectionTitle: string;
  todos: ITodo[];
}

export default function CategorySection({ sectionTitle, todos }: IProps) {
  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryBar}>
        <Text style={styles.categoryTitle}>{sectionTitle}</Text>
        <Text style={styles.numberOfTodosInSection}>{todos.length}</Text>
      </View>
      <ScrollView>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ScrollView>
    </View>
  );
}
