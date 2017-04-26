import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'
import Action from '../../actions'
import reducer from '../../reducers'
const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, (it) => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('ArticlesView (component tests)', () => {

    it('should render articles', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 1 children 
     
    const node = TestUtils.renderIntoDocument(
        <div>
        <ArticleItem key={1} id={1} text="hello" date={"3/19/2017"}  author='tz13' showcomm={true} showCommAction={(_)=>(_)} comments={[]}  ></ArticleItem>
        </div>)
    const articleItem = findDOMNode(node).children[0]
    expect(articleItem.children).to.have.length(1)
    const content=findByClassname(articleItem.children[0].children,"content")
    expect(content.children[1].innerHTML).to.eql("hello")
    })
    const initialState = {
            Location: { location: 'LANDING', success: '', error: '' },
            User: {
                 avatar: '', username: '', headline: '', dob: '', zipcode: '', email: '' 
            },
            follower: {followers: [] },
            articles: {articles: [{_id:1,text:"hello",date:"3/19/2017",author:"tz13"}],filter: ''}
        }
    // determin wheter reducer would change the state
    it('should dispatch actions to create a new article',()=>{
        const newArticle={text:"happy",_id:2,date:"3/19/2017",author:"tz13",showcomm:false}
    	const nextState={...initialState,
            articles:{...initialState.articles,
                articles:[...initialState.articles.articles,
                newArticle]}}
    	expect(reducer(initialState,{type:Action.Add_New_Article,newArticle
    })).to.eql(nextState)
    })
})
