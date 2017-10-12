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

import CompanyMiniCart from 'modules/Site/components/Map/MainView/Marker/Company';

import Switch from 'material-ui/Switch';

import CompaniesList from './Companies';

import RatingType from './Types/Type';

// import Pagination from 'modules/Site/components/pagination';

// import User from './User';

export default class RatingsPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			total: 0,
			ratings: [],
			ratingTypes: [],
			groupByType: false,
		});
	}

	componentDidMount(){

		this.loadData();

		super.componentDidMount && super.componentDidMount();
	}


	// componentDidUpdate(prevProps, prevState, prevContext){

	// 	console.log('Users componentDidUpdate', prevProps, prevState, prevContext);

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
	// 		}, () => this.loadData());
	// 	}

	// 	super.componentDidUpdate && super.componentDidUpdate();
	// }
	

	loadData(){


		const {
			localQuery,
		} = this.context;

		const {
			page,
			groupByType
		} = this.state;

		let groupBy = groupByType ? "company_and_rating_type" : "company";

		let result = localQuery({
			operationName: "RatingsPageData",
			variables: {
				limit: 0,
				ratingsGroupBy: groupBy,
				getRatingCompany: true,
				getImageFormats: true,
				getRatingsAvg: false,
				ratingGetType: true,

				// usersPage: page,
				// withPagination: true,
				// userGetComments: true,
				// getImageFormats: true,
				// resourcesLimit: 10,
				// resourceGetAuthor: true,
				// resourceGetComments: true,
				// getCommentAuthor: true,
			},
		})
		.then(r => {

			console.log("Resources r", r);

			const {
				ratings,
				resources: ratingTypes,
			} = r.data;

			// const {
			// 	count,
			// 	total,
			// 	object: users,
			// } = usersList || {};

			this.setState({
				ratings,
				ratingTypes,
			});
		}); 

		// console.log("Resources r", result);
		
		
	}


	toggleTypeGrouping = (event, checked) => {

		this.setState({
			groupByType: checked,
		}, () => {
			this.loadData();
		});

	};


	renderRatings = (ratings, limit) => {

		return <CompaniesList 
			ratings={ratings}
			limit={limit}
		/>
	}


	renderContent(){

		const {
			ratings,
			ratingTypes,
			groupByType,
		} = this.state;

		let ratingTypesList;

		if(groupByType){

			let ratingTypesItems = [];

			ratingTypes && ratingTypes.map(ratingType => {

				const {
					id: type_id,
				} = ratingType;

				ratingTypesItems.push(<RatingType 
					key={type_id}
					item={ratingType}
					ratings={ratings}
					renderRatings={this.renderRatings}
				/>);

			});

			if(ratingTypesItems.length){

				ratingTypesList = <Grid
					item
					xs={12}
				>

					<Grid
						container
					>
						
						{ratingTypesItems}

					</Grid>
					
				</Grid>

			}


		}

		
		let ratingContent;

		if(groupByType){

		}
		else{

			ratingContent = this.renderRatings(ratings);

		}


		return <Grid
			container
		>
			<Grid
				item
				xs={12}
				style={{
					marginTop: 30,
				}}
			>
				<Grid
					container
					align="center"
				>
					
					<Switch
		        checked={groupByType}
		        onChange={this.toggleTypeGrouping}
		        aria-label="checkedA"
		      /> Гурппировать по типам рейтинга
				
				</Grid>

			</Grid>

			{ratingTypesList}


			<Grid
				item
				xs={12}
			>

				{ratingContent}
				
			</Grid>

		</Grid>

	}

}

