
import s from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxlength10 = maxLengthCreator(10)


const Dialogs = (props) =>{
    let state= props.messagesPage;

    let dialogsElements = state.dialogs
    .map( d =>  <Dialog name={d.name} key={d.id} id={d.id}/>);


    let messagesElements = state.messages
.map( m => <Message id= {m.id} key={m.id} message={m.message}/>)

  
    let addNewMessage = (values) => {
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

const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
    <div> 
        <Field component={Textarea} name='newMessageText' placeholder='только начни писать' validate={[required, maxlength10]}/>
        
    </div>
    <div>
        <button>
            send
        </button>
    </div>
</form>
}

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;