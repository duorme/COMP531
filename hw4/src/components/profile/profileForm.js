import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col,Panel,ListGroup,ListGroupItem,HelpBlock} from 'react-bootstrap'
import {validation} from './profileActions'
import Message from '../message'
//Send data to validate.
let ProfileForm = ({message,userInfo,updateProfile}) => {

	let passWord;
	let passConfirm;
	let birthday;
	let name;
	let displayName;
	let zipcode;
	let tel;
	let email;

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
		passConfirm:passConfirm.value,
		birthday:birthday.value,
		myName:name.value,
		displayName:displayName.value,
		zipcode:zipcode.value,
		tel:tel.value,
		email:email.value
	}
	updateProfile(information,userInfo)
}
	return (
		//Log in Form
	<div>
    <Message text={message}></Message>

    <Form horizontal id="Registration" onSubmit={onUpdateClick} action="#" method="">
    <h1>Update Profile</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} type="text"
	placeholder="Your name" inputRef={(ref)=>{name=ref;}} current={userInfo.myName}></FieldGroup>	

	<FieldGroup id= "formHorizontalDisplayName" sm_title = {2} label="Display name" sm_input={5}  type="text"
	placeholder="Your Display name" inputRef={(ref)=>{displayName=ref;}} current={userInfo.displayName}></FieldGroup>	
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5}  type="email"
	placeholder="t@gmail.com" inputRef={(ref)=>{email=ref;}} current={userInfo.email}></FieldGroup>
	<FieldGroup id= "formHorizontalTel" sm_title = {2} label="Tel" sm_input={5} type="tel" name="tel" 
	placeholder="xxx-xxx-xxxx" pattern="\d\d\d-\d\d\d-\d\d\d\d"  inputRef={(ref)=>{tel=ref;}} current={userInfo.tel}></FieldGroup>
	<FieldGroup id= "formHorizontalBirth" sm_title = {2} label="Birthday" sm_input={5} type="date" disabled
	name="date" inputRef={(ref)=>{birthday=ref;}}  value={userInfo.birthday}></FieldGroup>
	<FieldGroup id= "formHorizontalZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	placeholder="77005" pattern = "^\d{5}$"  inputRef={(ref)=>{zipcode=ref;}} current={userInfo.zipcode}></FieldGroup>
    <FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" 
	placeholder="Your Password" current={userInfo.password}></FieldGroup>
	<FieldGroup id= "formHorizontalConfirmation" sm_title = {2} label="Confirmation" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Confirmation Password" 
	placeholder="Your Password" current={userInfo.passConfirm}></FieldGroup>
    <FormGroup>
      <Col smOffset={2} sm={5}>
        <Button type="submit">
          Update
        </Button>
      </Col>
    </FormGroup>
  </Form>
  

  </div>
);
}
ProfileForm.PropTypes ={
	message:PropTypes.string.isRequired,
	userInfo:PropTypes.object.isRequired,
	validation:PropTypes.func.isRequired

}



export default connect(
	(state)=>{
	return{
		message:state.User.message,
		userInfo:state.User.userInfo
	}
},
(dispatch) => ({
	updateProfile:(information,userInfo)=>dispatch(validation(information,userInfo))
})
)(ProfileForm)