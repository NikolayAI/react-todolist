import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};

type ActionType = {
  type: string;
  [key: string]: any;
};

const userSlice = createSlice;

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT-AGE":
      return { ...state, age: state.age + 1 };
    case "INCREMENT-CHILDREN-COUNT":
      return { ...state, childrenCount: state.childrenCount + 1 };
    case "CHANGE-NAME":
      return { ...state, name: (state.name = action.newName) };
    default:
      throw new Error("I don't understand this type");
  }
};
