import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ButtonGroup,button} from 'react-bootstrap'
import {logOut,go_To_Profile} from './ArticleActions'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'

const ArticleList = ({logout,profile,articleList})=>{
	return(	
<div>
  <nav>
    <ButtonGroup>
  <button className="btn btn-primary" id="Main" onClick={logout}>Log Out</button>
    <button className="btn btn-primary" id="Profile" onClick={profile}>Profile</button>
    </ButtonGroup>
    
  </nav>

  <NewArticle></NewArticle>
  <ul className="articles">
  {articleList.map(({_id,text,date,img,comments,author})=>(
    <ArticleItem key={_id} id={_id} text={text} date={date} img={img} author={author}></ArticleItem>))}
  </ul>
    
  </div>
)
}
ArticleList.PropTypes={
  articleList: PropTypes.arrayOf(PropTypes.shape({
        ...ArticleItem.propTypes
    }).isRequired).isRequired
}

export default connect(
  (state)=>{
    return{
    articleList:state.articles
  }
  },
  (dispatch)=>{
    return{
      logout:()=>dispatch(logOut()),
      profile:()=>dispatch(go_To_Profile())
    }
  }

)(ArticleList)



