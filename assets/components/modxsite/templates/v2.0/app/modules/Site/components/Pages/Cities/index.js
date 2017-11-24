import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


export default class CitiesPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			cities: undefined,
		});

	}
	

	setPageTitle(title){

		const {
			params,
		} = this.props;

		const {
			companyId,
		} = params || {};

		return !companyId && super.setPageTitle(title || "Городские бани");
	}
  


	// loadData(){

 //    const {
 //      coords,
 //    } = this.context;

	// 	const page = this.getPage();

	// 	super.loadData({
	// 		page,
	// 		coords,
	// 	});

	// 	this.loadCities();

	// }

	// loadData(options = {}){

	// 	const {
	// 		localQuery,
	// 	} = this.context;

	// 	Object.assign(options, {
	// 		provider: localQuery,
	// 	});



	loadData(){

    const {
      coords,
    } = this.context;

		const page = this.getPage();

		super.loadData({
			// page,
			coords,
		});

	}

	// 	return super.loadData(options);
	// }
	
	async loadServerData(provider, options = {}){

		let {
			cities: citiesNull,
			...debugOptions
		} = options;

		// console.log("CompaniesPage loadServerData options", debugOptions);

		const {
			coords,
			page,
			limit = 12,
			withPagination = false,
			cities,
		} = options;


		// Получаем список компаний
	  const result = await provider({
	    operationName: "Cities",
	    variables: {
	      limit: 0,
	      withPagination: withPagination,
	      resourcesCenter: coords,
	    },
	  })
	  .then(r => {
	    
	    // console.log("Cities resource result", r);

	    return r;

	  })
	  .catch(e => {
	    throw(e);
	  });


	  // if(result && result.data){

	  // 	let title;

	  // 	const city = cities && cities[0];

	  // 	if(city){

	  // 		title = city.longtitle;

	  // 	}

	  // 	title = title || "Городские бани";

	  // 	if(page > 1){

	  // 		title = `${title}, страница ${page}`;

	  // 	}

  	// 	Object.assign(result.data, {
  	// 		title,
  	// 	});

	  // }


	  return result;

	}
 


	triggerGoal(goal){

		const {
			triggerGoal,
		} = this.context;

		triggerGoal(goal);

	}


	// getCompanyId(){

	// 	const {
	// 		router,
	// 	} = this.context;

	// 	const {
	// 		params,
	// 	} = this.props;

	// 	const {
	// 		companyId,
	// 	} = params || {};

	// 	return companyId;

	// }


	render(){

		const {
			resources: cities,
		} = this.state;

		// console.log('CitiesPage cities', cities);

		let citiesList = cities && cities.map(city => {

			const {
				id,
				name,
				longtitle,
				uri,
				coords,
			} = city;

			let title = longtitle || name;

			const link = `/${uri}`;

			return <Grid
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				xl={2}
			>
				<Link
					to={link}
					href={link}
					title={title}
				>
					{title}
				</Link>
			</Grid>

		});

		return super.render(<div
			style={{
				width: "100%",
				marginTop: 20,
				// border: "1px solid",
			}}
		>

			<Grid
				container
			>
				{citiesList}
			</Grid>

		</div>);
	}
}

