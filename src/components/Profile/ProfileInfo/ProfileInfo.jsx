import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
const ProfileInfo = ({profile,status, updateStatus }) =>{

    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={s.avatarAndDescription}>
            <img src={profile.photos.large} />
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
};
export default ProfileInfo;