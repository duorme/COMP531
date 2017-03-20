import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import Follower from './Follower'
import {addFollower} from './FollowerActions'
import {error} from '../../actions'

//Folower List and input to create new follower
const FollowerList=({follower,addFollower,error})=>{
	let input;
	const _addFollower=()=>{
		if(input && input.value){
			addFollower(input.value)
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
		{follower.map(({id,img,name,headline})=>(
			<Follower key={id} id={id} img={img} name={name} headline={headline}></Follower>
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
		let follower=Object.keys(state.follower.followers).map((id) => state.follower.followers[id])
		return{
		follower
	}
	},
	(dispatch)=>{
		return{
		addFollower:(text)=>dispatch(addFollower(text)),
		error:(text)=>dispatch(error(text))
	}
	}
	)(FollowerList)