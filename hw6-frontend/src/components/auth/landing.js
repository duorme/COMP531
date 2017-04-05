import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Login from './login'
import Registration from './register'
//page for the landing
const Landing = () => {
	return(
		<div>
		<Login></Login>
		<Registration></Registration>
		</div>
		)	

}
export default Landing