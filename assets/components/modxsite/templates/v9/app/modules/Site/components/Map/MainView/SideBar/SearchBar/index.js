import './styles/styles.less';

import React, {Component} from 'react';

import PropTypes from 'prop-types'; 

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import PlaceIcon from 'material-ui-icons/Place';

// import {Control} from 'modules/Sportpoisk/components/Fields/Map'; 
// import Prototype from '../layout.js';

import YandexSearch from 'modules/Sportpoisk/components/YandexMap/Search';

import lodash from 'lodash'; 

let Prototype = {};

let contextTypes = Prototype.contextTypes && lodash.cloneDeep(Prototype.contextTypes) || {}

let propTypes = Prototype.propTypes && lodash.cloneDeep(Prototype.propTypes) || {}

Object.assign(contextTypes, {
	connector_url: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	userActions: PropTypes.object.isRequired,
});

Object.assign(propTypes, {
	// createPlace: PropTypes.func.isRequired,
	map: PropTypes.object.isRequired,
	maps: PropTypes.object.isRequired,
});
 
export default class SearchBar extends Component{

	static contextTypes = contextTypes;
	static propTypes = propTypes;

	render(){

		let {
			map,
			maps,
			position,
			// createPlace,
			...other
		} = this.props;

		let {
			classes,
			connector_url,
			user,
			userActions,
		} = this.context;

		let content = null;

		content = <div
				className="SearchBar--block"
			>
				<YandexSearch
					includeSiteData={true}
	    		onNewRequest={(event, value, item) => {
	    			console.log('GooglePlaceAutocomplete onNewRequest 2', event, value, item);

	    			// onNewRequest && onNewRequest(event, value, item);
	    		}}
	    		onChange={(value) => {
	    			console.log('onChange', value);
	    		}}
	    		map={map}
	    		maps={maps}
	    	/>
		</div>;

		return content;
	}
}
 
