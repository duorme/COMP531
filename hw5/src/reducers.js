import {combineReducers} from 'redux'
import Action from './actions'
const initialArticles = require('./data/articles.json')
const initialFollowers = require('./data/followers.json')
const images = require('./data/image.json')

const Location = (state ={
location:'LANDING',
message:'',
hmessage:''
},action)=>{
	switch(action.type){
	case Action.INFO:
			return {...state,message: action.message}
	case Action.Alert_Headline:
			return {...state,hmessage:action.message}
	case Action.Go_To_Main:
			return {...state,message: '',hmessage:'',location: 'MAIN_PAGE'}
	case Action.Go_To_Profile:
			return {...state,message: '',hmessage:'',location: 'PROFILE_PAGE'}
	case Action.Go_To_Landing:
			return {...state,message: '',hmessage:'',location: 'LANDING'}
	default:
			return state;
		}
}

const User = (state = {
	userInfo: {
		myPic: '',
		myName: 'Tong Zhou',
		myHeadLine: 'JS learner',
		password: 'aa',
		passConfirm: 'aa',
		birthday: '1994-01-07',
		displayName: 'Honey',
		zipcode: '77005',
		tel: '832-999-8888',
		email: 't@rice.edu'
	},
	nextCardId: 11,
	articles: initialArticles.articles,
	filter: ''
}, action) => {
	switch (action.type) {
		case Action.Add_My_User:
			return {
				...state,
				userInfo: {
					myPic: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					myName: action.info.name == "" ? state.userInfo.name : action.info.myName,
					myHeadLine: state.userInfo.myHeadLine,
					password: action.info.password == "" ? state.userInfo.password : action.info.password,
					passConfirm: action.info.passConfirm == "" ? state.userInfo.passConfirm : action.info.passConfirm,
					birthday: action.info.birthday == "" ? state.userInfo.birthday : action.info.birthday,
					displayName: action.info.displayName == "" ? state.userInfo.displayName : action.info.displayName,
					zipcode: action.info.zipcode == "" ? state.userInfo.zipcode : action.info.zipcode,
					tel: action.info.tel == "" ? state.userInfo.tel : action.info.tel,
					email: action.info.email == "" ? state.userInfo.email : action.info.email
				}
			}
		case Action.Login:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					myPic: 'https://s-media-cache-ak0.pinimg.com/564x/bc/a2/b9/bca2b9ca11810f19196d9323464d6b9d.jpg',
					myName: action.name
				}
			}
		case Action.Update_Headline:
			return {
				...state,
				userInfo: {myPic: state.userInfo.myPic,myName: state.userInfo.myName,myHeadLine: action.text}
			}
		case Action.Add_New_Article:
			return {
				...state,
				nextCardId: state.nextCardId + 1,
				articles: [{
					_id: state.nextCardId,
					author: state.userInfo.myName,
					comments: [],
					date: action.Date,
					img: state.userInfo.myPic,
					text: action.content
				}, ...state.articles]
			}
		case Action.Search_Articles:
			return {...state,filter: action.text}
		default:
			return state;
	}
}
export const follower = (state = {
	nextfollowerId: 4,
	followers: initialFollowers.followers
}, action) => {
	switch (action.type) {
		case Action.Add_Follower:
			return {
				...state,
				nextfollowerId: state.nextfollowerId + 1,
				followers: [...state.followers, {
					id: state.nextfollowerId,
					img: images.images[Math.floor(Math.random() * 3)],
					name: action.text,
					headline: "new follower"
				}]
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
			articles:Action.articles
		}
		case Action.Add_New_Article:
		    const articles=state.articles
		    articles[action.article._id]=action.article
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