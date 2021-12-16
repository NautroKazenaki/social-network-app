import ProfileInfo from './ProfileInfo/ProfileInfo'
import React from 'react'
import PostsContainer from './My posts/PostsContainer'
import Preloader from '../Common/Preloader/Preloader'
import { ProfileType } from '../../types/types'

type OwnPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file:File) => void
    saveProfileChanges: (saveProfile:ProfileType) => Promise<any>
}

const Profile: React.FC<OwnPropsType> = (props) =>{

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            {/* <div className={s.socialHeader}>
                <img src='https://borutofan.ru/img/jpg/27.jpg'/>
            </div> */}
            <ProfileInfo profile={props.profile} 
                status={props.status} 
                updateStatus={props.updateStatus} 
                isOwner={props.isOwner} 
                savePhoto={props.savePhoto}
                saveProfileChanges={props.saveProfileChanges}/>
            <PostsContainer  />
        </div>
    )
}
export default Profile;