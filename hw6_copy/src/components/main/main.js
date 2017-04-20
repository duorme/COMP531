import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,button} from 'react-bootstrap'
import {logOut} from '../../actions'
import {go_to_profile} from '../profile/profileActions'
import ArticleList from '../article/articleList'
import Brief from './brief'
import FollowerList from './followerList'
import Message from '../message'
// main page with user brif,follower list and article list
const Main=({logout,profile,message})=>{
	return(
		<div  className="container-fluid">

		<header>
		<div className="container">
		<h1>Dear Diary</h1>
 	<ButtonGroup>
 <button className="btn" id="Main"  onClick={logout} >Log Out</button>
     <button className="btn" id="Profile" onClick={profile}>Profile</button>
     </ButtonGroup>
    </div>
		</header>
    
  <div className="row">
  <div className="col-md-4">
  <div className="col-md-12">
  <Brief></Brief>
  <Message text={message}></Message>
  <FollowerList></FollowerList>
  </div>
  </div>
  <div className="col-md-8">
	<ArticleList></ArticleList>
   </div>
		</div>
		</div>
		)
}
Main.PropTypes={
	logout:PropTypes.func.isRequired,
	profile:PropTypes.func.isRequired,
  message:PropTypes.string.isRequired
}

export default connect((state)=>{
  return{
    message:state.Location.error
  }},
  (dispatch)=>{
    return{
      logout:()=>dispatch(logOut()),
      profile:()=>dispatch(go_to_profile()),
    }
  }

)(Main)

