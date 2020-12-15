import React, { useState } from 'react'

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
    ({ title, onChange }) => {
        let [editMode, setEditMode] = useState(false)
        let [editableTitle, setEditableTitle] = useState('')

        const offEditModeHandler = () => {
            setEditMode(false)
            onChange(editableTitle)
        }

        const offKeyPressEditModeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                setEditMode(false)
                onChange(editableTitle)
            }
        }

        const onEditModeHandler = () => {
            setEditableTitle(title)
            setEditMode(true)
        }

        const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEditableTitle(e.currentTarget.value)
        }

        return editMode ? (
            <input
                autoFocus
                onBlur={offEditModeHandler}
                onKeyPress={offKeyPressEditModeHandler}
                value={editableTitle}
                onChange={onChangeTitleHandler}
            />
        ) : (
            <span style={{ wordWrap: 'break-word' }} onDoubleClick={onEditModeHandler}>
                {title}
            </span>
        )
    }
)
