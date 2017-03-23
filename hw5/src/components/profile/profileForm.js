import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col,Panel,ListGroup,ListGroupItem,HelpBlock} from 'react-bootstrap'
import {validation} from './profileActions'
import Message from '../message'
//Component to show the profile and change the data
let ProfileForm = ({Error,success,userInfo,updateProfile}) => {

	let passWord;
	let zipcode;
	let email;
	let passConfirm

	function FieldGroup({ id, sm_title,label,sm_input,current,...props }) {
  	return (
  	<FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={sm_title}>
        {label}
      </Col>
      <Col sm={sm_input}>
        <FormControl {...props}/>
      </Col>
      <HelpBlock>{current}</HelpBlock>
    </FormGroup>
  );
}
const onUpdateClick = function() {
	event.preventDefault();
	const information={
		password:passWord.value,
		zipcode:zipcode.value,
		email:email.value,
		passConfirm:passConfirm.value
	}
	updateProfile(information,userInfo)
}
	return (
		//Log in Form
	<div>
    <Message text={Error}></Message>
    <Message text={success}></Message>

    <Form horizontal id="Registration"  action="#" method="">
    <h1>Update Profile</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} type="text"
	value={userInfo.username} disabled></FieldGroup>	
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5}  type="email"
	placeholder="your email" inputRef={(ref)=>{email=ref;}} current={userInfo.email}></FieldGroup>
	<FieldGroup id= "formHorizontalBirth" sm_title = {2} label="Birthday" sm_input={5} type="text" disabled
	name="date"   value={userInfo.dob}></FieldGroup>
	<FieldGroup id= "formHorizontalZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	placeholder="Zipcode xxxxx" pattern = "^\d{5}$"  inputRef={(ref)=>{zipcode=ref;}} current={userInfo.zipcode}></FieldGroup>
    <FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" 
	placeholder="Your Password" ></FieldGroup>
	<FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Password" 
	placeholder="Your Password Confirm" ></FieldGroup>
	<Button type="submit" onClick={onUpdateClick} className="col-md-offset-3">
         Update
     </Button>
  </Form>
  

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

  