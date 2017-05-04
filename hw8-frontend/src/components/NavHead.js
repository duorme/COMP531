import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media,ButtonGroup,button,Nav,Navbar,NavItem,Row,Col} from 'react-bootstrap'
import {logout} from './auth/LandingAction'
import {go_to_profile} from './profile/profileActions'
import {go_To_Main} from '../actions'
let NavHead=({logout,profile,main})=>{
	return(
		<div>
	<Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand >
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
  </div>
  )
}
export default connect(null,
  (dispatch)=>{
    return{
      logout:()=>dispatch(logout()),
      profile:()=>dispatch(go_to_profile()),
      main:()=>dispatch(go_To_Main())
    }
  }

)(NavHead)