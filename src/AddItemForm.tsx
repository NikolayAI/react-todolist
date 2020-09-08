import React, {useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')
        e.ctrlKey && e.key === 'Enter' && addTask()
    }
    const addTask = () => {
        title.trim() === '' ? setError('Field is required') : props.addItem(title.trim())
        setTitle('')
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}