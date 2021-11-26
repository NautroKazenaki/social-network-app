import { sendMessageActionCreator } from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'

let mapStateToProps = (state) =>{
    return {
        messagesPage : state.messagesPage,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return { 
        sendMessage : (newMessageText) => {
            dispatch(sendMessageActionCreator(newMessageText));
        },
    }
}


export default compose(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)