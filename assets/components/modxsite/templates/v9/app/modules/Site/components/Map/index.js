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
import AddIcon from 'material-ui-icons/AddCircle';

import GoogleMapReact from 'google-map-react';
// import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';

import supercluster from 'supercluster';

// window.supercluster = supercluster;

import {Link, browserHistory} from 'react-router';

// import PlaceDialog from '../../Grid/Places/Dialog/index.js';

import Marker from './MainView/Marker';
// import SideBar from './SideBar';

import Control from 'google-map-react-control';

import YandexSearch from 'modules/Site/components/YandexMap/Search';

import HumanIcon from 'material-ui-icons/PermIdentity';
import FaceIcon from 'material-ui-icons/Face';

import UserLink from 'modules/Site/components/fields/User/link';

class UserMarker extends Component{

	static contextTypes = {
		UsersStore: PropTypes.object.isRequired,
	};

	render(){

		const {
			query,
		} = this.props;

		const {
			uid,
		} = query || {};

		let Icon;

		if(uid){

			const {
				UsersStore,
			} = this.context;

			const user = UsersStore.getState().find(n => n.id === uid);

			Icon = FaceIcon;

			if(user){

				const {
					username,
				} = user;

				const link = `/profile/${username}`;

				return <UserLink
					user={user}
				/>

				// return  <Link
				// 	to={link}
				// 	href={link}
				// >
				// 	<Icon />
				// </Link>
			}

		}
		else{
			Icon = HumanIcon;
		}

		return <Icon 
			/>

	}

}

export default class MapMainView extends Component{

	static contextTypes = {

		// updateItem: PropTypes.func.isRequired,
		// savePlaceItem: PropTypes.func.isRequired,
		document: PropTypes.object.isRequired,
		openCompanyPage: PropTypes.func.isRequired,
		wsRequest: PropTypes.func.isRequired,
		// loadCompanyMapData: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
		CoordsStore: PropTypes.object.isRequired,
		CompaniesStore: PropTypes.object.isRequired,
		RatingsStore: PropTypes.object.isRequired,
		setPageTitle: PropTypes.func.isRequired,
		localQuery: PropTypes.func.isRequired,
		getCounters: PropTypes.func.isRequired,
		setCoords: PropTypes.func.isRequired,
	};

	static defaultProps = {
    center: {
    	lat: 55.752898, 
    	lng: 37.621908,
    },
    zoom: 11
	};

	static propTypes = {
	};

	constructor(props){

		super(props);

		let {
			zoom
		} = props;

		zoom = parseInt(zoom);

		this.state = {
			draggable: true,
		  mapOptions: {
		    center: props.center,
		    zoom,
		  },
		  center: props.center,
		  zoom,
		  clusters: null,
		  // activePlaceItem: null,
		  // sidebarOpen: true,
			cluster: null,
			inited: true,
		}
	}

	componentWillMount(){

		this.initCoords();

 		this.createClusters();

 		return super.componentWillMount && super.componentWillMount();
	}

	componentWillUnmount(){

 		let {
			CompaniesStore,
			RatingsStore,
 		} = this.context;


    if(this.CompaniesStoreListener){

      let dispatch = CompaniesStore.getDispatcher();

      dispatch._callbacks[this.CompaniesStoreListener] && dispatch.unregister(this.CompaniesStoreListener);

      this.CompaniesStoreListener = undefined;
    }


    if(this.RatingsStoreListener){

      let dispatch = RatingsStore.getDispatcher();

      dispatch._callbacks[this.RatingsStoreListener] && dispatch.unregister(this.RatingsStoreListener);

      this.RatingsStoreListener = undefined;
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
			CompaniesStore,
			RatingsStore,
      CoordsStore,
			localQuery,
			router: {
				params,
			},
		} = this.context;

		const {
			city, 
		} = params || {};

 		this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {
 		
 			// this.setPageTitle();

 			this.createClusters();

 		});

 		this.RatingsStoreListener = RatingsStore.getDispatcher().register(payload => {

 			this.createClusters();
 		});

 		this.CoordsStoreListener = CoordsStore.getDispatcher().register(payload => {

 			this.forceUpdate();

 		});


 		this.setPageTitle();
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


		const {
			city: currentCity,
		} = this.state;


		let {
 			router,
		} = this.context;

		// let {
 		// 		router: prevRouter,
		// } = prevContext;

		/*
			Если поменялись координаты в роунитге, двигаем карту
		*/

 		let {
 			lat,
 			lng,
 			zoom,
 			city,
 		} = router.params || {};

