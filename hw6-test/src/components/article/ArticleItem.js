import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,Button,Col,ListGroup,Image} from 'react-bootstrap'
import {showComment,editArticle,updateArticle,addnewComment} from './ArticleActions'
import Comment from './Comment'
import NewComment from './NewComment'
import ContentEditable from 'react-contenteditable'
const ArticleItem = ({id,text,date,avatar,img,author,comments,showcomm,showCommAction,isEdited,loginUser,editArticleAction,updateArticleAction,addComment,addCommentAction})=>{
  let post
  const time = new Date(date)
  const show=()=>{
    showCommAction(id)
  }
  const edit=()=>{
    if(!isEdited){
    editArticleAction(id)
  }
    else{
      if(post){
      updateArticleAction(post,id)
    }
    }
  }
  const saveArticle=(e)=>{
    post=e.target.value
   
  }
  return(   
    //Create Article card
  <div>
    <Media className="card">
      <Media.Left align="top" >
        <Image className="ArticleAvatarImg" src={avatar} rounded/>
      </Media.Left>
      <Media.Body className="content">
        <Media.Heading className="articleTitle">
         {author}

        </Media.Heading>
         <h6 className="float_left"><span className="glyphicon glyphicon glyphicon-time">
         </span>{
          (time.getMonth() + 1) + '-' + time.getDate() + '-' +  time.getFullYear()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()}</h6>
          <ContentEditable className="userfeed" html={`${text}`} // innerHTML of the editable div
                disabled={!isEdited}       // use true to disable edition
                onChange={(e)=>{saveArticle(e)}}>
        </ContentEditable> 
        <div className="text-center">
        {img ?
        <img className="ArticleImg" src={img}></img>:''

      }
      <ButtonGroup className="ArticleButtonGroup">
      <Button onClick={show}>{showcomm?"Hide Comments":"Show Comments"}</Button>
      <Button onClick={()=>addCommentAction(id)}>Add a Comment</Button>


      {
        loginUser!=author?'':<Button onClick={edit} id="editArticle">
        {isEdited? "Save" : "Edit"}</Button>   
      }
        </ButtonGroup>
      </div>
      </Media.Body>

      {addComment?<NewComment articleId={id}></NewComment>:""}
      <ListGroup>
        {
          showcomm?
          comments.sort((a, b) => {
          if (a.date == b.date) return 0
          else if (a.date > b.date) return -1
          else return 1
      }).map((item)=>(
          <Comment key={item.commentId} avatar={item.avatar} commentId={item.commentId} author={item.author} date={item.date} text={item.text} loginUser={loginUser} articleId={id} editComment={item.editComment}></Comment>)):''}
      
      </ListGroup>
      

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
      updateArticleAction:(text,id)=>dispatch(updateArticle(text,id)),
      addCommentAction:(id)=>dispatch(addnewComment(id))
      }
  }
  )(ArticleItem)

  