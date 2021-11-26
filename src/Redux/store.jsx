import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";



let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "А не всё это", likes: 50 },
                { id: 2, message: "Щас бы в доту", likes: 0 },
            ],
            newPostText: '@Nautro_Kazenaki',

        },
        messagesPage: {
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
            newMessageText: "",
        }

    },
    _callSubscriber() {
    },


    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },



    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._callSubscriber(this._state);


    }
}





export default store;
window.store = store;