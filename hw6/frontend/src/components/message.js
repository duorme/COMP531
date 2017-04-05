import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
// component to show alert
let Message=({text,id})=>{
	return(
<div>{
	text.length==0?'':
  <Alert>
    {text}
  </Alert>
}
  </div>
		)
}
export default Message