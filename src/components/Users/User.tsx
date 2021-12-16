import React from 'react'
import s from './Users.module.css'
import userPhoto from './../../assets/images/user.png.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../Redux/users-reducer'

type OwnPropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId:number) => void
    unfollow: (userId:number) => void
}

const User:React.FC<OwnPropsType> = ({ user, followingInProgress, unfollow, follow}) => {

    return (
        <div>
            <span>
                <div >
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userAvatar} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user.id)}
                            onClick={() => {unfollow(user.id) }}> Unfollow </button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {follow(user.id) }}> Follow </button>}
                </div>
            </span>
            <span>
                <span>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.status}
                    </div>
                </span>
                <span>
                    <div>
                        {"user.location.country"}
                        {"user.location.city"}
                    </div>
                </span>
            </span>
        </div>)
}




export default User