import React, { Component, PropTypes } from 'react'
import {ButtonGroup,Button,FormGroup,ControlLabel,FormControl,Col,Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNewArticle} from './ArticleActions'
// Post new article
const NewArticle=({addArticle})=>{
	let post;
	let file;
	const _addArticle = ()=>{
		console.log('NewArticle')
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
		<FormGroup controlId="formControlsTextarea">
		<div  className="glyphicon glyphicon glyphicon-pencil"/>
		<ControlLabel>New Article</ControlLabel>
		<FormControl inputRef={ (node) => post = node } componentClass="textarea" placeholder="textarea" />
		</FormGroup>

		<div>
		<input  type="file" accept="image/*" 
     onChange={(e) => handleImageChange(e)} ></input>

     <Col xsOffset={5}>
     <ButtonGroup>
  	 <Button className="btn" id="Post" onClick={_addArticle}>Post</Button>
  	 <Button className="btn" id="Cancel" onClick={()=>post.value=""}>Cancel</Button>
  	 </ButtonGroup>
  	</Col>
   
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
	