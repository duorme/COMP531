import {showAlert,go_To_Main} from '../../actions'

export const addUser=(info)=>{
	return{
		type:'Add_My_User',
		info
	}
}
export const updateUser=(name)=>{
	return{
		type:'Login',
		name
	}
}

// Validate form on birth must larger than 18 and password should match confirmation.
export const updateText = (info) => {
	var text=""
	var birth = new Date(info.birthday);
	var today = new Date();
	var age = today.getFullYear() - birth.getFullYear();
	var m = today.getMonth() - birth.getMonth();
	if(m < 0) age--;
	if(age < 18){
		text= "age should no less than 18!";
		return showAlert(text)
	}
    if (info.password != info.passConfirm) {
    	text="password and confirmation are not matched! ";
    	return showAlert(text);
    }   
    	return go_To_Main()
}