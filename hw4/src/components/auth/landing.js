import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateText, go_To_Main,addUser} from './LandingAction'
import {Button,Form,FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap'
import Login from './login'
import Registration from './register'
const Landing = () => {
	return(
		<div>
		<Login></Login>
		<Registration></Registration>
		</div>
		)	

}
export default Landing