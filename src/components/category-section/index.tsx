import React from "react";
import {View, Text, ScrollView} from "react-native";
import {ITodo} from "../../models/ITodo";
import Todo from "../todo";
import styles from "./index.styles";
import {useTodos} from "../../context/TodosProvider";

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
                                            todoSwipeAction
                                        }: IProps) {
    const {deleteTodo, restoreTodo} = useTodos();

    function onSwipeOpen(todo: ITodo) {
        if (todoSwipeAction === "delete") {
            deleteTodo(todo)
            console.log("todo " + todo.id + " deleted!");
        } else if (todoSwipeAction === "restore") {
            restoreTodo(todo)
            console.log("todo " + todo.id + " restored!");
        }

    }

    return (
        <View style={styles.categorySection}>
            <View style={styles.categoryBar}>
                <Text style={styles.categoryTitle}>{sectionTitle}</Text>
                <Text style={styles.numberOfTodosInSection}>{todos.length}</Text>
            </View>
            <ScrollView>
                {todos.map((todo) => (
                    <Todo key={todo.id + todo.text} onSwipeOpen={() => onSwipeOpen(todo)} todo={todo}
                          navigation={navigation}/>
                ))}
            </ScrollView>
        </View>
    );
}
