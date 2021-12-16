
import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';
import s from './FormsControl.module.css'


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl:React.FC<FormControlPropsType> = ({ meta: {touched, error}, children}) => {
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

export const Textarea:React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,   ...restProps} = props;

    return (
       <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
    )
}
export const Input:React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,  ...restProps} = props;

    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
       
    )
}



export function createField<FormKeysType extends string>(placeholder: string | undefined, 
    name: FormKeysType, 
    component: React.FC<WrappedFieldProps>, 
    validators: Array<FieldValidatorType>, 
    type?:string, 
    props={} , 
    text="") {
        return<div> 
        <Field className={s.input}  placeholder={placeholder} name={name} component={component} validate={validators} type={type} {...props}/> 
        <h4>{text}</h4>
        </div>
    }
      
export type GetStringKeys<T> = Extract< keyof T, string>