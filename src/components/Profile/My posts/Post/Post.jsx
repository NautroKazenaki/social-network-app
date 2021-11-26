import s from './Post.module.css'
const Post = (props) =>{
    return (
        <div className={s.post}>
            
            <img src='https://sun9-68.userapi.com/impf/c851132/v851132376/1188a1/2LuEdvm-8sQ.jpg?size=1720x2160&quality=96&sign=2cd993cfc5b64e41790739f26db3a77f&type=album' />
             {props.message}
            <div>
                <button> 
                    {props.likes} likes
                </button>
            </div>
        </div>
    )
}
export default Post;
