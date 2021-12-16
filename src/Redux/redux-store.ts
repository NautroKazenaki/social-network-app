import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleWare, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> = T extends {[keys: string]: (...args:any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let rootReducer = combineReducers({
     profilePage: profileReducer,
     messagesPage: dialogsReducer,
     usersPage: usersReducer,
     auth: authReducer,
     form: formReducer,
     app: appReducer,
})
// @ts-ignore
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleWare)));

// const { createStore, combineReducers, applyMiddleware } = require("redux");




//let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
// @ts-ignore
window._store_ = store;

export default store;