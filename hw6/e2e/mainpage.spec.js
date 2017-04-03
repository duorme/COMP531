import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
describe('End-to-End Test: Main Page', () => {

	it('should create new article and the article appears in feed', (done) => {
		var newarticle = 'this is my new article'
		sleep(200)
		.then(findCSS('textarea').clear())
		.then(findCSS('textarea').sendKeys(newarticle))
		.then(sleep(200))
		.then(findId('Post').click())
		.then(sleep(200))
		.then(findCSS('.userfeed').getText() 
			.then( text => {
				expect(text).to.equal(newarticle)
			})
			.then(done))
	})
	it('should edit an article and validate the article text has updated',(done) => {
		var article
		var appendString = " Happy every day"
		sleep(200)
		.then(findId("editArticle").click())
		.then(sleep(200))
		.then(findCSS('.userfeed').getText()
			.then (text => {
				article = text + appendString
				findCSS('.userfeed').clear()
				sleep(200)
				findCSS('.userfeed').sendKeys(article)
				findId('editArticle').click()	
				sleep(500)		
				findCSS('.userfeed').getText()
					.then(text => {
						expect(text).to.equal(article)
					})
			})
			.then(done))
	})

})