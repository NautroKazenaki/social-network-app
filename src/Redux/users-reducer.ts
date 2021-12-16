import { APIResponseType } from './../api/api';
import { AppStateType, InferActionsTypes, BaseThunkType } from './redux-store';
import { PhotosType } from '../types/types';
import { usersAPI } from "../api/users-api";
import {updateObjectInArray} from "../utils/object-helpers"
import { Dispatch } from 'redux';



export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UserType = { 
    id: number
    name: string    
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    page: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }

};

const usersReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",{followed: true} )
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;

                // })

            }

        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",{followed: false} )
            }
        case 'SN/USERS/SET_USERS': {
            return {
                ...state, users: action.users 
            } 
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state, page: action.page
            }
        }
        case 'SN/USERS/SET_FILTER': {
            return {
                ...state, filter: action.payload
            }
        }
        case 'SN/USERS/SET_USERS_TOTAL_COUNT': {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }


}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId:number) => {
        return {
            type: 'SN/USERS/FOLLOW',
            userId
        } as const
    } ,
    
    unfollowSuccess: (userId:number) => {
        return {
            type: 'SN/USERS/UNFOLLOW',
            userId
        } as const
    },
    
    setUsers: (users:Array<UserType>) => {
        return {
            type: 'SN/USERS/SET_USERS',
            users
        } as const
    },
    
    setCurrentPage: (page:number) => {
        return {
            type: 'SN/USERS/SET_CURRENT_PAGE',
            page
        } as const
    },
    setFilter: (filter: FilterType) => {
        return {
            type: 'SN/USERS/SET_FILTER',
            payload: filter
        } as const
    },
    
    setUsersTotalCount: (totalUsersCount:number) => {
        return {
            type: 'SN/USERS/SET_USERS_TOTAL_COUNT',
            count: totalUsersCount
        } as const
    },
    
    toggleIsFetching: (isFetching:boolean) => {
        return {
            type: 'SN/USERS/TOGGLE_IS_FETCHING',
            isFetching
        }as const
    },
    
    toggleFollowingInProgress: (isFetching:boolean, userId:number) => {
        return {
            type: 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS',
            isFetching, userId,
        } as const
    },
}



type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page:number, pageSize:number, filter: FilterType): ThunkType => {
    return async (dispatch:DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount));

    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, 
    apiMethod:( userId: number) => Promise<APIResponseType>, 
    actionCreator:(userId:number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId:number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export default usersReducer;