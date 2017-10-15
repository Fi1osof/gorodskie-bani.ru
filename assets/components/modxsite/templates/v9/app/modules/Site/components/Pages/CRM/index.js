import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';


import UsersPage from '../Users';

export default class CRMPage extends UsersPage {

	render(){

		return this.renderContent();
		
	}

}

