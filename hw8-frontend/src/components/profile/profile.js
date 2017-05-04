import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {Col,Button,Navbar,Nav,NavItem} from 'react-bootstrap'
import LinkForm from './LinkForm'
import {unlinkFb} from './profileActions'
import NavHead from '../NavHead'
//Edit Profile, validate it and then save to state
const Profile = ({main,logout,_unlinkFb})=>{
	return(
	
		<div className="container-fluid">

		<NavHead></NavHead>
		<div className="row">
		  <div className="col-md-3 col-md-offset-1">
		  <br/>
			<Avatar className="col-md-12"></Avatar>
			</div>
			<div  className="col-md-6 col-md-offset-1">
			
			<ProfileForm className="col-md-12"></ProfileForm>
			</div>
			

		</div>
		<LinkForm></LinkForm>

		<Button onClick={_unlinkFb}>Unlink With Facebook</Button>
		</div>
	)
}
export default connect(null,
	(dispatch) => {return {
	logout:()=>dispatch(logout()), 
	main:()=>dispatch(go_To_Main()),
	_unlinkFb:()=>dispatch(unlinkFb())
}})(Profile)