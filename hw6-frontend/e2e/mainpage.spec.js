import { expect } from 'chai'
import { go, sleep, findId, findCSS,findElements,By,driver } from './selenium'

describe('End-to-End Test: Main Page', () => {

	it('should create new article and the article appears in feed', (done) => {
		var newarticle = 'this is my new article'
		sleep(200)
		.then(findCSS('.textarea').clear())
		.then(findCSS('.textarea').sendKeys(newarticle))
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
	it('should update headline and verify change',(done) => {
		var newheadline = 'hello world'
		sleep(200)
		.then(findId('newHeadline').sendKeys(newheadline))
		.then(findId('btn_updateHeadline').click())
		sleep(200)
		.then(findId('headline').getText()
			.then(text => {
				expect(text).to.equal(newheadline)
			})
			.then(done))
	})
	it('should count the number of followed users',(done) => {
		sleep(200)
		.then(findElements('.follower')
			.then(elements =>{
				expect(elements.length).to.be.at.least(2)
			}))
		.then(done)
	})
	it('should add the "Follower" user and verify following count increases by one',(done) => {
		var count
		sleep(200)
		.then(findElements('.follower')
			.then(elements => {
				count = elements.length
				findId('newFollower').sendKeys('Follower')
				findId('btn_addfollower').click()
				sleep(300)
				findElements('.follower')
				.then(elements => {
					expect(elements.length).to.equal(count+1)
				})
			})
			.then(done))	
	})
	it('should Remove the Follower user and verify following count decreases by one',(done) => {
		var count
		sleep(200)
		.then(findElements('.follower')
			.then(elements => {
				count = elements.length
				findId('btn_unfollow').click()
				sleep(300)
				findElements('.follower')
				.then(elements => {
					expect(count).to.equal(elements.length+1)
				})
			})
			.then(done))	
	})
	it('Search for "Only One Article Like This" and verify only one article shows, and verify the author',(done)=>{
		var searchKey="Only One Article Like This"
		sleep(200)
		.then(findCSS('.search').sendKeys(searchKey))
		sleep(200)
		findElements('.userfeed')
		.then(elements=>{
			expect(elements.length).to.equal(1)
		})
		.then(findCSS('.articleTitle').getText()

			.then(title=>{
				var words=title.split(' ')
				expect(words[0]).to.equal('tz13test')
			})
		.then(done))

	})

})