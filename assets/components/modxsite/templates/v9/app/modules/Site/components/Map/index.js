import React, {Component} from 'react';

import PropTypes from 'prop-types'; 

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Checkbox, {LabelCheckbox} from 'material-ui/Checkbox';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ExploreIcon from 'material-ui-icons/Explore';
import CloseIcon from 'material-ui-icons/Close';
import Business from 'material-ui-icons/Business';
import Texture from 'material-ui-icons/Texture';

import GoogleMapReact from 'google-map-react';

import supercluster from 'supercluster';

// window.supercluster = supercluster;

import {Link, browserHistory} from 'react-router';

// import PlaceDialog from '../../Grid/Places/Dialog/index.js';

import Marker from './MainView/Marker';
// import SideBar from './SideBar';




export default class MapMainView extends Component{

	static contextTypes = {

		// updateItem: PropTypes.func.isRequired,
		// savePlaceItem: PropTypes.func.isRequired,
		openCompanyPage: PropTypes.func.isRequired,
		// loadCompanyMapData: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
		CompaniesStore: PropTypes.object.isRequired,
		setPageTitle: PropTypes.func.isRequired,
	};

	static defaultProps = {
    center: {
    	lat: 55.760046, 
    	lng: 37.626028,
    },
    zoom: 11
	};

	static propTypes = {
	};

	constructor(props){

		super(props);

		this.state = {
			draggable: true,
		  mapOptions: {
		    center: props.center,
		    zoom: props.zoom,
		  },
		  center: props.center,
		  zoom: props.zoom,
		  clusters: null,
		  // activePlaceItem: null,
		  // sidebarOpen: true,
			cluster: null,
		}
	}

	componentWillMount(){

		let {
			CompaniesStore,
		} = this.context;

 		this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {

 			this.createClusters();
 		});


 		let {
 			router,
 		} = this.context;

 		let {
 			lat,
 			lng,
 			zoom,
 		} = router.params;

 		// 

 		if(lat && lng && zoom){
 			// this.setMapPosition(lat, lng);
      // defaultCenter={this.props.center}

      let center = {
      	lat: parseFloat(lat),
      	lng: parseFloat(lng),
      };

      zoom = parseFloat(zoom);

      Object.assign(this.state, {
      	center,
      	zoom,
      	mapOptions: {
	      	center,
		      zoom,
      	}
      });
 		}

