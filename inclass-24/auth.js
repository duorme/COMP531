const md5 = require('md5')
const request = require('request')
const qs = require('querystring')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser=require('cookie-parser')


const redis = require('redis').createClient("redis://h:pfe02f6bf53b86af67751ca5f35cf44707b4e8d7fedb1c12ecc127509755e24a4@ec2-34-206-56-163.compute-1.amazonaws.com:27519")





const config={   
        'clientID'      : '698663930324108', // your App ID
        'clientSecret'  : 'e9077b895e893db068594694890eafc4', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
}

const cookieKey='sid'
// const userObj={}
const users={}

passport.serializeUser(function(user,done){
	users[user.id]=user
	done(null,user.id)
})
passport.deserializeUser(function(id,done){
	const user = users[id]
	done(null,user)
})
passport.use(new FacebookStrategy(config,
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
		const newUser={username:profile.name,
		id:profile.id
	}
		users[newUser.id]=newUser
			return done(null,profile)
		})
	}))


// for log out
const logout=(req,res)=>{
	
	req.logout();
	res.redirect('/')
}
const logout_default=(req,res)=>{
	loginUser=''
	res.cookie(cookieKey,null,
		{maxAge:-1,httpOnly:true})
	res.status(200).send("OK")
}

const isLoggedIn=(req,res,next)=>{
	const sid = req.cookies[cookieKey]
	if(!sid){
		return res.status(401).send('NOT Authorized')
	}
	redis.hgetall(sid, function(err, userObj) {
    	if(err) {
    		console.log('Error: ${err}')
    	}
    	console.log(sid + 'mapped to ' + userObj)
    	if(userObj){
    		req.username = userObj.username
			next()
		}
		else{
			res.redirect('/login')
		}
    })
}

const isOathLoggedIn=(req,res,next)=>{
	if(req.isAuthenticated()){
		next()
	}else{
		res.redirect('/login')
	}
}
function profile(req,res){
	res.send('ok now what?',req.user)
}
// for register
const userRegister=(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	var email=req.body.email
	var dob=req.body.dob
	var zipcode=req.body.zipcode
	if(!username || !password||users[username]){
		res.sendStatus(400)
		return
	}
	const salt=new Date()+username
	const Saltedpassword=md5(salt+password)
	const newUser={username:username,salt:salt,hash:Saltedpassword}
	users[username]=newUser
	var msg = {username:username,result:'success'}
	res.send(msg)
}
const getUser=(username)=>users[username]
const generateCode=(userObj)=>{
	return md5(userObj.username+userObj.hash)
}

const userlogin=(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	var userObj=getUser(username)
	if(!userObj){
		res.sendStatus(401)
		return
	}
	const passSalted=md5(userObj.salt+password)
	if(passSalted !== userObj.hash){
		res.sendStatus(401)
		return
	}

	const sid = generateCode(userObj)
	redis.hmset(sid,userObj)
	res.cookie(cookieKey,sid,
		{maxAge:3600*1000,httpOnly:true})
	var msg = {username:username,result:'success'}
	res.send(msg)
}
const putPassword=(req,res)=>{
	var password=req.body.password
	if(!password){
		res.sendStatus(400)
	}
	if(loginUser==''){
		res.sendStatus(401)
		return
	}
	var user=getUser(loginUser)
	const passSalted=md5(user.salt+password)
	user.hash=passSalted
	res.send({username:loginUser,status:'will not changed'})
}
const fail=(req,res)=>{
	res.send({status:'can not log in'})
}
module.exports = app =>{
	app.post('/register',userRegister)
	app.post('/login',userlogin)
	app.put('/logout',isLoggedIn,logout_default)
	app.put('/password',isLoggedIn,putPassword)

	app.use(session({secret:'thisisSecretMessage'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/auth/facebook',passport.authenticate('facebook',{scope:'email'}))
	app.use('/auth/facebook/callback',passport.authenticate('facebook',
		{successRedirect:'/profile',failureRedirect:'/fail'}))
	app.use('/profile',isOathLoggedIn,profile)
	app.use('/logout',logout)

}
