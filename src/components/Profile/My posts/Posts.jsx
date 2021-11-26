import Post from './Post/Post'
import s from './Posts.module.css'
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators'
import { Textarea } from '../../Common/FormsControl/FormsControl';

const maxLength10 = maxLengthCreator(10)

const Posts = React.memo(props => {

    let postsElements = props.posts
        .map(p => <Post id={p.id} message={p.message} likes={p.likes} />)

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.posts}>
            <h3>my posts </h3>
            <NewPostReduxForm onSubmit={addNewPost} />
            {postsElements}
        </div>
    )
});

const NewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name='newPostText' validate={ [required, maxLength10] } placeholder='start to write a new post'/>
        </div>

        <div>
            <button >Add post</button>
        </div>
    </form>
}

const NewPostReduxForm = reduxForm({
    form: "profileNewPostForm"
})(NewPostForm)
export default Posts;