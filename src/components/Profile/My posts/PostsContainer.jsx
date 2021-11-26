
import { connect } from 'react-redux';
import { addPostActionCreator,  } from '../../../Redux/profile-reducer'

import Posts from './Posts'




let mapStateToProps = (state) =>{
    return {
        newPostText : state.profilePage.newPostText,
        posts : state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return {
        addPost : (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps) (Posts);

export default PostsContainer;