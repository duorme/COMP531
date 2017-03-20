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
		myName: '',
		headline: '',
		password: '',
		dob: '',
		zipcode: '',
		email: ''
	},
}, action) => {
	switch (action.type) {
		case Action.Add_My_User:
			return {
				...state,
				userInfo: {
					avatar: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					myName: action.info.name == "" ? state.userInfo.name : action.info.myName,
					headline: state.userInfo.myHeadLine,
					password: action.info.password == "" ? state.userInfo.password : action.info.password,
					dob: action.info.birthday == "" ? state.userInfo.birthday : action.info.birthday,
					zipcode: action.info.zipcode == "" ? state.userInfo.zipcode : action.info.zipcode,
					email: action.info.email == "" ? state.userInfo.email : action.info.email
				}
			}
		case Action.Login:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					avatar: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					myName: action.name
				}
			}
		case Action.Update_Headline:
			return {
				...state,
				userInfo: {...state.userInfo,headline: action.text}
			}
		default:
			return state;
	}
}
export const follower = (state = {
	nextfollowerId: 0,
	followers: {}
}, action) => {
	switch (action.type) {
		case Action.Add_Follower:
			const followers=state.followers
			action.newFollower['id']=state.nextfollowerId
			followers[state.nextfollowerId]=action.newFollower
			return {
				...state,
				nextfollowerId: state.nextfollowerId + 1,
				followers
			}
		case Action.Remove_Follower:
			return {...state,followers: state.followers.filter((item) => item.id != action.id)}
		default:
			return state;
	}
}

export const articles = (state = {
	nextId:0,
	articles: {},
	filter: ''
}, action) => {
	switch (action.type) {
		case Action.Load_Articles:

		return {
			...state,
			nextId:state.nextId+Object.keys(Action.articles).length,
			articles:Action.articles
		}
		case Action.Add_New_Article:
		    const articles=state.articles
		    const nextId=state.nextId+1
		    action.article["_id"]=nextId
		    articles[nextId]=action.article
			return {
				...state,
				articles
			}
		case Action.Search_Articles:
			return {...state,filter: action.text}
		default:
			return state;
	}

}

const Reducer = combineReducers(
	{User,follower,articles,Location})

export default Reducer