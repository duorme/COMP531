import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {Col} from 'react-bootstrap'
const Profile = ()=>{
	return(
	
		<div className="container-fluid">
		<div className="row">
		<Col>
			<Avatar className="col-md-2"></Avatar>
			</Col>
		<Col>
			<ProfileForm className="col-md-5 col-md-offset-4"></ProfileForm>
			</Col>
		</div>
		</div>
	)
}
export default Profile