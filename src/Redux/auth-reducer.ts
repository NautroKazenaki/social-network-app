import { InferActionsTypes, BaseThunkType } from './redux-store';

import { Action, AnyAction } from "redux";
import { FormAction, stopSubmit } from "redux-form";
import {  ResultCodeEnum} from "../api/api";
import {authAPI} from "../api/auth-api"
import {securityAPI } from "../api/security-api"

export type InitialStateType = {
    id: number | null
    email: string | null,
    login: string | null,
    isFetching: boolean 
    isAuth: boolean,
    captchaUrl:string | null, 
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null, //if null, then captcha is not required

};

const authReducer = (state = initialState, action:ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/AUTH/SET-USER-DATA":
        case "SN/AUTH/GET-CAPTCHA-URL-SUCCESS":
            return {
                ...state,
                ...action.payload,
                // isAuth: true

            }
        default:
            return state;
    }


}
type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType | FormAction>
const actions = {
    setAuthUserData: (id:number | null, email:string | null, login:string | null, isAuth:boolean) => {
        return {
            type: "SN/AUTH/SET-USER-DATA",
            payload: {id, email, login, isAuth} 
        } as const
    },
    
    getCaptchaUrlSuccess: (captchaUrl:string) => {
        return {
            type: "SN/AUTH/GET-CAPTCHA-URL-SUCCESS",
            payload: {
                captchaUrl
            } as const
        }
    }
}




export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        //success get auth data
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodeEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}


export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.url 
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;