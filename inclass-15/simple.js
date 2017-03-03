const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
    let body = ''
    req.on('data', function(chunk) {
        body += chunk
    })
    req.on('end', function() {
        req.body = body
        server(req, res)
    })
}


function server(req, res) {
    console.log('Request method        :', req.method)
    console.log('Request URL           :', req.url)
    console.log('Request content-type  :', req.headers['content-type'])
    console.log('Request payload       :', req.body)


    if (req.url === '/' && req.method === 'GET') {
        const payload = { 'hello': 'world' }
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(payload) + '\n')
    }


    if (req.url === '/articles') {
        const payload = {
            'articles': [{
                id: 1,
                author: 'Scott',
                body: 'A post'
            }, {
                id: 2,
                author: 'Tong',
                body: 'A post'
            }, { id: 3, author: 'CZ', body: 'A post' }]
        }
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(payload) + '\n')
    }

    if (req.url === '/login' && req.method === 'POST') {
     // check whether data contain username and password
        if (req.body === '') {
            payload = 'No username and password'
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.end(JSON.stringify(payload) + '\n')
        } else {
            var json = JSON.parse(req.body)
            const payload = { 'username': json.username, 'result': 'success' }
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(payload) + '\n')
        }
    }
    if (req.url === '/logout' && req.method === 'PUT') {
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 200
        res.end('OK\n')
    }
}
