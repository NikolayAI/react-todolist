import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
} from '@material-ui/core'
import { FormikHelpers, useFormik } from 'formik'
import { login } from '../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getIsLoggedIn } from '../../redux/selectors/authSelector'
import { useAppDispatch } from '../../redux/store'

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)

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
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
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
