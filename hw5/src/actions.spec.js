import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate actions ', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  const actionModule = require('./actions')
  Action = actionModule.default
  actions = require('./actions')
  url=actionModule.url
  resource=actionModule.resource
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

it('resource should be a resource',(done)=>{
  mock(`${url}/sample`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{articles:{id:1,author:'tz13'}}
  })
  resource('GET','sample')
  .then((response)=>{
    expect(response.articles).to.exist
  })
  .then(done)
  .catch(done)
})
it('resource should give he http error',(done)=>{
  mock(`${url}/headlines`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
  })
  resource('GET','headlines')
  .catch((error)=>{
    expect(error.toString()).to.eql('Error: Unauthorized')
  })
  .then(done)
  .catch(done)
  })

it('resource should be POSTable',(done)=>{
  const username='tz13'
  const password='wrapped-feed-scientific'
  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json:{username,result:"success"}
  })
  resource('POST','login',{username,password})
  .then((r)=>{
    expect(r).to.eql({username:'tz13',result:"success"})
  })
  .then(done)
  .catch(done)
})
it('should update error message (for displaying error mesage to user)',()=>{
  const ErrorAct={
    type:Action.ERROR,
    message:'wrong'
  }
  expect(actions.error('wrong')).to.eql(ErrorAct);
})
it('should update success message (for displaying success mesage to user)',()=>{
  const SuccessAct={
    type:Action.Success,
    message:'success'
  }
  expect(actions.sucess('success')).to.eql(SuccessAct);
})
it('should navigate (to profile, main, or landing)',()=>{
  expect(actions.go_To_Main()).to.eql({type: Action.Go_To_Main})
  expect(actions.go_To_Profile()).to.eql({type: Action.Go_To_Profile});
  expect(actions.logOut()).to.eql({type: Action.Go_To_Landing});
})
})
