import { applyMiddleware, combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export type GlobalStateType = ReturnType<typeof rootReducer>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: Array<any>) => infer U;
}
  ? U
  : never;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
