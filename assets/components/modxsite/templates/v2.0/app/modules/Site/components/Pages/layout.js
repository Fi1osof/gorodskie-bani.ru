import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

export default class Page extends Component{

	static contextTypes = {
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
	};

	constructor(props){

		super(props);

		this.state = {}
	}

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

			// console.log('UsersStore payload', payload);

			this.onStoreUpdated(UsersStore, payload);

		});

		this.EditVersionsListener = EditVersionsStore.getDispatcher().register(payload => {

			// console.log('UsersStore payload', payload);

			this.onStoreUpdated(EditVersionsStore, payload);

		});

		this.onWillMount();
			
		// super.componentDidMount && super.componentDidMount();

		this.setPageTitle();

	}

	onWillMount(){
		
		this.loadData();

	}


	componentWillUnmount(){

		this.mounted = false;

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
    

	}


	componentDidMount(){

		this.mounted = true;

		this.forceUpdate();

	}


  componentDidUpdate(prevProps, prevState, prevContext){

    // if(this.props.debug){
    //   console.log("Page componentDidUpdate", this);
    // }

    const {
    	inited,
    } = this.context;

    const {
    	inited: prevInited,
    } = prevContext || {};

    // console.log("componentDidUpdate prevProps", prevProps.location);


		const page = this.getPage();

		const {
			location,
		} = prevProps;

		const {
			query: prevLocationQuery,
		} = location || {};

		const {
			page: prevPage,
		} = prevLocationQuery || {};


    if(
    	(prevContext !== undefined && !prevInited && inited)
    ){
    	
    	this.onInit();

    }
    	
  	// console.log("PageLayout componentDidUpdate page, prevPage", page, prevPage);

    if(
    	(page || prevPage) && parseInt(page) !== parseInt(prevPage)
    ){

    	this.onPageChange();

    	// console.log("PageLayout componentDidUpdate page || prevPage", page, prevPage);

    }

  }


  onInit(){

  	this.loadData();

  }


  onPageChange(){

  	this.loadData();
    	
  }


  onStoreUpdated(store, payload){

  	this.loadData();

  }


  getPage(){

		const {
			router,
		} = this.context;


		const {
			location,
		} = router;

		const {
			query,
		} = location || {};

		const {
			page,
		} = query || {};
	
		return parseInt(page) || undefined;	
  }


  setPageTitle(title){


		const {
			setPageTitle,
		} = this.context;

		title && setPageTitle(title);

  }


  loadData(beforeMount){

		// console.log("Page loadData");

  }

  getContent(){

  	return null;
  }

  findResource(resources, pathname){
  	let resource;

  	resources.map(r => {
  		if(resource){
  			return;
  		}

  		if(r.link == pathname){
  			resource = r;
  		}
  		else if(r.childs){
  			resource = this.findResource(r.childs, pathname);
  		}

			// return resource.link == pathname || (resource.childs && resource.childs.find(c => c.link == pathname));
		})

  	return resource;
  }

	render(){

		const {
			getCounters,
		} = this.context;

		return <div
			style={{
				maxWidth: 1260,
				width: "100%",
				margin: "0 auto",
				padding: "0 16px",
			}}
		>
			
			{this.renderContent()}

			<div
				style={{
					paddingTop: 30,
				}}
			>
				{getCounters()}
			</div>

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

Page.defaultProps = defaultProps;

Page.propTypes = {
}
