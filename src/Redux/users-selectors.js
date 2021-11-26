import { createSelector } from "reselect";


const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getPage = (state) => {
    return state.usersPage.page;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true)
    })