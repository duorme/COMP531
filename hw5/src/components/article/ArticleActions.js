//Add new Article
import Action,{url,resource,showAlert} from '../../actions'
export const addNewArticle=(author,text,date)=>{
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


