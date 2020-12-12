import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStateType } from '../../store/store'
import { actions } from '../../store/appReducer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorSnackbar: React.FC = () => {
  const dispatch = useDispatch()
  const error = useSelector<GlobalStateType, string | null>(
    (state) => state.app.error
  )
  const isOpen = error !== null

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(actions.setAppErrorAC(null))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  )
}
