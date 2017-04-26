import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button,Row,Col,Grid,Image} from 'react-bootstrap'
import {updateHeadline} from '../profile/profileActions'
import {error} from '../../actions'
// Brief profile of user. 
const Brief=({img,name,headline,updateHeadline,error})=>{
	let input;
	const updateText=()=>{
		if(input && input.value){
		updateHeadline(input.value)
		input.value=''
	}
	else{
		error("headline can't be empty")
	}
	}
	return(

		<div className="card">

		<Image className="briefPic center-block"  src={img} rounded></Image>

		<h3 id="main_username" className="name text-center">{name}</h3>
		<p className="headline text-center " id="headline">{headline}</p>
		<input className="center-block" ref={(node)=>{input=node;}} id="newHeadline" placeholder="update your headline"></input>

		<Button className="center-block" onClick={updateText} bsSize="xsmall" id="btn_updateHeadline">update</Button>
		</div>
		)
}

Brief.PropTypes={
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default connect(
	(state)=>{
		return{
			img:state.User.avatar,
			name:state.User.username,
			headline:state.User.headline
		}
	},
	(dispatch)=>{
		return{
			updateHeadline:(text)=>dispatch(updateHeadline(text)),
			error:(text)=>dispatch(error(text))
		}
	}
	)(Brief)