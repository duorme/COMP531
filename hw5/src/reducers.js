import {combineReducers} from 'redux'
import Action from './actions'
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
	username: '',
	dob: '',
	zipcode: '',
	email: '',
	avatar:'',
	headline:''
}, action) => {
	switch (action.type) {
		case Action.Update_Profile:
				if(action.dob){
					return {...state,dob:action.dob}
				}
				if(action.zipcode){
					return {...state,zipcode:action.zipcode}
				}
				if(action.email){
					return{...state,email:action.email}
				}
				if(action.headline){
					return{...state,headline:action.headline}
				}
		case Action.Login:
			return {
				...state,
				username: action.username
			}
		case Action.Load_Profile:
			if(action.avatar){
				return {...state,avatar:action.avatar}
			}
			if(action.dob){
				return{...state,dob:action.dob}
			}
			if(action.zipcode){
				return{...state,zipcode:action.zipcode}
			}
			if(action.headline){
				return{...state,headline:action.headline}
			}
			if(action.email){
				return{...state,email:action.email}
			}
		default:
			return state;
	}
}
export const follower = (state = {
	followers: []
}, action) => {
	switch (action.type) {
		case Action.Load_Followers:
		return {
			...state,
			followers:action.following
		}
		case Action.Add_Follower:
			return {
				...state,
				followers:[...state.followers,action.newFollower]
			}
		case Action.Remove_Follower:
			return {...state,followers: state.followers.filter((item) => item.id != action.id)}
		default:
			return state;
	}
}

export const articles = (state = {
	articles: [],
	filter: ''
}, action) => {
	switch (action.type) {
		case Action.Load_Articles:
		const articles=action.articles.map((item)=>{
			return {...item,showcomm:false}})
		return {
			...state,
			articles
		}
		case Action.Add_New_Article:
		const article_comm={...action.newArticle,showcomm:false}
			return {
				...state,
				articles:[...state.articles,article_comm]
			}
		case Action.Search_Articles:
			return {...state,filter: action.text}
		case Action.Show_Comment:
			const article=state.articles.filter((item)=> item._id==action.id)
			article[0].showcomm=!article[0].showcomm
			return{
				...state,
				articles:[...state.articles]
			}
		default:
			return state;
	}

}

const Reducer = combineReducers(
	{User,follower,articles,Location})

export default Reducer