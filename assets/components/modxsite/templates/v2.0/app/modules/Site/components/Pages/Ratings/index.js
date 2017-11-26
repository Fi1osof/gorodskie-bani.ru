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
			// ratingTypes: [],
			groupByType: true,
		});
	}

	// componentDidMount(){

	// 	this.loadData();


	// 	super.componentDidMount && super.componentDidMount();
	// }


	componentDidUpdate(prevProps, prevState, prevContext){

		const {
			params: {
				ratingType,
			},
		} = this.props;

		const {
			params: {
				ratingType: prevRatingType,
			},
		} = prevProps;




		if((ratingType || prevRatingType) && ratingType !== prevRatingType){

			this.reloadData();

			if(prevRatingType && !ratingType){

				this.setPageTitle();

			}

		}


		super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
	}



  setPageTitle(title){



		// const {
		// 	params,
		// } = this.props;

		// const {
		// 	topicAlias,
		// } = params || {};

		super.setPageTitle(title || "Рейтинги бань");

  }
	

	// loadData(){


	// 	const {
	// 		localQuery,
	// 	} = this.context;

	// 	const {
	// 		page,
	// 		groupByType
	// 	} = this.state;


	// 	const {
	// 		params,
	// 	} = this.props;

	// 	const {
	// 		ratingType,
	// 	} = params || {};


	// 	/*
	// 		Если указан тип рейтинга, то в любом случае группируем по типам.
	// 		Иначе смотрим от стейта
	// 	*/
	// 	let groupBy = groupByType || ratingType ? "company_and_rating_type" : "company";

	// 	let result = localQuery({
	// 		operationName: "RatingsPageData",
	// 		variables: {
	// 			limit: 0,
	// 			ratingsGroupBy: groupBy,
	// 			getRatingCompany: true,
	// 			getImageFormats: true,
	// 			getRatingsAvg: false,
	// 			ratingGetType: true,
	// 		},
	// 	})
	// 	.then(r => {

	// 		const {
	// 			ratings,
	// 			resources: ratingTypes,
	// 		} = r.data;

	// 		this.setState({
	// 			ratings,
	// 			ratingTypes,
	// 		});
	// 	}); 
		
		
	// }

	loadData(){


		const {
			localQuery,
		} = this.context;

		const {
			// page,
			groupByType
		} = this.state;


		const {
			params,
		} = this.props;

		const {
			ratingType,
		} = params || {};


		/*
			Если указан тип рейтинга, то в любом случае группируем по типам.
			Иначе смотрим от стейта
		*/
		// let groupBy = groupByType || ratingType ? "company_and_rating_type" : "company";

		// let result = localQuery({
		// 	operationName: "RatingsPageData",
		// 	variables: {
		// 		limit: 0,
		// 		ratingsGroupBy: groupBy,
		// 		getRatingCompany: true,
		// 		getImageFormats: true,
		// 		getRatingsAvg: false,
		// 		ratingGetType: true,
		// 	},
		// })
		// .then(r => {

		// 	const {
		// 		ratings,
		// 		resources: ratingTypes,
		// 	} = r.data;

		// 	this.setState({
		// 		ratings,
		// 		ratingTypes,
		// 	});
		// }); 
		
		return super.loadData({
			page: this.getPage(),
			ratingType,
			groupByType,
		});
	}
		
	
	async loadServerData(provider, options = {}){

		let {
			cities: citiesNull,
			...debugOptions
		} = options;

		// console.log("RatingsPage debugOptions", debugOptions);

		const {
			coords,
			page,
			limit = 12,
			withPagination = true,
			cities,
			ratingType,
			groupByType,
		} = options;

		/*
			Если указан тип рейтинга, то в любом случае группируем по типам.
			Иначе смотрим от стейта
		*/
		let groupBy = groupByType || ratingType ? "company_and_rating_type" : "company";

		let ratingTypeResource;

		// Получаем список компаний
	  const result = await provider({
	    operationName: "RatingsPageData",
	    variables: {
				limit: 0,
				ratingsGroupBy: groupBy,
				getRatingCompany: true,
				getImageFormats: true,
				getRatingsAvg: false,
				ratingGetType: true,
	    },
	  })
	  .then(r => {
	    

	  	// console.log("RatingsPageData result", r);

	  	const {
	  		ratings,
	  		resources,
	  	} = r.data;

	  	if(!ratings && !ratings.length){
	  		return null;
	  	}

	  	// Определяем запрошенный тип рейтинга
	  	if(ratingType){

	  		ratingTypeResource = resources && resources.find(n => n.alias === ratingType);

	  		if(!ratingTypeResource){
	  			return null;
	  		}

	  	}

	  	// console.log("ratingTypeResource", ratingTypeResource);

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

	  	if(ratingTypeResource && ratingTypeResource.name){
	  		title = `Бани в рейтинге ${ratingTypeResource.name}`;
	  	}

	  	title = title || "Рейтинги бань";

	  	// if(page > 1){

	  	// 	title = `${title}, страница ${page}`;

	  	// }

  		Object.assign(result.data, {
  			title,
  		});

	  }
	  else{
	  	return null;
	  }


	  return result;

	}


	toggleTypeGrouping = (event, checked) => {

		this.setState({
			groupByType: checked,
		}, () => {
			this.reloadData();
		});

	};


	renderRatings = (ratings, limit) => {

		return <CompaniesList 
			ratings={ratings}
			limit={limit}
		/>
	}


	render(){

		const {
			groupByType,
		} = this.state;

		let {
			ratings,
			resources: ratingTypes,
		} = this.state;

		const {
			params,
		} = this.props;

		const {
			ratingType,
		} = params || {};


		let ratingTypesList;
		
		let ratingContent;

		if(groupByType || ratingType){

			let ratingTypesItems = [];

			if(ratingType){

				if(!ratingTypes){
					return null;
				}

				// ratings = ratingTypes && ratingTypes.filter(n => n.Type && n.Type.alias === ratingTypes);
				ratingTypes = ratingTypes && ratingTypes.filter(n => n.alias === ratingType);

				const currentRating = ratingTypes[0];

				// if(currentRating){

				// 	this.setPageTitle(`Рейтинг бань ${currentRating.name}`);

				// }

			}

			ratingTypes && ratingTypes.map(type => {

				const {
					id: type_id,
				} = type;

				ratingTypesItems.push(<RatingType 
					key={type_id}
					item={type}
					ratings={ratings}
					renderRatings={this.renderRatings}
					limit={ratingType ? 0 : 6}
				/>);

			});

			if(ratingTypesItems.length){

				ratingTypesList = <Grid
					item
					xs={12}
				>

					<Grid
						container
      			gutter={0}
					>
						
						{ratingTypesItems}

					</Grid>
					
				</Grid>

			}

		}
		else{

			ratingContent = this.renderRatings(ratings);

		}


		return super.render(<Grid
			container
      gutter={0}
		>
			<Grid
				item
				xs={12}
				style={{
					marginTop: 30,
				}}
			>


					{ratingType
						?
							<h2
								style={{
									marginLeft: 20,
									marginTop: 15,
								}}
							>
								<Link
									to={`/ratings/`}
									href={`/ratings/`}
								>
									Смотреть все рейтинги
								</Link>
							</h2>
						:
						<Grid
							container
							align="center"
							gutter={0}
						>
							<Switch
				        checked={groupByType}
				        onChange={this.toggleTypeGrouping}
				        aria-label="checkedA"
				      /> Сгруппировать по типам рейтинга
						</Grid>
					}

			</Grid>

			{ratingTypesList}


			<Grid
				item
				xs={12}
			>

				{ratingContent}
				
			</Grid>

		</Grid>)

	}

}

