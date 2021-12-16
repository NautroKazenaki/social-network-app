import Post from './Post/Post'
import s from './Posts.module.css'
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators'
import { createField, GetStringKeys, Textarea } from '../../Common/FormsControl/FormsControl';
import { PostType } from '../../../types/types';

const maxLength10 = maxLengthCreator(10)

export type MapStatePropsType = {
    posts: Array<PostType>
}
export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
const Posts:React.FC<MapStatePropsType & MapDispatchPropsType > = props => {

    let postsElements = props.posts
        .map(p => <Post key={p.id} id={p.id} message={p.message} likes={p.likes} />)

    let addNewPost = (values: NewPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.posts}>
            <h3>my posts </h3>
            <NewPostReduxForm onSubmit={addNewPost} />
            {postsElements}
        </div>
    )
};

const PostsMemorized = React.memo(Posts)

type OwnPropsType = {

}
export type NewPostFormValuesType = {
    newPostText: string
}

type NewPostFormValuesTypeKeys = GetStringKeys<NewPostFormValuesType>


const NewPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, OwnPropsType > & OwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<NewPostFormValuesTypeKeys>("start to write a new post", "newPostText", Textarea, [required, maxLength10], "", { className: s.input })}
        </div>

        <div>
            <button >Add post</button>
        </div>
    </form>
}

const NewPostReduxForm = reduxForm<NewPostFormValuesType, OwnPropsType>({
    form: "profileNewPostForm"
})(NewPostForm)
export default PostsMemorized;