 		return super.componentWillMount && super.componentWillMount();
	}

	componentWillUnmount(){

 		let {

			CompaniesStore,
 		} = this.context;


    if(this.CompaniesStoreListener){

      let dispatch = CompaniesStore.getDispatcher();

      dispatch._callbacks[this.CompaniesStoreListener] && dispatch.unregister(this.CompaniesStoreListener);

      this.CompaniesStoreListener = undefined;
    }


 		return super.componentWillUnmount && super.componentWillUnmount();
	}

	componentDidMount(){

 		// let {
 		// 	router,
 		// } = this.context;

 		// let {
 		// 	lat,
 		// 	lng,
 		// } = router.params;

 		// if(lat && lng){
 		// 	// this.setMapPosition(lat, lng);
   //    // defaultCenter={this.props.center}

 		// }

 		const {
 			setPageTitle,
 		} = this.context;

 		setPageTitle("Городские бани");

 		this.createClusters();
	}

	// shouldComponentUpdate(a, b, c, d){

	// 	
	// 	
	// 	
	// 	

	// 	return true;
	// }

	componentDidUpdate(prevProps, prevState, prevContext){

		
		// 

		// 
		// 

		let {
			// mapShowGeoObjects,
			// mapShowContacts,
 			router,
		} = this.context;

		/*
			Если поменялись координаты в роунитге, двигаем карту
		*/

 		let {
 			lat,
 			lng,
 			zoom,
 		} = router.params || {};

 		// 

 		let {
 			center: {
	 			lat: currentLat,
	 			lng: currentLng,
 			},
 			zoom: currentZoom,
 		} = this.state;

 		if(
 			lat && lng && zoom
 			&& (
 				lat != currentLat
 				|| lng != currentLng
 				|| zoom != currentZoom
			)
 		){
 			// this.setMapPosition(lat, lng);
      // defaultCenter={this.props.center}

      this.setState({
      	center: {
	      	lat: parseFloat(lat),
	      	lng: parseFloat(lng),
	      },
	      zoom: parseFloat(zoom),
      });
 		}

		// /*
		// 	Если поменяли отображаемость типов объектов, перебираем кластеры по новой
		// */
		// if(
		// 	(
		// 		(mapShowGeoObjects || prevContext.mapShowGeoObjects)
		// 		||
		// 		(mapShowContacts || prevContext.mapShowContacts)
		// 	)
		// 	&&
		// 	(
		// 		mapShowGeoObjects != prevContext.mapShowGeoObjects
		// 		|| mapShowContacts != prevContext.mapShowContacts
		// 	)

		// ){
		// 	// 
		// 	this.createClusters();
		// }

		return super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext) || true;
	}

	onChildClick(key, props){

		// 

		let {
			cluster,
		} = props;

		let{
			openCompanyPage,
		} = this.context;

		let {
			properties: {
				cluster_id,
				cluster: isCluster,
				item,
			},
		} = cluster;

		
		// cluster

		if(item){
			openCompanyPage(item);
		}

		// this.setState({cluster_id});

		return;

		// let {
		// 	lat,
		// 	lng,
		// 	cluster,
		// } = props;

		// let {
		// 	properties,
		// 	properties: {
		// 		item,
		// 	},
		// } = cluster;


		// // 
		// // 

		// if(item){

		// 	// item.onClick && item.onClick();

		// 	this.setState({
		// 		activePlaceItem: item,
		// 	});
		// }
		// else{

		// }

		// return;
	}

	onGoogleApiLoaded(options){

		let {
			map,
			maps,
		} = options;

		// 

		// window.map = map;
		// window.maps = maps;

		this.setState({
			map,
			maps,
		});
	}

 	// onChildMouseDown(key, props, coords){
 	// 	

 	// 	let {
 	// 		cluster: {
	 // 			properties,
	 // 			geometry,
 	// 		},
 	// 	} = props;
 

 	// 	let {
 	// 		cluster,
 	// 	} = properties;

 	// 	if(!cluster){	
	 // 		this.setState({
	 // 			draggable: false,
	 // 		});
 	// 	}

 	// 	return;
 	// }

 	// onChildMouseUp(){
 	// 	// 

 	// 	this.setState({
 	// 		draggable: true,
 	// 	});
 	// }

 	onChildMouseMove(key, marker, newCoords){

 		let {
 			item,
 		} = marker;

 		let {

 		} = this.props;

 		let {
 			updateItem,
 		} = this.context;


 		// 

 		// 

 		// 



 		this.forceUpdate();
 	}

 	onChildMouseEnter(key, props){
 		

 		let {
 			cluster,
 		} = props;

 		// if(!item){
 		// 	return;
 		// }

 		Object.assign(cluster.properties, {
 			hovered: true,
 		});

 		this.forceUpdate();
 	}

 	onChildMouseLeave(key, props){
 		// 

 		let {
 			cluster,
 		} = props;

 		Object.assign(cluster.properties, {
 			hovered: false,
 		});

 		// let {
 		// 	item,
 		// } = props;

 		// if(!item){
 		// 	return;
 		// }

 		// Object.assign(item, {
 		// 	hovered: false,
 		// });
 		this.forceUpdate();
 	}


 
 	handleMapChange = ({ center, zoom, bounds }) => {
 
 		let {
 			lat,
 			lng,
 		} = center;

 		// 

 		let {
 			router,
 		} = this.context;

 		var location = router.getCurrentLocation();

 		let {
 			pathname,
 		} = location;


 		lat = lat && parseFloat(parseFloat(lat).toFixed(6)) || undefined;
 		lng = lng && parseFloat(parseFloat(lng).toFixed(6)) || undefined;

 		if(lat && lng){

	 		pathname = location.pathname.replace(/(.*\/)@([\d+\,\.\-]*)?/, '$1');

	 		pathname = pathname.replace(/(.*\/)/, `$1@${lat},${lng},${zoom}`);

	 		location.pathname = pathname;

	 		// 

	 		// 

	 		browserHistory.push(location);
 			
 		}

 		// 


	  this.setState(
	    {
	      // mapOptions: {
	      //   center,
	      //   zoom,
	      //   bounds,
	      // },
        center,
        zoom,
        bounds,
	    },
	    () => {

	    	// browserHistory.replace();
	      // this.createClusters(this.props);
	    }
	  );
	};

	createClusters = props => {

		

		// 

	  // this.setState({
	  //   // clusters: this.state.mapOptions.bounds
	  //   clusters: this.state.bounds
	  //     ? this.getClusters(props)
	  //     : null,
	  // });

	  let {
			CompaniesStore,
		} = this.context;

		let {
			// mapOptions: {
			// 	zoom,
			// },
			zoom,
		} = this.state;

		let {
		} = this.context;


  	let markersData = [];

		CompaniesStore.getState().map(item => {


  		let {
  			id,
  			coords,
  			name,
  		} = item;

  		let {
  			lat,
  			lng,
  		} = coords || {};

  		// 

  		if(!lat || !lng){
  			return;
  		}


  		markersData.push({
	      "type": "Feature",
	      "properties": {
	      	item: item,
	      	type: "Contact",
	      	openEditor: () => {
	      		browserHistory.push(`/db/contacts/${id}/`);
	      	},
	        "scalerank": 3,
	        "name": name,
	        "comment": null,
	        "name_alt": null,
	        "lat_y": lat,
	        "long_x": lng,
	        "region": "North America",
	        "subregion": null,
	        "featureclass": "cape"
	      },
	      "geometry": {
	        "type": "Point",
	        "coordinates": [lng, lat]
	      }
	    });
  	});

  	// window.data = markersData;

  	// 

  	// window.c = supercluster({
   //      log: true,
   //      radius: 60,
   //      extent: 256,
   //      maxZoom: 17
   //  }).load(data);  	

   	// const clusters = supercluster(data, {
    //     log: true,
    //     radius: 60,
    //     extent: 256,
    //     maxZoom: 17
    // });

   	const clusters = supercluster({
        // log: true,
        radius: 60,
        extent: 256,
        // maxZoom: 15,
    }).load(markersData);


   	// window.clusters = clusters;

	  // const clusters = supercluster(markersData, {
	  //   minZoom: 0,
	  //   maxZoom: 16,
	  //   radius: 60,
	  // });

	  // window.cl2 = clusters;

	  // return clusters.getClusters([-180, -85, 180, 85], 2);
	  // return clusters.getClusters(this.state.mapOptions);

	  this.setState({
	  	clusters,
	  });

	  // return clusters;
	};

	getClusters = () => {

		const {
			clusters,
		} = this.state;

		return clusters;
	};


	getMap(){
		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		return mapProvider && mapProvider.map_ || undefined;
	}

	setMapPosition(lat, lng){
		let {
			// map,
			maps,
		} = this.state;

		// 

		// map.setCenter(new maps.LatLng(lat, lng));

		// mapProvider2.map_ && mapProvider2.map_.setCenter(new maps.LatLng(lat, lng));

		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		let map = this.getMap();

		map && map.setCenter(new maps.LatLng(lat, lng));
		return;
	}

	// closeSidebar(event){

	// 	// this.setState({
	// 	// 	sidebarOpen: false,
	// 	// }, ::this.resizeMap
	// 	// );
	// }

	resizeMap(){

		let {
			mapProvider,
			// mapProvider2,
		} = this.refs;

		mapProvider && mapProvider._mapDomResizeCallback();
		// mapProvider2 && mapProvider2._mapDomResizeCallback();
	}

	isInScreen(cluster){

		let {
			bounds,
		} = this.state;

		const {
			nw,
			se,
		} = bounds || {};

		let {
			geometry: {
				coordinates: {
					0: lng,
					1: lat,
				},
			}
		} = cluster;

		// 
		if(!lat || !lng || !nw || !se){
			return false;
		}

		let {
			lat: maxLat,
			lng: minLng,
		} = nw,
		{
			lat: minLat,
			lng: maxLng,
		} = se
		;

		const latDiff = maxLat - minLat;

		minLat -= latDiff;
		maxLat += latDiff;

		const lngDiff = maxLng - minLng;

		minLng -= lngDiff;
		maxLng += lngDiff;

		// 

		// 

 
		if(
			lat < maxLat && lat > minLat
			&&
			lng > minLng && lng < maxLng
		){
			return true;
		}

		return false
	}

	// loadCompanyMapData(item, force){
		
	// 	const {
	// 		loadCompanyMapData,
	// 	} = this.context;

	// 	loadCompanyMapData(item, force);
	// }

	render(){

		let {
			children,
		} = this.props;

		/*
			Router module
		*/
		if(children){
  		return <div
  			style={{
  				height: '100%',
  			}}
  		>
  			{children}
  		</div>
  	}

		const {
			map,
			maps,
			draggable,
			clusters,
			// activePlaceItem,
			// sidebarOpen,
			zoom,
			cluster_id,
			bounds,
		} = this.state;

		// 

		let {
			savePlaceItem,
		} = this.context;

  	let items = [];

  	let sidebar_items_list = [];



  	if(cluster_id){
  		
  		
  	}

  	// 

  	clusters && clusters.getClusters([-180, -85, 180, 85], zoom || 4).map(cluster => {

  		if(cluster.properties.type == "Contact"){
  			// 
  		}


  		let {
  			properties: {
  				type,
  				item,
  			},
  		} = cluster;

			let {
				geometry: {
					coordinates: {
						0: lng,
						1: lat,
					},
				}
			} = cluster;

			let {
				id,
			} = item || {}

			// if(item){
			// 	this.loadCompanyMapData(item);
			// }

			// Если точка не в рамках карты, пропускаем 
			if(!this.isInScreen(cluster)){
				return;
			}

  		items.push(<Marker
  			key={id && `${id}_${type}` || `marker_${items.length}`} 
  			lat={lat}
  			lng={lng}
				item={item}
				cluster={cluster}
  		/>);


  		

			return;
  	});

  	// 

  	// 

  	// sidebarOpen = sidebarOpen && sidebar_items_list && sidebar_items_list.length ? true : false;

  	return <Grid
  		container
  		style={{
  			height: '100%',
  		}}
  		gutter={0}
  	>
	  	
	  	{/*sidebarOpen 
	  		? 
	  		<Grid
		  		item
		  		xs={12}
		  		md={3}
		  	>

		  		<Paper 
		  			style={{
		  				height: '100%',
		  				overflowX: 'hidden',
		  				overflowY: 'auto',
		  			}}
		  		>

		  			<List
		  				subheader={<div>
		  					<IconButton
			  					onClick={::this.closeSidebar}
			  				>
			  					<CloseIcon />
			  				</IconButton>

			  				<div>

			  					<LabelCheckbox 
			  						label="Компании"
			  						checked={mapShowContacts}
			  						onChange={event => {
			  							this.setState({
			  								mapShowContacts: !mapShowContacts,
			  							});
			  						}}
			  					/>

			  					<LabelCheckbox 
			  						label="ГеоОбъекты"
			  						checked={mapShowGeoObjects}
			  						onChange={event => {
			  							this.setState({
			  								mapShowGeoObjects: !mapShowGeoObjects,
			  							});
			  						}}
			  					/>

			  				</div>
		  				</div>}
		  			>
			  			{sidebar_items_list && sidebar_items_list.length
			  				?
			  					sidebar_items_list
			  				:
			  				<div>
			  					Нет одиночных элементов для отображения
			  				</div>
			  			}
			  		</List>
		  		</Paper>

		  	</Grid>
		  	:
		  	null
	  	<Grid
	  		item
	  		xs={12}
	  		// md={sidebarOpen ? 9 : 12}
	  	>
	  		{map && maps 
	  			?
	  			<SideBar
		  			map={map}
		  			maps={maps}
		  		/>
		  		:
		  		null
		  	}

		  	mapOptions
		  */}
	  	

	  		<GoogleMapReact
		      bootstrapURLKeys={{
		      	key: "AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU",
		      }}
		      defaultCenter={this.state.mapOptions.center}
		      defaultZoom={this.state.mapOptions.zoom}
		      center={this.state.center} // current map center
  				zoom={this.state.zoom} // current map zoom
	  			ref="mapProvider"
					draggable={draggable}
				  onGoogleApiLoaded={::this.onGoogleApiLoaded}
				  yesIWantToUseGoogleMapApiInternals={true}
		  		onChange={this.handleMapChange}
				  onChildClick={::this.onChildClick}
				  // onChildMouseDown={::this.onChildMouseDown}
				  // onChildMouseUp={::this.onChildMouseUp}
				  // onChildMouseMove={::this.onChildMouseMove}
				  onChildMouseEnter={::this.onChildMouseEnter}
				  onChildMouseLeave={::this.onChildMouseLeave}
				 //  options={{
					//   scrollwheel: false,
					// }}
		    >
		    	{items}
		    </GoogleMapReact>
	  	</Grid> 

	  {/*
  	</Grid>
	  */}

	}
} 