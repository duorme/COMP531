import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {validation} from './LandingAction'
import { go_To_Main,addUser} from '../../actions'
import Message from '../message'
import FieldGroup from '../FieldGroup'
import {Button,Form} from 'react-bootstrap'
// Get input from Form, validate data and then save to state.
let Registration = ({message,validation,addUser}) => {

	let password;
	let passConfirm;
	let dob;
	let username;
	let zipcode;
	let email;

const onRegisterClick = function() {
	const information={
		password:password.value,
		passConfirm:passConfirm.value,
		dob:dob.value,
		username:username.value,
		zipcode:zipcode.value,
		email:email.value
	}
	validation(information)
}
	return (
		//Log in Form

	<div>
   <Message text={message} id="registerMessage"></Message>
    <Form horizontal id="Registration">
    <h1>Registration</h1>
    <FieldGroup sm_title = {2} id="registerName" label="Your name" sm_input={5}  type="text"
	placeholder="Your name" inputRef={(ref)=>{username=ref;}}></FieldGroup>
	<FieldGroup  sm_title = {2} label="Email" id="emailAddress" sm_input={5} type="email"
	placeholder="t@gmail.com" inputRef={(ref)=>{email=ref;}}></FieldGroup>
	<FieldGroup sm_title = {2} label="Birthday" id="registerdob" sm_input={5} type="date" 
	placeholder="MM-DD-YYYY" name="date" inputRef={(ref)=>{dob=ref;}}></FieldGroup>
	<FieldGroup  sm_title = {2} label="Zipcode" id="registerZipcode" sm_input={5} type="text" 
	placeholder="77005" pattern = "^\d{5}$" inputRef={(ref)=>{zipcode=ref;}}></FieldGroup>
    <FieldGroup  sm_title = {2} label="Password" id="registerPassword" inputRef={(ref)=>{password=ref;}}  sm_input={5} type="password" placeholder="Password"
	placeholder="Your Password"></FieldGroup>
	<FieldGroup  sm_title = {2} label="Confirmation" id="registerConfirmation"inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Confirmation Password" 
	placeholder="Your Password"></FieldGroup>
   
  </Form>
    <Button type="submit" onClick={onRegisterClick} id="submitBtn" className="col-md-offset-4">
          Register
    </Button>
  </div>
);
}
Registration.PropTypes ={
	message:PropTypes.string.isRequired
}

export default connect(
	(state)=>{
	return{
		message:state.Location.error
	}
},
(dispatch)=>
 {return{
	validation:(information)=>dispatch(validation(information))
}
})(Registration)


