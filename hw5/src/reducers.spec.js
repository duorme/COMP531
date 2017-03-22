import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import {getFilteredArticles} from './components/article/articleList'


describe('Validate reducer (no fetch requests here)', () => {
    let Action, reducer
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({ warnOnUnregistered: false, useCleanCache: true })
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('./actions').default
        reducer=require('./reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    let initialState = {
            Location: { location: 'LANDING', success: '', error: '' },
            User: {
                userInfo: { avatar: '', username: '', headline: '', password: '', dob: '', zipcode: '', email: '' }
            },
            follower: { nextfollowerId: 0, followers: [] },
            articles: {nextId: 0,articles: [],filter: ''}
        }
    it('should initialize state', () => {        
        expect(reducer(undefined,{})).to.eql(initialState)
    })
    it('should state success (for displaying success message to user)',()=>{
    const Success="success"
    expect(reducer(undefined,{type:Action.Success,message:Success})).to.eql({...initialState,Location:{...initialState.Location,success:Success}})
    })
   
    it(' should state error (for displaying error message to user)',()=>{
    const Error="error"
    expect(reducer(undefined,{type:Action.ERROR,message:Error})).to.eql({...initialState,Location:{...initialState.Location,error:Error}})
    })
    it('should set the articles',()=>{
    const articles=[{_id:1,author:'tz13'}]
    expect(reducer(undefined,{type:Action.Load_Articles,articles})).to.eql({...initialState,articles:{...initialState.articles,
        articles:[{_id:1,author:'tz13',showcomm:false}],nextId:1}})
    })
    it('should set the search keyword',()=>{
    const text='abc'
    expect(reducer(undefined,{type:Action.Search_Articles,text})).to.eql({...initialState,articles:{...initialState.articles,filter:text}})
    })
    it('should filter displayed articles by the search keyword',()=>{
    const articles=[{_id:1,author:'tz13'},{_id:2,author:'cz'}]
    expect(getFilteredArticles(articles,'cz')).to.eql([{_id:2,author:'cz'}])
    })


   
    // it('should change the showcomm',()=>{
    //      const beforeState = {
    //         Location: { location: 'LANDING', success: '', error: '' },
    //         User: {
    //             userInfo: { avatar: '', username: '', headline: '', password: '', dob: '', zipcode: '', email: '' }
    //         },
    //         follower: { nextfollowerId: 0, followers: [] },
    //         articles: {nextId: 0,articles: [{_id:1,author:'tz13',showcomm:false}],filter: ''}
    //     }
    // //articles:[{_id:1,author:'tz13',showcomm:false}]
    // expect(reducer(beforeState,{type:Action.Show_Comment,id:1})).to.eql({...beforeState,articles:{...beforeState.articles,articles:[{_id:1,author:'tz13',showcomm:true}]}})
    // })

})
