
import Action,{error,success,addUser,url,resource,go_To_Profile} from '../../actions'
// navigate to profile and fetch data from server
export const go_to_profile=()=>(dispatch)=>{
	dispatch(go_To_Profile())
	dispatch(fetchProfile())
}
// fetch data from server
export const fetchProfile=()=>(dispatch)=>{
	dispatch(fetchItem('email'))
	dispatch(fetchItem('zipcode'))
	dispatch(fetchItem('dob'))
	dispatch(fetchItem('avatars'))
	dispatch(fetchItem('headlines'))
}
// fetch each item
export const fetchItem=(field)=>(dispatch)=>{
	const action={type:Action.Load_Profile}
resource('GET',field)
.then((r)=>{
	switch(field){
		case 'email':
		action.email=r.email;
		action.username=r.username;
		break;
		case 'zipcode':
		action.zipcode=r.zipcode;
		action.username=r.username;
		break;
		case 'dob':
		action.dob=new Date(r.dob);
		action.username=r.username;
		break;
		case 'headlines':
		action.headline=r.headlines[0].headline;
		break;
		case 'avatars':
		action.avatar=r.avatars[0].avatar;
		action.username=r.username;
		break;
	}
	dispatch(action)
})
.catch((e) => console.error(`There was an error in fetchItem ${field}`, e))
}

// uodate headline to server
export const updateHeadline=(text)=>(dispatch)=>{
	dispatch(updateItem('headline',text))
}
// update each item
const updateItem=(field,value)=>(dispatch)=>{
	const payload={}
	payload[field]=value
	if(value){
		resource('PUT',field,payload)
		.then((r)=>{
		    const action={type:Action.Update_Profile}
		    if(field=='password'){
		    	dispatch(error("success!"))
		    }
			else{
			action[field]=r[field]
			dispatch(action)
		}
		})
		.catch((Error)=>{
			dispatch(error(`there's error when updating ${field}`))
		})
		
	}
}

export const updateAvatar=(avatar)=>(dispatch)=>{
	const src=URL.createObjectURL(avatar)

    dispatch({type:Action.Update_Profile,avatar:src})
}

// return an action which is a function.
// If nothing is changed, alert. Else show the change and post to server
export const validation=(information,userInfo)=> (dispatch) => {
	if(information.zipcode){
		const zipcode = information.zipcode
		var regex=/^\d{5}$/
		var ok = regex.exec(zipcode)
		if(!ok){
			dispatch(error("zipcode should be five digits"))
			return 
		}
	}
	if(information.email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(information.email)){
        	return dispatch(error("please provide the correct email address"))
        }
	}
	if(information.email==userInfo.email){
			dispatch(error("email hasn't been changed"))
			return
	}
	if(information.zipcode==userInfo.zipcode){
			dispatch(error("email hasn't been changed"))
			return
	}
	if(information.password != information.passConfirm){
		dispatch(error(" Password and confirmation are not matched! "))
		return
	}	
	if(!information.email && !information.zipcode && !information.password){
		dispatch(error("Nothing has been changed!"))
		return
	}
	Object.keys(information).forEach((key)=>{
		if(information.hasOwnProperty(key) && information[key]){	
			dispatch(error(`${key} has been changed from ${userInfo[key]} to ${information[key]}`))
		}
	}
	)
	
	dispatch(updateItem('email',information.email))
	dispatch(updateItem('zipcode',information.zipcode))
	dispatch(updateItem('password',information.password))
}



export const linkAccountWithUser=(username,password)=>(dispatch)=>{
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
	resource('POST','linkAccount',payload)
	.then((response)=>{
		dispatch(error("Link Successfully"))
	})

}
export const unlinkFb=()=>(dispatch)=>{
	resource('POST','unlinkFB')
	.then((r)=>{
		dispatch(error("Unlink Successfully"))
	})
	.catch((err)=>{
		dispatch(error("there's error when unlink"))
	})
}

export const postAvatar=(file)=>(dispatch)=>{
	const fd = new FormData()
	fd.append('image',file)
	resource('PUT','avatar',fd,false)
	.then((r)=>dispatch({type:Action.Update_Profile,avatar:r.avatar}))
	.catch((e)=>dispatch(error("there's something wrong with updating avatar")))
}