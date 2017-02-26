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
export const addNewArticle=(text,date)=>{

	return{
		type:'Add_New_Article',
		content:text,
		Date:date
	}
}

export const searchArticles=(text)=>{
	return{
		type:'Search_Articles',
		text
	}
}

