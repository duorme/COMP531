import Action,{resource} from '../../actions'
import Promise from 'bluebird'
import {fetchArticle} from '../article/ArticleActions'
// fetch follower from server
// because we use fetch to do AJAX call, we need to use promise.
export const fetchFollowers=(method, name,follower)=>{
    return (dispatch) => {
        if(method =='PUT' && follower){
            const following=follower.reduce((o,v)=>{o.push(v.author);return o},[])
            if(following.indexOf(name)>=0){
                return dispatch({type:Action.ERROR, message: `${name} has been followed`})
            }
         }   
       resource(method?method:'GET','following'+(name?'/'+name:''))
        .then((r)=>{

            if (method == 'PUT' && r.following.indexOf(name) < 0){
                return dispatch({type:Action.ERROR, message: `${name} does not exist`})
            }
            const following=r.following.reduce((o,v)=>{o[v]={author:v};return o},{})
            const followinglist=r.following.join()
            const avatarPromise=resource('GET',`avatars/${followinglist}`)
            	.then((r)=>{
            		r.avatars.forEach((avatar)=>{
            			const user=following[avatar.username]
            			if(user){
            				user.avatar=avatar.avatar
            			}
            		})
            	})
            const headlinePromise=resource('GET',`headlines/${followinglist}`)
            	.then((r)=>{
            		r.headlines.forEach((headline)=>{
            			const user=following[headline.username]
            			if(user){
            				user.headline=headline.headline
            			}
            		})
            	})
            Promise.all([avatarPromise,headlinePromise]).then(()=>dispatch(loadFollower(following)))
            
        })
        .catch((err) => {dispatch({type:Action.ERROR,message:'error happened when fetching followers'})})
    }
}
// unfollow and fetch new followers from server
export const unfollow=(name)=>(dispatch)=>{
    dispatch(fetchFollowers('DELETE',name))
    dispatch(fetchArticle())

}
// follow a new one and fetch new followers from server
export  const follow=(name,follower)=>(dispatch)=>{
    dispatch(fetchFollowers('PUT',name,follower))
    dispatch(fetchArticle())

}
// action to load follower
export const loadFollower=(following)=>{
	return{
		type:Action.Load_Followers,
		following
	}
}

