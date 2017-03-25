//Add new Article
import Action,{url,resource,sucess,error} from '../../actions'
export const addNewArticle=(text)=>(dispatch)=>{
	//use resource to post article

	const article={text}
	resource('POST','article',article)
	.then((r)=>{
		dispatch({
		type:Action.Add_New_Article,
		newArticle:r.articles[0]
	})
	})
	
}
// get article action
export const loadArticle=(articles)=>{
	return{
		type:Action.Load_Articles,
		articles
	}
}
//fetch article from server
export const fetchArticle=()=>(dispatch)=>{
	resource('GET','articles')
	.then((r)=>{
		dispatch(loadArticle(r.articles))
	})
}
// use search bar to search article
export const searchArticles=(text)=>{
	return{
		type:Action.Search_Articles,
		text
	}
}
// action to show comment
export const showComment=(id)=>{
	return {
		type:Action.Show_Comment,
		id
	}
}



