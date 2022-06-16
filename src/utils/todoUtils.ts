import {ITodo} from "../models/ITodo";

export function jsonToTodo(json: any): ITodo {
    return {
        id: json.id,
        text: json.text,
        deadline: json.deadline != null ? new Date(json.deadline) : null,
        priority: json.priority,
        isDeleted: json.isDeleted
    }
}

export function todoToJson(todo: ITodo) {
    return JSON.stringify(todo);
}