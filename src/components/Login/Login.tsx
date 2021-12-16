import React from 'react'
import s from './Login.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, GetStringKeys, Input} from '../Common/FormsControl/FormsControl'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import s2 from './../Common/FormsControl/FormsControl.module.css'
import { AppStateType } from '../../Redux/redux-store'

const maxLength32 = maxLengthCreator(32)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return <form onSubmit={handleSubmit}>

        <div>
            {createField<LoginFormValuesTypeKeys>("email", "email", Input, [required, maxLength32], "userName", { className: s.input })}
            {createField<LoginFormValuesTypeKeys>("password", "password", Input, [required, maxLength32], "password", { className: s.input },)}
            {createField<LoginFormValuesTypeKeys>("", "rememberMe", Input, [], "checkbox", { className: s.checkbox }, "remember me")}
        </div>
        { captchaUrl && <img src={captchaUrl} />}
        { captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", Input, [required])}
        {error && <div className={s2.formSummaryError}>
            {error}
        </div>}
        <div>
            <button className={s.button}> Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)



export type LoginFormValuesType = {
    email:string
    password: string
    rememberMe: boolean
    captcha: string| null
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()
    

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1> login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
