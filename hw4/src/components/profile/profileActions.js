

export const updateProfile=(info,message)=>{
	return{
		type:'Update_Profile',
		info,
		message
	}
}
export const showAlert=(text)=>{
	return {
		type:'info',
		message:text
	}
}
// If nothing is changed, alert. Else show the change and save to state.
export const validation=(information,userInfo)=>{
	var submit=true;
	var changed=false;
	var message=""
	Object.keys(information).forEach((key)=>{
		if(information.hasOwnProperty(key)){
			if(information[key] && key !="birthday"){
				if(information[key]===userInfo[key]){
					return showAlert(key+" has not been changed ")
				}
				else{
					changed=true;
					message+=key+" has been changed from "+userInfo[key]+" to "+information[key]+" "
				}
			}

		}
	})
	if(information.password != information.passConfirm){
		return showAlert(" Password and confirmation are not matched! ")
		
	}
		
	
	if(!changed){
		return showAlert("Nothing has been changed!")
	}
		
	if(submit&&changed){
		// return function(dispatch){
		// 	dispatch(showAlert(message))
		// 	dispatch(addUser(information))
		// }
		return updateProfile(information,message)
		
	}
}