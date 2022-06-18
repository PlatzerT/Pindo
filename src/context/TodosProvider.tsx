import React, { createContext, useContext, useEffect, useState } from 'react';
import {getAllTodos, removeTodos, removeTodoById, storeTodo} from "../services/storage-service";
import {ITodo} from "../models/ITodo";
import {jsonToTodo} from "../utils/todoUtils";

const TodosContext = createContext(null);
const initialState = [];

export function useTodos() {
    return useContext(TodosContext);
}

export default function TodosProvider({ children }) {
    const [todos, setTodos] = useState(initialState);

    function getDeletedTodos() {
        return todos.filter(todo => todo.isDeleted)
    }

    function getActiveTodos() {
        return todos.filter(todo => !todo.isDeleted)
    }

    function saveTodo(todo: ITodo) {
        return storeTodo(todo).then(() => {
            fetchTodos()
        })
    }

    function deleteTodo(todo: ITodo) {
        todo.isDeleted = true;
        return storeTodo(todo).then(() => {
            fetchTodos()
        })
    }

    function restoreTodo(todo: ITodo) {
        todo.isDeleted = false;
        return storeTodo(todo).then(() => {
            fetchTodos()
        })
    }

    function clearHistory() {
        return removeTodos(getDeletedTodos()).then(() => {
            fetchTodos()
        })
    }

    function fetchTodos() {
        getAllTodos().then(fetchedTodos => {
            let parsedTodos = fetchedTodos.map(t => jsonToTodo(t))
            setTodos(parsedTodos)
        });
    }

    useEffect(() => {
        fetchTodos()
    }, []);

    const value = {
        todos,
        getDeletedTodos,
        getActiveTodos,
        saveTodo,
        deleteTodo,
        restoreTodo,
        clearTodos: clearHistory
    };
    return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}
