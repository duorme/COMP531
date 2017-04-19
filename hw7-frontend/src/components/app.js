import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
let APP = ({location}) => {

	if (location == 'LANDING') {
	return (<Landing/>)
	
}
  else if (location == 'PROFILE_PAGE') {
	return(<Profile />)
}
  else {
	return (<Main />)
}
}
export default connect(

	(state)=>{
	return{
		location:state.Location.location
	}
},null)(APP)