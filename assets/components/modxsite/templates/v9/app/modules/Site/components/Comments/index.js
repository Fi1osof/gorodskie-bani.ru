
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Comment from './Comment';

export default class Comments extends Component{

	static propTypes = {
		comments: PropTypes.array.isRequired,
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			comments,
		} = this.props;

		let commentsList = [];

		comments.map(comment => {
			commentsList.push(<Comment
				key={comment.id || `comment_${commentsList.length}`}
				item={comment}
			/>);
		});

		return <div>
			{commentsList}
		</div>
	}
}
