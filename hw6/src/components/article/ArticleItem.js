import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,Button,Col,ListGroup} from 'react-bootstrap'
import {showComment,editArticle,updateArticle,addnewComment} from './ArticleActions'
import Comment from './Comment'
import NewComment from './NewComment'
import ContentEditable from 'react-contenteditable'
const ArticleItem = ({id,text,date,avatar,img,author,comments,showcomm,showCommAction,isEdited,loginUser,editArticleAction,updateArticleAction,addComment,addCommentAction})=>{
  const show=()=>{
    showCommAction(id)
  }
  const edit=()=>{
    editArticleAction(id)
  }
  const saveArticle=(e)=>{
    updateArticleAction(e.target.value,id)
  }
  return(   
    //Create Article card
  <div>
    <Media className="card">
      <Media.Left align="top" >
        <img className="postImg" src={avatar}/>
      </Media.Left>
      <Media.Body className="content">
        <Media.Heading>
         {author} {" "}said{" "} on{" "} {date}
        </Media.Heading>
          <ContentEditable  html={`${text}`} // innerHTML of the editable div
                disabled={!isEdited}       // use true to disable edition
                onChange={(e)=>{saveArticle(e)}}>
        </ContentEditable> 
        <img src={img}></img>
      </Media.Body>
      <ButtonGroup>
      <Button onClick={show}>Show Comments</Button>
      <Button onClick={()=>addCommentAction(id)}>Add a Comment</Button>


      {
        loginUser!=author?'':<Button onClick={edit}>
        {isEdited? "Save" : "Edit"}</Button>   
      }
        </ButtonGroup>

      <ListGroup>
        {
          showcomm?
          comments.sort((a, b) => {
          if (a.date == b.date) return 0
          else if (a.date > b.date) return -1
          else return 1
      }).map((item)=>(
          <Comment key={item.commentId} id={item.commentId} author={item.author} date={item.date} text={item.text} loginUser={loginUser}></Comment>)):''}
      
      </ListGroup>
      {addComment?<NewComment articleId={id}></NewComment>:""}

    </Media>

  </div>


)
     
}

ArticleItem.PropTypes={
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default connect(null,
  (dispatch)=>{
    return{
      editArticleAction:(id)=>dispatch(editArticle(id)),
      showCommAction:(id)=>dispatch(showComment(id)),
      updateArticleAction:(text,id,commentId)=>dispatch(updateArticle(text,id,commentId)),
      addCommentAction:(id)=>dispatch(addnewComment(id))
      }
  }
  )(ArticleItem)

  