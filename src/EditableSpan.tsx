import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const offEditModeHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const offKeyPressEditModeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && setEditMode(false)
        props.onChange(title)
    }
    const onEditModeHandler = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (editMode
            ? <input autoFocus onBlur={offEditModeHandler}
                     onKeyPress={offKeyPressEditModeHandler}
                     value={title}
                     onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={onEditModeHandler}>{props.title}</span>
    )
}