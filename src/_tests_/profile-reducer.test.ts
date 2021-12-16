import { ProfileType } from './../types/types';

import profileReducer, {actions } from '../Redux/profile-reducer'

let state = {
    posts: [
        { id: 1, message: "А не всё это", likes: 50 },
        { id: 2, message: "Щас бы в доту", likes: 0 },
    ],
    newPostText: '@Nautro_Kazenaki',
    profile: null ,
    status: '',
};

it('length of posts should be incremented', () =>{
    // 1. test data
    let action = actions.addPostActionCreator("newPostText")
    
    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect (newState.posts.length).toBe(3)
    
})
it('new post text must equal `newPostText`', () =>{
    // 1. test data
    let action = actions.addPostActionCreator("newPostText")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    
    expect (newState.posts[2].message).toBe("newPostText")
})
it('after deleting length of posts should be decrement', () =>{
    // 1. test data
    let action = actions.deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    
    expect (newState.posts.length).toBe(1)
})
it('`after deleting length shouldnt be decrement if id is incorrect`', () =>{
    // 1. test data
    let action = actions.deletePost(1000)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    
    expect (newState.posts.length).toBe(2)
})

