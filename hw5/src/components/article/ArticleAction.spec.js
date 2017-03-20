import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Article actions', () => {
let Action, actions,url,resource
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../../actions').default
  actions = require('./ArticleActions')
  url=actions.url
  resource=actions.resource
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})
it('should fetch articles (mocked request)',(done)=>{
  mock(`${url}/articles`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{articles:[{_id:1,author:'tz13'}]}
  })
  actions.fetchArticle()((action)=>{
    expect(action).to.eql({type:Action.Load_Articles,articles:{1:{_id:1,author:'tz13'}}})
  })
  done()
})

it('should update the search keyword',(done)=>{
  expect(actions.searchArticles('tz13')).to.eql({
    type:Action.Search_Articles,
    text:'tz13'
  })
  done()
})
})
