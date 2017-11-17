import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

import Topic from './Topic';

export default class TopicsPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			limitPerPage: 10,
		});
	}


	componentWillMount(){

		// const {
		// 	item,
		// } = this.props;

		// const {
		// 	name,
		// } = item || {};


		// let {
		// 	TopicsStore,
		// } = this.context;

 	// 	this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {

 	// 		this.loadCompanyFullData();
 	// 	});

		let {
			document,
			appExports,
		} = this.context;

		// let pathname = router.location && router.location.pathname;


		// if(typeof window === "undefined"){


		// 	let outputState = CompaniesStore.getState();
			
		// 	if(pathname && outputState){

		// 		pathname = decodeURI(pathname);

		// 		pathname = pathname.replace(/^\//, '');
				
		// 		outputState = outputState.filter(n => n.uri === pathname || n.uri === `${pathname}/`);

		// 	}

		// 	appExports.outputState = outputState && outputState.toArray();


		// }
		// else{
				
		// 	this.state.inputState = document.inputState;

		// }



		if(typeof window === "undefined"){

		  const topics = this.getLocalData();

		  this.state.topics = topics;

			appExports.outputState = topics;

		}
		else{
				
			this.state.topics = document.inputState;

		}

		super.componentWillMount && super.componentWillMount();
	}


	getLocalData(){

	  const {
	    TopicsStore,
	  } = this.context;

	  const topics = TopicsStore.getState();
		
		return topics;
		
	}

	// componentWillUnmount(){

 // 		let {
	// 		TopicsStore,
 // 		} = this.context;


 //    if(this.CompaniesStoreListener){

 //      let dispatch = CompaniesStore.getDispatcher();

 //      dispatch._callbacks[this.CompaniesStoreListener] && dispatch.unregister(this.CompaniesStoreListener);

 //      this.CompaniesStoreListener = undefined;
 //    }


 // 		return super.componentWillUnmount && super.componentWillUnmount();
	// }

	componentDidMount(){

		// this.loadData();

		super.componentDidMount && super.componentDidMount();
	}

	componentDidUpdate(prevProps, prevState, prevContext){

		const {
			city: currentCity,
			tag: currentTag,
		} = this.state;


		let {
 			router,
		} = this.context;


		const {
			topicAlias,
			tag,
		} = router && router.params || {};

		const {
			topicAlias: currentTopicAlias,
		} = this.state;


		// console.log("componentDidUpdate", currentCity, topicAlias);

		if((currentTopicAlias || topicAlias) && currentTopicAlias !== topicAlias){
		

			this.setState({
				topicAlias,
			}, () => {

				if(currentTopicAlias && !topicAlias){

					this.setPageTitle();

				}

			});

		}

		if((currentTag || tag) && currentTag !== tag){
		

			this.setState({
				tag,
			}, () => {

				// if(currentTopicAlias && !topicAlias){

				// 	this.setPageTitle();

				// }

				this.loadData();

			});

		}


		return super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext) || true;
	}
	

	/*
		Обновление хранилищ на каждый чих - большая нагрузка,
		поэтому обновляем по логике, заданной в методе onStoreUpdate
	*/
	loadData(){


		// console.log("TopicsPage loadData");

		// if(typeof window === "undefined"){
			
		//   // const {
		//   //   TopicsStore,
		//   // } = this.context;

		//   // this.state.topics = TopicsStore.getState();

		// }
		// else{

			const {
				inited,
			} = this.context;

			if(!inited){
				return;
			}

			const {
				params,
			} = this.props;

			const {
				tag,
			} = params || {};


			const {
				localQuery,
			} = this.context;

			return localQuery({
				operationName: this.getOperationName(),
				variables: {
					// resourcesLimit: 10,
					resourceGetAuthor: true,
					resourceGetComments: true,
					getCommentAuthor: true,
					resourceTag: tag,
				},
			})
			.then(r => {

				// console.log("Resources r", beforeMount, r);

				const {
					topics,
				} = r.data;

				// this.setState({
				// 	topics,
				// });

				// if(beforeMount){

				// 	this.state.topics = topics;

				// }
				// else{
					
				// 	this.setState({
				// 		topics,
				// 	});

				// }

				if(typeof window === "undefined"){

					this.state.topics = topics;

				}
				else{
					
					this.setState({
						topics,
					});

				}

				// this.setState({
				// 	topics,
				// });

			}); 

		// }

		// console.log("Resources r", result);
		
	}



	// shouldComponentUpdate(){

	// 	return false;
	// }

	

  onStoreUpdated(store, payload){

  	// console.log("topics page onStoreUpdated", payload);

  	const {
  		type,
  		object,
  		newObject,
  	} = payload || {};


  	if(
  		type !== "SET_DATA"
  		&& type !== "CREATE_OBJECT"
  	){

			const {
				// CommentsStore,
				// RatingsStore,
				TopicsStore,
				// ResourcesStore,
				// UsersStore,
				// EditVersionsStore,
			} = this.context;


			let {
				topics,
			} = this.state;


			if(store === TopicsStore){

				// console.log("TopicsStore item", object, newObject, topics && topics.find(n => n.id === object.id));

				const item = object && newObject && topics && topics.find(n => n.id === object.id);

				if(item){

					const newItem = Object.assign({}, item, newObject);

					const index = topics.indexOf(item);
  			
  				// this.forceUpdate();

  				if(index !== -1){

  					topics[index] = newItem;

						this.setState({
							topics,
						});

  				}


				}

				// console.log("TopicsStore update item", newObject, item);

			}



  		return;
  	}

  	
  	return super.onStoreUpdated(store, payload);

  }


	getOperationName(){
		
		return "Topics";

	}



  setPageTitle(title){

  	// console.log("setPageTitle", title);

		// const {
		// 	params,
		// } = this.props;

		// const {
		// 	topicAlias,
		// } = params || {};

		super.setPageTitle(title || "Новости");

  }


	renderTopics(){

		const {
			topics,
			limit,
			limitPerPage,
		} = this.state;

		// console.log("Topic", topics);

		let topicsList = [];

		topics && topics.map((topic, index) => {

			if(limit > 0 && topicsList.length >= limit){
				return;
			}

			const {
				id,
				name,
			} = topic;

			topicsList.push(<Topic
				key={id}
				item={topic}
				open={false}
				commentOpen={false}
			>
				{name}
			</Topic>);

		});

		let moreButton;

		const total = topics && topics.length || 0;

		if(topicsList && topics && topicsList.length < topics.length){

			moreButton = <div
				style={{
					textAlign: "center",
				}}
			>
				
				<Button
					onClick={event => {

						this.setState({
							limit: limit + limitPerPage,
						});

					}}
					raised
				>
					{topicsList.length} из {total}. Показать еще {limitPerPage + topicsList.length > topics.length ? (topics.length - topicsList.length) : limitPerPage}
				</Button>

			</div>

		}

		return <div
			style={{
				width: "100%",
			}}
		>
			{topicsList}

			{moreButton}
		</div>

	}

	
	renderContent(){

		const {
			params,
		} = this.props;

		const {
			router,
			location,
		} = this.context;

		// const pathname = router.getCurrentLocation().pathname.replace(/^\//, '');
		const pathname = decodeURI(location && location.pathname && location.pathname.replace(/^\//, '') || "");

		// console.log("Topics pathname", pathname, router.getCurrentLocation());
		// console.log("Topics pathname", pathname, location);

		const {
			topics,
		} = this.state;

		const {
			topicAlias,
		} = params || {};

		// let item;
		// let company;

		let content;

		const item = pathname && topics && topics.find(n => n.uri === pathname || n.uri === `${pathname}/`);

		if(topicAlias || item){
			
			// const item = TopicsStore.getState().find(n => n.id == topicAlias || n.alias == topicAlias);
			// const item = topics && topics.find(n => n.id == topicAlias || n.alias == topicAlias.replace(".html", ""));

			if(item){

				this.setPageTitle(item.name);

				content = <Grid
					item
				>
					
					<Topic
						item={item}
						open={true}
					/>

				</Grid>

			}
			else{
				content = <div
					style={{
						color: "red",
					}}
				>
					Документ не был найден
				</div>
			}

		}
		else{
			content = this.renderTopics();
		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div
			style={{
				width: "100%",
			}}
		>
 			
 			{content}

		</div>
	}

}

