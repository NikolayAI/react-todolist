import { actions } from '../redux/reducers/appReducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(actions.setAppErrorAC(data.messages[0]))
    } else {
        dispatch(actions.setAppErrorAC('some error occurred'))
    }
    dispatch(actions.setAppStatusAC('failed'))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: Dispatch
) => {
    dispatch(actions.setAppErrorAC(error.message ? error.message : 'some error occurred'))
    dispatch(actions.setAppStatusAC('failed'))
}