 		zoom = parseInt(zoom);

 		// 

 		// console.log("componentDidUpdate city", city, currentCity);

 		if((currentCity || city) && (currentCity !== city)){

 			this.setState({
 				city,
 			}, () => {
 				this.setPageTitle();
 			});

 		}

 		let {
 			center: {
	 			lat: currentLat,
	 			lng: currentLng,
 			},
 			zoom: currentZoom,
 		} = this.state;

 		currentZoom = parseInt(currentZoom);

 		if(
 			lat && lng && zoom
 			&& (
 				lat != currentLat
 				|| lng != currentLng
 				|| zoom !== currentZoom
			)
 		){
 			// this.setMapPosition(lat, lng);
      // defaultCenter={this.props.center}

      this.setState({
      	center: {
	      	lat: parseFloat(lat),
	      	lng: parseFloat(lng),
	      },
	      zoom,
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


	async setPageTitle(title){

		const {
 			localQuery,
 			setPageTitle,
 		} = this.context;


 		const {
			router: {
				params,
			},
		} = this.context;

		const {
			city, 
		} = params || {};


 		if(!title && city){

 			let response = await localQuery({
 				operationName: "Cities",
 			});

 			const {
 				resources: cities,
 			} = response.data;

 			// console.log('cities', cities);

 			const currentCity = cities && cities.find(n => n.alias === city);

 			// console.log('currentCity', currentCity);

 				
 			if(currentCity){
				
				title = currentCity.name;


 			}

			// console.log("setPageTitle", title, city, currentCity);

 		}
 		


 		setPageTitle(title || "Городские бани");

	}

	// async initCoords(){

	// 	const {
	// 		localQuery,
	// 		router: {
	// 			params,
	// 		},
	// 	} = this.context;

	// 	const {
	// 		city, 
	// 	} = params || {};


 // 		let {
 // 			router,
 // 		} = this.context;

 // 		let {
 // 			lat,
 // 			lng,
 // 			zoom,
 // 		} = router.params;


 // 		if(city && !lat && !lng){

 // 			let response = await localQuery({
 // 				operationName: "Cities",
 // 			});

 // 			const {
 // 				resources: cities,
 // 			} = response.data;

 // 			// console.log('cities', cities);

 // 			const currentCity = cities && cities.find(n => n.alias === city);

 // 			// console.log('currentCity', currentCity);

 				
 // 			if(currentCity){
				
	// 			// this.setPageTitle(currentCity.name);

	// 			if(currentCity.coords){

	//  				lat = currentCity.coords.lat;
	//  				lng = currentCity.coords.lng;

	//  				zoom = 12;

	// 			}


 // 			}

 // 		}

 // 		// 
 			
	// 	// console.log('lat lng', lat, lng, zoom);

 // 		if(lat && lng && zoom){
 // 			// this.setMapPosition(lat, lng);
 //      // defaultCenter={this.props.center}

 //      let center = {
 //      	lat: parseFloat(lat),
 //      	lng: parseFloat(lng),
 //      };

 //      zoom = parseFloat(zoom);

 //      // Object.assign(this.state, {
 //      // 	center,
 //      // 	zoom,
 //      // 	mapOptions: {
	//      //  	center,
	// 	    //   zoom,
 //      // 	}
 //      // });

 //      // console.log("map data", {center,
 //      // 	zoom,
 //      // 	mapOptions: {
	//      //  	center,
	// 	    //   zoom,
 //      // 	}});

 //      this.setState({
 //      	center,
 //      	zoom,
 //      	mapOptions: {
	//       	center,
	// 	      zoom,
 //      	}
 //      });
 // 		}

 // 		this.setState({
 //    	inited: true,
 //    });

	// 	return;
	// }


	initCoords(){

		const {
			localQuery,
			router: {
				params,
			},
		} = this.context;

		const {
			city, 
		} = params || {};


 		let {
 			router,
 		} = this.context;

 		let {
 			lat,
 			lng,
 			zoom,
 		} = router.params;


 		if(city && !lat && !lng){

 			const {
 				citiesData
 			} = this.context.document;
 

 			const {
 				resources: cities,
 			} = citiesData || {};

 			// console.log('cities', cities);

 			const currentCity = cities && cities.find(n => n.alias === city);

 			// console.log('currentCity', currentCity);

 				
 			if(currentCity){
				
				// this.setPageTitle(currentCity.name);

				if(currentCity.coords){

	 				lat = currentCity.coords.lat;
	 				lng = currentCity.coords.lng;

	 				zoom = 12;

				}


 			}

 		}

 		// 
 			
		// console.log('lat lng', lat, lng, zoom);

 		if(lat && lng && zoom){
 			// this.setMapPosition(lat, lng);
      // defaultCenter={this.props.center}

      let center = {
      	lat: parseFloat(lat),
      	lng: parseFloat(lng),
      };

      zoom = parseFloat(zoom);

      // Object.assign(this.state, {
      // 	center,
      // 	zoom,
      // 	mapOptions: {
	     //  	center,
		    //   zoom,
      // 	}
      // });

      // console.log("map data", {center,
      // 	zoom,
      // 	mapOptions: {
	     //  	center,
		    //   zoom,
      // 	}});

      // this.setState({
      // 	center,
      // 	zoom,
      // 	mapOptions: {
	     //  	center,
		    //   zoom,
      // 	}
      // });

      Object.assign(this.state, {
      	center,
      	zoom,
      	mapOptions: {
	      	center,
		      zoom,
      	}
      });
 		}

 		// this.setState({
   //  	inited: true,
   //  });

		return;
	}


	onChildClick(key, props){

		// 

		let {
			cluster,
		} = props || {};

		if(!cluster){
			return;
		}

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
 		} = props || {};

 		if(!cluster){
 			return;
 		}

 		// if(!item){
 		// 	return;
 		// }

 		cluster && cluster.properties && Object.assign(cluster.properties, {
 			hovered: true,
 		});

 		this.forceUpdate();
 	}

 	onChildMouseLeave(key, props){
 		// 

 		let {
 			cluster,
 		} = props || {};

 		if(!cluster){
 			return;
 		}

 		cluster && cluster.properties && Object.assign(cluster.properties, {
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


 		if(lat && lng){

 			const {
 				wsRequest,
 			} = this.context;

 			wsRequest({
				type: "coords",
				coords: {
					lat,
					lng,
					zoom,
				},
 			});

 		}

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

	    	const {
	    		setCoords,
	    	} = this.context;

	    	setCoords({
	    		lat,
	    		lng,
	    		zoom,
	    	});

	    	// browserHistory.replace();
	      // this.createClusters(this.props);
	    }
	  );
	};

	// createClusters = props => {

		

	// 	// 

	//   // this.setState({
	//   //   // clusters: this.state.mapOptions.bounds
	//   //   clusters: this.state.bounds
	//   //     ? this.getClusters(props)
	//   //     : null,
	//   // });

	//   const {
	// 		// CompaniesStore,
	// 		localQuery,
	// 	} = this.context;

	// 	// let {
	// 	// 	// mapOptions: {
	// 	// 	// 	zoom,
	// 	// 	// },
	// 	// 	zoom,
	// 	// } = this.state;

	// 	// let {
	// 	// } = this.context;

 //  	let companies;

 //  	localQuery({
 //  		operationName: "MapCompanies",
 //  		variables: {
 //  			limit: 0,
 //  		},
 //  	})
 //  		.then(r => {

 //  			// console.log("Map companies", r);

 //  			const {
 //  				companies: result,
 //  			} = r.data || {};

 //  			companies = result;

	// 			this.prepareClusters(companies);

 //  		});
		

	//   // return clusters;
	// };

	createClusters = props => {

	

	  const {
			// CompaniesStore,
			document,
		} = this.context;

		const {
			companies,
		} = document.mapData || {};

		this.prepareClusters(companies);

	};


	prepareClusters(companies){


  	let markersData = [];

		// console.log("Map companies 2 companies", companies);

		companies && companies.map(item => {


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

  		// console.log('Map item', item);


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

	  Object.assign(this.state, {
	  	clusters,
	  });

	  // this.setState({
	  // 	clusters,
	  // });
	}


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

	// isInScreen(cluster){

	// 	let {
	// 		bounds,
	// 	} = this.state;

	// 	const {
	// 		nw,
	// 		se,
	// 	} = bounds || {};

	// 	let {
	// 		geometry: {
	// 			coordinates: {
	// 				0: lng,
	// 				1: lat,
	// 			},
	// 		}
	// 	} = cluster;

	// 	if(!lat || !lng || !nw || !se){
	// 		return false;
	// 	}
		
	// 	let {
	// 		minLat,
	// 		maxLat,
	// 		minLng,
	// 		maxLng,
	// 	} = this.getScreenBounds() || {};

 
	// 	if(
	// 		lat < maxLat && lat > minLat
	// 		&&
	// 		lng > minLng && lng < maxLng
	// 	){
	// 		return true;
	// 	}

	// 	return false
	// }

	isInAdvCoords(bounds){
		
		// let {
		// 	minLat,
		// 	maxLat,
		// 	minLng,
		// 	maxLng,
		// } = this.getScreenBounds(true) || {};

		const {
			center,
			zoom,
		} = this.state;
		
		if(!bounds || !center || !zoom || zoom < 13){
			return;
		}

		let {
			minLat,
			maxLat,
			minLng,
			maxLng,
		} = bounds;
 

		const {
			lat,
			lng,
		} = center;

		// console.log('center', center);

		if(
			lat < maxLat && lat > minLat
			&&
			lng > minLng && lng < maxLng
		){
			return true;
		}

		return false
	}

	getScreenBounds(real){

		if(typeof window === "undefined"){

			return {
				minLat: -80,
				maxLat: 80,
				minLng: -180,
				maxLng: 180,
			};

		}


		let {
			bounds,
			zoom,
		} = this.state;

		const {
			nw,
			se,
		} = bounds || {};

		if(!nw || !se){
			return;
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

		// const latDiff = maxLat - minLat;

		// minLat -= latDiff;
		// maxLat += latDiff;

		// const lngDiff = maxLng - minLng;

		// minLng -= lngDiff;
		// maxLng += lngDiff;

		let index = 1

		const latDiff = Math.round(maxLat - minLat) / index;
		const lngDiff = Math.round(maxLng - minLng) / index;

		// console.log("latDiff", latDiff);
		// console.log("lngDiff", lngDiff);


		if(zoom > 6 && !real){

			minLat -= latDiff;
			maxLat += latDiff;

			minLng -= lngDiff;
			maxLng += lngDiff;
			
		}


		if(maxLat < 0 ){
			maxLat = Math.abs(maxLat);
		}

		if(maxLng < 0 ){
			maxLng = Math.abs(maxLng);
		}

		return {
			minLat,
			maxLat,
			minLng,
			maxLng,
		};
	}

	// loadCompanyMapData(item, force){
		
	// 	const {
	// 		loadCompanyMapData,
	// 	} = this.context;

	// 	loadCompanyMapData(item, force);
	// }

	render(){

		const key = "AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU";

		let {
			children,
		} = this.props;

		const {
			getCounters,
			CoordsStore,
		} = this.context;


		const {
			minLat,
			maxLat,
			minLng,
			maxLng,
		} = this.getScreenBounds() || {};

		const {
			...advBounds,
		} = this.getScreenBounds(true) || {};


		// console.log('advBounds', advBounds);

		let advItems = [];

		const allowAds = this.isInAdvCoords({
			maxLat: 55.63,
			maxLng: 37.8,
			minLat: 55.55,
			minLng: 37.6,
		});

		if(allowAds){
			advItems.push(<div>
				<Link
					to={`/bani/vidnovskie-bani/`}
					href={`/bani/vidnovskie-bani/`}
				>
					<img
						src="http://gorodskie-bani.ru/images/resized/slider_thumb/assets/images/companies/1525-vidnovskie-bani/5Y5A6418.jpg"
						style={{
							width: 200,
						}}
					/>
				</Link>
			</div>);
		}

		// console.log('advItems', advItems);



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
			center,
			draggable,
			clusters,
			// activePlaceItem,
			// sidebarOpen,
			zoom,
			cluster_id,
			bounds,
			inited,
		} = this.state;

		
		// console.log("Map render clusters", clusters);


		if(!inited){
			return null;
		}

		let users = [];

		CoordsStore.getState().map(connection => {

			// console.log("Map connection", connection);

			const {
				id,
				coords,
				...other
			} = connection;

			// if(!coords){
			// 	return;
			// }

			users.push(<UserMarker
				key={id}
				{...coords}
				{...other}
			>
			</UserMarker>);

		});


		// 

		let {
			savePlaceItem,
		} = this.context;

  	let items = [];

  	let sidebar_items_list = [];



  	// if(cluster_id){
  		
  		
  	// }

  	// 

  	// clusters && clusters.getClusters([50, 35, 60, 60], zoom || 4).map(cluster => {
  	clusters && clusters.getClusters([minLng, minLat, maxLng, maxLat], zoom).map(cluster => {
  	// clusters && clusters.getClusters([minLng, minLat, maxLng, maxLat], zoom || 4).map(cluster => {

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
			// if(!this.isInScreen(cluster)){
			// 	return;
			// }

  		items.push(<Marker
  			key={id && `${id}_${type}` || `marker_${items.length}`} 
  			lat={lat}
  			lng={lng}
				item={item}
				cluster={cluster}
  		/>);


  		

			return;
  	});

  	// console.log('items', items);

  	// 

  	// 

  	// sidebarOpen = sidebarOpen && sidebar_items_list && sidebar_items_list.length ? true : false;

  	// 
  	let staticMapUrl;

  	staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=640x640&maptype=roadmap&key=${key}`;

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
		      	key,
		      }}
		      defaultCenter={this.state.mapOptions.center}
		      defaultZoom={this.state.mapOptions.zoom}
		      center={center} // current map center
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

					style={{
						display: "flex",
						flexGrow: 1,
						position: "relative",
						overflow: "hidden",
						background: typeof window === "undefined" ? `url(${staticMapUrl}) no-repeat center` : undefined,
					}}
					options={{
						streetViewControl: true,
					}}
		    >
		    	{items}

		    	{users}

		    </GoogleMapReact>

			{map && maps
    		?
    		<Control
    			map={map}
    			maps={maps}
    			position="TOP_CENTER"
    		>

    			<Grid
    				container
    				gutter={0}
    				align="center"
    			>

    				<Grid
    					item
    					xs
    				>

		    			<YandexSearch 
			    			map={map}
			    			maps={maps}
			    			style={{
			    				minWidth: 300
			    			}}
			    			placeholder="Поиск"
			    			// error={error || false}
			    	// 		textFieldProps={{
			    	// 			helperText: helperText || undefined,
			    	// 			onFocus,
			    	// 		}}
			    	// 		onNewRequest={(event, value, mapItem) => {
							 //  	let {
							 //  		coordinates: {
							 //  			0: lat,
							 //  			1: lng,
							 //  		},
							 //  	} = mapItem;

							 //  	const data = {
							 //  		lat,
							 //  		lng,
							 //  		coords: {
								//   		lat,
								//   		lng,
								//   	},
							 //  	};

							 //  	updateItem(item, data);

								// }}
		    			/>
    					
    				</Grid>
    				
	    			{/*helper 
	    				?
	    					<Grid
		    					item
		    				>
			    				<Helper
										contrastIcons={false}
			            >
			              {helper}
			            </Helper>
		            </Grid>
	    				:
	    				null
	    			*/}

    			</Grid>



    		</Control>
    		
    		:
    		null
    	}
 

				{map && maps
	    		?
	    		<Control
	    			map={map}
	    			maps={maps}
	    			position="LEFT_BOTTOM"
	    		> 

	    			<a
	    				href="javascript:;"
	    				style={{
	    					// textShadow: "0px 0px 5px #ccc",
    						fontSize: 12,
    						background: "rgba(256,256,256,0.7)",
						    display: "block",
						    paddingRight: 10,
	    				}}
	    				onClick={e => {

	    					const {
	    						localQuery,
	    					} = this.context;

	    					localQuery({
	    						operationName: "addCompany",
	    					});

	    				}}
	    			>
	    				<Grid
	    					container
	    					gutter={0}
	    					align="center"
	    				>
	    					<IconButton
			    				accent
			    				style={{
				    					height: 40,
				    					width: 40,
			    				}}
		    				>
			    				<AddIcon 
				    				style={{
				    					height: 40,
				    					width: 40,
				    				}}
			    				/>
		    				</IconButton>
		    				Добавить заведение
	    				</Grid>
	    			</a>

	    		</Control>
	    		
	    		:
	    		null
	    	}

				{map && maps
	    		?
	    		<Control
	    			map={map}
	    			maps={maps}
	    			position="BOTTOM_LEFT"
	    			style={{
	    				padding: 4,
	    			}}
	    		> 

	    			<a 
	    				href="https://maps.yandex.ru" 
	    				rel="nofollow"
    					target="_blank"
	    				style={{
	    					color: "#fff",
		    				textShadow: "0px 0px 5px #888",
		    				fontSize: 16,
	    				}}
	    			>
	    				Yandex.Maps
	    			</a>

	    		</Control>
	    		
	    		:
	    		null
	    	}



				{map && maps
	    		?
	    		<Control
	    			map={map}
	    			maps={maps}
	    			position="BOTTOM_LEFT"
	    		> 

	    			{getCounters()}

	    		</Control>
	    		
	    		:
	    		null
	    	}

				{map && maps
	    		?
	    		<Control
	    			map={map}
	    			maps={maps}
	    			position="RIGHT_BOTTOM"
	    		> 

	    			{advItems}

	    		</Control>
	    		
	    		:
	    		null
	    	}

	  	</Grid> 

	  {/*
  	</Grid>
	  */}

	}
} 