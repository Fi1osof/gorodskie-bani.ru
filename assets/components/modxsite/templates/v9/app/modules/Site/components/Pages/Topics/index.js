import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

import Topic from './Topic';

export default class TopicsPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			limitPerPage: 10,
		});
	}

	componentDidMount(){

		// this.loadData();

		super.componentDidMount && super.componentDidMount();
	}
	

	loadData(){

		// console.log("Topics loadData");


		const {
			localQuery,
		} = this.context;

		let result = localQuery({
			operationName: "Topics",
			variables: {
				// resourcesLimit: 10,
				resourceGetAuthor: true,
				resourceGetComments: true,
				getCommentAuthor: true,
			},
		})
		.then(r => {

			// console.log("Resources r", r);

			const {
				topics,
			} = r.data;

			this.setState({
				topics,
			});
		}); 

		// console.log("Resources r", result);
		
	}


	renderTopics(){

		const {
			topics,
			limit,
			limitPerPage,
		} = this.state;

		console.log("Topic", topics);

		let topicsList = [];

		topics && topics.map((topic, index) => {

			if(limit > 0 && topicsList.length >= limit){
				return;
			}

			const {
				id,
				name,
			} = topic;

			topicsList.push(<Topic
				key={id}
				item={topic}
				open={false}
				commentOpen={false}
			>
				{name}
			</Topic>);

		});

		let moreButton;

		const total = topics && topics.length || 0;

		if(topicsList && topics && topicsList.length < topics.length){

			moreButton = <div
				style={{
					textAlign: "center",
				}}
			>
				
				<Button
					onClick={event => {

						this.setState({
							limit: limit + limitPerPage,
						});

					}}
					raised
				>
					{topicsList.length} из {total}. Показать еще {limitPerPage + topicsList.length > topics.length ? (topics.length - topicsList.length) : limitPerPage}
				</Button>

			</div>

		}

		return <div>
			{topicsList}

			{moreButton}
		</div>

	}

	
	renderContent(){

		const {
			params,
		} = this.props;

		// {
		// 	TopicsStore,
		// } = this.context;

		const {
			topics,
		} = this.state;

		const {
			topicAlias,
		} = params || {};

		// let item;
		// let company;

		let content;

		if(topicAlias){
			
			// const item = TopicsStore.getState().find(n => n.id == topicAlias || n.alias == topicAlias);
			const item = topics && topics.find(n => n.id == topicAlias || n.alias == topicAlias.replace(".html", ""));

			if(item){

				content = <Grid
					item
				>
					
					<Topic
						item={item}
						open={true}
					/>

				</Grid>

			}
			else{
				content = <div
					style={{
						color: "red",
					}}
				>
					Документ не был найден
				</div>
			}

		}
		else{
			content = this.renderTopics();
		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div>
 			
 			{content}

		</div>
	}

}

