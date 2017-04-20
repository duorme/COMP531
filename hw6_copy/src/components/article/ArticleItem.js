import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,Button,Col,ListGroup} from 'react-bootstrap'
import Comment from './Comment'
const ArticleItem = ({id,text,date,avatar,img,author,comments,showcomm,showCommAction,isEdited,loginUser,editArticle})=>{
  const show=()=>{
    showCommAction(id)
  }
  const edit=()=>{
    editArticle(id)
  }
  return(   
    //Create Article card
  <div>
    <Media className="card">
      <Media.Left align="top" >
        <img className="postImg" src={avatar}/>
      </Media.Left>
      <Media.Body className="content">
        <Media.Heading>{author} {" "} said on {" "} {date}</Media.Heading>
        <p contentEditable={isEdited}>{text}</p>
        <img src={img}></img>   
      </Media.Body>
      <Col xsOffset={4}/>
      <ButtonGroup>
      <Button onClick={show}>Show Comments</Button>
      <Button>Add a Comment</Button>
      {
        loginUser!=author?'':<Button onClick={edit}>Edit Post</Button>   
      }
        </ButtonGroup>

      <ListGroup>
        {showcomm?
          comments.map((item)=>(
          <Comment key={item.commentId} id={item.commentId} author={item.author} date={item.date} text={item.text}></Comment>)):''}
      
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

export default ArticleItem

  