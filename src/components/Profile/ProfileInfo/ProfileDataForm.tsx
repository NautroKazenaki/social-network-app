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
                <button>
                    save
                </button>
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>FullName:</b> {createField<ProfileTypeKeys>("FullName", "fullName", Input, [],)}
            </div>
            <div>
                <b>Looking for a job:</b> {createField<ProfileTypeKeys>("", "lookingForAJob", Input, [], "checkbox")}
            </div>
            <div>
                <b>My hardskills:</b> {createField<ProfileTypeKeys>("", "lookingForAJobDescription", Textarea, [])}
            </div>
            <div>
                <b>About me:</b> {createField<ProfileTypeKeys>("", "aboutMe", Textarea, [])}
            </div>
            { <div>
                <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}> 
                        <b>{key}:</b> {createField(key, "contacts." + key, Input, [],)} 
                    </div>
                })}
            </div> }
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, OwnPropsType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm