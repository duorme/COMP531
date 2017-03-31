const md5 = require('md5')

module.exports = app =>{
	app.post('/register',userRegister)
	app.post('/login',userlogin)
}

const cookieKey='sid'
const userObj={}
const sessionUser={}
const userRegister=(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	if(!username || !password||userObj[username]){
		res.sendStatus(400)
		return
	}
	const salt=new Date()+username
	const newUser={}
	newUser.salt=salt
	const Saltedpassword=md5(salt+password)
	newUser.password=Saltedpassword
	userObj[username]=newUser
	var msg = {username:username,result:'success'}
	res.send(msg)
}
const getUser=(username)=>userObj[username]
const generateCode=(userObj)=>{
	md5(userObj.username+userObj.password)
}

const userlogin=(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	var user=getUser(username)
	if(!user){
		res.sendStatus(401)
		return
	}
	const passSalted=md5(user.salt+password)
	if(passSalted !== user.password){
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey,generateCode(user),
		{maxAge:3600*1000,httpOnly:true})
	var msg = {username:username,result:'login_success'}
	res.send(msg)
}