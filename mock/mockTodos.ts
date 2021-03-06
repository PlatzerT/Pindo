import {ITodo} from "../src/models/ITodo";

export const activeTodos: ITodo[] = [
    {
        id: 1,
        text: "Walk the dog",
        priority: "medium",
        date: new Date("2022-05-20"),
        isDeleted: false,
    },
    {
        id: 2,
        text: "Wash the dishes",
        priority: "low",
        date: null,
        isDeleted: false,
    },
    {
        id: 3,
        text: "Study for maths",
        priority: "high",
        date: new Date("2022-05-29"),
        isDeleted: false,
    },
];

export const deletedTodos: ITodo[] = [
    {
        id: 4,
        text: "Study for chemistry",
        priority: "high",
        date: new Date("1995-12-17"),
        isDeleted: true,
    },
];