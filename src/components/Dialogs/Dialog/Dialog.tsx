import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css'
import React from 'react'

type OwnPropsType = {
    id: number
    name: string
}

const Dialog: React.FC<OwnPropsType> = (props) =>{
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ` ` + s.active}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog;