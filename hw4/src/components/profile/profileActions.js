// addUser(information);
export const showAlert=(text)=>{
	return {
		type:'info',
		message:text
	}
}
export const addUser=(info)=>{
	return{
		type:'Add_My_User',
		info
	}
}
export const validation=(information,userInfo)=>{
	var submit=true;
	var changed=false;
	var message=""
	for(var key in information){
		if(information.hasOwnProperty(key)){
			if(information[key]){
				if(information[key]===userInfo[key]){
					return showAlert(key+" has not been changed ")
				}
				else{
					changed=true;
					message+=key+" has been changed from "+userInfo[key]+" to "+information[key]+" "
				}
			}

		}
	}
	if(information.password != information.passConfirm){
		return showAlert(" Password and confirmation are not matched! ")
	}
	if(!changed){
		return showAlert("Nothing has been changed!")
	}	
	if(submit&&changed){
		return addUser(information)
	}
}