import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {Col,button} from 'react-bootstrap'
import {go_To_Main} from '../../actions'
//Edit Profile, validate it and then save to state
const Profile = ({main})=>{
	return(
	
		<div className="container-fluid">
		<header>
		<div className="container">
		<h1>Dear Diary</h1>
 <button className="btn" id="Main"  onClick={main} >Go To Main</button>
    </div>
		</header>
		<div className="row">
		  <div className="col-md-3 col-md-offset-1">
		  <br/>
			<Avatar className="col-md-12 "></Avatar>
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
	main:()=>dispatch(go_To_Main())
}})(Profile)