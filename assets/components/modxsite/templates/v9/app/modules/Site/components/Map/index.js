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
  //   router: PropTypes.object.isRequired,
		// mapShowContacts: PropTypes.bool.isRequired,
		// mapShowContactsToggle: PropTypes.func.isRequired,
		// mapShowGeoObjects: PropTypes.bool.isRequired,
		// mapShowGeoObjectsToggle: PropTypes.func.isRequired,
	};

	static defaultProps = {
    center: {lat: 55.75, lng: 37.9},
    zoom: 11
	};

	static propTypes = {
		// PlacesStore: PropTypes.object.isRequired,
		// ContactsStore: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			draggable: true,
		  // mapOptions: {
		  //   center: props.center,
		  //   zoom: props.zoom,
		  // },
		  center: props.center,
		  zoom: props.zoom,
		  clusters: null,
		  // activePlaceItem: null,
		  // sidebarOpen: true,
			// mapShowContacts: false,
			// mapShowGeoObjects: true,
			cluster: null,
		}
	}

	// componentWillMount(){

 // 		let {

	// 		PlacesStore,
	// 		ContactsStore,
 // 		} = this.props;

 // 		this.PlacesStoreListener = PlacesStore.getDispatcher().register(payload => {

 // 			this.createClusters();
 // 		});

 // 		this.ContactsStoreListener = ContactsStore.getDispatcher().register(payload => {

 // 			this.createClusters();
 // 		});


 // 		let {
 // 			router,
 // 		} = this.context;

 // 		let {
 // 			lat,
 // 			lng,
 // 			zoom,
 // 		} = router.params;

 // 		// console.log("lat lng", lat, lng, zoom);

 // 		if(lat && lng && zoom){
 // 			// this.setMapPosition(lat, lng);
 //      // defaultCenter={this.props.center}



 //      Object.assign(this.state, {
 //      	center: {
	//       	lat: parseFloat(lat),
	//       	lng: parseFloat(lng),
	//       },
	//       zoom: parseFloat(zoom),
 //      });
 // 		}

 // 		return;
	// }

	// componentWillUnmount(){

 // 		let {

	// 		PlacesStore,
	// 		ContactsStore,
 // 		} = this.props;


 // 		if(this.PlacesStoreListener){

 //      let PlacesStoreDispatch = PlacesStore.getDispatcher();

 //      PlacesStoreDispatch._callbacks[this.PlacesStoreListener] && PlacesStoreDispatch.unregister(this.PlacesStoreListener);

 //      this.PlacesStoreListener = undefined;
 //    } 


 //    if(this.ContactsStoreListener){

 //      let dispatch = ContactsStore.getDispatcher();

 //      dispatch._callbacks[this.ContactsStoreListener] && dispatch.unregister(this.ContactsStoreListener);

 //      this.ContactsStoreListener = undefined;
 //    }


 // 		return;
	// }

	// componentDidMount(){

 // 		let {
 // 			router,
 // 		} = this.context;

 // 		let {
 // 			lat,
 // 			lng,
 // 		} = router.params;

 // 		if(lat && lng){
 // 			// this.setMapPosition(lat, lng);
 //      // defaultCenter={this.props.center}

 // 		}
	// }

	// shouldComponentUpdate(a, b, c, d){

	// 	console.log('mapMainView shouldComponentUpdate a', a);
	// 	console.log('mapMainView shouldComponentUpdate b', b);
	// 	console.log('mapMainView shouldComponentUpdate c', c);
	// 	console.log('mapMainView shouldComponentUpdate d', d);

	// 	return true;
	// }

	// componentDidUpdate(prevProps, prevState, prevContext){

	// 	// console.log('mapMainView componentDidUpdate', prevProps, prevState);

	// 	// console.log('mapMainView componentDidUpdate context', this.context.mapShowContacts);
	// 	// console.log('mapMainView componentDidUpdate prevContext', prevContext.mapShowContacts);

	// 	let {
	// 		mapShowGeoObjects,
	// 		mapShowContacts,
	// 	} = this.context;

	// 	// /*
	// 	// 	Если поменяли отображаемость типов объектов, перебираем кластеры по новой
	// 	// */
	// 	if(
	// 		(
	// 			(mapShowGeoObjects || prevContext.mapShowGeoObjects)
	// 			||
	// 			(mapShowContacts || prevContext.mapShowContacts)
	// 		)
	// 		&&
	// 		(
	// 			mapShowGeoObjects != prevContext.mapShowGeoObjects
	// 			|| mapShowContacts != prevContext.mapShowContacts
	// 		)

	// 	){
	// 		// console.log('createClusters');
	// 		this.createClusters();
	// 	}

	// 	// return;
	// }

	onChildClick(key, props){

		// console.log('onChildClick', props, this);

		let {
			cluster,
		} = props;

		let {
			properties: {
				cluster_id,
				cluster: isCluster,
			},
		} = cluster;

		// console.log('onChildClick cluster', cluster, isCluster);
		// cluster

		this.setState({cluster_id});

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


		// // console.log('onChildClick properties', properties);
		// // console.log('onChildClick item', item);

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

		// console.log('onGoogleApiLoaded', map, maps);

		// window.map = map;
		// window.maps = maps;

		this.setState({
			map,
			maps,
		});
	}

 	onChildMouseDown(key, props, coords){
 		console.log('onChildMouseDown', key, props, coords);

 		let {
 			cluster: {
	 			properties,
	 			geometry,
 			},
 		} = props;
 

 		let {
 			cluster,
 		} = properties;

 		if(!cluster){	
	 		this.setState({
	 			draggable: false,
	 		});
 		}

 		return;
 	}

 	onChildMouseUp(){
 		// console.log('onChildMouseUp');

 		this.setState({
 			draggable: true,
 		});
 	}

 	onChildMouseMove(key, marker, newCoords){

 		let {
 			item,
 		} = marker;

 		let {

			PlacesStore
 		} = this.props;

 		let {
 			updateItem,
 		} = this.context;


 		// console.log('newCoords marker', marker);

 		// console.log('newCoords item', item);

 		// console.log('newCoords', this, newCoords);

 		// PlacesStore.getDispatcher().dispatch(PlacesStore.actions['UPDATE'], item, newCoords);

 		updateItem(item, newCoords, PlacesStore);

 		this.forceUpdate();
 	}

 	onChildMouseEnter(key, props){
 		console.log('onChildMouseEnter', key, props);

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
 		// console.log('onChildMouseLeave', key, props);

 		let {
 			cluster,
 		} = props;

 		// Object.assign(cluster.properties, {
 		// 	hovered: false,
 		// });

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

 		// console.log("handleMapChange", center, zoom, bounds);

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

	 		pathname = location.pathname.replace(/(.*\/)@([\d+\,\.]*)?/, '$1');

	 		pathname = pathname.replace(/(.*\/)/, `$1@${lat},${lng},${zoom}`);

	 		location.pathname = pathname;

	 		// console.log("pathname", pathname); 

	 		// console.log("location", location); 

	 		browserHistory.push(location);
 			
 		}

 		// console.log("new loc", nl);


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
	      this.createClusters(this.props);
	    }
	  );
	};

	createClusters = props => {

		// console.log('handleMapChange 2 ', this.state.mapOptions.bounds);

	  this.setState({
	    // clusters: this.state.mapOptions.bounds
	    clusters: this.state.bounds
	      ? this.getClusters(props)
	      : null,
	  });
	};

	getClusters = () => {

		let {
			PlacesStore,
			ContactsStore,
		} = this.props;

		let {
			// mapOptions: {
			// 	zoom,
			// },
			zoom,
		} = this.state;

		let {
			mapShowContacts,
			mapShowGeoObjects,
		} = this.context;

		// console.log('zoom', zoom);

		// console.log("PlacesStore", PlacesStore.getState());

  	let markersData = [];

		mapShowGeoObjects && PlacesStore.getState().map(item => {

  		let {
  			id,
  			lat,
  			lng,
  			name,
  		} = item;

  		markersData.push({
	      "type": "Feature",
	      "properties": {
	      	item: item,
	      	type: "Place",
	      	openEditor: () => {
	      		// activePlaceItem: item,
	      		browserHistory.push(`/db/places/${id}/`);
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

		mapShowContacts && ContactsStore.getState().map(item => {


  		let {
  			id,
  			lat,
  			lng,
  			name,
  		} = item;

  		if(!lat || !lng){
  			return;
  		}

  		// console.log('ContactsStore item',  item);

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

  	// console.log("markersData", markersData);

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
        maxZoom: 15
    }).load(markersData);


   	window.clusters = clusters;

	  // const clusters = supercluster(markersData, {
	  //   minZoom: 0,
	  //   maxZoom: 16,
	  //   radius: 60,
	  // });

	  // window.cl2 = clusters;

	  // return clusters.getClusters([-180, -85, 180, 85], 2);
	  // return clusters.getClusters(this.state.mapOptions);

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

		// console.log('setMapPosition', lat, lng, map, maps);

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

	isInScreen(item){

		let {
			bounds: {
				nw,
				se,
			},
		} = this.state;

		let {
			lat,
			lng,
		} = item;

		// console.log("coords", lat, lng, nw, se);
		if(!lat || !lng || !nw || !se){
			return;
		}


		if(
			lat < nw.lat && lat > se.lat
			&&
			lng > nw.lng && lng < se.lng
		){
			return true;
		}

		return false
	}

	render(){

		let {
			PlacesStore,
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

		let {
			map,
			maps,
			draggable,
			clusters,
			// activePlaceItem,
			// sidebarOpen,
			zoom,
			cluster_id,
		} = this.state;

		let {
			mapShowContacts,
			mapShowGeoObjects,
			savePlaceItem,
		} = this.context;

  	let items = [];

  	let sidebar_items_list = [];




		// console.log('sidebar_items_list clusters', cluster_id, zoom, clusters);


		if(clusters){
			// clusters.getLeaves();
			clusters.points && clusters.points.map(point => {

				// console.log('point', point);

				let {
					properties: {
						item,
					},
				} = point;

				if(item){

	  			// console.log('clusters item', item);

	  			let {
	  				id,
	  				name,
	  				longtitle,
	  				address,
	  				type,
	  				lat: item_lat,
	  				lng: item_lng,
	  			} = item;

	  			if(sidebar_items_list.length >= 20){

	  				return;
	  			}

	  			// Если точка не в рамках карты, пропускаем 
	  			if(!this.isInScreen(item)){
	  				return;
	  			}

	  			// if(!item_lat && !item_lng){
	  			// 	return;
	  			// }

	  			let Icon;
	  			let editUrl;

	  			if(type == "contact"){
	  				Icon = Texture;
	  				editUrl = `/db/contacts/${id}/`;
	  			}
	  			else{
	  				Icon = Business;
	  				editUrl = `/db/places/${id}/`;
	  			}


		  		sidebar_items_list.push(<div
			  		// key={id || `item_${sidebar_items_list.length}`}
			  		key={`item_${sidebar_items_list.length}`}
		  		>
		  			{sidebar_items_list.length > 0 ? <Divider /> : null}

		  			<ListItem
			  		>
			  			

			  			<ListItemIcon>
			  				<IconButton
			  					onClick={event => {

										// console.log('setMapPosition 2', lat, lng);

			  						this.setMapPosition(item_lat, item_lng)
			  					}}
			  				>
			  					<Icon
			  					/>
			  				</IconButton>
			  			</ListItemIcon>

			  			<ListItemText 
			  				primary={longtitle || name}
			  				secondary={address}
		  					onClick={event => {
		  						browserHistory.push(editUrl);
		  					}}
		  					style={{
		  						cursor: 'pointer',
		  					}}
			  			/>

			  		</ListItem>
		  		</div>);
	  		}
			});
		}

  	if(cluster_id){
  		
  		console.log('sidebar_items_list clusters', clusters.getLeaves);
  	}


  	// console.log('clusters', clusters);

  	clusters && clusters.getClusters([-180, -85, 180, 85], zoom || 4).map(cluster => {

  		if(cluster.properties.type == "Contact"){
  			// console.log('cluster', cluster);
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

  		items.push(<Marker
  			key={id && `${id}_${type}` || `marker_${items.length}`} 
  			lat={lat}
  			lng={lng}
				item={item}
				cluster={cluster}
  		/>);


  		

			return;
  	});

  	// console.log('sidebar_items_list', sidebar_items_list);

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
		  */}
	  	

	  		<GoogleMapReact
		      apiKey="AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU"
		      defaultCenter={this.state.center}
		      defaultZoom={this.state.zoom}
	  			ref="mapProvider"
					draggable={draggable}
				  onGoogleApiLoaded={::this.onGoogleApiLoaded}
		  		// onChange={this.handleMapChange}
				  // onChildClick={::this.onChildClick}
				  // onChildMouseDown={::this.onChildMouseDown}
				  // onChildMouseUp={::this.onChildMouseUp}
				  // onChildMouseMove={::this.onChildMouseMove}
				  // onChildMouseEnter={::this.onChildMouseEnter}
				  // onChildMouseLeave={::this.onChildMouseLeave}
		    >
		    	{items}
		    </GoogleMapReact>
	  	</Grid> 

	  {/*
  	</Grid>
	  */}

	}
} 