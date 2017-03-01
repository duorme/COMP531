import React, { Component, PropTypes } from 'react'
import {Media} from 'react-bootstrap'
import { connect } from 'react-redux'
import {remove} from './FollowerActions'
const Follower = ({img,name,headline,remove})=>{
		return(
			<div>
			<Media className="follower">
      <Media.Left align="top" >
        <img className="followerImg" src={img}/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>{name}</Media.Heading>
        <p>{headline}</p>  
        <i className="destroy glyphicon glyphicon-remove" onClick={remove}></i>    
      </Media.Body>
    </Media>
    </div>
		)

	}
Follower.PropTypes={
	id:PropTypes.number.isRequired,
	img:PropTypes.string.isRequired,
	name:PropTypes.string.isRequired,
	headline:PropTypes.string.isRequired,
	remove:PropTypes.func.isRequired
}
export default connect(
	null,(dispatch,ownProps)=>{
		return {
			remove:()=>dispatch(remove(ownProps.id))
		}
	}
	)(Follower)
