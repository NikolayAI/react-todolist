import { setAppStatus, setAppError } from '../redux/reducers/appReducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: Dispatch
) => {
    dispatch(setAppError(error.message ? error.message : 'some error occurred'))
    dispatch(setAppStatus('failed'))
}
