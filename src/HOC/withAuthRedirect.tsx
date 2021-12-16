import  React, {Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../Redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth : state.auth.isAuth,
})

type MapStatePropsType = {
    isAuth: boolean
}
type DispatchPropsType = {

}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>)  {
    const RedirectComponent: React.FC<DispatchPropsType & MapStatePropsType> = (props) => {
            let {isAuth, ...restProps} = props
            if (!isAuth) return <Redirect to="/login" />
            return <WrappedComponent {...restProps as WCP} />  
    }

    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, DispatchPropsType,WCP, AppStateType>(
        mapStateToPropsForRedirect, {}) (RedirectComponent)

    return ConnectedAuthRedirectComponent
}