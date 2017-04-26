import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {FormGroup,FormControl,Col,ControlLabel,HelpBlock} from 'react-bootstrap'
function FieldGroup({ id, sm_title,label,sm_input ,current,...props }) {
    return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={sm_title}>
        {label}
      </Col>
      <Col sm={sm_input}>
        <FormControl {...props}/>
      </Col>
      <HelpBlock>{current}</HelpBlock>
    </FormGroup>
  )
  }
  export default FieldGroup
