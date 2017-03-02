import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateUser} from './LandingAction'
import {go_To_Main} from '../../actions'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'

let Login = ({main,updateUser}) => {
	let name;

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
const _Login=function(){
	updateUser(name.value);
	main()

}
	return (
		//Log in Form
	<div>
	<Form horizontal id="loggin" onSubmit={_Login} action="#" method="">
    <h1>Please Log In</h1>
	<FieldGroup id= "formHorizontalUserName" sm_title = {2} label="Your name" sm_input={5} required  inputRef={(ref)=>{name=ref;}} type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "formHorizontalPassword" sm_title = {2} label="password"  sm_input={5} type="password" placeholder="Password" required
	placeholder="Your Password"></FieldGroup>
    </Form>
        <Button type="submit" onClick={_Login} className="col-md-offset-4">
          Login
        </Button>
    </div>
    )
}

Login.PropTypes ={
	main:PropTypes.func.isRequired,
	addUser:PropTypes.func.isRequired

}

export default connect(null,(dispatch)=>
 {return{
	main:()=>dispatch(go_To_Main()),
	updateUser:(name)=>dispatch(updateUser(name))
}
})(Login)