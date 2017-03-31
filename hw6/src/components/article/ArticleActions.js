//Add new Article
import Action,{url,resource,sucess,error} from '../../actions'
export const addNewArticle=(text,file)=>(dispatch)=>{
	//use resource to post article
	const fd = new FormData()
	fd.append('image',file)
	fd.append('text',text)
	resource('POST','article',fd,false)
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
		const articles=r.articles.reduce((o,v)=>{
			v['showcomm']=false;
			v['isEdited']=false;
			o[v._id]=v;
			return o},{})

		dispatch(loadArticle(articles))
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
console.error = (function() {
    var error = console.error

    return function(exception) {
        if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
            error.apply(console, arguments)
        }
    }
})()



