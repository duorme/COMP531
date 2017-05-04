import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {go_To_Main} from '../../actions'
import FieldGroup from '../FieldGroup'
import {Button,Form} from 'react-bootstrap'
import {linkAccountWithUser} from './profileActions'
// component for login
let LinkForm = ({_linkAccountWithUser}) => {
	let name;
  let pass;

const onLogin=function(){
_linkAccountWithUser(name.value,pass.value)

}
	return (
		//Log in Form
	<div>
	<Form horizontal id="login" >
    <h2>Link Account</h2>
	<FieldGroup id= "loginusername" sm_title = {2} label="Your name" sm_input={5} inputRef={(ref)=>{name=ref;}} type="text"
	placeholder="Your name"></FieldGroup>
	<FieldGroup id= "loginpassword" sm_title = {2} label="password"  sm_input={5} type="password"
	placeholder="Your Password" inputRef={(ref)=>{pass=ref;}}></FieldGroup>

  </Form>
  <Button size="large" type="submit" id="Login" onClick={onLogin} className="col-md-offset-4">Link Account</Button> 
</div>
    )
}

LinkForm.PropTypes ={
  _Login:PropTypes.func.isRequired

}

export default connect(null,(dispatch)=>
 {return{
  _linkAccountWithUser:(name,pass)=>dispatch(linkAccountWithUser(name,pass))
}
})(LinkForm)