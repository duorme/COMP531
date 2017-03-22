import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Profile actions (mocked requests)', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  const actionModule = require('../../actions')
  Action = actionModule.default
  actions = require('./profileActions')
  url=actionModule.url
  resource=actionModule.resource
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})
it('should fetch the user\'s proile information',(done)=>{
  console.log('url', url)
  mock(`${url}/email`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',email:'tz@a.com'}
  })
  actions.fetchProfile()((fn)=>fn((action) =>{
    expect(action).to.eql({type:Action.Load_Profile,email:'tz@a.com'})}))
  done()
})

it('should update headline',(done)=>{
  const username = 'sep1test'
  const headline = 'A new headline!'
  mock(`${url}/headline`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    json:{username,headline}
  })
  actions.updateHeadline('does not matter')(
    (fn) => fn((action) => {
    expect(action).to.eql({ 
      headline, type: actions.UPDATE_PROFILE
    })
    }))
  done()
})
})
