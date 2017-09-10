
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import PeopleIcon from 'material-ui-icons/People';

import Stars from './Stars';

export default class Rating extends Component{

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
			ratingAvg,
		} = item;

		const {
      rating,
      max_vote,
      min_vote,
      quantity,
      quantity_voters,
		} = ratingAvg || {};

		const iconStyle={
			height: 17,
		};

		return <div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<Stars 
				value={parseFloat(rating) || 0}
				allowEdit={true}
			/> <ThumbUpIcon 
				style={iconStyle}
			/> {quantity || 0} <PeopleIcon 
				style={iconStyle}
			/> {quantity_voters || 0}
		</div>
	}
}
