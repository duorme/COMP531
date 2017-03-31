import  fetch from 'isomorphic-fetch'
// Actions in this app
const Action={
	Go_To_Main:'Go_To_Main',
	Go_To_Landing:'Go_To_Landing',
	Go_To_Profile:'Go_To_Profile',
	Update_Headline:'Update_Headline',
	Add_Follower:'Add_Follower',
	Remove_Follower:'Remove_Follower',
	Login:'Login',
	Add_New_Article:'Add_New_Article',
	Search_Articles:'Search_Articles',
	Success:'Success',
	ERROR:'ERROR',
	Load_Articles:'Load_Articles',
	Load_Profile:'Load_Profile',
	Load_Followers:'Load_Followers',
	Update_Profile:'Update_Profile',
	Show_Comment:'Show_Comment',
	Add_New_Article:'Add_New_Article',
	Edit_Article:'Edit_Article'
}
export default Action

// log out action
export const logOut = ()=>{
	return {
	type: Action.Go_To_Landing
}
}
// go to main page
export const go_To_Main = ()=>{
	return {
	type: Action.Go_To_Main
}
}
// navigate to profile
export const go_To_Profile = ()=>{
	return {
	type: Action.Go_To_Profile
}
}
// 
export const addUser=(info)=>{
	return{
		type:Action.Add_My_User,
		info
	}
}
export const success=(message)=>{
	return{
		type:Action.Success,
		message
	}
}
export const error=(message)=>{
	return{
		type:Action.ERROR,
		message
	}
}

export const url = 'https://webdev-dummy.herokuapp.com'
 // export const url='aaa'

export const resource = (method, endpoint, payload,submitJson=true) => {
  const options =  {
    method,
    credentials: 'include',
  }
  if(submitJson){
  	options.headers={
      'Content-Type': 'application/json'
    }
    if (payload) options.body = JSON.stringify(payload)
  }
  else{
  	if(payload) options.body=payload
  }
  return fetch(`${url}/${endpoint}`, options)
    .then((r) => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}





