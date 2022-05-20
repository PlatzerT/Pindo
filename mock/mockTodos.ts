import {ITodo} from "../src/models/ITodo";
import {EPriority} from "../src/models/EPriority";

export const activeTodos: ITodo[] = [
    {
        id: 1,
        text: "Walk the dog",
        priority: EPriority.MEDIUM,
        deadline: new Date("2022-05-20"),
        isDeleted: false,
    },
    {
        id: 2,
        text: "Wash the dishes",
        priority: EPriority.LOW,
        deadline: null,
        isDeleted: false,
    },
    {
        id: 3,
        text: "Study for maths",
        priority: EPriority.HIGH,
        deadline: new Date("1995-12-17T03:24:00"),
        isDeleted: false,
    },
];

export const deletedTodos: ITodo[] = [
    {
        id: 4,
        text: "Study for chemistry",
        priority: EPriority.HIGH,
        deadline: new Date("1995-12-17T03:24:00"),
        isDeleted: true,
    },
];