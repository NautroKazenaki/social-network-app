import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css'
import React from 'react'
import { Avatar, Button, Col, Menu, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserLogin, selectIsAuth } from '../../Redux/auth-selectors'
import { logout } from '../../Redux/auth-reducer'

export type MapStatePropsType = {

}



export const AppHeader: React.FC<MapStatePropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
                    </Menu>
                </Col>


                {isAuth
                    ? <><Col span={1}>
                            <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <NavLink to={'/login'}>
                                Login
                            </NavLink>
                        </Button>
                    </Col>
                }

            </Row>

        </Header>
        // <header className={s.header}>
        //     <img src='http://www.demo.crosstechno.com/assets/Uploads/_resampled/SetHeight77-Your-Logo.png' />

        //     <div className={s.loginBlock}>
        //         {props.isAuth 
        //             ? <div> {props.login} - <button onClick={props.logout}>log out</button></div>
        //             : <NavLink to={'/login'}>
        //             Login
        //         </NavLink>}
        //     </div>
        // </header >
    )
}
