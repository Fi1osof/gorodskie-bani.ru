import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

import Pagination from 'modules/Site/components/pagination';


import Comments from 'modules/Site/components/Comments';

export default class CommentsPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			total: 0,
			comments: [],
		});
	}

	componentDidMount(){

		this.loadData();

		super.componentDidMount && super.componentDidMount();
	}


	componentDidUpdate(prevProps, prevState, prevContext){

		console.log('Comments componentDidUpdate', prevProps, prevState, prevContext);

		const {
			router,
		} = this.context;


		const {
			location: {
				query,
			},
		} = router;

		const {
			page,
		} = query || {};

		if(page !== this.state.page){
			this.setState({
				page,
			}, () => this.loadData());
		}

		// const {
		// 	router: prevRouter,
		// } = prevContext;

		// if(router && prevRouter){

		// 	const {
		// 		location: {
		// 			query,
		// 		},
		// 	} = router;

		// 	const {
		// 		location: {
		// 			query: prevQuery,
		// 		},
		// 	} = prevRouter;

		// 	if(query && prevQuery){

		// 		const {
		// 			page,
		// 		} = query;

		// 	}

		// }

		super.componentDidUpdate && super.componentDidUpdate();
	}
	

	loadData(){


		const {
			localQuery,
		} = this.context;

		const {
			page,
		} = this.state;

		let result = localQuery({
			operationName: "Comments",
			variables: {
				limit: 10,
				commentsPage: page,
				withPagination: true,
				getCommentAuthor: true,
				// userGetComments: true,
				getImageFormats: true,
				// resourcesLimit: 10,
				// resourceGetAuthor: true,
				// resourceGetComments: true,
				// getCommentAuthor: true,
			},
		})
		.then(r => {

			console.log("Resources r", r);

			const {
				commentsList,
			} = r.data;

			const {
				count,
				total,
				object: comments,
			} = commentsList || {};

			this.setState({
				comments,
				total,
			});
		}); 

		// console.log("Resources r", result);
		
		
	}

	
	renderContent(){

		const {
			params,
		} = this.props;

		// {
		// 	TopicsStore,
		// } = this.context;

		const {
			comments,
			page,
			limit,
			total,
		} = this.state;

		let rows = [];

		
		let content;

		if(comments && comments.length){

			content = <Comments 
				comments={comments}
			/>

		}

		return <div
			style={{
				width: "100%",
			}}
		>
			
			{content}

	    <div
	    	style={{
	    		textAlign: "center",
	    	}}
	    >
	    	
	    	<Pagination
	      	page={parseInt(page) || 1}
		      limit={limit}
		      total={total}
		    />

	    </div>

		</div>

	}

}

