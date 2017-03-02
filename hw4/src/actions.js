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

export const logOut = ()=>{
	return {
	type: 'Go_To_Landing'
}
}
export const go_To_Profile = ()=>{
	return {
	type: 'Go_To_Profile'
}
}
export const addUser=(info)=>{
	return{
		type:'Add_My_User',
		info
	}
}