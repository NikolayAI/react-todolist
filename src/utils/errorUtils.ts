import { setAppError, setAppStatus } from '../redux/reducers/appReducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'
import { AxiosError } from 'axios'

export const handleServerAppError = <D>(
    data: ResponseType<D>,
    dispatch: Dispatch,
    showError = true
) => {
    if (showError) {
        dispatch(setAppError(data.messages.length ? data.messages[0] : 'Some error'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (
    error: AxiosError,
    dispatch: Dispatch,
    showError = true
) => {
    if (showError) {
        dispatch(setAppError(error.message ? error.message : 'some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleAsyncServerAppError = <D>(
    data: ResponseType<D>,
    dispatch: Dispatch,
    rejectWithValue: (value: any) => any,
    showError = true
) => {
    if (showError) {
        dispatch(setAppError(data.messages.length ? data.messages[0] : 'Some error'))
    }
    dispatch(setAppStatus('failed'))

    return rejectWithValue({ errors: data.messages, fieldsErrors: data.fieldsErrors })
}

export const handleAsyncServerNetworkError = (
    error: AxiosError,
    dispatch: Dispatch,
    rejectWithValue: (value: any) => any,
    showError = true
) => {
    if (showError) {
        dispatch(setAppError(error.message ? error.message : 'some error occurred'))
    }
    dispatch(setAppStatus('failed'))

    return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
}
