//Add new Article
import Action,{url,resource,sucess,error} from '../../actions'

const addAttribute=(article,showcomm=false,isEdited=false,editComment=false,addComment=false)=>{
		article["showcomm"]= showcomm
		article["isEdited"]= isEdited
		article["editComment"]=editComment
		article["addComment"]=addComment
	return article

}
export const addNewArticle=(text,file)=>(dispatch)=>{
	//use resource to post article
	const fd = new FormData()
	fd.append('image',file)
	fd.append('text',text)
	resource('POST','article',fd,false)
	.then((r)=>{
		const newArticle=addAttribute(r.articles[0])
		dispatch({
		type:Action.Add_New_Article,
		newArticle
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
			o[v._id]=addAttribute(v);
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
export const editArticle=(id)=>{
	return {
		type:Action.Edit_Article,
		id
	}
}
export const updateArticle=(message,id,commentId)=>(dispatch)=>{
	const payload={}
	payload["text"]=message
	if(commentId) payload[commentId]=commentId
	resource('PUT',`articles/${id}`,payload)
	.then((r)=>{
		
		dispatch({
			type:Action.Update_Article,
			newArticle:addAttribute(r.articles[0],false,true)
		})
	})
}



