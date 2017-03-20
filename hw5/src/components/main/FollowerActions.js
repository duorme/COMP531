import Action from '../../actions'
export const updateHeadline=(text)=>{
	return{
		type:Action.Update_Headline,
		text
	}
}
export const addFollower=(text)=>{
	const newFollower={
			name:text,
			headline: "new follower"
			}
	return{
		type:Action.Add_Follower,
		newFollower
	}
}
export const remove=(id)=>{
	return{
		type:Action.Remove_Follower,
		id
	}
}