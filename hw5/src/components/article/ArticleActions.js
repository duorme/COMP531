//Add new Article
import Action,{url,resource,sucess,error} from '../../actions'
export const addNewArticle=(author,text,date)=>{
	//use resource to post article
	const article={
		author,
		text,
		img:'',
		date,
		comment:[]
	}
	return{
		type:Action.Add_New_Article,
		article
	}
}
export const loadArticle=(articles)=>{
	return{
		type:Action.Load_Articles,
		articles
	}
}
export const fetchArticle=()=>(dispatch)=>{
	resource('GET','articles')
	.then((r)=>{
		dispatch(loadArticle(r.articles))
	})
}
export const searchArticles=(text)=>{
	return{
		type:Action.Search_Articles,
		text
	}
}


