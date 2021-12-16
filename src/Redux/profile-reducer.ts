import { ThunkType } from './auth-reducer';
import {  InferActionsTypes } from './redux-store';
import { stopSubmit } from "redux-form";
import { profileAPI  } from "../api/profile-api";
import { PhotosType, PostType, ProfileType } from "../types/types";

export type InitialStateType = typeof initialState
let initialState = {
    posts: [
        { id: 1, message: "А не всё это", likes: 50 },
        { id: 2, message: "Щас бы в доту", likes: 0 },
    ] as Array<PostType>,
    newPostText: '@Nautro_Kazenaki',
    profile: null as ProfileType | null,
    status: '',

};

const profileReducer = (state = initialState, action:ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/PROFILE/ADD-POST":

            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 1,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case "SN/PROFILE/DELETE-POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.id)
            }
        case "SN/PROFILE/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SN/PROFILE/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SN/PROFILE/SAVE-PHOTO-SUCCESS":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        default:
            return state;
    }


}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText:string)=> {
        return {
            type: "SN/PROFILE/ADD-POST",
            newPostText
        } as const
    },
    setUserProfile: (profile:ProfileType) => {
        return {
            type: "SN/PROFILE/SET-USER-PROFILE",
            profile
        } as const
    },
   
    setUserStatus: (status:string)=> {
        return {
            type: "SN/PROFILE/SET-STATUS",
            status
        } as const
    },
    deletePost: (id:number) => {
        return {
            type: "SN/PROFILE/DELETE-POST",
            id
        } as const
    },
    savePhotoSuccess:  (photos:PhotosType)=> {
        return {
            type: "SN/PROFILE/SAVE-PHOTO-SUCCESS",
            photos
        } as const
    },
}

export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)

    dispatch(actions.setUserProfile(response))
    
}

export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(actions.setUserStatus(response))

}
export const updateStatus = (status:string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
}
export const savePhoto = (file:File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data))
    }
}
export const saveProfileChanges = (profile:ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfileChanges(profile)

    if (response.resultCode === 0) {
        if(userId !=null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}))
        return Promise.reject(response.messages[0])
    }
}

export default profileReducer;