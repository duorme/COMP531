import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
const Profile = ()=>{
	return(
	
		<div className="container-fluid">
		<div className="row">
			<Avatar className="col-md-4"></Avatar>
			<ProfileForm className="col-md-8"></ProfileForm>
		</div>
		</div>
	)
}
export default Profile