import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNewArticle} from './ArticleActions'
// Post new article
const NewArticle=({addArticle})=>{
	let post;
	let file;
	const _addArticle = ()=>{
		if(post && post.value){
			addArticle(post.value,file);
			post.value=""

		}
	}
	const handleImageChange=(e)=>{
		file = e.target.files[0]

	}
	return(
		<div>
		<textarea className = "col-md-8 col-md-offset-1 textarea"ref={ (node) => post = node } ></textarea>
		<div className="row ">
		<input className="col-md-3 col-md-offset-1" type="file" accept="image/*" 
     onChange={(e) => handleImageChange(e)} ></input>
		<ButtonGroup className="col-md-4 post">
  <button className="btn btn-primary" id="Post" onClick={_addArticle}>Post</button>
    <button className="btn btn-primary" id="Cancel" onClick={()=>post.value=""}>Cancel</button>
    </ButtonGroup>
   
   </div>
  </div>
	)

}
NewArticle.PropTypes={
	addNewArticle:PropTypes.func.isRequired
}
export default connect(null,
	(dispatch)=>{
		return{
		addArticle: (text,file)=>dispatch(addNewArticle(text,file))
	    }
	}
	)(NewArticle)
	