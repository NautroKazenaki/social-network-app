import React from 'react'
import { Field } from 'redux-form';
import s from './FormsControl.module.css'

const FormControl = ({input, meta: {touched, error}, children,}) => {
    const hasError = touched && error;


    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '') }>
            <div>
                {children}
            </div>
            {hasError && <span> {error} </span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child,  ...restProps} = props;

    return (
       <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
    )
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;

    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
       
    )
}

export const createField = (placeholder, name, component, validators, type, props={}, text="") => (
    <div> 
    <Field className={s.input}  placeholder={placeholder} name={name} component={component} validate={validators} type={type} {...props}/> 
    <h4>{text}</h4>
    </div>
)