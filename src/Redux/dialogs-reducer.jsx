const SEND_MESSAGE = "SEND-MESSAGE";


let initialState = {
    messages: [
        { id: 1, message: "воняешь" },
        { id: 2, message: "приветствую вас, чемпион людей, чемпион зверей!" },
        { id: 3, message: "горы" },
        { id: 4, message: "завтра выйди в полную смену" },
    ],
    dialogs: [
        { id: 1, name: "Ульяна" },
        { id: 2, name: "Максим" },
        { id: 3, name: "Агнесса" },
        { id: 4, name: "Вонючая работа" },
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {


        case SEND_MESSAGE:


            let newMessage = {
                id: 5,
                message: action.newMessageText,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }

        default:
            return state;
    }

}

export const sendMessageActionCreator = (newMessageText) => {
    return {
        type: SEND_MESSAGE,
        newMessageText
    }
}


export default dialogsReducer;