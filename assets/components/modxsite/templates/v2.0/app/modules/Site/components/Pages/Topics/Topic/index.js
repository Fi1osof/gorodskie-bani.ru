
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

// import Editor from './Editor';

import TopicView from './View';

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


export default class TopicPage extends Page{

	static propTypes = propTypes;

	static defaultProps = defaultProps;

	static contextTypes = contextTypes;




	loadData(){

		const {
			location,
		} = this.context;

		const {
			pathname: uri,
		} = location || {};

		return uri && super.loadData({
			pathname: uri.replace(/^\/+/, ''),
		});

	}

	
	async loadServerData(provider, options = {}){

		const {
			cities: citiesNull,
			...debugOptions,
		} = options;

	    
    // console.log("TopicPage params", debugOptions);


		const {
			// coords,
			// page,
			// resourcesPage = 1,
			// withPagination = false,
			// cities,
			pathname,
		} = options;

		if(!pathname){

			// return null;
			
			throw("Не указан УРЛ объекта");
		}

		// Получаем список компаний
	  let result = await provider({
			operationName: "Topic",
			variables: {
				resourceUri: pathname,
				resourceGetComments: true,
				getCommentAuthor: true,
				resourceGetAuthor: true,
			},
	  })
	  .then(r => {
	    
	    // console.log("TopicPage result", r);

	    return r;

	  })
	  .catch(e => {
	    throw(e);
	  });


	  if(result && result.data){

	  	let title;

	  	
			const {
				topic,
			} = result.data;

			// company && Object.assign(item, company);





			// this.setPageTitle(company && company.name || name);


	  	// const city = cities && cities[0];

	  	// if(city){

	  	// 	title = city.longtitle;

	  	// }

	  	title = topic && topic.name;

	  	// if(page > 1){

	  	// 	title = `${title}, страница ${page}`;

	  	// }

  		Object.assign(result.data, {
  			title,
  		});

	  }
	  else{
	  	result = null
	  }


	  return result;

	}


	render(){

		const {
		} = this.props;

		const{
			topic,
		} = this.state;

		if(!topic){
			return null;
		}

		return super.render(<TopicView
			item={topic}
			open={true}
			commentOpen={true}
		/>);

	}

}
