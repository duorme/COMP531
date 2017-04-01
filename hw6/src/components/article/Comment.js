import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Media,Button} from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import {editCommentAction} from './ArticleActions'
// component for each article item
let Comment=({commentId,avatar, author, date, text,loginUser,editComment,articleId,editCommentAction})=>{
	console.log("editComment",editComment,commentId)
	const edit=()=>{
		editCommentAction(articleId,commentId)
	}
	return(

<div>
    <Media >
      <Media.Left align="top" >
        <img className="postImg" src={avatar}/>
      </Media.Left>
      <Media.Body className="content">
        <Media.Heading>
         {author} {" "}said{" "} on{" "} {date}
        </Media.Heading>
          <ContentEditable  html={`${text}`} // innerHTML of the editable div
                disabled={!editComment}       // use true to disable edition
                onChange={(e)=>{saveArticle(e)}}>
        </ContentEditable> 
      </Media.Body>
     {loginUser === author?<Button onClick={edit}>Edit</Button>:""}
    </Media>

  </div>

)
}
export default connect(null,
	(dispatch)=>{
		return{
		editCommentAction: (articleId,commentId)=>dispatch(editCommentAction(articleId,commentId))
	    }
	}
	)(Comment)
