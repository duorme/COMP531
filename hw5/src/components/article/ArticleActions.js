//Add new Article
import Action,{url,resource,showAlert} from '../../actions'
export const addNewArticle=(item,text,date)=>{

	return{
		type:Action.Add_New_Article,
		content:text,
		Date:date
	}
}
// export const addNewArticle=(item)=>{

// 	return{
// 		type:Action.Add_New_Article,
// 		item
// 	}
// }
// Search article on body and author
export const loadArticle=(articles)=>{
	return{
		type:Action.Load_Articles,
		articles
	}
}
export const fetchArticle=()=>(dispatch)=>{
	resource('GET','articles')
	.then((r)=>{
		const articles=r.articles.reduce((o,v)=>{
			o[v._id]=v
		},{});
		dispatch(loadArticle(articles))
	})
}
export const searchArticles=(text)=>{
	return{
		type:Action.Search_Articles,
		text
	}
}


