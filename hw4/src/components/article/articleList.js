import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ButtonGroup,button} from 'react-bootstrap'
import {logOut,go_To_Profile,searchArticles} from './ArticleActions'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'

const ArticleList = ({logout,profile,articleList,search})=>{
  let input;
  const _search=()=>{
    if(input){
      search(input.value)
    }
  }
	return(	
<div>
  <nav>
    <ButtonGroup>
  <button className="btn btn-primary" id="Main" onClick={logout}>Log Out</button>
    <button className="btn btn-primary" id="Profile" onClick={profile}>Profile</button>
    </ButtonGroup>
    
  </nav>

  <NewArticle></NewArticle>
  <input ref={(node)=>input=node} onChange={_search}></input>
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

const getFilteredArticles=(articleList,filter)=>{
  if(filter){
    const reg=new RegExp(filter)
    return articleList.filter((item)=>reg.exec(item.author) || reg.exec(item.text))
  }
  else{
    return articleList
  }

}

export default connect(
  (state)=>{
    return{
    articleList:getFilteredArticles(state.articles,state.filter)
  }
  },
  (dispatch)=>{
    return{
      logout:()=>dispatch(logOut()),
      profile:()=>dispatch(go_To_Profile()),
      search:(text)=>dispatch(searchArticles(text))
    }
  }

)(ArticleList)



