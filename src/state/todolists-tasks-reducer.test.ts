import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TodolistType} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const todolist: TodolistType = {
        title: "new todolist",
        order: 0,
        addedDate: '',
        id: 'anyId',
    };

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
