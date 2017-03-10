
const index = (req, res) => {
     res.send({ hello: 'world' })
}
const getHeadline = (req, res) => {
	var name=req.url.split('/')
	var user=name.length==3?name[name.length-1]:'Tong'
	res.send({headlines:[
	{username: user, headline: 'I am user1'},
	{username: 'User2', headline: 'I am user2'},
	{username: 'User3', headline: 'I am user3'}
	]})
}

const putHeadline = (req, res) => {
	res.send({
		username:'Tong',
		headline: req.body.headline
		})
}

const getEmail = (req, res) => {
	var name=req.url.split('/')
	var user=name.length==3?name[name.length-1]:'Tong'
	res.send({username:user, email: 'a@rice.com'})
}

const putEmail = (req, res) => {
	res.send({
		username: 'Tong',
		email: req.body.email || 'you did not supply email'
		})
}

const getZipcode = (req, res) => {
	var name=req.url.split('/')
	var user=name.length==3?name[name.length-1]:'Tong'
	res.send({username: user, zipcode: '77005'})
}

const putZipcode = (req, res) => {
	res.send({
		username: 'Tong',
		zipcode: req.body.zipcode || 'you did not supply zipcode'
		})
}

const getAvatars = (req, res) => {
	var name=req.url.split('/')
	var user=name.length==3?name[name.length-1]:'Tong'
	res.send({avatars:[
	{username: user, avatar: 'user1_pictureURL'},
	{username: 'User2', avatar: 'user2_pictureURL'},
	{username: 'User3', avatar: 'user3_pictureURL'}
	]})
}

const putAvatars = (req, res) => {
	res.send({
		username: 'Tong',
		avatar: req.body.avatar|| 'you did not supply file'
		})
}
module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatars)
}
