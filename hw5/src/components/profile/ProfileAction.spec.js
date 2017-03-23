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

// there are five actions in fetchProfile funciton.
// Use a varable to check whether it calls five times 
//and also each time dispatch the right action.
it('should fetch the user\'s proile information',(done)=>{
  mock(`${url}/email`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',email:'tz@a.com'}
  })
    mock(`${url}/zipcode`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',zipcode:'77005'}
  })
      mock(`${url}/dob`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',dob:'123'}
  })
        mock(`${url}/avatars`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',avatars:[{avatar:'aaa'}]}
  })
          mock(`${url}/headlines`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'tz13',headlines:[{headline:'headline'}]}
  })
  var time=0
  actions.fetchProfile()((fn)=>fn((action) =>{
    if(time==0){
    expect(action).to.eql({type:Action.Load_Profile,email:'tz@a.com'})
    time +=1
  }
  else if(time==1){
    expect(action).to.eql({type:Action.Load_Profile,zipcode:'77005'})
    time+=1
  }
  else if(time==2){
    expect(action).to.eql({type:Action.Load_Profile,dob:new Date('123')})
    time+=1
  }
  else if(time==3){
    expect(action).to.eql({type:Action.Load_Profile,avatar:'aaa'})
    time+=1
  }
  else if(time==4){
    expect(action).to.eql({type:Action.Load_Profile,headline:'headline'})
  }

}))
  done()
})

// post headline to server
it('should update headline',(done)=>{
  const username = 'sep1test'
  const headline = 'A new headline!'
  mock(`${url}/headline`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    json:{username,headline}
  })
  actions.updateHeadline(headline)(
    (fn) => fn((action) => {
    expect(action).to.eql({ 
      type: Action.Update_Profile,headline
    })
    }))
  done()
})
})
