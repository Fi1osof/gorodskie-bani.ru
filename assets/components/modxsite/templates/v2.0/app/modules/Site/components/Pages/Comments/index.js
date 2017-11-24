import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Typography from 'material-ui/Typography';
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

	// componentDidMount(){

	// 	this.loadData();

	// 	super.componentDidMount && super.componentDidMount();
	// }


	// componentDidUpdate(prevProps, prevState, prevContext){



	// 	const {
	// 		router,
	// 	} = this.context;


	// 	const {
	// 		location: {
	// 			query,
	// 		},
	// 	} = router;

	// 	const {
	// 		page,
	// 	} = query || {};

	// 	if(page !== this.state.page){
	// 		this.setState({
	// 			page,
	// 		}, () => this.reloadData());
	// 	}

	// 	// const {
	// 	// 	router: prevRouter,
	// 	// } = prevContext;

	// 	// if(router && prevRouter){

	// 	// 	const {
	// 	// 		location: {
	// 	// 			query,
	// 	// 		},
	// 	// 	} = router;

	// 	// 	const {
	// 	// 		location: {
	// 	// 			query: prevQuery,
	// 	// 		},
	// 	// 	} = prevRouter;

	// 	// 	if(query && prevQuery){

	// 	// 		const {
	// 	// 			page,
	// 	// 		} = query;

	// 	// 	}

	// 	// }

	// 	super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
	// }
	

	loadData__(){


		const {
			localQuery,
		} = this.context;

		const {
			params,
		} = this.props;

		const {
			commentId,
		} = params || {};

		const {
			page,
		} = this.state;

		let result = localQuery({
			operationName: "Comments",
			variables: {
				limit: 10,
				commentsIds: commentId && parseInt(commentId) || undefined,
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
		
	}


	loadData(){

    const {
      coords,
    } = this.context;

		const page = this.getPage();

		return super.loadData({
			page,
			coords,
		});

	}

	
	async loadServerData(provider, options = {}){

		let {
			cities: citiesNull,
			...debugOptions
		} = options;



		const {
			coords,
			page,
			limit = 10,
			withPagination = true,
			cities,
		} = options;


		// Получаем список компаний
	  const result = await provider({
	    // operationName: "MapCompanies",
	    // variables: {
	    //   limit: limit,
	    //   companiesCenter: coords,
	    //   page,
	    // },

			operationName: "Comments",
			variables: {
				limit,
				// commentsIds: commentId && parseInt(commentId) || undefined,
				commentsPage: page,
	      withPagination: withPagination,
				getCommentAuthor: true,
				getImageFormats: true,
				commentGetResource: true,
			},
	  })
	  .then(r => {
	    
	  	// console.log("CommentsPage result", r);

	    return r;

	  })
	  .catch(e => {
	    throw(e);
	  });


	  if(result && result.data){

	  	let title;

	  	// const city = cities && cities[0];

	  	// if(city){

	  	// 	title = city.longtitle;

	  	// }

	  	title = title || "Комментарии";

	  	if(page > 1){

	  		title = `${title}, страница ${page}`;

	  	}

  		Object.assign(result.data, {
  			title,
  		});

	  }


	  return result;

	}

	
	render(){

		const {
			params,
		} = this.props;

		// const {
		// 	commentId,
		// } = params || {};

		// {
		// 	TopicsStore,
		// } = this.context;

		const {
			commentsList,
		} = this.state;


		if(!commentsList){
			return null;
		}

		const {
			page,
			limit,
			total,
			object: comments,
		} = commentsList;

		let rows = [];

		
		let content;

		if(comments && comments.length){

			content = <Comments 
				comments={comments}
				showResourceLink={true}
			/>

		}

		return super.render(<div
			style={{
				width: "100%",
				marginTop: 30,
			}}
		>

			<Typography 
				type="title"
			>
				Комментарии
			</Typography>

			
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

		</div>);

	}

}

