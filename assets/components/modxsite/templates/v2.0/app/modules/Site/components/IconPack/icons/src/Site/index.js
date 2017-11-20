
import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class SiteField extends Component{

	static propTypes = {

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
			value,
			...other
		} = this.props;

		if(!value){
			return null;
		}

		return <a 
			href={/^http.*?:\/\//.test(value) ? value : `http://${value}`}
			{...other}
		>
			{value.replace(/(^http.*?:\/\/|\/+$)/g, '').replace(/^www./, '').replace(/\/.*/, "")}
		</a>
	}
}
