
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

import CommentsIcon from 'material-ui-icons/Chat';
import MoreIcon from 'material-ui-icons/More';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';

import UserLink from 'modules/Site/components/fields/User/link';

import Comments from 'modules/Site/components/Comments';

// import Editor from 'modules/Site/components/fields/Editor';

import Editor from './Editor';


import Page from '../../layout'; 


let {
	...propTypes
} = Page.propTypes || {};

propTypes = Object.assign(propTypes || {}, {
	// item: PropTypes.object.isRequired,
	// open: PropTypes.bool.isRequired,		// Флаг, что это полная статья, раскрытая
});


let {
	...defaultProps
} = Page.defaultProps || {};

defaultProps = Object.assign(defaultProps || {}, {
	// open: true,
	// commentOpen: true,
});


let {
	...contextTypes
} = Page.contextTypes || {};

contextTypes = Object.assign(contextTypes || {}, {
	localQuery: PropTypes.func.isRequired,
	updateTopicItem: PropTypes.func.isRequired,
	saveTopicItem: PropTypes.func.isRequired,
});


export default class Topic extends Page{

	static propTypes = propTypes;

	static defaultProps = defaultProps;

	static contextTypes = contextTypes;


	render(){

		const {
		} = this.props;


		return <div>Topic</div>


		// return super.render();

	}

}
