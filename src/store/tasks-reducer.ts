import { TasksStateType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsApi,
  UpdateTaskModelType,
} from "../api/todolistsApi";
import { Dispatch } from "redux";
import { GlobalStateType } from "./store";
import { actions as appActions } from "./appReducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/errorUtils";

export type RemoveTasksActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

export type AddTasksActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

export type UpdateTaskActionType = {
  type: "UPDATE_TASK";
  todolistTaskId: string;
  todolistId: string;
  model: UpdateDomainTaskModelType;
};

export type SetTasksActionType = {
  type: "SET_TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
};

type ActionsTypes =
  | RemoveTasksActionType
  | AddTasksActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      const removeTasks = state[action.todolistId].filter(
        (t) => t.id !== action.taskId
      );
      return { ...state, [action.todolistId]: removeTasks };
    case "ADD-TASK":
      const newTask: TaskType = action.task;
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      };
    case "UPDATE_TASK":
      const changeTaskStatusState = state[action.todolistId];
      state[action.todolistId] = changeTaskStatusState.map((t) =>
        t.id === action.todolistTaskId ? { ...t, ...action.model } : t
      );
      return { ...state };
    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] };
    case "REMOVE-TODOLIST":
      const removeTodolistState = { ...state };
      delete removeTodolistState[action.id];
      return removeTodolistState;
    case "SET_TODOLISTS":
      const setTodolistsState = { ...state };
      action.todolists.forEach((tl) => {
        setTodolistsState[tl.id] = [];
      });
      return setTodolistsState;
    case "SET_TASKS":
      const setTasksState = { ...state };
      setTasksState[action.todolistId] = action.tasks;
      return setTasksState;
    default:
      return state;
  }
};

export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTasksActionType => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};

export const addTaskAC = (task: TaskType): AddTasksActionType => {
  return { type: "ADD-TASK", task };
};

export const updateTaskAC = (
  todolistId: string,
  todolistTaskId: string,
  model: UpdateDomainTaskModelType
): UpdateTaskActionType => {
  return { type: "UPDATE_TASK", todolistId, todolistTaskId, model };
};

export const setTasksAC = (
  tasks: Array<TaskType>,
  todolistId: string
): SetTasksActionType => {
  return { type: "SET_TASKS", tasks, todolistId };
};

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatusAC("loading"));
  todolistsApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(res.data.items, todolistId));
    dispatch(appActions.setAppStatusAC("succeeded"));
  });
};

export const removeTaskTC = (todolistId: string, taskId: string) => (
  dispatch: Dispatch<ActionsTypes>
) => {
  todolistsApi
    .deleteTask(todolistId, taskId)
    .then(
      (res) =>
        !res.data.resultCode && dispatch(removeTaskAC(todolistId, taskId))
    );
};

export const addTaskTC = (todolistId: string, title: string) => (
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppStatusAC("loading"));
  todolistsApi
    .createTask(todolistId, title)
    .then((res) => {
      if (!res.data.resultCode) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(appActions.setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => handleServerNetworkError(error, dispatch));
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export const updateTaskTC = (
  todolistId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType
) => (dispatch: Dispatch, getState: () => GlobalStateType) => {
  const state = getState();
  const task = state.tasks[todolistId].find((t) => t.id === taskId);
  if (!task) {
    console.warn("task not found in the store");
    return;
  }
  const apiModel: UpdateTaskModelType = {
    title: task.title,
    status: task.status,
    startDate: task.startDate,
    description: task.description,
    priority: task.priority,
    deadline: task.deadline,
    ...domainModel,
  };
  todolistsApi
    .updateTask(todolistId, taskId, apiModel)
    .then((res) => {
      if (!res.data.resultCode) {
        dispatch(updateTaskAC(todolistId, taskId, domainModel));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => handleServerNetworkError(error, dispatch));
};
