import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// const Landing = ({dispatch})=>(
	

// )
let Landing = ({ dispatch }) => {
  let input

  return (
   
      <div>
	<form id="landing" method="" action="#">
			User Name<br/>
			<input  ref={node=>{input=node}} type="text" placeholder="your name" name="user name" required pattern="^[A-Za-z]+[\w|\d]*$"/>
			<br/>
			Email address<br/>
			<input type="email" placeholder="yourname@email.com" name="email" required/><br/>
			<input type="text" name="zipcode" placeholder="xxxxx" pattern = "^\d{5}$" required/><br/>
			password<br/>
			<input type="text" name="password" required/><br/>
			password confirmation<br/>
			<input type="text" name="confirmation"/><br/>
			<input type="submit" name="submit" value="submit"/><br/>
			<input type="reset" name="Clear" value="Clear"/><br/>
	</form>
    </div>
  )
}
Landing = connect()(Landing)
export default Landing



// export default connect()(Landing)