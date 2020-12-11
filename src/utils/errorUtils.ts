import { actions } from "../state/appReducer";
import { ResponseType } from "../api/todolistsApi";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(actions.setAppErrorAC(data.messages[0]));
  } else {
    dispatch(actions.setAppErrorAC("some error occurred"));
  }
  dispatch(actions.setAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(
    actions.setAppErrorAC(error.message ? error.message : "some error occurred")
  );
  dispatch(actions.setAppStatusAC("failed"));
};
