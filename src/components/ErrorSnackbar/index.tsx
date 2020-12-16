import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { setAppError } from '../../redux/reducers/appReducer'
import { getError } from '../../redux/selectors/appSelectors'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorSnackbar: React.FC = () => {
    const dispatch = useDispatch()
    const error = useSelector(getError)
    const isOpen = error !== null

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setAppError(null))
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}
