import axios from 'axios'
import { UserType } from '../Redux/users-reducer';



export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "0491db90-8c07-4289-97b6-874164b29c91"
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


