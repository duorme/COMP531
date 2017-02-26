export const showAlert=(text)=>{
	return {
		type:'info',
		message:text
	}
}

export const go_To_Main = ()=>{
	return {
	type: 'Go_To_Main'
}
}

export const addUser=(name)=>{
	return{
		type:'Add_My_User',
		name:name
	}
}



export const updateText = (password,confirmation,birthday) => {
	event.preventDefault();
    if (password != confirmation) {
        return showAlert("password and confirmation are not matched")
    }
    else {
    	return go_To_Main()
    }
}