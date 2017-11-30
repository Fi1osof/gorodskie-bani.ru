
import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class UserView extends Component{

	static propTypes = {
		reloadData: PropTypes.func,
	};
	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {

		};
	}


	// componentDidMount(){
	
	// 	const {
	// 		reloadData,
	// 	} = this.props;

	// 	// console.log("UserView componentWillMount");

	// 	reloadData && reloadData();

	// }


	// componentDidMount(){

	// }

	
	render(){

		return null;
	}
}
