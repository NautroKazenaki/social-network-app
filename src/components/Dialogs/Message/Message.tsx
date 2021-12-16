import s from './Message.module.css'
import React from 'react'

type OnwPropsType = {
    message: string
    id: number
}

const Message: React.FC<OnwPropsType> = (props) =>{
    return(
        <div className={s.message}>{props.message}</div>
    )
}

export default Message;