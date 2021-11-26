import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './My posts/Posts'
import s from './Profile.module.css'
import PostsContainer from './My posts/PostsContainer'
import Preloader from '../Common/Preloader/Preloader'

const Profile = (props) =>{

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            {/* <div className={s.socialHeader}>
                <img src='https://borutofan.ru/img/jpg/27.jpg'/>
            </div> */}
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <PostsContainer  />
        </div>
    )
}
export default Profile;