import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
let Message=({text})=>{
	return(
<div>{
	text.length==0?'':
  <Alert bsStyle="warning">
    <strong>Alert!</strong><br/>
    {text}
  </Alert>
}
  </div>


		)
}
export default Message