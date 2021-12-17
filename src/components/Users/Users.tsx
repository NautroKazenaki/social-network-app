import React, { useEffect } from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {FilterType, requestUsers, follow, unfollow} from './../../Redux/users-reducer'
import { UsersSearchForm } from './UsersSeachForm'
import { useDispatch, useSelector } from 'react-redux'
import { getPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/users-selectors'
import { useHistory } from 'react-router-dom'
import  * as queryString from 'querystring'

type PropsType = { 
}

type QueryParamsType = {term: string, page: string, friend: string}
export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const page = useSelector(getPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        // const params = new URLSearchParams(search)
        // const parsedTerm = params.get("term")
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = page
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch(parsed.friend) {
            case "null": 
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false": 
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        // if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false}

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(() => {
        history.push({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${page}`
        })
    }, [filter, page])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const _follow = (userId:number) => {
        dispatch(follow(userId))
    }
    const _unfollow = (userId:number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged = {onFilterChanged} />
            <Paginator page={page} onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} pageSize={pageSize} />
            <div>
                {
                    users.map(u => <User
                        user={u}
                        key={u.id}
                        followingInProgress={followingInProgress}
                        unfollow={_unfollow}
                        follow={_follow} />
                    )
                }
            </div>
        </div>
    )
}

