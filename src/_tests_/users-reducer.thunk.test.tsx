import { actions, follow, unfollow } from "../Redux/users-reducer"

import {usersAPI} from "../api/users-api"
import { APIResponseType } from "../api/api"
jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
    resultCode: 0,
    messages: [],
    data: {}

}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


test("follow thunk success", async () => {
    // 1. test data
    
    const thunk = follow(1)
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    // 2. action
    await thunk(dispatchMock, getStateMock, {})
    // 3. expectation
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
}) 

test("unfollow thunk success", async () => {
    // 1. test data
    const thunk = unfollow(1)
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    // 2. action
    await thunk(dispatchMock, getStateMock, {})
    // 3. expectation
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
}) 