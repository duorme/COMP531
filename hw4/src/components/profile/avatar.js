import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
const Avatar=({img})=>{
	
	
	return(
		<div>
		<div>
		<img src={img} ></img><br/>
		<span>upload your profile</span>
		<input type="file"></input>
			</div>
		</div>
			)
}

Avatar.PropTypes={
    img: PropTypes.string.isRequired
}

export default connect(
	(state)=>{
		return{
			img:state.userInfo.myPic
		}
	},null
	)(Avatar)