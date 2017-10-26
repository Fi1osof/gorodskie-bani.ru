import React, {Component} from 'react';

import PropTypes from 'prop-types';

// import AutoComplete from 'material-ui-components/src/AutoComplete';
import YandexAutoCompletePrototype from 'material-ui-components/src/YandexAutoComplete';

// import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
 

class YandexAutoComplete extends YandexAutoCompletePrototype{

	loadData(){

		// console.log('YandexAutoComplete loadData');

		super.loadData && super.loadData(); 
 		return;
  } 

  cleanupProps(props){

		let {
			includeSiteData,
			...other
		} = props;

		return other;
	}


	componentWillUpdate(nextProps, nextState){

		// console.log('YandexAutoComplete componentWillUpdate', nextProps, nextState);

		return super.componentWillUpdate ? super.componentWillUpdate(nextProps, nextState) : true;
	}

	// componentDidUpdate(prevProps, prevState){

	// }
}

const defaultProps = {}

 
export default class YandexSearch extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	// componentWillMount(){

	// }

	// componentDidMount(){

	// }

 //  componentDidUpdate(){

 //    if(this.props.debug){
 //      console.log("YandexSearch componentDidUpdate", this);
 //    }
 //  }

	render(){

		let {
			map,
			maps,
			// google,
			onNewRequest,
			includeSiteData,
			...other
		} = this.props;

		return <YandexAutoComplete
			includeSiteData={includeSiteData}
			closeOnBlur={false}
			map={map}
			maps={maps}
			// google={google}
			onNewRequest={(event, value, item) => {
		  	let {
		  		coordinates,
		  	} = item;

		  	// map.setCenter(new google.maps.LatLng(coordinates[0],coordinates[1]));
		  	map.setCenter(new maps.LatLng(coordinates[0],coordinates[1]));

		  	onNewRequest && onNewRequest(event, value, item);
			}}
			{...other}
		/>
	}
}

YandexSearch.defaultProps = defaultProps;

YandexSearch.propTypes = {
	map: PropTypes.object.isRequired,
	maps: PropTypes.object.isRequired,
	// google: PropTypes.object.isRequired,
}
