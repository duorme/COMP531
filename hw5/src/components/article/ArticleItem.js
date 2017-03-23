import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,Button,Col} from 'react-bootstrap'
import Comment from './Comment'
const ArticleItem = ({id,text,date,img,author,comments,showcomm,showCommAction})=>{
  const show=()=>{
    showCommAction(id)
  }
  return(   
    //Create Article card
  <div>
    <Media className="card">
      <Media.Left align="top" >
        <img className="postImg" src={img}/>
      </Media.Left>
      <Media.Body className="content">
        <Media.Heading>{author} {" "} said on {" "} {date}</Media.Heading>
        <p >{text}</p>      
      </Media.Body>
      <ButtonGroup>
      <Button onClick={show}>Show Comments</Button>
      <Button>Add a Comment</Button>
      <Button>Edit Post</Button>
      </ButtonGroup>

      <ul>
      {console.log('showcomm'+showcomm)}
        {showcomm?
          comments.map((item)=>(
          <Comment key={item.commentId} id={item.commentId} author={item.author} date={item.date} text={item.text}></Comment>)):''}
      
      </ul>

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

  