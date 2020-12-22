import React, { useState } from 'react'
import style from './index.module.css'

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
    fontSize?: number
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
    ({ title, onChange, fontSize }) => {
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
                className={style.editableInput}
                autoFocus
                onBlur={offEditModeHandler}
                onKeyPress={offKeyPressEditModeHandler}
                value={editableTitle}
                onChange={onChangeTitleHandler}
            />
        ) : (
            <span
                className={style.editableSpan}
                style={{ fontSize: fontSize }}
                onDoubleClick={onEditModeHandler}
            >
                {title}
            </span>
        )
    }
)
