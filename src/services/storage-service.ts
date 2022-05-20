import AsyncStorage from "@react-native-async-storage/async-storage";
import {ITodo} from "../models/ITodo";

export function storeTodo(todo: ITodo): Promise<void> {
    const jsonTodo = JSON.stringify(todo);
    return AsyncStorage.setItem(String(todo.id), jsonTodo);
}

export function getTodoById(id: number): Promise<ITodo> {
    return AsyncStorage.getItem(String(id))
        .then(jsonTodo => JSON.parse(jsonTodo));
}

export function removeTodoById(id: number): Promise<void> {
    return AsyncStorage.removeItem(String(id));
}

export async function getAllTodos(): Promise<ITodo[]> {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const jsonTodos = await AsyncStorage.multiGet(keys);
        console.log(jsonTodos);
        return jsonTodos.map(jsonTodoPair => JSON.parse(jsonTodoPair[1]));
    } catch (e) {
        console.error(e);
    }
}