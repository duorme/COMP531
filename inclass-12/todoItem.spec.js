import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set


     
    const node = TestUtils.renderIntoDocument(
        <div>
        <ToDoItem  id = {0} text={"a"} done={true} toggle={_=>_} remove={_=>_}/>
        </div>)
    const todoItem = findDOMNode(node).children[0]
    expect(todoItem.children).to.have.length(3)
    const content = findByClassname(todoItem.children, 'completed')
    expect(content.innerHTML).to.equal("a")

    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
    const node = TestUtils.renderIntoDocument(
        <div>
        <ToDoItem  id = {1} text={"a"} done={false} toggle={_=>_} remove={_=>_}/>
        </div>)
    const todoItem = findDOMNode(node).children[0]
    expect(todoItem.children).to.have.length(3)
    const completed = findByClassname(todoItem.children, 'completed')
    expect(completed).to.equal(null)

    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const node= TestUtils.renderIntoDocument(
        <div>
        <ToDoItem  id={2} text={"a"} done={false} toggle={()=>{toggled=true}} remove={_=>_}/>
        </div>)
        const todoItem = findDOMNode(node).children[0]
        expect(toggled).to.be.false
        TestUtils.Simulate.click(todoItem.children[0])
        expect(toggled).to.be.true

    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const node = TestUtils.renderIntoDocument(
        <div>
        <ToDoItem  id={2} text={"a"} done={false} toggle={_=>_} remove={()=>{removed=true}}/>
        </div>)
        const todoItem = findDOMNode(node).children[0]
        expect(removed).to.be.false
        TestUtils.Simulate.click(todoItem.children[2])
        expect(removed).to.be.true



    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"


        const node = TestUtils.renderIntoDocument(
        <div>
        <ToDoItem  id={2} text={"a"} done={true} toggle={_=>_} remove={()=>{removed=true}} />
        </div>)
        const todoItem = findDOMNode(node).children[0]
        expect(todoItem.children[1].className).to.equal('completed')
    })

})
