import {ITodo} from "../models/ITodo";

export function jsonToTodo(json: any): ITodo {
    return {
        id: json.id,
        text: json.text,
        date: json.date != null ? new Date(json.date) : null,
        priority: json.priority,
        isDeleted: json.isDeleted
    }
}

export function todoToJson(todo: ITodo) {
    return JSON.stringify(todo);
}