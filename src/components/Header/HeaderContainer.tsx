import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from '../../Redux/auth-reducer'
import { AppStateType } from '../../Redux/redux-store';
import {MapStatePropsType, MapDispatchPropsType} from './Header'


class HeaderContainer extends React.Component<MapStatePropsType& MapDispatchPropsType>{

        render() {
            return <Header {...this.props} />
        }
}


const mapStateToProps = (state: AppStateType) =>{
    return{
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, {},AppStateType>(mapStateToProps, {logout}) (HeaderContainer);