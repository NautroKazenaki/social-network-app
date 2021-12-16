import axios from 'axios'
import { UserType } from '../Redux/users-reducer';



export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "9a4a446d-7134-4fbe-a5f0-1c43675f5d88"
    }
})

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10

}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}


