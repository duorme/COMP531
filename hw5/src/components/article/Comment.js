import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {ListGroupItem} from 'react-bootstrap'
// component for each article item
let Comment=({commentId, author, date, text})=>{
	return(
<div>
    <ListGroupItem header={`${author} said at ${date}`}>{text}</ListGroupItem>
  </div>

)
}
export default Comment