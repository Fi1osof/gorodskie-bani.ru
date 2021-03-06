import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

import ReactCmsPage from 'react-cms/src/app/components/Page';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

// const defaultProps = {}


let {
	...contextTypes
} = ReactCmsPage.contextTypes;


Object.assign(contextTypes, {
	inited: PropTypes.bool.isRequired,
	document: PropTypes.object.isRequired,
	coords: PropTypes.object,
	appExports: PropTypes.object.isRequired,
	setPageTitle: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	updateItem: PropTypes.func.isRequired,
	saveItem: PropTypes.func.isRequired,
	CompaniesStore: PropTypes.object.isRequired,
	TopicsStore: PropTypes.object.isRequired,
	ResourcesStore: PropTypes.object.isRequired,
	CommentsStore: PropTypes.object.isRequired,
	UsersStore: PropTypes.object.isRequired,
	RatingsStore: PropTypes.object.isRequired,
	EditVersionsStore: PropTypes.object.isRequired,
	getCounters: PropTypes.func.isRequired,
	localQuery: PropTypes.func.isRequired,
	remoteQuery: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  triggerGoal: PropTypes.func.isRequired,
});

export default class Page extends ReactCmsPage{

	static contextTypes = contextTypes;

	// constructor(props){

	// 	super(props);

	// 	this.state = {};
	// }

