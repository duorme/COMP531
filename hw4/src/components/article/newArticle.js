import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNewArticle} from './ArticleActions'

const NewArticle=({addArticle})=>{
	let post;
	const _addArticle = ()=>{
		if(post && post.value){
			console.log("go")
			addArticle(post.value,new Date().toJSON());
			post.value=""
		}
	}
	return(
		<div>
		<textarea ref={ (node) => post = node } ></textarea>
		<ButtonGroup>
  <button className="btn btn-primary" id="Post" onClick={_addArticle}>Post</button>
    <button className="btn btn-primary" id="Cancel" onClick={()=>post.value=""}>Cancel</button>
    </ButtonGroup>
   <input type="file"></input>
  </div>
	)

}
NewArticle.PropTypes={
	addNewArticle:PropTypes.func.isRequired
}
export default connect(
	null,
	(dispatch)=>{
		return{
		addArticle: (text,date)=>dispatch(addNewArticle(text,date))
	}
		}
	)(NewArticle)
	