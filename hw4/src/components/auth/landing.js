import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
// or
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'
let Landing = ({location,alert,onAlert,onchangeLocation}) => {
	let passWord;
	let passConfirm;
	const onRegisterClick = function(event){

		event.preventDefault();
		if(passWord.value != passConfirm.value){
			onAlert("Password are not matched!")
			return false
		}
		else{
			onAlert('')
			onchangeLocation()
			return true
		}
		
	}
	if(alert != ''){
		var status = <div>
                     {alert}
                   </div>;
	}

	return (
		//Log in Form
		<div>
	  <Form horizontal id="loggin">
  <h1>Please Log In</h1>
  <FormGroup controlId="formHorizontalUserName">
      <Col componentClass={ControlLabel} sm={2}>
        User Name
      </Col>
      <Col sm={5}>
        <FormControl type="text" placeholder="Your name" required/>
      </Col>
    </FormGroup>


    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={5}>
        <FormControl type="password" placeholder="Password" required/>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={5}>
        <Button type="submit">
          Login
        </Button>
      </Col>
    </FormGroup>
  </Form>

  {status}

  <Form horizontal id="Registration" onSubmit={onRegisterClick}>
  <h1>Registration</h1>
  <FormGroup controlId="formHorizontalUserName">
      <Col componentClass={ControlLabel} sm={2}>
        User Name
      </Col>
      <Col sm={5}>
        <FormControl type="text" placeholder="Your name" required/>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={5}>
        <FormControl type="email" placeholder="Email" required/>
      </Col>
    </FormGroup>

    
    <FormGroup controlId="formHorizontalZipcode">
      <Col componentClass={ControlLabel} sm={2}>
        Zipcode
      </Col>
      <Col sm={5}>
        <FormControl type="text" placeholder="77005" pattern = "^\d{5}$" required />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={5}>
        <FormControl type="password" placeholder="Password" inputRef={(ref)=>{passWord=ref;}} required/>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPasswordConfirmation">
      <Col componentClass={ControlLabel} sm={2}>
        Confirmation
      </Col>
      <Col sm={5}>
        <FormControl type="password" placeholder="Password Confirmation" inputRef={(ref)=>{passConfirm=ref;}} required/>
      </Col>
    </FormGroup>

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
		location:state.location,
		alert:state.message
	}
},
(dispatch)=>
 {return{
 	onchangeLocation:()=>dispatch({type:'Go_To_Main'}),
	onAlert:(text)=>dispatch({type:'info',message:text})
}
})(Landing)

