export const updateHeadline=(text)=>{
	return{
		type:"Update_Headline",
		text
	}
}
export const addFollower=(text)=>{
	return{
		type:"Add_Follower",
		text
	}
}
export const remove=(id)=>{
	return{
		type:"Remove_Follower",
		id
	}
}