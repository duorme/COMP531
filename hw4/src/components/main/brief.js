import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import {updateHeadline} from './FollowerActions'

const Brief=({img,name,headline,updateHeadline})=>{
	let input;
	const updateText=()=>{
		if(input && input.value){
		updateHeadline(input.value)
		input.value=''
	}
	}
	return(
		<div>
		<div className="card">
		<img className="Mypic col-md-12" src={img} ></img>
			<h3 className="name col-md-offset-6">{name}</h3>
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
			img:state.userInfo.myPic,
			name:state.userInfo.myName,
			headline:state.userInfo.myHeadLine
		}
	},
	(dispatch)=>{
		return{
			updateHeadline:(text)=>dispatch(updateHeadline(text))
		}
	}
	)(Brief)