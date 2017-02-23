import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
let APP = ({location}) => {
	if (location == 'MAIN_PAGE') {
	return (<Main />)
}
  else if (location == 'PROFILE_PAGE') {
	return(<Profile />)
}
  else {
	return (<Landing/>)
}
}

export default connect(
	(state)=>{
	return{
		location:state.location
	}
},null)(APP)