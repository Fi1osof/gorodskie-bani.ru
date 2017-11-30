import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link} from 'react-router';

// import MainMap from '../../Map';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import CompaniesList from 'modules/Site/components/Pages/Companies/List';

import TopicView from 'modules/Site/components/Pages/Topics/Topic/View';

// import CommentsList from 'modules/Site/components/Comments';
import Comment from 'modules/Site/components/Comments/Comment';

export default class MainPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}

	
	// componentWillMount(){

	// 	if(typeof window !== "undefined"){

	// 		let {
	// 			document,
	// 		} = this.context;

	// 		const {
	// 			mapData,
	// 		} = document || {};

	// 		mapData && Object.assign(this.state, mapData);

	// 	}

	// 	super.componentWillMount();

	// }



	
	// async loadData(options = {}){

	// 	if(typeof window === "undefined"){
			
	// 		return;

	// 	}

	// 	const {
	// 		localQuery,
	// 	} = this.context;

	// 	let {
	// 		provider,
	// 	} = options;

	// 	provider = provider || localQuery;

	// 	let result = await this.loadServerData(provider, options);

	// 	// if(result){

	// 	// 	this.initState(result.data);

	// 	// }

	// 	this.initState(result && result.data || {});

	// 	return;

	// }



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

		// const page = this.getPage();

		// this.loadCities();

		return super.loadData({
			// page,
			coords,
		});

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



		const {
			coords,
			page,
			limit = 0,
			cities,
			// withPagination = true,
		} = options;


		// Получаем список компаний
	  const result = await provider({
	    operationName: "MainPage",
	    variables: {
        resourcesCenter: coords,
	      // limit: limit,
	      // withPagination: withPagination,
	      resourcesCenter: coords,
	      companiesCenter: coords,
	      getTVs: true,
	      getRatingsAvg: true,
	      companiesLimit: 8,
	      // page,
	    },
	  })
	  .then(r => {
	    
	  	// if(typeof this === "object"){



		  //   let {
				// 	document,
				// } = this.context || {};

				// if(r && r.data && document){
				// 	document.mapData = r.data;
				// }
	  		
	  	// }

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

	  	// title = `${title} на карте`;

	  	// if(page > 1){

	  	// 	title = `${title}, страница ${page}`;

	  	// }

  		Object.assign(result.data, {
  			title,
  		});

	  }


	  return result;

	}

	render(){

		// const {
		// 	// router,
		// 	CompaniesStore,
		// 	// ResourcesStore,
		// } = this.context;

		const {
			// inputState,
			cities,
			companiesList,
			recentCompaniesList,
			topics,
			commentsList,
		} = this.state;


		const topic = topics && topics[0];

		// const {
		// } = this.context;

		const {
			total,
			...companies
		} = companiesList || {};

		const {
			total: recentCompaniesTotal,
			...recentCompanies
		} = recentCompaniesList || {};

		// const cities = ResourcesStore.getState().toArray();


		// const {
		// 	object: companies,		// Для списка компаний именно это свойство используется
		// } = companiesList || {};

		let item;
		let content = [];


		if(!companiesList || !companiesList.count || !cities || !cities.length){
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

			content.push(<CompaniesList
				key="companiesList"
				data={companies}
				cities={cities}
			/>);

			recentCompanies && recentCompanies.count && content.push(<div
				key="recentCompaniesList"
			>
				<Typography
					type="title"
					style={{
						marginTop: 30,
						marginBottom: 20,
					}}
				>
					Новые заведения
				</Typography>

				<CompaniesList
					data={recentCompanies}
					showCities={false}
				/>
			</div>);


			if(topic){
				content.push(<div
					key="topic"
					style={{
						marginTop: 30,
					}}
				>

					<Typography
						type="title"
						style={{
							marginBottom: -10,
						}}
					>
						Последняя публикация <small><Link
							to="/topics/"
							href="/topics/"
							title="Все публикации"
							className="text default"
						>
							Читать все
						</Link></small>
					</Typography>
					
					<TopicView 
						item={topic}
						reloadData={::this.reloadData}
						open={false}
					/>
				</div>);
			}


			if(commentsList){

				const {
					object: comments,
				} = commentsList;

				comments && comments.length && content.push(<div
					key="comments"
					style={{
						marginTop: 30,
					}}
				>

					<Typography
						type="title"
					>
						Последнии комментарии <small><Link
							to="/comments/"
							href="/comments/"
							title="Все комментарии"
							className="text default"
						>
							Читать все
						</Link></small>
					</Typography>
					

					<Grid
						container
					>

						{comments.map(comment => {

						const {
							id,
						} = comment;

						return <Grid
							key={id}
							item
							xs={12}
							sm={6}
							lg={3}
						>
							<Comment
								item={comment}
								reloadData={::this.reloadData}
								open={false}
								showResourceLink={true}
							/>
						</Grid>

					})}
						
					</Grid>

				</div>);
			}

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

