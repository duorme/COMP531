import Action,{success,error,go_To_Main,addUser,resource,url,logOut} from '../../actions'
import {fetchArticle} from '../article/ArticleActions'
import {fetchFollowers} from '../main/FollowerActions'
import {fetchProfile} from '../profile/profileActions'

// action for log in
export const updateUser=(name)=>{
	return{
		type:Action.Login,
		username:name
	}
}
// log out action
export const logout=()=>(dispatch)=>{
	resource('PUT','logout')
	.then((r)=>{
		dispatch(logOut())
	})
	.catch((Error)=>{
		dispatch(error("There was an error logging out"))
	})
}


// login and initialize login to fetch data from server
export const _Login =(username,password)=> (dispatch) => {
	const payload={}
	payload['username']=username
	payload['password']=password
	resource('POST','login',payload)
	.then((response)=>{
	dispatch(updateUser(response.username))
	dispatch(go_To_Main())
	dispatch(fetchArticle())
	dispatch(fetchFollowers())
	dispatch(fetchProfile())
	}).catch((Error)=>{
		dispatch(error(`There was an error logging in as ${username}`))
	})
}
// Validate form can't be empty and on birth must larger than 18 and password should match confirmation.
export const validation = (info) => (dispatch)=>{
	var empty=false
	Object.keys(info).forEach((key)=>{
		if(info.hasOwnProperty(key)){			
			if(info[key]===''){
				empty=true
			}
		}
	})
	if(empty){
		dispatch(error("Form can't be empty"))
		return
	}
	var text=""
	var birth = new Date(info.dob);
	var today = new Date();
	var age = today.getFullYear() - birth.getFullYear();
	var m = today.getMonth() - birth.getMonth();
	if(m < 0) age--;
	if(age < 18){
		text= "age should no less than 18!";
		dispatch(error(text))
		return 
	}
    if (info.password != info.passConfirm) {
    	text="password and confirmation are not matched! ";
    	dispatch(error(text))
    	return
    }   
    delete info.passConfirm
    const username=info.username
    resource('POST','register',info)
    .then((r)=>{
    	dispatch(error(`${r.username} has registered`))
    })
    .catch((Error)=>{
    	dispatch(error(`There was an error registering as ${username}`))
    })
}