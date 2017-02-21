import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// const Landing = ({dispatch})=>(
// 	<div>
// 	<form id="landing" method="" action="#">
// 			User Name:<br>
// 			<input type="text" placeholder="your name" name="user name" required pattern="^[A-Za-z]+[\w|\d]*$"><br>
// 			Email address:<br>
// 			<input type="email" placeholder="yourname@email.com" name="email" required><br>
// 			<input type="text" name="zipcode" placeholder="xxxxx" pattern = "^\d{5}$" required><br>
// 			password:<br>
// 			<input type="text" name="password" required><br>
// 			password confirmation:<br>
// 			<input type="text" name="confirmation"><br>
// 			<input type="submit" name="submit" value="submit" onClick={
// 			console.log(input_name.value)	
// 			}>
// 			<input type="reset" name="Clear" value="Clear">
// 		</form>
// 	</div>

// )
let Landing = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        //dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
Landing = connect()(Landing)
export default Landing



// export default connect()(Landing)