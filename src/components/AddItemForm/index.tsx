import React, { useCallback, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd'
import style from './index.module.css'

type AddItemFormPropsType = {
    onAddItem: (title: string) => Promise<any>
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

        const handleClickAddItem = async () => {
            if (title.trim() !== '') {
                try {
                    await onAddItem(title.trim())
                    setTitle('')
                } catch (error) {
                    setError(error.message)
                }
            } else {
                setError('Field is required')
            }
        }

        return (
            <Grid
                container
                direction='row'
                justify='center'
                alignItems='flex-end'
                className={style.gridContainer}
            >
                <TextField
                    disabled={disabled}
                    error={error === 'Field is required'}
                    id='standard-basic'
                    label='Write title'
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    className={error ? style.textField + ' error' : style.textField}
                />
                <Button
                    disabled={disabled}
                    size={'small'}
                    variant='contained'
                    color='secondary'
                    onClick={handleClickAddItem}
                    style={{ minWidth: 40, marginBottom: 1 }}
                >
                    <PostAddIcon fontSize={'small'} />
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Grid>
        )
    }
)
