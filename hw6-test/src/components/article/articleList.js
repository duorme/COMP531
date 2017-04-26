import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ButtonGroup,button,Form,FormControl,Col,Row} from 'react-bootstrap'
import {searchArticles} from './ArticleActions'
import {go_To_Profile,logOut,resource,url} from '../../actions'
import ArticleItem  from './ArticleItem'
import NewArticle from './newArticle'



//create card list, pass showComment Action to each Article Item

const ArticleList = ({loginUser,articleList,search,avatars})=>{
  let input;
  // search article based on filter
  const _search=()=>{
    if(input){
      search(input.value)
    }
  }
	return(	
<div>
<Col xsOffset={1}>
<NewArticle></NewArticle>
</Col>
<Col xsOffset={1}>
<Form>
<FormControl  className="search" inputRef={(ref)=>{input=ref;}} placeholder="search" onChange={_search}></FormControl >
</Form>
</Col>
<Col>
<ul>
{
  articleList.map((c)=>(
    <ArticleItem key={c._id} id={c._id} text={c.text}  avatar={c.avatar} date={c.date} img={c.img} author={c.author} comments={c.comments} showcomm={c.showcomm}
    loginUser={loginUser} isEdited={c.isEdited} addComment={c.addComment}></ArticleItem>))}
  </ul>
  </Col>
  </div>
)
}
ArticleList.PropTypes={
  articleList: PropTypes.arrayOf(PropTypes.shape({
        ...ArticleItem.propTypes
    }).isRequired).isRequired
}

export const getFilteredArticles=(articleList,filter,avatars)=>{

  // sort articleList first then filter
  var articles=Object.keys(articleList).map((o)=>articleList[o])
  articles.sort((a, b) => {
      if (a.date == b.date) return 0
      else if (a.date > b.date) return -1
      else return 1
  })
  if (filter) {
      const reg = new RegExp(filter)
      articles = articles.filter((item) => reg.exec(item.author) || reg.exec(item.text))
  }
  articles = articles.map((r)=>{
    return {...r,avatar:avatars[r.author],comments:r.comments.map((c)=>{
      return {...c,avatar:avatars[c.author]}
    })}})
  return articles
}

export default connect(
  (state)=>{
    return{
    articleList:getFilteredArticles(state.articles.articles,state.articles.filter,state.articles.avatars),
    loginUser:state.User.username,
    avatars:state.articles.avatars

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

