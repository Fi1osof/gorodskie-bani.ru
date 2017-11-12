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

			this.loadData();

		});

		this.RatingsStoreListener = RatingsStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.UsersStoreListener = UsersStore.getDispatcher().register(payload => {

			// console.log('UsersStore payload', payload);

			this.loadData();

		});

		this.EditVersionsListener = EditVersionsStore.getDispatcher().register(payload => {

			// console.log('UsersStore payload', payload);

			this.loadData();

		});

		this.loadData(true);
			
		// super.componentDidMount && super.componentDidMount();

		this.setPageTitle();

	}

	componentWillUnmount(){

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

		this.forceUpdate();

	}

  componentDidUpdate(prevProps, prevState, prevContext){

    if(this.props.debug){
      console.log("Page componentDidUpdate", this);
    }

    const {
    	inited,
    } = this.context;

    const {
    	inited: prevInited,
    } = prevContext || {};

    // console.log("componentDidUpdate prevProps", prevProps.location);


		const page = this.getPage();

		const {
			location: {
				query: prevLocationQuery,
			},
		} = prevProps;

		const {
			page: prevPage,
		} = prevLocationQuery || {};


    if(
    	(prevContext !== undefined && !prevInited && inited)
    ){
    	
    	this.loadData();

    }

    if(
    	(page || prevPage) && page !== parseInt(prevPage)
    ){
    	
    	this.loadData();

    	// console.log("componentDidUpdate page || prevPage", page, prevPage);

    }

  }


  getPage(){

		const {
			router,
		} = this.context;


		const {
			location: {
				query,
			},
		} = router;

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

		return <Grid
			container
      gutter={0}
			style={{
				maxWidth: 1260,
				margin: "0 auto",
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

		</Grid>;
	}
}

Page.defaultProps = defaultProps;

Page.propTypes = {
}
