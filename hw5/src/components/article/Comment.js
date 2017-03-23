import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Panel} from 'react-bootstrap'
// component for each article item
let Comment=({commentId, author, date, text})=>{
	return(
<div>
<Panel header={`${author} said at ${date}`}>
      {text}
    </Panel>
  </div>

)
}
export default Comment