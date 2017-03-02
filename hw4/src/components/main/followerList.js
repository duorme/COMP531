import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import Follower from './Follower'
import {addFollower} from './FollowerActions'
import {showAlert} from '../../actions'
import Message from '../message'
//Folower List and input to create new follower
const FollowerList=({follower,addFollower,message,showAlert})=>{
	let input;
	const _addFollower=()=>{
		if(input && input.value){
			addFollower(input.value)
			input.value=''
		}
		else{
			showAlert("Follower's name can't be empty")
		}
	}

	return(
		<div>
		<div className="card">
		<h3> Followers</h3>
		<ul>
		{follower.map(({id,img,name,headline})=>(
			<Follower key={id} id={id} img={img} name={name} headline={headline}></Follower>
		))}
		</ul>
		<Message text={message}></Message>
		<input ref={(node)=>{input=node}} placeholder="add a follower"></input>
		
		  <Button onClick={_addFollower}>Add</Button>
	
		</div>
		</div>
		)

}
FollowerList.PropTypes={
	followers:PropTypes.arrayOf(PropTypes.shape({
        ...Follower.propTypes
    }).isRequired).isRequired,
	addFollower:PropTypes.func.isRequired
}

export default connect(
	(state)=>{
		return{
		follower:state.follower.followers,
		message:state.User.message
	}
	},
	(dispatch)=>{
		return{
		addFollower:(text)=>dispatch(addFollower(text)),
		showAlert:(text)=>dispatch(showAlert(text))
	}
	}
	)(FollowerList)