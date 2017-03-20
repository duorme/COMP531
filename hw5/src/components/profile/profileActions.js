
import {showAlert,addUser} from '../../actions'


// return an action which is a function.
//If nothing is changed, alert. Else show the change and save to state.
export const validation=(information,userInfo)=> (dispatch) => {
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
		dispatch(showAlert(" Password and confirmation are not matched! "))
		return
	}	
	if(!changed){
		dispatch(showAlert("Nothing has been changed!"))
	}
		
	if(submit&&changed){
		//return updateProfile(information,message)
		
	dispatch(showAlert(message))//an action
	dispatch(addUser(information))
	return // an action		
	}
}