import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
//Avatar of User
const Avatar=({img})=>{
	
	
	return(
		<div>
		<img src={img} ></img><br/>
		<span>upload your profile</span>
		<input type="file"></input>
			</div>
			)
}

Avatar.PropTypes={
    img: PropTypes.string.isRequired
}

export default connect(
	(state)=>{
		return{
			img:state.User.avatar
		}
	},null)(Avatar)