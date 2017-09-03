import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout'; 

import {Link, browserHistory} from 'react-router';

export default class CompanyPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
	
	render(){

		return <div>
			CompanyPage
		</div>
	}
}