	componentWillMount(){

		const {
			CommentsStore,
			RatingsStore,
			TopicsStore,
			ResourcesStore,
			UsersStore,
			EditVersionsStore,
		} = this.context;

		this.CommentsStoreListener = CommentsStore.getDispatcher().register(payload => {

			this.onStoreUpdated(CommentsStore, payload);

		});

		this.RatingsStoreListener = RatingsStore.getDispatcher().register(payload => {

			this.onStoreUpdated(RatingsStore, payload);

		});

		this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

			this.onStoreUpdated(TopicsStore, payload);

		});

		this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(payload => {

			this.onStoreUpdated(ResourcesStore, payload);

		});

		this.UsersStoreListener = UsersStore.getDispatcher().register(payload => {



			this.onStoreUpdated(UsersStore, payload);

		});

		this.EditVersionsListener = EditVersionsStore.getDispatcher().register(payload => {



			this.onStoreUpdated(EditVersionsStore, payload);

		});

		// this.onWillMount();
			
		// // super.componentDidMount && super.componentDidMount();

		// this.setPageTitle();

		super.componentWillMount();

	}

	// onWillMount(){

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
	// 	else {

	// 		this.loadData();

	// 	}

	// }


	componentWillUnmount(){

		// this.mounted = false;

		const {
			CommentsStore,
			RatingsStore,
			TopicsStore,
			ResourcesStore,
			UsersStore,
			EditVersionsStore,
		} = this.context;



    if(this.CommentsStoreListener){

      let dispatch = CommentsStore.getDispatcher();

      dispatch._callbacks[this.CommentsStoreListener] && dispatch.unregister(this.CommentsStoreListener);

      this.CommentsStoreListener = undefined;
    }


    if(this.RatingsStoreListener){

      let dispatch = RatingsStore.getDispatcher();

      dispatch._callbacks[this.RatingsStoreListener] && dispatch.unregister(this.RatingsStoreListener);

      this.RatingsStoreListener = undefined;
    }


    if(this.TopicsStoreListener){

      let dispatch = TopicsStore.getDispatcher();

      dispatch._callbacks[this.TopicsStoreListener] && dispatch.unregister(this.TopicsStoreListener);

      this.TopicsStoreListener = undefined;
    }


    if(this.ResourcesStoreListener){

      let dispatch = ResourcesStore.getDispatcher();

      dispatch._callbacks[this.ResourcesStoreListener] && dispatch.unregister(this.ResourcesStoreListener);

      this.ResourcesStoreListener = undefined;
    }


    if(this.UsersStoreListener){

      let dispatch = UsersStore.getDispatcher();

      dispatch._callbacks[this.UsersStoreListener] && dispatch.unregister(this.UsersStoreListener);

      this.UsersStoreListener = undefined;
    }


    if(this.EditVersionsListener){

      let dispatch = UsersStore.getDispatcher();

      dispatch._callbacks[this.EditVersionsStore] && dispatch.unregister(this.EditVersionsListener);

      this.EditVersionsListener = undefined;
    }
    
    super.componentWillUnmount();
	}


	// componentDidMount(){

	// 	this.mounted = true;

	// 	this.clearInitialState();

	// 	// this.forceUpdate();

	// }


	// Удаляем инит-данные, чтобы при смене страницы и компонента было понятно, что данные надо подгрузить
	// clearInitialState(){



	// 	let {
	// 		document,
	// 	} = this.context;

	// 	if(document){

	// 		document.resourceState = null;

	// 	}

	// }


  componentDidUpdate(prevProps, prevState, prevContext){

    // if(this.props.debug){

    // }

  //   const {
  //   	inited,
  //   } = this.context;

  //   const {
  //   	inited: prevInited,
  //   } = prevContext || {};




		// const page = this.getPage();

		// const {
		// 	location,
		// } = prevProps;

		// const {
		// 	query: prevLocationQuery,
		// } = location || {};

		// const {
		// 	page: prevPage,
		// } = prevLocationQuery || {};


  //   if(
  //   	(prevContext !== undefined && !prevInited && inited)
  //   ){
    	
  //   	this.onInit();

  //   }
    	


  //   if(
  //   	(page || prevPage) && parseInt(page) !== parseInt(prevPage)
  //   ){

  //   	this.onPageChange();



  //   }

    super.componentDidUpdate(prevProps, prevState, prevContext);
  }


  // onInit(){

  // 	this.reloadData();

  // }


  // onPageChange(){

  // 	this.reloadData();
    	
  // }


  // onStoreUpdated(store, payload){

  // 	this.reloadData();

  // }


  // getPage(){

		// const {
		// 	router,
		// } = this.context;


		// const {
		// 	location,
		// } = router;

		// const {
		// 	query,
		// } = location || {};

		// const {
		// 	page,
		// } = query || {};
	
		// return parseInt(page) || undefined;	
  // }


  setPageTitle(title){


		// const {
		// 	setPageTitle,
		// } = this.context;

		// title && setPageTitle(title);

  }

	
	// async loadData(options = {}){

	// 	// if(!this.mounted){
	// 	// 	return;
	// 	// }

	// 	if(typeof window === "undefined"){
			
	// 		return;

	// 	}



	// 	const {
	// 		remoteQuery,
	// 	} = this.context;

	// 	let {
	// 		provider,
	// 	} = options;

	// 	provider = provider || remoteQuery;

	// 	let result = await this.loadServerData(provider, options);



	// 	if(result){

	// 		this.initState(result.data);

	// 	}

	// 	return;

	// }


	// reloadData(options = {}){

	// 	return this.loadData(options);

	// }


	// async loadServerData(provider, options = {}){

	// 	// Для всех страниц по умолчанию
	//   return {
	//   	data: {},
	//   };

	// }


	// initState(newState, willMount){

	// 	if(!willMount && (this.mounted !== undefined && this.mounted !== true)){
	// 		return;
	// 	}

	// 	newState = newState || {};

	// 	if(willMount){

	// 		Object.assign(this.state, newState);
			
	// 	}
	// 	else{

	// 		this.setState(newState);

	// 	}

	// }


  // getContent(){

  // 	return null;
  // }


  // findResource(resources, pathname){
  // 	let resource;

  // 	resources.map(r => {
  // 		if(resource){
  // 			return;
  // 		}

  // 		if(r.link == pathname){
  // 			resource = r;
  // 		}
  // 		else if(r.childs){
  // 			resource = this.findResource(r.childs, pathname);
  // 		}

		// 	// return resource.link == pathname || (resource.childs && resource.childs.find(c => c.link == pathname));
		// })

  // 	return resource;
  // }

	render(childContent){

		const {
			getCounters,
		} = this.context;

		const {
			pageReloading,
		} = this.state;

		// if(companies === undefined){
		// 	content = <div
		// 		style={{
		// 			height: "100vh",
		// 		}}
		// 	>
		// 		<div 
  //         className="preloader"
  //       />
  //      </div>
		// } 

		return <div
			style={{
				maxWidth: 1260,
				width: "100%",
				margin: "0 auto",
				padding: "0 16px",
			}}
		>

			{pageReloading
				?
				<div
					style={{
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 1000,
					}}
				>
					<div 
	          className="preloader"
	        />
	       </div>
				:
				null
			}
			
			{childContent || this.renderContent() || null}

			<CardContent>

				<Grid
					container
					style={{
						paddingTop: 30,
					}}
				>
					
					<Grid
						item
						xs
					>
						{getCounters()}	
					</Grid>

					<Grid
						item
					>
						<Link
							to="/ratings/"
							href="/ratings/"
							title="Рейтинги бань"
						>
							Рейтинги бань
						</Link>
					</Grid>

					<Grid
						item
					>
						<Link
							to="/contacts.html"
							href="/contacts.html"
							title="Разместить информацию о бане"
						>
							Добавить баню или сауну
						</Link>
					</Grid>

				</Grid>

			</CardContent>

		</div>;

		// return <Grid
		// 	container
  	//     gutter={0}
		// 	style={{
		// 		maxWidth: 1260,
		// 		margin: "0 auto",
		// 	}}
		// >
			
		// 	{this.renderContent()}

		// 	<div
		// 		style={{
		// 			paddingTop: 30,
		// 		}}
		// 	>
		// 		{getCounters()}
		// 	</div>

		// </Grid>;
	}
}

// Page.defaultProps = defaultProps;

// Page.propTypes = {
// }
