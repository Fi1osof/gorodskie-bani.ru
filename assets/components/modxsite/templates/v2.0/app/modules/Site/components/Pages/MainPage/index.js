import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link} from 'react-router';

import MainMap from '../../Map';

export default class MainPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
	
	render(){

		return <MainMap 
		/>
	}
}

