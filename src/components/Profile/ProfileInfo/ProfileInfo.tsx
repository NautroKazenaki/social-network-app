import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png.png'
import { ChangeEvent, useState } from 'react';
import ProfileDataFormReduxForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type OwnPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfileChanges: (saveProfile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<OwnPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfileChanges }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfileChanges(formData)
            .then(() => {
                setEditMode(false)
            })

    }
    return (
        <div className={s.avatarAndDescription}>
            <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
            {isOwner && <Input placeholder="Basic usage" type="file" onChange={onMainPhotoSelected} className={s.photoFileInput} />}
            {/* {isOwner && <input type="file" onChange={onMainPhotoSelected} />} */}
            {editMode ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={() => { setEditMode(true) }} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, activateEditMode }) => {
    return (
        <div>
            {isOwner &&
                <div>
                    <Tooltip title="edit profile">
                        <Button type="primary" shape="circle" icon={<EditOutlined /> } onClick={activateEditMode} />
                    </Tooltip>
                </div>}
            <div className={s.inputForm}>
                <b>FullName:</b>{profile.fullName}
            </div>
            <div className={s.inputForm}>
                <b>Looking for a job:</b>{profile.lookingForAJob ? " yes" : " no"}
            </div>
            {profile.lookingForAJob &&
                <div className={s.inputForm}>
                    <b>My hardskills:</b>{profile.lookingForAJobDescription}
                </div>}
            <div className={s.inputForm}>
                <b>About me:</b>{profile.aboutMe}
            </div>
            <div className={s.inputForm}>
                <b>Contacts:</b>{Object
                    .keys(profile.contacts)
                    .map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                    })}
            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}:</b> {contactValue}
        </div>
    )
}

export default ProfileInfo;