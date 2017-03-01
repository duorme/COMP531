import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,Button,Col} from 'react-bootstrap'
const ArticleItem = ({text,date,img,author})=>{
  return(   
  <div>
    <Media className="card">
      <Media.Left align="top" >
        <img className="postImg" src={img}/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>{author} {" "} said on {" "} {date}</Media.Heading>
        <p>{text}</p>      
      </Media.Body>
      <ButtonGroup>
      <Button>Show Comments</Button>
      <Button>Add a Comment</Button>
      <Button>Edit Post</Button>
      </ButtonGroup>
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

  