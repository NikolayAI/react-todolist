import { appActions } from '../redux/reducers/appReducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError(data.messages[0]))
    } else {
        dispatch(appActions.setAppError('some error occurred'))
    }
    dispatch(appActions.setAppStatus('failed'))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: Dispatch
) => {
    dispatch(
        appActions.setAppError(error.message ? error.message : 'some error occurred')
    )
    dispatch(appActions.setAppStatus('failed'))
}
