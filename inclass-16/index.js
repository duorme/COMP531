
const express = require('express')
const bodyParser = require('body-parser')

let next=4
let author='Tong'
let data={'articles': [{
                id: 1,
                author: 'Scott',
                body: 'A post'
            }, {
                id: 2,
                author: 'Tong',
                body: 'A post'
            }, { id: 3, author: 'CZ', body: 'A post' }]}



const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const newArticle={id:next,author:author,body:req.body['text']}
     data['articles'].push(newArticle)
     next++
     res.send(req.body)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle = (req, res) => res.send(data)

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles',getArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
