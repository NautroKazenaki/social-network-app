import { InferActionsTypes } from './redux-store';


type MessageType = {
    id: number
    message: string
}

type DialogType = {
    id: number
    name: string
}

let initialState = {
    messages: [
        { id: 1, message: "воняешь" },
        { id: 2, message: "приветствую вас, чемпион людей, чемпион зверей!" },
        { id: 3, message: "горы" },
        { id: 4, message: "завтра выйди в полную смену" },
    ] as Array<MessageType>,
    dialogs: [
        { id: 1, name: "Ульяна" },
        { id: 2, name: "Максим" },
        { id: 3, name: "Агнесса" },
        { id: 4, name: "Вонючая работа" },
    ]as Array<DialogType>,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
   sendMessage: (newMessageText:string) => {
        return {
            type: "SN/DIALOGS/SEND-MESSAGE",
            newMessageText
        } as const
    }
}

const dialogsReducer = (state = initialState, action:ActionsType): InitialStateType => {

    switch (action.type) {


        case "SN/DIALOGS/SEND-MESSAGE":


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

export default dialogsReducer;