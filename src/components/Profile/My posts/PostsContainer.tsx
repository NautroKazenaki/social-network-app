import { connect } from 'react-redux';
import { actions  } from '../../../Redux/profile-reducer'
import { AppStateType } from '../../../Redux/redux-store';
import Posts, { MapDispatchPropsType, MapStatePropsType } from './Posts'

let mapStateToProps = (state: AppStateType) =>{
    return {
        newPostText : state.profilePage.newPostText,
        posts : state.profilePage.posts,
    }
}

const PostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost:actions.addPostActionCreator }) (Posts);

export default PostsContainer;