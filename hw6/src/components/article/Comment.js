import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {ListGroupItem,Button} from 'react-bootstrap'
// component for each article item
let Comment=({commentId, author, date, text,loginUser,editComment})=>{
	const edit=(e)
	return(
<div>
		
    <ListGroupItem header={`${author} said at ${date}`}>
    <ContentEditable  html={`${text}`} // innerHTML of the editable div
                disabled={!isEdited}       // use true to disable edition
                onChange={(e)=>{saveArticle(e)}}>
        </ContentEditable> 
    </ListGroupItem>
    {loginUser === author?<Button onClick={edit}>Edit</Button>:""}
  </div>

)
}
export default Comment