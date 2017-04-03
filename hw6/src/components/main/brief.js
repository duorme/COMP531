import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
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
		<div>
		<div className="card">
		<img className="Mypic col-md-12" id='briefAvatar' src={img}></img>
			<h3 id="main_username" className="name col-md-offset-6">{name}</h3>
			<p className="headline col-md-offset-4 ">{headline}</p>
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