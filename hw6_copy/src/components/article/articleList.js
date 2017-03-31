import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ButtonGroup,button,Form,FormControl } from 'react-bootstrap'
import {searchArticles,showComment} from './ArticleActions'
import {go_To_Profile,logOut,resource,url} from '../../actions'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'

//create card list, pass showComment Action to each Article Item

const ArticleList = ({loginUser,articleList,search,showCommAction})=>{
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
  {articleList.map(({_id,text,avatar,date,img,comments,author,showcomm})=>(
    <ArticleItem key={_id} id={_id} text={text} avatar={avatar} date={date} img={img} author={author} comments={comments} showcomm={showcomm}
    showCommAction={showCommAction} loginUser={loginUser}></ArticleItem>))}
  </ul>
    
  </div>
)
}
ArticleList.PropTypes={
  articleList: PropTypes.arrayOf(PropTypes.shape({
        ...ArticleItem.propTypes
    }).isRequired).isRequired
}

export const getFilteredArticles=(articleList,filter)=>{

  // sort articleList first then filter
  const articles=Object.keys(articleList).map((o)=>articleList[o])
  const avatarList=articles.map((item)=>item.author)
 
      articles.sort((a, b) => {
          if (a.date == b.date) return 0
          else if (a.date > b.date) return -1
          else return 1
      })
      if (filter) {
          const reg = new RegExp(filter)
          return articles.filter((item) => reg.exec(item.author) || reg.exec(item.text))
      } else {
          return articles
      }
}

export default connect(
  (state)=>{
    return{
    articleList:getFilteredArticles(state.articles.articles,state.articles.filter),
    loginUser:state.User.username

  }
  },
  (dispatch)=>{
    return{
      logout:()=>dispatch(logOut()),
      profile:()=>dispatch(go_To_Profile()),
      search:(text)=>dispatch(searchArticles(text)),
      showCommAction:(id)=>dispatch(showComment(id))
    }
  }

)(ArticleList)

