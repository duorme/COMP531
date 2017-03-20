import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ButtonGroup,button,Form,FormControl } from 'react-bootstrap'
import {searchArticles} from './ArticleActions'
import {logOut} from '../../actions'
import {go_To_Profile} from '../../actions'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'

const ArticleList = ({articleList,search})=>{
  let input;
  // search article based on filter
  const _search=()=>{
    if(input){
      search(input.value)
    }
  }
	return(	
<div>


  <NewArticle></NewArticle>
  <Form className="col-md-8 col-md-offset-1">
  <FormControl  className="search" inputRef={(ref)=>{input=ref;}} placeholder="search" onChange={_search}></FormControl >
  </Form>
  <ul className="articles col-md-8 col-md-offset-1">

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
  let articles = Object.keys(articleList).map((id) => articleList[id])
  if(filter){
    const reg=new RegExp(filter)
    return articles.filter((item)=>reg.exec(item.author) || reg.exec(item.text))
  }
  else{
    return articles
  }
}
export default connect(
  (state)=>{
    return{
    articleList:getFilteredArticles(state.articles.articles,state.articles.filter)
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



