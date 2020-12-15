import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { loginTC } from '../../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootStateType } from '../../redux/reducers/roootReducer'

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<RootStateType>((state) => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return { email: 'email is required' }
            }
            if (!values.password) {
                return { password: 'password is required' }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) return <Redirect to={'/'} />

    return (
        <Grid container justify='center'>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a
                                    href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'}
                                    rel='noopener noreferrer'
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label='email'
                                margin='normal'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                            <TextField
                                type='password'
                                label='password'
                                margin='normal'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
