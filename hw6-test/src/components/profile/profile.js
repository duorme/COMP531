import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {logout} from '../auth/LandingAction'
import {Col,button,Navbar,Nav,NavItem} from 'react-bootstrap'
import {go_To_Main} from '../../actions'
//Edit Profile, validate it and then save to state
const Profile = ({main,logout})=>{
	return(
	
		<div className="container-fluid">

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
		<div className="row">
		  <div className="col-md-3 col-md-offset-1">
		  <br/>
			<Avatar className="col-md-12"></Avatar>
			</div>
			<div  className="col-md-6 col-md-offset-1">
			<ProfileForm className="col-md-12"></ProfileForm>
			</div>
		</div>
		</div>
	)
}
export default connect(null,
	(dispatch) => {return {
	logout:()=>dispatch(logout()), 
	main:()=>dispatch(go_To_Main())
}})(Profile)