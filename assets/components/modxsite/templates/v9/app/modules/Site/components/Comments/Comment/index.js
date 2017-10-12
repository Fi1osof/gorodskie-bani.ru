
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import UserAvatar from 'modules/Site/components/fields/User/avatar';
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
      username,
      fullname,
      imageFormats,
		} = Author || {};


		// console.log("Comment", item);

		return <Card
			style={{
				marginTop: 15,
				marginBottom: 15,
			}}
		>
			
			<CardHeader
        avatar={
          <Link
          	to={`profile/${username}`}
          	href={`profile/${username}`}
          >
          	<UserAvatar 
	          	user={Author}
	          />
          </Link>
        }
        title={<Link
        	to={`profile/${username}`}
        	href={`profile/${username}`}
        >
        	{fullname || username || undefined}
        </Link>}
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
