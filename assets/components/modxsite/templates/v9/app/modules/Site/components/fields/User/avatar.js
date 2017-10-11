
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';

export default class UserAvatar extends Component{

	static propTypes = {
		user: PropTypes.object.isRequired,
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
			user,
			...other
		} = this.props;

		if(!user){
			return null;
		}

		const {
			
      username: author_username,
      fullname: author_fullname,
      imageFormats,
		} = user;

		const {
      thumb: author_avatar,
		} = imageFormats || {};

		return <Avatar 
    	aria-label={author_fullname || author_username || undefined}
    	className=""
  		src={author_avatar}
    	style={{
    		background: '#2fa4e7',
    	}}
    	{...other}
    >
      {author_avatar ? undefined : (author_fullname || author_username || '').substr(0,1).toLocaleUpperCase() }
    </Avatar>
	}
}
