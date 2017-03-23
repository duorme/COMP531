import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
//validate articles's action.
describe('Validate Article actions', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  const actionModule = require('../../actions')
  Action = actionModule.default
  actions = require('./ArticleActions')
  url=actionModule.url
  resource=actionModule.resource
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})
//this returns a complex action
  // the complex action is called with dispatch as an argument
  // dispatch is then called with an action as an argument
it('should fetch articles (mocked request)',(done)=>{
  const articles = [{_id:1,author:'tz13'}]
  mock(`${url}/articles`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json: { articles }
  })
  actions.fetchArticle()((action)=>{
   expect(action).to.eql({type:Action.Load_Articles,articles})
  })
  done()
})
// expect an action
it('should update the search keyword',(done)=>{
  expect(actions.searchArticles('tz13')).to.eql({
    type:Action.Search_Articles,
    text:'tz13'
  })
  done()
})

})
