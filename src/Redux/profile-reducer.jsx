import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-POST"

let initialState = {
    posts: [
        { id: 1, message: "А не всё это", likes: 50 },
        { id: 2, message: "Щас бы в доту", likes: 0 },
    ],
    newPostText: '@Nautro_Kazenaki',
    profile: null,
    status: ''

};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:

            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 1,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.id)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }


}
export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}


export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)

    dispatch(setUserProfile(response.data))
}

export const setUserStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(setUserStatus(response.data))

}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export default profileReducer;