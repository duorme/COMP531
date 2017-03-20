import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, (it) => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('ArticlesView (component tests)', () => {

    it('should render articles', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
     
    const node = TestUtils.renderIntoDocument(
        <div>
        <ArticleItem key={1} id={1} text="hello" date={"3/19/2017"}  author='tz13'></ArticleItem>
        </div>)
    const articleItem = findDOMNode(node).children[0].children[0]
    expect(articleItem.children).to.have.length(3)
    const content=findByClassname(articleItem.children,"content")
    expect(content.children[1].innerHTML).to.eql("hello")
    })
    it('should dispatch actions to create a new article',()=>{
    	const node = TestUtils.renderIntoDocument(
        <div>
        <ArticleItem key={1} id={1} text="hello" date={"3/19/2017"}  author='tz13'></ArticleItem>
        </div>)
        const articleItem = findDOMNode(node).children[0]
        expect(articleItem.children).to.have.length(1)
        const node2 = TestUtils.renderIntoDocument(
        <div>
        <NewArticle></NewArticle>
        </div>)
        TestUtils.Simulate.click(todoItem.children[0])

    })
})
