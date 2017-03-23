
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
		action.email=r.email;break;
		case 'zipcode':
		action.zipcode=r.zipcode;break;
		case 'dob':
		action.dob=new Date(r.dob);break;
		case 'avatars':
		action.avatar=r.avatars[0].avatar;break;
		case 'headlines':
		action.headline=r.headlines[0].headline;break;
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
		    	dispatch(error("password will not persist on server"))
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

// return an action which is a function.
// If nothing is changed, alert. Else show the change and post to server
export const validation=(information,userInfo)=> (dispatch) => {
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