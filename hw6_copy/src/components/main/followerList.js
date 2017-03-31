import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import Follower from './Follower'
import {follow} from './FollowerActions'
import {error} from '../../actions'

//Folower List and input to create new follower
const FollowerList=({follower,follow,error})=>{

	let input;
	const _addFollower=()=>{
		if(input && input.value){
			follow(input.value)
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
		follower:Object.keys(state.follower.followers).map((v)=>state.follower.followers[v])

	}
	},
	(dispatch)=>{
		return{
		follow:(text)=>dispatch(follow(text)),
		error:(text)=>dispatch(error(text))
	}
	}
	)(FollowerList)