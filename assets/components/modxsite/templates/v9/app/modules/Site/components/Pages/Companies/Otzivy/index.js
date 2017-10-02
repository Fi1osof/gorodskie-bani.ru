import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout/..'; 

import {Link, browserHistory} from 'react-router';

import Topic from './Topic';

export default class OtzivyPage extends Page {


	constructor(props){

		super(props);

		// Object.assign(this.state, {
		// });
	}
	

	renderTopics(){


		return <div>
			renderTopics
		</div>

	}

	
	renderContent(){

		const {
			params,
		} = this.props,
		{
			TopicsStore,
		} = this.context;

		const {
			topicAlias,
		} = params || {};

		// let item;
		// let company;

		let content

		if(topicAlias){
			
			const item = TopicsStore.getState().find(n => n.id == topicAlias || n.alias == topicAlias);

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

