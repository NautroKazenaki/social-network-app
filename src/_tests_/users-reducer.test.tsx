import usersReducer, { InitialStateType, actions} from "../Redux/users-reducer"

let state: InitialStateType 

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Nautro", status: "blabla", followed: false, 
            photos: {small: null, large: null}  },
            {id: 1, name: "Nautro1", status: "blabla1", followed: false, 
            photos: {small: null, large: null}  },
            {id: 2, name: "Nautro2", status: "blabla2", followed: true, 
            photos: {small: null, large: null}  },
            {id: 3, name: "Nautro3", status: "blabla3", followed: true, 
            photos: {small: null, large: null}  },
        ] ,
        pageSize: 5,
        totalUsersCount: 0,
        page: 1,
        isFetching: false,
        followingInProgress: []  //array of users id
    }
    }
)
    

test("follow success", () => {
    // 1. test data
   
    // 2. action
    const newState = usersReducer(state, actions.followSuccess(1))
    // 3. expectation
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    // 1. test data
   
    // 2. action
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    // 3. expectation
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})