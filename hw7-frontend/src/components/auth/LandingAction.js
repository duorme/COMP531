import Action,{success,error,go_To_Main,addUser,resource,url,go_to_landing} from '../../actions'
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
		dispatch(go_to_landing())
	})
	.catch((Error)=>{
		dispatch(error("There was an error logging out"+Error))
	})
}


// login and initialize login to fetch data from server
export const _Login =(username,password)=> (dispatch) => {
	console.log('url',url)
	if(!username){
	dispatch(error("Error! username can't be empty"))
	return 
	}
	if(!password){
		dispatch(error("Error! password can't be empty"))
	}
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
		dispatch(error(`Error! There was an error logging in as ${username}`))
	})
}
// Validate form can't be empty and on birth must larger than 18 and password should match confirmation.
export const validation = (info) => (dispatch)=>{
	if(!info.password){
		return dispatch(error("password can't be empty"))
	}
	if(!info.passConfirm){
		return dispatch(error("password confirmation can't be empty"))
	}
	if(!info.dob){
		return dispatch(error("birthday can't be empty"))
	}
	if(!info.username){
		return dispatch(error("username can't be empty"))
	}
	if(!info.zipcode){
		return dispatch(error("zipcode can't be empty"))
	}
	if(!info.email){
		return dispatch(error("email can't be empty"))
	}
	//validate zipcode
	const zipcode = info.zipcode
	var regex=/^\d{5}$/
	var ok = regex.exec(zipcode)
	if(!ok){
		dispatch(error("zipcode should be five digits"))
		return 
	}

	const email = info.email
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
        	return dispatch(error("please provide the correct email address"))
    }
	//validate birthday
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
	//validate password and confirmation
    if (info.password != info.passConfirm) {
    	text="password and confirmation are not matched! ";
    	dispatch(error(text))
    	return
    }   
    delete info.passConfirm
    const username=info.username
    resource('POST','register',info)
    .then((r)=>{
    	dispatch(error(`Success! You have regstered as ${r.username}`))
    })
    .catch((Error)=>{
    	dispatch(error(`Error! There was an error registering as ${username}`))
    })
}