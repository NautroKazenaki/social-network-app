import s from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../Common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import React from 'react';
import { InitialStateType } from '../../Redux/dialogs-reducer';

const maxlength10 = maxLengthCreator(10)

type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
}

type MapStatePropsType = {

}

type MapDispatchPropsType = {

}

export type AddNewMessageFormType = {
    newMessageText: string
}
type AddNewMessageFormTypeKeys = Extract< keyof AddNewMessageFormType, string>


const Dialogs: React.FC<PropsType> = (props) =>{
    let state= props.messagesPage;

    let dialogsElements = state.dialogs
    .map( d =>  <Dialog name={d.name} key={d.id} id={d.id}/>);


    let messagesElements = state.messages
.map( m => <Message id= {m.id} key={m.id} message={m.message}/>)

  
    let addNewMessage = (values: AddNewMessageFormType) => {
        props.sendMessage(values.newMessageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
                
                
            </div>
            <div className={s.messages}>
                <div>
                   {messagesElements}
                   <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div> 
            </div>
            
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<AddNewMessageFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
    <div> 
        {createField<AddNewMessageFormTypeKeys>("только начни писать", "newMessageText", Textarea, [required, maxlength10], "userName", { className: s.input })}
    </div>
    <div>
        <button>
            send
        </button>
    </div>
</form>
}

const AddMessageReduxForm = reduxForm<AddNewMessageFormType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;