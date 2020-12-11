import { InferActionsTypes } from "./store";
import { Dispatch } from "redux";
import { actions as appActions } from "./appReducer";
import { authAPI, LoginParamsType } from "../api/todolistsApi";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/errorUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice;

export const authReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "todo/login/SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const actions = {
  setIsLoggedInAC: (value: boolean) =>
    ({ type: "todo/login/SET_IS_LOGGED_IN", value } as const),
};

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatusAC("loading"));
  authAPI
    .login(data)
    .then((data) => {
      if (!data.resultCode) {
        dispatch(actions.setIsLoggedInAC(true));
        dispatch(appActions.setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(data, dispatch);
      }
    })
    .catch((error) => handleServerNetworkError(error, dispatch));
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((data) => {
      if (!data.resultCode) {
        dispatch(actions.setIsLoggedInAC(false));
        dispatch(appActions.setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(data, dispatch);
      }
    })
    .catch((error) => handleServerNetworkError(error, dispatch));
};

type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
