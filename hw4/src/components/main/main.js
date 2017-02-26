import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Media} from 'react-bootstrap'
import ArticleList from '../article/articleList'
import Brief from './brief'
import FollowerList from './followerList'

const Main=()=>{
	return(
		<div>
		<header>
		<h1>Dear Diary</h1>
		</header>
  <div className="row">
  <div className="col-md-4">
  <Brief></Brief>
  <FollowerList></FollowerList>
  </div>
  <div className="col-md-8">

		<ArticleList></ArticleList>
		</div>
		</div>
		</div>
		)
}
	

export default Main