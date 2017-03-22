
import Action,{error,success,addUser,url,resource} from '../../actions'

export const fetchProfile=()=>(dispatch)=>{
	dispatch(fetchItem('email'))
	// dispatch(fetchItem('zipcode'))
	// dispatch(fetchItem('dob'))
	// dispatch(fetchItem('avatar'))
}
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
		actoin.dob=r.dob;break;
		case 'avatar':
		action.avatar=r.avatar;break;

	}
	dispatch(action)
})
.catch(e => console.error(`There was an error in fetchItem ${field}`, e))
}


export const updateHeadline=(text)=>(dispatch)=>{
	dispatch(updateItem('headline',text))
}

const updateItem=(field,value)=>(dispatch)=>{
	const payload={}
	payload[field]=value
	if(value){
		resource('PUT',field,payload)
		.then((r)=>{
		    const action={type:Action.Update_Profile}
			action[field]=r[field]
			dispatch(action)
		})
		.catch((Error)=>{
			dispatch(error(`there's error when updating ${field}`))
		})
		
	}
}

// return an action which is a function.
// If nothing is changed, alert. Else show the change and save to state.
export const validation=(information,userInfo)=> (dispatch) => {
	event.preventDefault();
	var submit=true;
	var changed=false;
	var message=""
	Object.keys(information).forEach((key)=>{
		if(information.hasOwnProperty(key)){
			if(information[key] && key !="birthday"){
				if(information[key]===userInfo[key]){
					return error(key+" has not been changed ")
				}
				else{
					changed=true;
					message+=key+" has been changed from "+userInfo[key]+" to "+information[key]+" "
				}
			}

		}
	})
	if(information.password != information.passConfirm){
		dispatch(error(" Password and confirmation are not matched! "))
		return
	}	
	if(!changed){
		dispatch(error("Nothing has been changed!"))
		return 
	}
		
	if(submit&&changed){
		//return updateProfile(information,message)
		
	dispatch(success(message))//an action
	dispatch(addUser(information))
	return // an action		
	}
}