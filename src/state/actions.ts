import {useDispatch as _useDispatch} from "react-redux";
import {ActionsTypes} from "./todolists-reducer";

export const useDispatch = () => {
    const dispatch = _useDispatch()
    return (ac: ActionsTypes) => dispatch((ac))
}