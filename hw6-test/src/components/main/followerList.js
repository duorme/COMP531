import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button,Col,Row} from 'react-bootstrap'
import Follower from './Follower'
import {follow} from './FollowerActions'
import {error} from '../../actions'

//Folower List and input to create new follower
const FollowerList=({follower,follow,error})=>{

	let input;
	const _addFollower=()=>{
		if(input && input.value){
			follow(input.value,follower)
			input.value=''
		}
		else{
			error("Follower's name can't be empty")
		}
	}
	return(
		<div>
		<div className="card">
		<h3> Followers</h3>
		<ul>
		{
			follower.map(({avatar,author,headline})=>(			
			<Follower key={author} id={author} avatar={avatar} author={author} headline={headline}></Follower>
		))}
		</ul>
		<Row>
		<Col md={2} mdOffset={1}>
		<input ref={(node)=>{input=node}} placeholder="add a follower" id="newFollower"></input>
		</Col>
		<Col md={1} mdOffset={4}>
		  <Button onClick={_addFollower} bsSize="xsmall" id="btn_addfollower">Add</Button>
		</Col>
		</Row>
	
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
		follower:Object.keys(state.follower.followers).map((v)=>state.follower.followers[v])

	}
	},
	(dispatch)=>{
		return{
		follow:(text,follower)=>dispatch(follow(text,follower)),
		error:(text)=>dispatch(error(text))
	}
	}
	)(FollowerList)