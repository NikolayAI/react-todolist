import React, { useCallback, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd'

type AddItemFormPropsType = {
    onAddItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
    ({ onAddItem, disabled = false }) => {
        let [title, setTitle] = useState<string>('')
        let [error, setError] = useState<string>('')

        const onChangeHandler = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.currentTarget.value)
            },
            [setTitle]
        )

        const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            error && setError('')
            e.ctrlKey && e.key === 'Enter' && handleClickAddItem()
        }

        const handleClickAddItem = () => {
            title.trim() === '' ? setError('Field is required') : onAddItem(title.trim())
            setTitle('')
        }

        return (
            <Grid container direction='row' justify='center' alignItems='center'>
                <TextField
                    disabled={disabled}
                    error={error === 'Field is required'}
                    id='standard-basic'
                    label='Write title'
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    className={error ? 'error' : ''}
                />
                <Button
                    disabled={disabled}
                    size={'large'}
                    variant='contained'
                    color='secondary'
                    onClick={handleClickAddItem}
                >
                    <PostAddIcon />
                </Button>
                {error && <div className={'error-message'}>{error}</div>}
            </Grid>
        )
    }
)
