import React, {Component} from 'react';

import PropTypes from 'prop-types';

// import GoogleMap from 'material-ui-components/src/GoogleMap';
// import GoogleMap from 'modules/Sportpoisk/components/GoogleMap';

import Button from 'material-ui/Button';
import GoogleMapReact from 'google-map-react';
import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';

// import Control from './Controls';
// import Control from 'modules/Sportpoisk/components/GoogleMap/Controls/layout'; 
import Control from 'google-map-react-control'; 

// const Control = require('google-map-react-control');


import YandexSearch from 'modules/Site/components/YandexMap/Search';

const defaultProps = {}
 
// import SearchControl from 'modules/Sportpoisk/components/GoogleMap/Controls/UserMenu/index.js';

// export {Control};

export default class ItemMap extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		updateItem: PropTypes.func.isRequired,
	};

	static contextTypes = {
		// connector_url: PropTypes.string.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			draggable: true,
		}
	}
 


 	onChildMouseDown(key, props, coords){ 
 
 		this.setState({
 			draggable: false,
 		});

 		return;
 	}


 	onChildMouseUp(){
 		// console.log('onChildMouseUp');

 		this.setState({
 			draggable: true,
 		});
 	}

 	onChildMouseMove(key, marker, newCoords){

 		// let {
 		// } = marker;

 		let {

			// PlacesStore
 			item,
 			updateItem,
 		} = this.props;

 		// let {
 		// } = this.context;


 		// // PlacesStore.getDispatcher().dispatch(PlacesStore.actions['UPDATE'], item, newCoords);

 		// updateItem(item, newCoords, PlacesStore);
 		updateItem(item, {
 			coords: newCoords,
 		});

 		this.forceUpdate();
 	}

 	onGoogleApiLoaded(api){

 		let {
 			map,
 			maps,
 		} = api;

 

 		this.setState(api);
 	}

	render(){

		let {
			item,
			updateItem,
			...other
		} = this.props;

		let {
			mapTilesLoaded,
			draggable,
 			map,
 			maps,
		} = this.state;

		let {
			name,
			coords,
		} = item;

		const {
			lat,
			lng,
		} = coords || {};

		if(!lat || !lng){
			return null;
		}


		return <div
      style={{
      	height: 400,
      }}
		>
			<GoogleMapReact
				ref="GoogleMapReact"
	      apiKey="AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU"
	      defaultCenter={{
	      	lat: lat,
	      	lng: lng,
	      }}
	      defaultZoom={15}
				draggable={draggable}
			  onChildMouseDown={::this.onChildMouseDown}
			  onChildMouseUp={::this.onChildMouseUp}
			  onChildMouseMove={::this.onChildMouseMove}
			  onGoogleApiLoaded={::this.onGoogleApiLoaded}
	    >
				

	    	<SimpleMarker 
	    		lat={lat}
	    		lng={lng}
	    		map={map}
	    	>

	    	</SimpleMarker>

			</GoogleMapReact>

			{map && maps
    		?
    		<Control
    			map={map}
    			maps={maps}
    			position="TOP_CENTER"
    		>
    			<YandexSearch 
	    			map={map}
	    			maps={maps}
	    			style={{
	    				minWidth: 300
	    			}}
	    			onNewRequest={(event, value, mapItem) => {
					  	let {
					  		coordinates: {
					  			0: lat,
					  			1: lng,
					  		},
					  	} = mapItem;

					  	updateItem(item, {
					  		coords: {
						  		lat,
						  		lng,
						  	},
					  	});

						}}
    			/>
    		</Control>
    		
    		:
    		null
    	}
		</div>;
	}
}
 