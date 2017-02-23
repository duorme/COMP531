const Alert=(state={},action) =>{
	switch(action.type){
		case 'info':
		return{
			...state,
			message:action.message
		}
		case 'Go_To_Main':
		return{
			message:'',
			location:'MAIN_PAGE'
		}
		case 'Go_To_Profile':
		return{
			message:'',
			location:'PROFILE_PAGE'
		}
		case 'Go_To_Landing':
		return{
			message:'',
			location:'LANDING'
		}
		default:return state
	}

}
export default Alert