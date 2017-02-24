import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
// or
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'
let Landing = ({alert,onAlert,onchangeLocation}) => {

	let passWord;
	let passConfirm;

	// When onSubmit button of Register form is clicked, this function will validate data
	// If there's problem, "Alert" element would show up to alert user.
	const onRegisterClick = function(event){

		// event.preventDefault();
		// if(passWord.value != passConfirm.value){
		// 	onAlert("Password are not matched!")
		// 	return false
		// }
		// else{
		// 	onAlert('')
		// 	onchangeLocation()
		// 	return true
		// }

		
	}

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

	return (
		//Log in Form
	<div>

	<Form horizontal id="loggin" onSubmit={onchangeLocation}>
    <h1>Please Log In</h1>
	<FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "formHorizontalPassword" sm_title = {2} label="password"  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password"></FieldGroup>
    <FormGroup>
      <Col smOffset={2} sm={5}>
        <Button type="submit">
          Login
        </Button>
      </Col>
    </FormGroup>
    </Form>

    <span>{alert}</span>

    <Form horizontal id="Registration" onSubmit={onRegisterClick}>
    <h1>Registration</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "formHorizontalDisplayName" sm_title = {2} label="Display name" sm_input={5} required type="text"
	placeholder="Your Display name"></FieldGroup>
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5} required type="email"
	placeholder="t@gmail.com"></FieldGroup>
	<FieldGroup id= "formHorizontalTel" sm_title = {2} label="Tel" sm_input={5} type="tel" name="tel" 
	placeholder="xxx-xxx-xxxx" pattern="\d\d\d-\d\d\d-\d\d\d\d" required></FieldGroup>
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
Landing.PropTypes ={
	alert:PropTypes.string.isRequired,
	onAlert:PropTypes.func.isRequired

}

export default connect(
	(state)=>{
	return{
		alert:state.message
	}
},
(dispatch)=>
 {return{
 	onchangeLocation:()=>dispatch({type:'Go_To_Main'}),
	onAlert:(text)=>dispatch({type:'info',message:text})
}
})(Landing)

