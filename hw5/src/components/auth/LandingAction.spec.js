import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import {url,resource} from '../../actions'

describe('Validate Authentication (involves mocked requests)', () => {
let Action, actions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../../actions').default
  actions = require('./LandingAction')
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})
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
    expect(action).to.eql({ 
      type: Action.login,username
    })
    })
  done()
})

it('should not log in an invalid user',(done)=>{

const username='tz13'
  const password=''
  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json:{username,password}
  })
  actions._Login(username,password)(
    (action)=> {expect(action).to.eql({
    type:Action.INFO,
    message:`There was an error logging in as ${username}`})
  
  })
  done()
})

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