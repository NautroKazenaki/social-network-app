import { actions } from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { AppStateType } from '../../Redux/redux-store'

let mapStateToProps = (state: AppStateType) =>{
    return {
        messagesPage : state.messagesPage,
    }
}

export default compose<React.ComponentType>(
    connect (mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)