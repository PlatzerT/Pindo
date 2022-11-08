import { ITodo } from "../models/ITodo";

export function jsonToTodo(json: any): ITodo {
  return {
    id: json.id,
    text: json.text,
    description: json.description,
    isChecked: json.isChecked,
  };
}

export function todoToJson(todo: ITodo) {
  return JSON.stringify(todo);
}
