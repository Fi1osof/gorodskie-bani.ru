import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link} from 'react-router';

import MainMap from '../../Map';

export default class MainPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}

	
	componentWillMount(){

		if(typeof window !== "undefined"){

			let {
				document,
			} = this.context;

			const {
				mapData,
			} = document || {};

			mapData && Object.assign(this.state, mapData);

		}

		super.componentWillMount();

	}


	async loadServerData(provider, options = {}){



		// if(typeof window !== "undefined"){

		// 	// let {
		// 	// 	document,
		// 	// } = this.context;

		// 	// const {
		// 	// 	mapData,
		// 	// } = document || {};

		// 	// return {
		// 	// 	object: mapData,
		// 	// };

		// 	return null;

		// }

		let {
			cities: citiesNull,
			...debugOptions
		} = options;

		console.log("MainPage loadServerData options", debugOptions);

		const {
			coords,
			page,
			limit = 0,
			// withPagination = true,
			cities,
		} = options;


		// Получаем список компаний
	  const result = await provider({
	    operationName: "MapCompanies",
	    variables: {
	      limit: limit,
	      // withPagination: withPagination,
	      // companiesCenter: coords,
	      // page,
	    },
	  })
	  .then(r => {
	    
	    console.log("MainPage loadServerData result", r);

	    let {
				document,
			} = this.context;

			if(r && r.object){
				document.mapData = r.object;
			}

	    return r;

	  })
	  .catch(e => {
	    throw(e);
	  });


	  if(result && result.data){

	  	let title;

	  	const city = cities && cities[0];

	  	if(city){

	  		title = city.longtitle;

	  	}

	  	title = title || "Городские бани";

	  	title = `${title} на карте`;

	  	// if(page > 1){

	  	// 	title = `${title}, страница ${page}`;

	  	// }

  		Object.assign(result.data, {
  			title,
  		});

	  }


	  return result;

	}


	loadData(options){

		const {
			document,
		} = this.context;

		const {
			mapData,
		} = document || {};


		if(mapData && mapData.companies && mapData.companies.length){

			this.setState({
				mapData,
			});

			return null;
		}

		return super.loadData(options);
	}


	clearInitialState(){

		// console.log("clearInitialState this", this);

		let {
			document,
		} = this.context;

		if(document && document.resourceState){

			const {
				state,
			} = document.resourceState;

			
			const {
				companies,
			} = state || {};

			if(companies){

				document.mapData = {
					companies,
				};

			}

		}

		return super.clearInitialState();

	}



	// componentDidMount(){

	// 	const {
	// 		companies,
	// 	} = this.state;

	//  //  const {
	// 	// 	// CompaniesStore,
	// 	// 	document,
	// 	// 	// appExports,
	// 	// } = this.context;

	// 	// /*
	// 	// 	Если отрисовка на клиенте, то запрашиваем обновленные данные
	// 	// */


	// 	// if(typeof window === "undefined"){

	// 	// 	let mapData = document.mapData;
		
	// 	// 	this.state.mapData = mapData;

	// 	// 	// appExports.mapData = mapData;

	// 	// }
	// 	// else{

	// 	// 	const {
	// 	// 		mapData,
	// 	// 	} = document;

	// 	// 	this.state.mapData = mapData;

	// 	// }

 // 		return super.componentDidMount && super.componentDidMount();
	// }


	render(){

		const {
			companies,
		} = this.state;

		return <MainMap
			mapData={{
				companies,
			}}
		/>
	}
}

