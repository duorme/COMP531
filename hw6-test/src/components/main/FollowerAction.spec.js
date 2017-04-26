import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Follower)', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')
  }
  const actionModule = require('../../actions')
  Action = actionModule.default
  actions = require('./FollowerActions')
  url=actionModule.url
  resource=actionModule.resource
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})


})