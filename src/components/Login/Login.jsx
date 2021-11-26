import React from 'react'
import s from './Login.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../Common/FormsControl/FormsControl'
import { connect } from 'react-redux'
import { login } from './../../Redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import s2 from './../Common/FormsControl/FormsControl.module.css'

const maxLength32 = maxLengthCreator(32)



const LoginForm = ({ handleSubmit, error, }) => {
    return <form onSubmit={handleSubmit}>

        <div>
            {createField("email", "email", Input, [required, maxLength32], "userName", { className: s.input })}
            {createField("password", "password", Input, [required, maxLength32], "password", { className: s.input },)}
            {createField("", "rememberMe", Input, [], "checkbox", { className: s.checkbox }, "remember me")}
        </div>
        {error && <div className={s2.formSummaryError}>
            {error}
        </div>}
        <div>
            <button className={s.button} type='submitButton'> Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1> login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { login })(Login)