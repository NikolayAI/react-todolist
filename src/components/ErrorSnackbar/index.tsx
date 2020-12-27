import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import * as appActions from '../../redux/reducers/appReducer'
import { selectError } from '../../redux/selectors/appSelectors'
import { useActions } from '../../utils/reduxUtils'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorSnackbar: React.FC = () => {
    const { setAppError } = useActions(appActions)
    const error = useSelector(selectError)
    const isOpen = error !== null

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return
        setAppError(null)
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}
