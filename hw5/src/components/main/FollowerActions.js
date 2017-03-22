import Action,{resource} from '../../actions'
// export const updateHeadline=(text)=>{
// 	return{
// 		type:Action.Update_Headline,
// 		text
// 	}
// }
export const addFollower=(text)=>(dispatch)=>{
		const newFollower={
			author:text
			}
	const payload={}
	console.log(`following/${text}`)
	resource('PUT',`following/${text}`)
	.then((r)=>{
		console.log("new follower"+r.following)
		dispatch({
		type:Action.Add_Follower,
		newFollower
	})
	})
	return
}
export const remove=(id)=>{
	return{
		type:Action.Remove_Follower,
		id
	}
}
export const loadFollower=(following)=>{
	return{
		type:Action.Load_Followers,
		following
	}
}
export const fetchFollower=()=>(dispatch)=>{
	resource('GET','following')
	.then((r)=>{
		const following=r.following.map((c)=>{return {id:c,author:c}})
		dispatch(loadFollower(following))
	})
}