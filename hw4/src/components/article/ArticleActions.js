//Add new Article
export const addNewArticle=(text,date)=>{

	return{
		type:'Add_New_Article',
		content:text,
		Date:date
	}
}
// Search article on body and author
export const searchArticles=(text)=>{
	return{
		type:'Search_Articles',
		text
	}
}

