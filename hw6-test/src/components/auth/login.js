import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateUser,_Login,loginFacebook,responseFacebook} from './LandingAction'
import {go_To_Main} from '../../actions'
import FieldGroup from '../FieldGroup'




import {Button,Form} from 'react-bootstrap'
// component for login
let Login = ({_Login}) => {
	let name;
  let pass;

const onLogin=function(){
_Login(name.value,pass.value)

}
	return (
		//Log in Form
	<div>
	<Form horizontal id="login" >
    <h1>Please Log In</h1>
	<FieldGroup id= "loginusername" sm_title = {2} label="Your name" sm_input={5} inputRef={(ref)=>{name=ref;}} type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "loginpassword" sm_title = {2} label="password"  sm_input={5} type="password"
	placeholder="Your Password" inputRef={(ref)=>{pass=ref;}}></FieldGroup>
  
    </Form>
    <Button size="large" type="submit" id="Login" onClick={onLogin} className="col-md-offset-4">
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