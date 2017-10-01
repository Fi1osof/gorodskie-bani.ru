
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import moment from 'moment';

// window.moment = moment;

export default class Comment extends Component{

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
			id,
			text,
			parent,
      createdon,
      Author,
		} = item;

		const {
			
      username: author_username,
      fullname: author_fullname,
      imageFormats,
		} = Author || {};

		const {
      thumb: author_avatar,
		} = imageFormats;


		// console.log("Comment", item);

		return <Card
			style={{
				marginTop: 15,
				marginBottom: 15,
			}}
		>
			
			<CardHeader
        avatar={
          <Avatar 
          	aria-label={author_fullname || author_username || undefined}
          	className=""
        		src={author_avatar}
          	style={{
          		background: '#2fa4e7',
          	}}
          >
            {author_avatar ? undefined : (author_fullname || author_username || '').substr(0,1).toLocaleUpperCase() }
          </Avatar>
        }
        title={author_fullname || author_username || undefined}
        subheader={createdon && id && <Link
        	to={`/comments/comment-${id}.html`}
        	href={`/comments/comment-${id}.html`}
        	className="no-underline"
        >{createdon}</Link> || undefined}
      />

			<CardContent>
				<div
					dangerouslySetInnerHTML={{ __html: text }}
				/>
			</CardContent>

		</Card>
	}
}
