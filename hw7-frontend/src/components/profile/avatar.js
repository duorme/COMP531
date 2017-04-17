import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {postAvatar,updateAvatar} from './profileActions'
//Avatar of User
const Avatar=({img,upLoadImg})=>{
	let file
	const handleImageChange=(e)=>{
		file=e.target.files[0]
		upLoadImg(file)
	}

	return(
		<div>
		<img src={img} id="profileAvatar"></img><br/>
		<span>upload your profile</span>
		<input type="file" accept="image/*"  onChange={(e) => handleImageChange(e)}></input>
			</div>

		)
}

Avatar.PropTypes={
    img: PropTypes.string.isRequired
}

export default connect(
	(state)=>{
		return{
			img:state.User.avatar
		}
	},(dispatch)=>{
		return{
			upLoadImg:(file)=>dispatch(postAvatar(file))
		}
	})(Avatar)