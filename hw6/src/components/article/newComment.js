import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
const NewComment=({articleId,addComment})=>{
	let post;
	const _addComment = ()=>{
		if(post && post.value){
			addComment(articleId,post.value);
			post.value=""

		}
	}
	return(
		<div>
		<textarea className = "col-md-8 col-md-offset-1 textarea" ref={ (node) => post = node } ></textarea>
		<div className="row ">
		<ButtonGroup className="col-md-offset-3 post">
  	<button className="btn btn-primary" id="Post" onClick={_addComment}>Post</button>
    <button className="btn btn-primary" id="Cancel" onClick={()=>post.value=""}>Cancel</button>
    </ButtonGroup>
   
   </div>
  </div>
	)

}
NewComment.PropTypes={
	addComment:PropTypes.func.isRequired
}
export default connect(null,
	(dispatch)=>{
		return{
		addComment: (id,text)=>dispatch(addNewComment(id,text))
	    }
	}
	)(NewComment)
