
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

import CompanyMiniCart from 'modules/Site/components/Map/MainView/Marker/Company';

export default class RatingCompanies extends Component{

	static propTypes = {
		ratings: PropTypes.array.isRequired,
		limit: PropTypes.number,
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
			ratings,
			limit,
		} = this.props;
		
		let companies = [];

		// console.log('RatingCompanies ratings', ratings);

		ratings && ratings.map(rating => {

			const {
				type,
				Company,
			} = rating;

			if(!Company){
				return;
			}

			if(limit > 0 && companies.length >= limit){
				return;
			}

			const {
				id,
				name,
				imageFormats,
			} = Company;

			const {
				marker_thumb: image,
			} = imageFormats || {};

			companies.push(<Grid
				key={`${type}_${id}`}
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				style={{
					// backgroundImage:`url(${image})`,
					marginBottom: 20,
				}}
			>
				{/*<img 
					src={image}
				/>*/}

				<CompanyMiniCart 
					item={Company}
					imageType="small"
					ratings={rating}
					// style={{
					// 	position: 'absolute',
					// 	zIndex: 1,
					// 	bottom: 50,
					// 	boxShadow: 'rgba(0,0,0, 0.3) 0px 0px 5px 2px',
					// 	padding: 5,
					// 	background: '#fff',
					// }}
				/>

			</Grid>);

		});


		return companies && companies.length ? <Grid
			container
      gutter={0}
		>
			{companies}
		</Grid> : null;
	}
}
