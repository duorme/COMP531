import Action,{resource} from '../../actions'
// fetch follower from server
export const fetchFollowers=(method, name)=>{
    return (dispatch) => {
       resource(method?method:'GET','following'+(name?'/'+name:''))
        .then((r)=>{           
            if (method == 'PUT' && r.following.indexOf(name) < 0){
                return dispatch({type:'ON_ERROR', error: `${name} does not exist`})
            }
            const following=r.following.map((c)=>{return {id:c,author:c}})
	 		dispatch(loadFollower(following))
            
        })
        .catch((err) => {dispatch({type:'ON_ERROR', error:'error happened when fetching followers'})})
    }
}
// unfollow and fetch new followers from server
export const unfollow=(name)=>{
    return fetchFollowers('DELETE',name)

}
// follow a new one and fetch new followers from server
export  const follow=(name)=>{
    return fetchFollowers('PUT',name)
}
// action to load follower
export const loadFollower=(following)=>{
	return{
		type:Action.Load_Followers,
		following
	}
}

