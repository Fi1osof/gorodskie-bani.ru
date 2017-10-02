
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Topic from './Topic';

export default class CompanyTopics extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
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
			item,
		} = this.props;

		if(!item){

			return null;
		}

		const {
			topics,
			id:CompanyId,
			name:CompanyName,
			uri:CompanyUri,
		} = item;

		if(!topics || !topics.length){

			return null;
		}

		let topicsList = [];

		topics.map(topic => {

			// console.log("Topic", topic);

			const {
				id,
			} = topic;

			topicsList.push(<Topic
				key={id}
				style={{
					padding: 15,
				}}
				item={topic}
				// topic={topic}
			>
					

			</Topic>);

		});

		if(!topicsList.length){

			return null;
		}

		return <div>

			<Typography
				type="title"
				style={{
					marginLeft: 15,
				}}
			>
				Обзоры заведения
			</Typography>

			{topicsList}
			
		</div>
	}
}
