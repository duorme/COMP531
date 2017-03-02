import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import {updateHeadline,showHeadlineAlert} from './FollowerActions'
import Message from '../message'
// Brief profile of user. 
const Brief=({img,name,headline,updateHeadline,hmessage,showAlert})=>{
	let input;
	const updateText=()=>{
		if(input && input.value){
		updateHeadline(input.value)
		input.value=''
	}
	else{
		showAlert("headline can't be empty")
	}
	}
	return(
		<div>
		<div className="card">
		<img className="Mypic col-md-12" src={img} ></img>
			<h3 className="name col-md-offset-6">{name}</h3>
			<p className="headline col-md-offset-4 ">{headline}</p>
			<Message text={hmessage}></Message>
			<input ref={(node)=>{input=node;}} placeholder="update your headline"></input>
			<Button onClick={updateText} >update</Button>
			</div>
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
			img:state.User.userInfo.myPic,
			name:state.User.userInfo.myName,
			headline:state.User.userInfo.myHeadLine,
			hmessage:state.User.hmessage
		}
	},
	(dispatch)=>{
		return{
			updateHeadline:(text)=>dispatch(updateHeadline(text)),
			showAlert:(text)=>dispatch(showHeadlineAlert(text))
		}
	}
	)(Brief)