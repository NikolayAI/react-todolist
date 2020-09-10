import React, {useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')
        e.ctrlKey && e.key === 'Enter' && addItem()
    }
    const addItem = () => {
        title.trim() === '' ? setError('Field is required') : props.addItem(title.trim())
        setTitle('')
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
            <TextField error={error === 'Field is required'}
                id="standard-basic"
                label="Write title"
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
                className={error ? 'error' : ''}/>
            <Button size={"large"} variant="contained" color="secondary" onClick={addItem}><PostAddIcon/></Button>
            {error && <div className={'error-message'}>{error}</div>}
        </Grid>
    )
}