import React from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
const Users = ({ page, onPageChanged, totalItemsCount, pageSize, users, ...props }) => {



    return (

        <div>
            <Paginator page={page} onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} pageSize={pageSize} />
            <div>
                {
                    users.map(u => <User
                        user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow} />
                    )
                }
            </div>

        </div>
    )
}

export default Users