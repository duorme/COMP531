import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {postAvatar,updateAvatar} from './profileActions'
//Avatar of User
const Avatar=({img,updateImg,upLoadImg})=>{
	var file
	const handleImageChange=(e)=>{
		file=e.target.files[0]
		updateImg(file)
		//upLoadImg(file)
	}
	// const _upLoadImg=()=>{
	// 	console.log('file',file)
	// 	upLoadImg(file)
	// }
	return(
		<div>
		<img src={img} id="profileAvatar"></img><br/>
		<span>upload your profile</span>
		<input type="file" accept="image/*"  onChange={(e) => handleImageChange(e)}></input>
		<Button>Upload</Button>
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
			updateImg:(avatar)=>dispatch(updateAvatar(avatar)),
			upLoadImg:(file)=>dispatch(postAvatar(file))
		}
	})(Avatar)