import React, { Component, PropTypes } from 'react'
import {Media} from 'react-bootstrap'
import { connect } from 'react-redux'
import {unfollow} from './FollowerActions'
// Item of follower, can remove any follower.
const Follower = ({avatar,author,headline,unfollow})=>{
		return(
			<div>
			<Media className="follower">
      <Media.Left align="top" >
        <img className="followerImg" src={avatar}/>
      </Media.Left>
      <Media.Body>
        <Media.Heading id="FollowerAuthor">{author}</Media.Heading>
        <p>{headline}</p>  
        <i className="destroy glyphicon glyphicon-remove" id="btn_unfollow" onClick={unfollow}></i>    
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
	unfollow:PropTypes.func.isRequired
}
export default connect(
	null,(dispatch,ownProps)=>{
		return {
			unfollow:()=>dispatch(unfollow(ownProps.id))
		}
	}
	)(Follower)
