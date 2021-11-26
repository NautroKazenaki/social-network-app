import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleWare from "redux-thunk"
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

let reducers = combineReducers({
     profilePage: profileReducer,
     messagesPage: dialogsReducer,
     usersPage: usersReducer,
     auth: authReducer,
     form: formReducer,
     app: appReducer,
})

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleWare)));

// const { createStore, combineReducers, applyMiddleware } = require("redux");




//let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window._store_ = store;

export default store;