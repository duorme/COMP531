import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import Follower from './Follower'
import {addFollower} from './FollowerActions'
const FollowerList=({follower,addFollower})=>{
	let input;
	const _addFollower=()=>{
		if(input && input.value){
			addFollower(input.value)
			input.value=''
		}
	}

	return(
		<div>
		<div>
		<ul className="followers">
		{follower.map(({id,img,name,headline})=>(
			<Follower key={id} id={id} img={img} name={name} headline={headline}></Follower>
		))}
		</ul>
		</div>
		<input ref={(node)=>{input=node}} placeholder="add a follower"></input>
		<Button onClick={_addFollower}>Add</Button>
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
		follower:state.followers
	}
	},
	(dispatch)=>{
		return{
		addFollower:(text)=>dispatch(addFollower(text))
	}
	}
	)(FollowerList)