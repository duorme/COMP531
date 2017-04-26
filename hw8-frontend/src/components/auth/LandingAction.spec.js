import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Authentication (involves mocked requests)', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  const actionModule = require('../../actions')
  Action = actionModule.default
  actions = require('./LandingAction')
  url=actionModule.url
  resource=actionModule.resource
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})
//because there are multiple actions in login, we just want to test the login action. So set a varable to 
//just test the first call.
var time=0
it('should log in a user',(done)=>{
const username='tz13'
const password='wrapped-feed-scientific'
mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json:{username:"tz13",password:"wrapped-feed-scientific"}
  })
  actions._Login(username,password)(

    (action) => {
      if(time==0){
    expect(action).to.eql({ 
      type: Action.Login,
      username
    })
    time+=1}
    })
  done()
})

//because there are multiple actions in login, we just want to test the login action. So set a varable to 
//just test the first call.
time=0
it('should not log in an invalid user',(done)=>{

const username='tz13'
  const password=''
  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json:{username,password}
  })
  actions._Login(username,password)(
    (action)=> {
      if(time=0){
        expect(action).to.eql({
    type:Action.INFO,
    message:`There was an error logging in as ${username}`
  })
        time+=1}
  })
  done()
})
// test log out
it('should log out a user (state should be cleared)',(done)=>{
  mock(`${url}/logout`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
  })
  
  actions.logout()(
    (action)=>{expect(action).to.eql({type: Action.Go_To_Landing})
  })
  
  done()
})


})