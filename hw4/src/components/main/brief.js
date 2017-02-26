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
		<div>
		<img src={img}></img>
		<div>
			<span>{name}<br></br></span>
			<span>{headline}</span>
		</div>
			<input ref={(node)=>{input=node;}}></input>
			<Button onClick={updateText}>update</Button>
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