import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Comment from './Comment';

export default class CommentsPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			commentsStore: [],
		});
	}
	
	render(){

		const {
			params,
		} = this.props,
		{
			commentsStore,
		} = this.state;

		const {
			commentId,
		} = params || {};

		let comments = [];

		return <div>

			{comments}

		</div>
	}
}

