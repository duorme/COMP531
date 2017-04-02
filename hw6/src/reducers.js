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
				if(action.avatar){
					return{...state,avatar:action.avatar}
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
	followers: {}
}, action) => {
	switch (action.type) {
		case Action.Load_Followers:
		return {
			...state,
			followers:action.following
		}
		case Action.Add_Follower:
			const newfollowers={...state.followers}
			newfollowers[action.newFollower.author]=action.newFollower
			return {
				...state,
				followers:newfollowers
			}
		case Action.Remove_Follower:
			return {...state,followers: state.followers.filter((item) => item.id != action.id)}
		default:
			return state;
	}
}

export const articles = (state = {
	articles: {},
	filter: ''
}, action) => {
	switch (action.type) {
		case Action.Load_Articles:
		return {
			...state,
			articles:action.articles
		}
		case Action.Update_Article:
		case Action.Add_New_Article:
		const newarticles={...state.articles}
		newarticles[action.newArticle['_id']]=action.newArticle
			return {
				...state,
				articles:newarticles
			}
		case Action.Search_Articles:
			return {...state,filter: action.text}
		case Action.Show_Comment:
			return{
				...state,
				articles:Object.keys(state.articles).reduce((o,key)=>{
					if(key != action.id){
						o[key]=state.articles[key];return o
					}
					else{
						o[key]={...state.articles[key],showcomm:!state.articles[key].showcomm};
						return o
					}
				},{})
			}
		case Action.Add_Comment:
			return{
				...state,
				articles:Object.keys(state.articles).reduce((o,key)=>{
					if(key != action.id){
						o[key]=state.articles[key];return o
					}
					else{
						o[key]={...state.articles[key],addComment:!state.articles[key].addComment}
						return o
					}
				},{})
			}

		case Action.Edit_Article:
			return{...state,articles:Object.keys(state.articles).reduce((o,key)=>{
					if(key != action.id){
						o[key]=state.articles[key];return o
					}
					else{
						o[key]={...state.articles[key],isEdited:!state.articles[key].isEdited}
						return o
					}
				},{})}
		case Action.Edit_Comment:
			const newcomments=state.articles[action.articleId].comments.map((item)=>{
				if(item.commentId ==action.commentId){
					return{
						...item,
						editComment:!item.editComment
					}
					}
				return item
			})
			const newArticle={...state.articles[action.articleId],comments:newcomments}
			const articles=Object.keys(state.articles).reduce((o,key)=>{
				if(key!=action.articleId){
					o[key]=state.articles[key]
					return o
				}
				else {
					o[key]=newArticle;return o}
			},{})
			return{
				...state,
				articles
			}

		default:
			return state;
	}

}

const Reducer = combineReducers(
	{User,follower,articles,Location})

export default Reducer