import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Form,Panel,ListGroup,ListGroupItem,HelpBlock} from 'react-bootstrap'
import {validation} from './profileActions'
import Message from '../message'
import FieldGroup from '../FieldGroup'
//Component to show the profile and change the data
let ProfileForm = ({Error,success,userInfo,updateProfile}) => {

	let passWord;
	let zipcode;
	let email;
	let passConfirm
const onUpdateClick = function() {
	const information={
		password:passWord.value,
		zipcode:zipcode.value,
		email:email.value,
		passConfirm:passConfirm.value
	}
	passWord.value=''
	zipcode.value=''
	email.value=''
	passConfirm.value=''
	updateProfile(information,userInfo)

}
	return (
		//Log in Form
	<div>
    <Message text={Error}></Message>
    <Message text={success}></Message>

    <Form horizontal id="Registration"  action="#" method="">
    <h1>Update Profile</h1>
    <FieldGroup sm_title = {2} label="Your name" sm_input={5} type="text"
	value={userInfo.username} disabled></FieldGroup>	
	<FieldGroup id= "profileEmail" sm_title = {2} label="Email" sm_input={5}  type="email"
	 inputRef={(ref)=>{email=ref;}} placeholder={userInfo.email}></FieldGroup>
	<FieldGroup  sm_title = {2} label="Birthday" sm_input={5} type="text" disabled
	name="date"   value={userInfo.dob}></FieldGroup>
	<FieldGroup id= "profileZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	 inputRef={(ref)=>{zipcode=ref;}} placeholder={userInfo.zipcode}></FieldGroup>
    <FieldGroup id="profilePassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" 
	placeholder="Your Password" ></FieldGroup>
	<FieldGroup id= "profilePassConfirm" sm_title = {2} label="Password" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Password" 
	placeholder="Your Password Confirm" ></FieldGroup>

  </Form>
  	<Button type="submit" onClick={onUpdateClick} id="submitProfile" className="col-md-offset-3">
         Update
     </Button>

  </div>
);
}
ProfileForm.PropTypes ={
	userInfo:PropTypes.object.isRequired,
	validation:PropTypes.func.isRequired

}



export default connect(
	(state)=>{
	return{
		Error:state.Location.error,
		success:state.Location.success,
		userInfo:state.User
	}
},
(dispatch)=>{
	return {updateProfile:(information,userInfo)=> dispatch(validation(information,userInfo))
	}
}
)(ProfileForm)

  