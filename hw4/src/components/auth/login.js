import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateUser,_Login} from './LandingAction'
import {go_To_Main} from '../../actions'

import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'

let Login = ({_Login}) => {
	let name;
  let pass;

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
const onLogin=function(){
_Login(name.value,pass.value)

}
	return (
		//Log in Form
	<div>
	<Form horizontal id="loggin" action="#" method="">
    <h1>Please Log In</h1>
	<FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required  inputRef={(ref)=>{name=ref;}} type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "formHorizontalPassword" sm_title = {2} label="password"  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password" inputRef={(ref)=>{pass=ref;}}></FieldGroup>
    </Form>
        <Button type="submit" onClick={onLogin} className="col-md-offset-4">
          Login
        </Button>
    </div>
    )
}

Login.PropTypes ={
  _Login:PropTypes.func.isRequired

}

export default connect(null,(dispatch)=>
 {return{
  _Login:(name,pass)=>dispatch(_Login(name,pass))
}
})(Login)