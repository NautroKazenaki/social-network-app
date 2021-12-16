import React, { useEffect } from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {FilterType, requestUsers, follow, unfollow} from './../../Redux/users-reducer'
import { UsersSearchForm } from './UsersSeachForm'
import { useDispatch, useSelector } from 'react-redux'
import { getPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/users-selectors'

type PropsType = { 
}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const page = useSelector(getPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(page, pageSize, filter));
    }, [])

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

