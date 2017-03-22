/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {
    let articles = {
        articles: [{ id: 1, author: 'tz13', content: 'aa' },
            { id: 2, author: 'Scott', content: 'bb' },
            { id: 3, author: 'CZ', content: 'cc' }
        ]
    }
    it('should give me three or more articles', (done) => {
        // IMPLEMENT ME
        fetch(url("/articles"))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {

                expect(body).to.eql(articles)
            })
            .then(done)
            .catch(done)
    }, 200)

    it('should add two articles with successive article ids, and return the article each time', (done) => {

        // add a new article
        // verify you get the article back with an id
        // verify the content of the article
        // add a second article
        // verify the article id increases by one
        // verify the second artice has the correct content

        const newArticle = { author: 'tz13', content: "happy" }
        const secondArticle = { author: 'cz', content: "sunshine" }
        articles.articles.push(newArticle)
        articles.articles.push(secondArticle)
        const payload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newArticle) }
            // payload.body=JSON.stringify(newArticle)//
        fetch(url(`/articles`), payload)
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.id).to.be.ok
                expect(body.author).to.eql('tz13')
                expect(body.content).to.eql("happy")
                return body.id
            })
            .then(id => {
                payload.body = JSON.stringify(secondArticle)
                fetch(url(`/articles`), payload)
                    .then(res => {
                        expect(res.status).to.eql(200)
                        return res.json()
                    })
                    .then(body => {
                        expect(body.id).to.be.ok
                        expect(body).to.eql({ id: 5, author: 'cz', content: "sunshine" })
                        expect(body.content).to.eql("sunshine")
                    })
            })

        .then(done)
            .catch(done)
    }, 200)


    it('should return an article with a specified id', (done) => {
        // call GET /articles first to find an id, perhaps one at random
        // then call GET /articles/id with the chosen id
        // validate that only one article is returned
        fetch(url("/articles"))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                return body.articles[Math.floor(Math.random() * body.articles.length)].id
            })
            .then(id =>
                fetch(url(`/articles/${id}`))
                .then(res => {
                    expect(res.status).to.eql(200)
                    return res.json()
                })
                .then(body => {
                    expect(body.length).to.eql(1)
                }))
            .then(done)
            .catch(done)
    }, 200)

    it('should return nothing for an invalid id', (done) => {
        // call GET /articles/id where id is not a valid article id, perhaps 0
        // confirm that you get no results
        fetch(url("/articles/0"))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.length).to.eql(0)
            })
            .then(done)
            .catch(done)
    }, 200)

});
