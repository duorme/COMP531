import {Action} from '../../actions'
export const updateHeadline=(text)=>{
	return{
		type:Action.Update_Headline,
		text
	}
}
export const addFollower=(text)=>{
	return{
		type:Action.Add_Follower,
		text
	}
}
export const remove=(id)=>{
	return{
		type:Action.Remove_Follower,
		id
	}
}
// if updating headline has problem, alert!
export const showHeadlineAlert=(text)=>{
return{
	type:Action.Alert_Headline,
	message:text
}
}