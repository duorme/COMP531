import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateText, go_To_Main,addUser} from './LandingAction'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'
let Registration = ({message,onAlert,addUser}) => {

	let passWord;
	let passConfirm;
	let birthday;

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
	addUser(name.value)
	onAlert(passWord.value,passConfirm.value,birthday.value)
}
	return (
		//Log in Form
	<div>
    <span>{message}</span>

    <Form horizontal id="Registration" onSubmit={onRegisterClick} action="#" method="">
    <h1>Registration</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "formHorizontalDisplayName" sm_title = {2} label="Display name" sm_input={5} required type="text"
	placeholder="Your Display name"></FieldGroup>
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5} required type="email"
	placeholder="t@gmail.com"></FieldGroup>
	<FieldGroup id= "formHorizontalTel" sm_title = {2} label="Tel" sm_input={5} type="tel" name="tel" 
	placeholder="xxx-xxx-xxxx" pattern="\d\d\d-\d\d\d-\d\d\d\d" required></FieldGroup>
	<FieldGroup id= "formHorizontalBirth" sm_title = {2} label="Birthday" sm_input={5} type="date" 
	placeholder="MM-DD-YYYY" name="date" inputRef={(ref)=>{birthday=ref;}} required></FieldGroup>

	<FieldGroup id= "formHorizontalZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	placeholder="77005" pattern = "^\d{5}$" required></FieldGroup>


    <FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password"></FieldGroup>
	<FieldGroup id= "formHorizontalConfirmation" sm_title = {2} label="Confirmation" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Confirmation Password" required
	placeholder="Your Password"></FieldGroup>

    <FormGroup>
      <Col smOffset={2} sm={5}>
        <Button type="submit">
          Registrate
        </Button>
      </Col>
    </FormGroup>
  </Form>


  </div>
);
}
Registration.PropTypes ={
	message:PropTypes.string.isRequired,
	onAlert:PropTypes.func.isRequired,
	addUser:PropTypes.func.isRequired

}

export default connect(
	(state)=>{
	return{
		message:state.message
	}
},
(dispatch)=>
 {return{
	onAlert:(text1,text2)=>dispatch(updateText(text1,text2)),
	addUser:(name)=>dispatch(addUser(name))
}
})(Registration)


