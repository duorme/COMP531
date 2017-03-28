import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {FormGroup,FormControl,Col,ControlLabel} from 'react-bootstrap'
function FieldGroup({ id, sm_title,label,sm_input ,...props }) {
    return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={sm_title}>
        {label}
      </Col>
      <Col sm={sm_input}>
        <FormControl {...props}/>
      </Col>
    </FormGroup>
  )
  }
  export default FieldGroup
