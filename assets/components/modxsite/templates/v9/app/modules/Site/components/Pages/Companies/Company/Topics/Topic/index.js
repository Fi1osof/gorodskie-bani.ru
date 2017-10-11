
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

export default class Topic extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		// item: PropTypes.object,
		open: PropTypes.bool.isRequired,		// Флаг, что это полная статья, раскрытая
	};

	static contextTypes = {
		localQuery: PropTypes.func.isRequired,
	};

	constructor(props){

		super(props);

		const {
			open,
		} = props;

		this.state = {
			open,
		};
	}


	componentDidMount(){


		this.loadData();

	}

	async loadData(){


		const {
			item,
		} = this.props;

		if(!item){
			return;
		}

		const {
			template,
			parent,
		} = item;

		const {
			localQuery,
		} = this.context;

		// let operationName;

		let result;

		if(parent){

			if(template === 28){
				await localQuery({
					operationName: "Company",
					variables: {
						id: parent,
					},
				})
					.then(r => {

						const {
							company,
						} = r.data;

						console.log("Topic localQuery", r);

						result = company;
					});
			}
			else if(template === 15){
				// parent = "other topic";
			}

		}

		if(result){
		}	

		this.setState({
			Parent: result,
		});
		return;

	}


	render(){

		const {
			item,
		} = this.props;

		if(!item){
			return null;
		}

		const {
			id,
			name:topicName,
			uri,
			short_text,
			summary,
			template,
		} = item;

		
		const {
			Parent,
		} = this.state;

		let parent;

		const {
			id:CompanyId,
			name:CompanyName,
			uri:CompanyUri,
		} = Parent || {};

		console.log('Parent', Parent);

		return <Card
		>

			<CardHeader
				title={<Link
					to={uri}
					href={uri}
				>
					<Typography
						type="subheading"
					>
						{topicName}
					</Typography>
				</Link>}
        subheader={CompanyUri && <Link
        	to={CompanyUri}
        	href={CompanyUri}
        >
        	{CompanyName}
        </Link> || undefined}
			>
				
			</CardHeader>

			<CardContent>

				
	 

					<div dangerouslySetInnerHTML={{__html: short_text || summary}}></div>

				
			</CardContent>
		</Card>;

	}
}
