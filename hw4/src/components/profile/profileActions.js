
import {showAlert} from '../../actions'
export const updateProfile=(info,message)=>{
	return{
		type:'Update_Profile',
		info,
		message
	}
}

// If nothing is changed, alert. Else show the change and save to state.
export const validation=(information,userInfo)=>{
	event.preventDefault();
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
		return updateProfile(information,message)
		
	}
}