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
    router: PropTypes.object.isRequired,
		companiesStore: PropTypes.object.isRequired,
	};

	static defaultProps = {
    center: {lat: 55.75, lng: 37.9},
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
			companiesStore,
		} = this.context;

 		this.companiesStoreListener = companiesStore.getDispatcher().register(payload => {

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

 		// console.log("lat lng", router, lat, lng, zoom);

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

			companiesStore,
 		} = this.context;


    if(this.companiesStoreListener){

      let dispatch = companiesStore.getDispatcher();

      dispatch._callbacks[this.companiesStoreListener] && dispatch.unregister(this.companiesStoreListener);

      this.companiesStoreListener = undefined;
    }


 		return super.componentWillUnmount && super.componentWillUnmount();
	}

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

	componentDidUpdate(prevProps, prevState, prevContext){

		console.log('mapMainView componentDidUpdate', prevProps, prevState);
		// console.log('mapMainView componentDidUpdate context', this.context);

		// console.log('mapMainView componentDidUpdate context', this.context.mapShowContacts);
		// console.log('mapMainView componentDidUpdate prevContext', prevContext.mapShowContacts);

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

 		// console.log("lat lng", router, lat, lng, zoom);

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
		// 	// console.log('createClusters');
		// 	this.createClusters();
		// }

		return super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext) || true;
	}

	onChildClick(key, props){

		// console.log('onChildClick', props, this);

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

		console.log('onChildClick cluster', cluster, isCluster);
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

 	// onChildMouseDown(key, props, coords){
 	// 	console.log('onChildMouseDown', key, props, coords);

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
 	// 	// console.log('onChildMouseUp');

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


 		// console.log('newCoords marker', marker);

 		// console.log('newCoords item', item);

 		// console.log('newCoords', this, newCoords);



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
			companiesStore,
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

		companiesStore.getState().map(item => {


  		let {
  			id,
  			coords,
  			name,
  		} = item;

  		let {
  			lat,
  			lng,
  		} = coords || {};

  		// console.log('companiesStore item',  item);

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


   	// window.clusters = clusters;

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
		    >
		    	{items}
		    </GoogleMapReact>
	  	</Grid> 

	  {/*
  	</Grid>
	  */}

	}
} 