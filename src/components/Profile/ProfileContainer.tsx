import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfileChanges} from '../../Redux/profile-reducer'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { compose } from 'redux'
import { AppStateType } from '../../Redux/redux-store'
import { ProfileType } from '../../types/types'

type MapStatePropsType = ReturnType <typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status:string) => void 
    savePhoto: (file: File) => void 
    saveProfileChanges: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string 
}
type AllPropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<AllPropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (!userId) {
           console.error("ID should exists in URI params or State ('authorizedUserId')")
        } else {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }
    
    componentDidMount() {
      this.refreshProfile()
       
    }

    componentDidUpdate(prevProps: AllPropsType, prevState: AllPropsType) {
        if (this.props.match.params.userId !=prevProps.match.params.userId) {
            this.refreshProfile()
            } 
    }

    render() {
        return (
            <Profile {...this.props} 
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect (mapStateToProps,{getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfileChanges} ),
    withRouter,
    //withAuthRedirect
) (ProfileContainer)

// let authRedirectContainer = withAuthRedirect(ProfileContainer)
    

// let WithUrlDataContainerComponent = withRouter(authRedirectContainer)

// export default connect (mapStateToProps,{getUserProfile} ) (WithUrlDataContainerComponent);
