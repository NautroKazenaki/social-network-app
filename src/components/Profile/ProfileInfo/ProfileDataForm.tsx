import s from './ProfileInfo.module.css'
import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, GetStringKeys, Input, Textarea } from "../../Common/FormsControl/FormsControl"
import { ProfileType } from '../../../types/types'
import React from 'react'

type OwnPropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, OwnPropsType > & OwnPropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button className={s.profileDataSaveButton}>
                    save
                </button>
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div className={s.profileInputDataForm}>
                <b className={s.profileDataLabel}>FullName:</b> {createField<ProfileTypeKeys>("FullName", "fullName", Input, [],)}
            </div>
            <div className={s.profileInputDataForm}>
                <b className={s.profileDataLabel}>Looking for a job:</b> {createField<ProfileTypeKeys>("", "lookingForAJob", Input, [], "checkbox")}
            </div>
            <div className={s.profileInputDataForm}>
                <b className={s.profileDataLabel}>My hardskills:</b> {createField<ProfileTypeKeys>("", "lookingForAJobDescription", Textarea, [])}
            </div>
            <div className={s.profileInputDataForm}>
                <b className={s.profileDataLabel}>About me:</b> {createField<ProfileTypeKeys>("", "aboutMe", Textarea, [])}
            </div>
            { <div className={s.profileInputDataForm}>
                <b className={s.profileDataLabel}>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}> 
                        <b className={s.profileDataLabel}>{key}:</b> {createField(key, "contacts." + key, Input, [],)} 
                    </div>
                })}
            </div> }
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, OwnPropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm