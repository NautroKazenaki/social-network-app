import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import React from 'react'

export type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    
}

export type MapDispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapStatePropsType & MapDispatchPropsType > = (props) => {
    return (
        <header className={s.header}>
            <img src='http://www.demo.crosstechno.com/assets/Uploads/_resampled/SetHeight77-Your-Logo.png' />

            <div className={s.loginBlock}>
                {props.isAuth 
                    ? <div> {props.login} - <button onClick={props.logout}>log out</button></div>
                    : <NavLink to={'/login'}>
                    Login
                </NavLink>}
            </div>
        </header >
    )
}
export default Header;