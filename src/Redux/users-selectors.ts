import { AppStateType } from './redux-store';
import { createSelector } from "reselect";


const getUsersSelector = (state:AppStateType) => {
    return state.usersPage.users;
}

export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getPage = (state:AppStateType) => {
    return state.usersPage.page;
}
export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress;
}
export const getUsersFilter = (state:AppStateType) => {
    return state.usersPage.filter;
}

export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true)
    })

