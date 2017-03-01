import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col,Panel,ListGroup,ListGroupItem} from 'react-bootstrap'
let ProfileForm = ({message,userInfo,validation,updateUser}) => {
	console.log(userInfo)

	let passWord;
	let passConfirm;
	let birthday;
	let name;
	let displayName;
	let zipcode;
	let tel;
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
const onUpdateClick = function() {
	event.preventDefault();
	const information={
		password:passWord.value,
		passConfirm:passConfirm.value,
		birthday:birthday.value,
		name:name.value,
		displayName:displayName.value,
		zipcode:zipcode.value,
		tel:tel.value,
		email:email.value
	}
	addUser(information);
	validation(information)
}
	return (
		//Log in Form
	<div>
    <div>{message}</div>

    <Form horizontal id="Registration" onSubmit={onUpdateClick} action="#" method="">
    <h1>Update Profile</h1>
    <FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required type="text"
	placeholder="Your name" inputRef={(ref)=>{name=ref;}}></FieldGroup>
	<span>{userInfo.myName}</span>
	<FieldGroup id= "formHorizontalDisplayName" sm_title = {2} label="Display name" sm_input={5} required type="text"
	placeholder="Your Display name" inputRef={(ref)=>{displayName=ref;}}></FieldGroup>
	<FieldGroup id= "formHorizontalEmail" sm_title = {2} label="Email" sm_input={5} required type="email"
	placeholder="t@gmail.com" inputRef={(ref)=>{email=ref;}}></FieldGroup>
	<FieldGroup id= "formHorizontalTel" sm_title = {2} label="Tel" sm_input={5} type="tel" name="tel" 
	placeholder="xxx-xxx-xxxx" pattern="\d\d\d-\d\d\d-\d\d\d\d" required inputRef={(ref)=>{tel=ref;}}></FieldGroup>
	<FieldGroup id= "formHorizontalBirth" sm_title = {2} label="Birthday" sm_input={5} type="date" 
	placeholder="MM-DD-YYYY" name="date" inputRef={(ref)=>{birthday=ref;}} required></FieldGroup>

	<FieldGroup id= "formHorizontalZipcode" sm_title = {2} label="Zipcode" sm_input={5} type="text" 
	placeholder="77005" pattern = "^\d{5}$" required inputRef={(ref)=>{zipcode=ref;}}></FieldGroup>


    <FieldGroup id= "formHorizontalPassword" sm_title = {2} label="Password" inputRef={(ref)=>{passWord=ref;}}  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password"></FieldGroup>
	<FieldGroup id= "formHorizontalConfirmation" sm_title = {2} label="Confirmation" inputRef={(ref)=>{passConfirm=ref;}}  sm_input={5} type="password" placeholder="Confirmation Password" required
	placeholder="Your Password"></FieldGroup>

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
	validation:PropTypes.func.isRequired,
	updateUser:PropTypes.func.isRequired

}

export default connect(
	(state)=>{
	return{
		message:state.message,
		userInfo:state.userInfo
	}
},
(dispatch)=>
 {return{
	validation:(information)=>dispatch(validation(information)),
	updateUser:(info)=>dispatch(updateUser(info))
}
})(ProfileForm)

 //   myPic:'',
		// myName:'',
		// myHeadLine:'JS learner',
		// password:'aa',
		// passConfirm:'aa',
		// birthday:'1994-01-07',
		// displayName:'Honey',
		// zipcode:'77005',
		// tel:'8888888888',
		// email:'t@rice.edu'
