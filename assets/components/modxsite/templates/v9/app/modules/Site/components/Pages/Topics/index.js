import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Topic from './Topic';

export default class TopicsPage extends Page {


	constructor(props){

		super(props);

		// Object.assign(this.state, {
		// });
	}

	componentDidMount(){

		const {
			TopicsStore,
		} = this.context;

		this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.loadData();
	}
	

	loadData(){


		const {
			localQuery,
		} = this.context;

		let result = localQuery({
			operationName: "Topics",
			variables: {
				resourcesLimit: 10,
			},
		})
		.then(r => {

			console.log("Resources r", r);

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
		} = this.state;

		console.log("Topic", topics);

		let topicsList = [];

		topics && topics.map(topic => {

			const {
				id,
				name,
			} = topic;

			topicsList.push(<Topic
				key={id}
				item={topic}
			>
				{name}
			</Topic>);

		});

		return <div>
			{topicsList}
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
			const item = topics.find(n => n.id == topicAlias || n.alias == topicAlias);

			if(item){

				content = <Topic
					item={item}
				/>

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

