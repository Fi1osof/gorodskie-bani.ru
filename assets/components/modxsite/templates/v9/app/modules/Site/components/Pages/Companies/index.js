import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Company from './Company';

export default class CompaniesPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
	
	render(){

		const {
			params,
		} = this.props,
		{
			companiesStore,
		} = this.context;

		const {
			companyId,
		} = params || {};

		let item;
		let company;

		if(companyId){
			item = companiesStore.getState().find(n => n.id == companyId || n.alias == companyId);

			if(item){

				company = <Company
					item={item}
				/>

			}
		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div>

			{company}

		</div>
	}
}

