import s from './Post.module.css'
import React from 'react'
import { HeartOutlined} from '@ant-design/icons';

type OwnPropsType = {
    message: string
    likes: number
    id: number
}

const Post: React.FC<OwnPropsType> = (props) =>{
    return (
        <div className={s.post}>
            
            <img src='https://social-network.samuraijs.com/activecontent/images/users/19467/user.jpg?v=2' />
             {props.message}
            <div>
                <button className={s.likeButton}> 
                    {props.likes} <HeartOutlined />
                </button>
            </div>
        </div>
    )
}
export default Post;
