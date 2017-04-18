import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,button,Nav,Navbar,NavItem,Row,Col} from 'react-bootstrap'
import {logout} from '../auth/LandingAction'
import {go_to_profile} from '../profile/profileActions'
import ArticleList from '../article/articleList'
import Brief from './brief'
import FollowerList from './followerList'
import Message from '../message'
import {go_To_Main} from '../../actions'
// main page with user brif,follower list and article list
const Main=({logout,profile,message,main})=>{
	return(
		<div  className="container-fluid">

		  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Rice Book</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
      
        <NavItem eventKey={1} onClick={()=>main()}>Main</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} onClick={()=>profile()}>Edit Profile</NavItem>
          <NavItem eventKey={2} onClick = {()=>logout()}>Log Out</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    
  <Row className="row">
  <Col xs={3} md={3}>
  <Brief></Brief>
  <Message text={message}></Message>
  <FollowerList></FollowerList>
  </Col>
  <Col xs={7} md={7}>
	<ArticleList></ArticleList>
  </Col>
		</Row>
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
      logout:()=>dispatch(logout()),
      profile:()=>dispatch(go_to_profile()),
      main:()=>dispatch(go_To_Main())
    }
  }

)(Main)

