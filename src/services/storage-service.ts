// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ITodo} from "../models/ITodo";
import {todoToJson} from "../utils/todoUtils";

export function storeTodo(todo: ITodo): Promise<void> {
    const jsonTodo = todoToJson(todo);
    return AsyncStorage.setItem(todo.id, jsonTodo);
}

export function removeTodoById(id: string): Promise<void> {
    return AsyncStorage.removeItem(String(id));
}

export async function getAllTodos(): Promise<ITodo[]> {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const keysWithoutPushToken = keys.filter(key => key !== "expopushtoken")
        let jsonTodos = await AsyncStorage.multiGet(keysWithoutPushToken);
        return jsonTodos.map(jsonTodoPair => JSON.parse(jsonTodoPair[1]));
    } catch (e) {
        console.error(e);
    }
}

export async function removeTodos(todos: ITodo[]): Promise<void> {
    try {
        const todoIds = todos.map(t => t.id);
        await AsyncStorage.multiRemove(todoIds);
    } catch (e) {
        console.error(e);
    }
}