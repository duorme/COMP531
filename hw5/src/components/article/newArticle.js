import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNewArticle} from './ArticleActions'
// Post new article
const NewArticle=({author,addArticle})=>{
	let post;
	const _addArticle = ()=>{
		if(post && post.value){
			addArticle(author,post.value,new Date().toJSON());
			post.value=""
		}
	}
	return(
		<div>
		<textarea className = "col-md-8 col-md-offset-1 textarea"ref={ (node) => post = node } ></textarea>
		<div className="row ">
		<input className="col-md-3 col-md-offset-1" type="file"></input>
		<ButtonGroup className="col-md-4 post">
  <button className="btn btn-primary" id="Post" onClick={_addArticle}>Post</button>
    <button className="btn btn-primary" id="Cancel" onClick={()=>post.value=""}>Cancel</button>
    </ButtonGroup>
   
   </div>
  </div>
	)

}
NewArticle.PropTypes={
	author:PropTypes.string.isRequired,
	addNewArticle:PropTypes.func.isRequired
}
export default connect(
	(state)=>{
		return {author:state.User.userInfo.username}
	},
	(dispatch)=>{
		return{
		addArticle: (author,text,date)=>dispatch(addNewArticle(author,text,date))
	    }
	}
	)(NewArticle)
	