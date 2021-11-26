import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from '../components/Profile/ProfileInfo/ProfileStatus'

describe("ProfileStatus component", () => {
    test("status in the props should be  in the state", () =>{
        const component = create(<ProfileStatus status="test-status" />)
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test-status")
    })

    test("after creation of component <span> should be displayed", () =>{
        const component = create(<ProfileStatus status="test-status" />)
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("after creation of component <input> should't be displayed ", () =>{
        const component = create(<ProfileStatus status="test-status" />)
        const root = component.root;
        expect( () => {
            let input = root.findByType("input")
        }).toThrow()
    })

    test("after creation of component <span> should contains correct status", () =>{
        const component = create(<ProfileStatus status="test-status" />)
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("test-status")
    })

    test("<input> should be displayed in editMode instead of <span>", () =>{
        const component = create(<ProfileStatus status="test-status" />)
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("test-status")
    })

    test("callback should be called", () =>{
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="test-status" updateStatus={mockCallback} />)
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})