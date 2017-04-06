//Add new Article
import Action,{url,resource,sucess,error} from '../../actions'
import Promise from 'bluebird'
// add fields to article object in order to show comment, edit article, add comments, edit comments
const addAttribute=(article,showcomm=false,isEdited=false,editComment=false,addComment=false)=>{
		article["showcomm"]= showcomm
		article["isEdited"]= isEdited
		article["addComment"]=addComment
		article.comments.forEach((v)=>{v["editComment"]=false})
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
		const avatars={}
		const articles=r.articles.reduce((o,v)=>{
			o[v._id]=addAttribute(v);
			return o},{})		
		const authors = new Set(r.articles.reduce((o, article) => {
                o.push(article.author)
                return o
            }, []))
		const avatarPromise=resource('GET',`avatars/${[...authors].join(',')}`)
		.then(r=>{
			const avatars=r.avatars.reduce((o,v)=>{o[v.username]=v.avatar; return o},{})
			Object.keys(articles).forEach((key)=>articles[key].avatar=avatars[articles[key].author])
		})
		Promise.all([avatarPromise]).then(dispatch(loadArticle(articles)))
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
// edit article
export const editArticle=(id)=>{
	return {
		type:Action.Edit_Article,
		id
	}
}
// add comment
export const addnewComment=(id)=>{
	return{
		type:Action.Add_Comment,
		id
	}
}
export const editCommentAction=(articleId,commentId)=>{
	return{
		type:Action.Edit_Comment,
		articleId,
		commentId,
	}
}

export const putArticle=(message,id,commentId)=>(dispatch)=>{
	const payload={}
	payload["text"]=message
	if(commentId) payload["commentId"]=commentId
	resource('PUT',`articles/${id}`,payload)
	.then((r)=>{
		if(commentId){
			dispatch({
			type:Action.Update_Article,
			newArticle:addAttribute(r.articles[0],true,false)
			})
			return
		}
		
		dispatch({
			type:Action.Update_Article,
			newArticle:addAttribute(r.articles[0],false,false)
		})
	})
}
//complicated actions, put comment to server as well as set button from save to edit.
export const updateComment=(message,id,commentId)=>(dispatch)=>{
 dispatch(editCommentAction(id,commentId))
 dispatch(putArticle(message,id,commentId))
}
// complicated actions, when click 'Save' button, put article to server as well as set button from 'Save'
// to 'Edit'
export const updateArticle=(message,id)=>(dispatch)=>{
	dispatch(editArticle(id))
 dispatch(putArticle(message,id))
}



