
import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class UserView extends Component{

	static propTypes = {

	};
	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {

		};
	}


	componentDidMount(){
	
		const {
			loadData,
		} = this.props;

		// console.log("UserView componentWillMount");

		loadData && loadData();

	}


	// componentDidMount(){

	// }

	
	render(){

		return null;
	}
}
