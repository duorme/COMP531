
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

