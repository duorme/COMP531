import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button,FormGroup,FormControl,Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {putArticle} from './ArticleActions'
const NewComment=({articleId,addComment})=>{
	let post;
	const _addComment = ()=>{
		if(post && post.value){
			addComment(post.value,articleId,-1);
			post.value=""

		}
	}
	return(
		<div>
		<FormGroup controlId="formControlsTextarea">
		<FormControl inputRef={ (node) => post = node } componentClass="textarea" placeholder="textarea" />
		</FormGroup>
		<div className="row ">
		 <Col xsOffset={5}>
		<ButtonGroup className="post">
  	<Button id="Post" onClick={_addComment}>Post</Button>
    <Button id="Cancel" onClick={()=>post.value=""}>Cancel</Button>
    </ButtonGroup>
    </Col>
   
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
		addComment: (text,id,CommentId)=>dispatch(putArticle(text,id,CommentId))
	    }
	}
	)(NewComment)
