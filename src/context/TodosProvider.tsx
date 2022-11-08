import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ITodo } from "../models/ITodo";
import {
  getAllTodos,
  removeTodoById,
  removeTodos,
  storeTodo,
} from "../services/storage-service";
import { jsonToTodo } from "../utils/todoUtils";

const TodosContext = createContext(null);
const initialState = [];

export function useTodos() {
  return useContext(TodosContext);
}

interface Props {
  children?: ReactNode;
}

export default function TodosProvider({ children }: Props) {
  const [todos, setTodos] = useState(initialState);

  function getDeletedTodos() {
    return todos.filter((todo: ITodo) => todo.isChecked);
  }

  function getActiveTodos() {
    return todos.filter((todo: ITodo) => !todo.isChecked);
  }

  function saveTodo(todo: ITodo) {
    return storeTodo(todo).then(() => {
      fetchTodos();
    });
  }

  function checkTodo(todo: ITodo) {
    todo.isChecked = true;
    return storeTodo(todo).then(() => {
      fetchTodos();
    });
  }

  function restoreTodo(todo: ITodo) {
    todo.isChecked = false;
    return storeTodo(todo).then(() => {
      fetchTodos();
    });
  }

  function removeTodo(todo: ITodo) {
    return removeTodoById(todo.id).then(() => {
      fetchTodos();
    });
  }

  function clearHistory() {
    return removeTodos(getDeletedTodos()).then(() => {
      fetchTodos();
    });
  }

  function fetchTodos() {
    getAllTodos().then((fetchedTodos) => {
      let parsedTodos = fetchedTodos.map((t) => jsonToTodo(t));
      setTodos(parsedTodos);
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const value = {
    todos,
    getDeletedTodos,
    getActiveTodos,
    saveTodo,
    checkTodo,
    restoreTodo,
    removeTodo,
    clearTodos: clearHistory,
  };
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
