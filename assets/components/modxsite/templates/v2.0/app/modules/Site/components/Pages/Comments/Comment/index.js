import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout'; 

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

import Pagination from 'modules/Site/components/pagination';


import Comment from 'modules/Site/components/Comments/Comment';

export default class CommentPage extends Page {


	// constructor(props){

	// 	super(props);

	// 	Object.assign(this.state, {
	// 		limit: 10,
	// 		total: 0,
	// 		comments: [],
	// 	});
	// }



	loadData(){

    const {
      params,
    } = this.props;

    const {
    	commentId,
    } = params || {};

		return super.loadData({
			commentId: parseInt(commentId),
		});

	}

	
	async loadServerData(provider, options = {}){

		let {
			cities: citiesNull,
			...debugOptions
		} = options;



		const {
			commentId,
			cities,
		} = options;

		if(!commentId){
			throw("Не был получен ID комментария");
		}

		// Получаем список компаний
	  const result = await provider({
	    // operationName: "MapCompanies",
	    // variables: {
	    //   limit: limit,
	    //   companiesCenter: coords,
	    //   page,
	    // },

			operationName: "Comment",
			variables: {
				commentId,
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

	  	title = title || "Комментарий";

	  	let commentText = "";

	  	const {
	  		comment,
	  	} = result.data;


	  	if(!comment){
	  		return null;
	  	}

	  	const {
	  		text,
	  	} = comment;

	  	const {
	  		blocks,
	  	} = text || {};

	  	blocks && blocks.map(block => {

	  		const {
	  			text,
	  		} = block || {};

	  		if(text){

	  			commentText += ` ${text}`;

	  		}

	  	});

	  	// console.log("commentText", commentText);

	  	let trimText = commentText && commentText.substr(0, 100);

	  	if(trimText.length < commentText.length){
	  		trimText += "...";
	  	}

	  	if(trimText){
	  		title = trimText;
	  	}

	  	// if(page > 1){

	  	// 	title = `${title}, страница ${page}`;

	  	// }

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
 
		const {
			comment,
		} = this.state;


		if(!comment){
			return null;
		}
 
		
		// console.log("comment", comment);

		return super.render(<div
			style={{
				width: "100%",
				marginTop: 30,
			}}
		>
 			
 			<Comment
				item={comment}
				showResourceLink={true}
			/>

		</div>);

	}

}

