import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';


export default class CompanyPage extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static contextTypes = {
		loadCompanyFullData: PropTypes.func.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {};
	}

	componentDidMount(){

		this.loadCompanyFullData();
	}

	loadCompanyFullData(){

		const {
			loadCompanyFullData,
		} = this.context;

		const {
			item,
		} = this.props;

		// console.log('loadCompanyFullData page', item);

		loadCompanyFullData(item);
	}
	
	render(){

		const {
			item,
		} = this.props;

		const {
			id,
			name,
			uri,
			image,
			tvs,
		} = item;

		const {
			address,
		} = tvs || {};

		console.log('CompanyPage', item);

		return <Card>
			
			<CardHeader 
        title={name}
        subheader={address}
			/>

		</Card>
	}
}

