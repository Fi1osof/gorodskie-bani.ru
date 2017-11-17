
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Editor from 'modules/Site/components/Editor';

export default class MyComponent extends Component{


	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	
	static propTypes = {

	};

	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {

		};
	}


	componentWillMount(){
	
	}


	componentDidMount(){

	}

	
	render(){

		let {
			item,
			...other
		} = this.props;


		if(!item){
			return null;
		}

		const {
			id,
			content:topicContent,
			_errors: errors,
			_Dirty,
		} = item;

		return <Editor
			{...other}
			name="content"
			value={topicContent}
		/>
	}
}
