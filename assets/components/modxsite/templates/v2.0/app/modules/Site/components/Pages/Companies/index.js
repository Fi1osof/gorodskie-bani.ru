import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Company from './Company';

import CompaniesList from './List';


// export const loadData = async function(options = {}){

// 	const {
// 		coords,
// 		page,
// 		limit = 12,
// 		withPagination = true,
// 	} = options;


// 	let proxy;

// 	if(typeof window !== "undefined"){

// 		const {
// 			remoteQuery,
// 		} = this.context;

// 		proxy = remoteQuery;

// 	}


// 	// Получаем список компаний
//   const result = await proxy({
//     operationName: "MapCompanies",
//     variables: {
//       limit: limit,
//       withPagination: withPagination,
//       companiesCenter: coords,
//       page,
//     },
//   })
//   .then(r => {
    

//     return r;

//   })
//   .catch(e => {
//     reject(e);
//   });

//   return result;

// }


export default class CompaniesPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			companies: undefined,
		});

		// this.loadRemoteData = loadData.bind(this);

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


	// componentWillMount(){

	// 	// let {
	// 	// 	CompaniesStore,
	// 	// 	document,
	// 	// 	appExports,
	// 	// 	router,
	// 	// } = this.context;

	// 	// let pathname = router.location && router.location.pathname;


	// 	// const companyId = this.getCompanyId();

	// 	// if(typeof window === "undefined"){

	// 	// 	let outputState = CompaniesStore.getState();


			
	// 	// 	if(companyId && pathname && outputState){

	// 	// 		pathname = decodeURI(pathname);

	// 	// 		pathname = pathname.replace(/^\//, '');
				
	// 	// 		outputState = outputState.filter(n => n.uri === pathname || n.uri === `${pathname}/`);

	// 	// 		appExports.outputState = outputState && outputState.toArray();

	// 	// 	}

	// 	// }
	// 	// else{
				
	// 	// 	this.state.inputState = document.inputState;



	// 	// }

		
	// 	const {
	// 		document,
	// 	} = this.context;

	// 	const {
	// 		resourceState,
	// 	} = document;




	// 	if(resourceState){

	// 		// Object.assign(this.state, resourceState);

	// 		const {
	// 			state: initialState,
	// 		} = resourceState;


	// 		this.initState(initialState, true);

	// 	}


	// 	super.componentWillMount && super.componentWillMount();

	// }
	
	// onWillMount(){



	// };


  componentDidUpdate(prevProps, prevState, prevContext){



    const {
      coords,
    } = this.context;

    const {
      coords: prevCoords,
    } = prevContext;

    if(
      (coords || prevCoords)
      && JSON.stringify(coords || "") != JSON.stringify(prevCoords || "")
    ){

      this.loadData();
    }

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);

  }


	loadData(){

    const {
      coords,
    } = this.context;

		const page = this.getPage();

		this.loadCities();

		return super.loadData({
			page,
			coords,
		});

	}

	loadCities(){


    const {
      localQuery,
      coords,
    } = this.context;

    localQuery({
      operationName: "MainMenuData",
      variables: {
        limit: 0,
        resourcesCenter: coords,
      },
    })
    .then(r => {

      const {
        resources: cities,
      } = r.data;



      this.setState({
        cities,
      });

    })
    .catch(e => {
      console.error(e);
    });

	}

	
	async loadServerData(provider, options = {}){

		let {
			cities: citiesNull,
			...debugOptions
		} = options;



		const {
			coords,
			page,
			limit = 12,
			withPagination = true,
			cities,
		} = options;


		// Получаем список компаний
	  const result = await provider({
	    operationName: "MapCompanies",
	    variables: {
	      limit: limit,
	      withPagination: withPagination,
	      companiesCenter: coords,
	      page,
	    },
	  })
	  .then(r => {
	    


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

	  	if(page > 1){

	  		title = `${title}, страница ${page}`;

	  	}

  		Object.assign(result.data, {
  			title,
  		});

	  }
	  else{
	  	return null;
	  }


	  return result;

	}

	
	// async loadData(){

	// 	// if(!this.mounted){
	// 	// 	return;
	// 	// }

	// 	const {
	// 		remoteQuery,
	// 	} = this.context;



	// 	const page = this.getPage();

	// 	let result = await this.loadServerData(remoteQuery, {
	// 		page,
	// 	});



	// 	if(result){

	// 		this.initState(result.object);

	// 	}

	// 	return;

	// }


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
			router,
			CompaniesStore,
			// ResourcesStore,
		} = this.context;

		const {
			inputState,
			companiesList: companies,
			cities,
		} = this.state;

		// const cities = ResourcesStore.getState().toArray();


		// const {
		// 	object: companies,		// Для списка компаний именно это свойство используется
		// } = companiesList || {};

		let item;
		let content;


		if(companies === undefined){
			content = <div
				style={{
					height: "100vh",
				}}
			>
				<div 
          className="preloader"
        />
       </div>
		}
		else{

			content = <CompaniesList 
				data={companies}
				cities={cities}
			/>

		}



		return super.render(<div
			style={{
				width: "100%",
				marginTop: 20,
				// border: "1px solid",
			}}
		>

			{content}

		</div>);
	}
}

