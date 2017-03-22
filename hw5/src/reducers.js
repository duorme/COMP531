import {combineReducers} from 'redux'
import Action from './actions'
const images = require('./data/image.json')
const Location = (state ={
location:'LANDING',
success:'',
error:''
},action)=>{
	switch(action.type){
	case Action.Success:
			return {...state,success: action.message}
	case Action.ERROR:
			return {...state,error:action.message}
	case Action.Go_To_Main:
			return {...state,success: '',error:'',location: 'MAIN_PAGE'}
	case Action.Go_To_Profile:
			return {...state,success: '',error:'',location: 'PROFILE_PAGE'}
	case Action.Go_To_Landing:
			return {...state,sucesss: '',error:'',location: 'LANDING'}
	default:
			return state;
		}
}

const User = (state = {
	userInfo: {
		avatar: '',
		username: '',
		headline: '',
		password: '',
		dob: '',
		zipcode: '',
		email: ''
	},
}, action) => {
	switch (action.type) {
		case Action.Update_Profile:
			return {
				...state,
				userInfo: {
					username:action.hasOwnProperty('username')?action.username:state.userInfo.username,
					avatar: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					headline: action.hasOwnProperty('headline')? action.headline:state.userInfo.headline,
					password: action.hasOwnProperty('password')? action.password:state.userInfo.password,
					dob: action.hasOwnProperty('birthday')? action.birthday:state.userInfo.birthday,
					zipcode: action.hasOwnProperty('zipcode')? action.zipcode:state.userInfo.zipcode,
					email: action.hasOwnProperty('email')?  action.email:state.userInfo.email
				}
			}
		case Action.Login:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					avatar: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					username: action.name
				}
			}
		default:
			return state;
	}
}
export const follower = (state = {
	nextfollowerId: 0,
	followers: []
}, action) => {
	switch (action.type) {
		case Action.Load_Followers:
		return {
			...state,
			nextfollowerId:state.nextId+action.following.length,
			followers:action.following
		}
		case Action.Add_Follower:
			action.newFollower['id']=state.nextfollowerId
			return {
				...state,
				nextfollowerId: state.nextfollowerId + 1,
				followers:[...state.followers,action.newFollower]
			}
		case Action.Remove_Follower:
			return {...state,followers: state.followers.filter((item) => item.id != action.id)}
		default:
			return state;
	}
}

export const articles = (state = {
	nextId:0,
	articles: [],
	filter: ''
}, action) => {
	switch (action.type) {
		case Action.Load_Articles:
		const articles=action.articles.map((item)=>{
			return {...item,showcomm:false}})
		return {
			...state,
			nextId:state.nextId+Object.keys(action.articles).length,
			articles
		}
		case Action.Add_New_Article:
			const nextId=state.nextId+1
		    action.article["_id"]=nextId
			return {
				...state,
				nextId,
				articles: [
				action.article, ...state.articles]
			}
		case Action.Search_Articles:
			return {...state,filter: action.text}
		case Action.Show_Comment:
			const article=state.articles.filter((item)=> item._id==action.id)
			article[0].showcomm=!article[0].showcomm
			return{
				...state,
				articles:state.articles
			}
		default:
			return state;
	}

}

const Reducer = combineReducers(
	{User,follower,articles,Location})

export default Reducer