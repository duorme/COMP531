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
		<div>
		<div className="card">
		<Grid>
		<Row>
		<Col md={2}>
		<Image className="Mypic" id='briefAvatar' src={img} rounded></Image>
		</Col>
		</Row>
		<Row>
		<Col xs={2} xsOffset={1}>
		<h3 id="main_username" className="name">{name}</h3>
		</Col>
		</Row>
		<Col>
		<p className="headline" id="headline">{headline}</p>
		</Col>
		
		<Row>
		<Col md={2} >
		<input ref={(node)=>{input=node;}} id="newHeadline" placeholder="update your headline"></input>

		</Col>
		<Col md={1}>
		<Button onClick={updateText} bsSize="xsmall" id="btn_updateHeadline">update</Button>
		</Col>
		
		</Row>
		</Grid>
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