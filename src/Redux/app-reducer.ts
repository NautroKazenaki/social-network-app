import {  InferActionsTypes } from './redux-store';
import { getAuthUserData } from "./auth-reducer";

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,

            }
        default:
            return state;
    }


}

export const actions = {
    initializedSuccess: () => {
        return {
            type: "SN/APP/INITIALIZED-SUCCESS",
        } as const
    }
}

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}



export default appReducer;