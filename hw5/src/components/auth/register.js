import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {validatoin} from './LandingAction'
import { go_To_Main,addUser} from '../../actions'
import Message from '../message'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'
// Get input from Form, validate data and then save to state.
let Registration = ({message,validation,addUser}) => {

	let passWord;
	let passConfirm;
	let dob;
	let username;
	let zipcode;
	let email;

	function FieldGroup({ id, sm_title,label,sm_input ,...props }) {
  	return (
  	<FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={sm_title}>
        {label}
      </Col>
      <Col sm={sm_input}>
        <FormControl {...props}/>
      </Col>
    </FormGroup>
  );
}
const onRegisterClick = function() {
	const information={
		password:passWord.value,
		passConfirm:passConfirm.value,
		dob:dob.value,
		usernname:name.value,
		zipcode:zipcode.value,
		email:email.value
	}
	validation(information)
}
	return (
		//Log in Form

	<div>
   <Message text={message}></Message>
    <Form horizontal id="Registration">
    <h1>Registration</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required type="text"
	placeholder="Your name" inputRef={(ref)=>{username=ref;}}></FieldGroup>
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5} required type="email"
	placeholder="t@gmail.com" inputRef={(ref)=>{email=ref;}}></FieldGroup>
	<FieldGroup id= "formHorizontalBirth" sm_title = {2} label="Birthday" sm_input={5} type="date" 
	placeholder="MM-DD-YYYY" name="date" inputRef={(ref)=>{dob=ref;}} required></FieldGroup>
	<FieldGroup id= "formHorizontalZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	placeholder="77005" pattern = "^\d{5}$" required inputRef={(ref)=>{zipcode=ref;}}></FieldGroup>
    <FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password"></FieldGroup>
	<FieldGroup id= "formHorizontalConfirmation" sm_title = {2} label="Confirmation" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Confirmation Password" required
	placeholder="Your Password"></FieldGroup>

    
  </Form>
        <Button type="submit" onClick={onRegisterClick} className="col-md-offset-4">
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


